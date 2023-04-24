import React, { Component, PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { 
  Text,
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
} from 'native-base';
import { Button as PButton } from 'react-native-paper'
import { connect } from 'react-redux';

import GenericHeader from 'app/components/Header/GenericHeader';
import Radio from 'app/components/Radio/Radio';
import { showConfirm } from 'app/utils/notifier'
import { colorresource } from 'app/resources/colorresource';
import * as serverHelper from './serverHelper';

import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper';
import { getAddressAction, deleteAddressAction } from 'app/actions/shipay-actions';
import { goBack } from 'app/actions/navigation-actions'

import { TestIdGenerator, SuffixedTestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'AddressSelector';
const buttonTestId = TestIdGenerator(screenName,'','Button');
const radioTestId = TestIdGenerator(screenName,'','Radio');
const checkBoxTestId = TestIdGenerator(screenName, '', 'CheckBox')
const inputTestId = TestIdGenerator(screenName,'','Input');
const spinnerTestId = TestIdGenerator(screenName, '', 'Spinner')

class AddressSelector extends Component {

  getSelectedAddressId = () => {
    const id = this.props.navigation.getParam('selectedAddressId')
    return id
  }

  onAddressPress = (params) => {
    const onAddressPress = this.props.navigation.getParam('onAddressPress')
    if(onAddressPress) {
      const index = params.index
      goBack();
      onAddressPress({index, address: this.props.responseAddresses[index]});
    }
  }

  navigateToAddressEditor = (params) => {
    this.props.navigation.navigate('UpdateDeliveryAddress', params);
  }

  onAddNewPress = () => {
    this.navigateToAddressEditor();
  }

  onEditPress = (index) => {
    this.navigateToAddressEditor({data: this.props.responseAddresses[index]});
  }

  onConfirmDeletePress = (index) => {
    const id = this.props.responseAddresses[index].id
    this.props.dispatch(deleteAddressAction(id, true))
  }

  getStateParamsFromAddress = (address) => {
    const name = address.name;
    const streetAddress = address.street_address;
    const state = address.state.state_name;
    const city = address.city.city_name;
    const pincode = address.pincode;
    const emptyAddress = streetAddress === null || streetAddress === 'null' || pincode === null || pincode === 'null'
    const details = emptyAddress? "Blank Address" : `${streetAddress}, ${state}, ${city} - ${pincode}`
    const isDefault = address.is_default;
    const id = address.id
    return ({
      name,
      details,
      isDefault,
      id,
    })
  }

  onAddressesChanged = () => {
    const addresses = this.props.responseAddresses.map(this.getStateParamsFromAddress)
    this.setState({addresses})
  }

  initialize = async () => {
    this.props.dispatch(getAddressAction())
  }

  constructor(props) {
    super(props)
    this.state = {
      addresses: []
    }
  }

  componentDidMount() {
    waitTillUserInfoIsFetched().then(() => {
      this.initialize();
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.responseAddresses !== this.props.responseAddresses) {
      this.onAddressesChanged()
    }
  }
  
  render() {
    return (
      <Container>
        <GenericHeader title={'Manage Delivery Addresses'}/>
        <Content>
          <FlatList
          data={this.state.addresses}
          renderItem={({item, index}) => 
            <AddressItem 
            data={item} 
            index={index}
            onConfirmDeletePress={this.onConfirmDeletePress}
            onEditPress={this.onEditPress}
            onPress={this.onAddressPress}
            selected={this.getSelectedAddressId() === item.id}
            hideRadio={!this.props.navigation.getParam('onAddressPress')}
            />
          }
          keyExtractor={(item, index) => item.id.toString()}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button style={{backgroundColor: colorresource.liteblue}} onPress={this.onAddNewPress}>
              <Text style={{color: 'white', fontSize: 15 }} uppercase={false}>{'+ Add new delivery address'}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    responseAddresses: state.shipayR.responseGetAddress
  })
}

export default connect(mapStateToProps)(AddressSelector)

class AddressItem extends PureComponent {

  onPressInternal = () => {
    // console.log("radio clicked")
    const onPress = this.props.onPress
    onPress({index: this.props.index})
  }

  onConfirmDelete = () => {
    this.props.onConfirmDeletePress(this.props.index)
  }

  onEditPressInternal = () => {
    this.props.onEditPress(this.props.index)
  }

  onDeletePressInternal = () => {
    showConfirm(
      screenName,
      'Delete Address', 
      'Are you sure you want to delete this address?',
      this.onConfirmDelete,
    )
  }

  render() {
    const {
      data: {
        name,
        details,
        isDefault,
      },
      selected,
      hideRadio,
    } = this.props;
    return (
      <View style={{borderBottomWidth: 1, borderBottomColor: colorresource.divider, padding: 16}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Radio onPress={this.onPressInternal} selected={selected} hide={hideRadio}/>
          <Text style={{color: colorresource.liteblue, fontSize: 14}}>{name}</Text>
        </View>
        <Text style={{color: colorresource.gray, fontSize: 14}}>{details}</Text>
        <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
          
        { isDefault? null : 
          <PButton
          mode={'text'}
          color={colorresource.sharpred}
          onPress={this.onDeletePressInternal}
          icon={'delete'}
          >
            {'DELETE'}
          </PButton>}
          <PButton
          mode={'text'}
          color={colorresource.liteblue}
          onPress={this.onEditPressInternal}
          icon={'edit'}
          >
            {'CHANGE'}
          </PButton>
        </View>
      </View>
    );
  }
}