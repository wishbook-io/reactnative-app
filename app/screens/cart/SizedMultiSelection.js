import React,  { Component } from 'react';
import { View, FlatList } from 'react-native';
import { 
  Button,
  Text,
  Container,
  Content,
  Footer,
  FooterTab,
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import _ from 'lodash'

import SizedMultiSelectionItem from './SizedMultiSelectionItem';
import GenericHeader from 'app/components/Header/GenericHeader';
import CheckBox from 'app/components/CheckBox/CheckBox';
import { colorresource } from 'app/resources/colorresource';
import { goBack } from 'app/actions/navigation-actions';

import { addToCartAction } from 'app/actions/cart-actions'

import { waitTillCartDetailsIsFetched } from 'app/utils/debugHelper';

class SizedMultiSelection extends Component {

  getData = () => {
    const data = this.props.navigation.getParam('data', [])
    return data;
  }

  validateSizes = () => {
    const selected = this.state.selected
    const data = this.getData()
    const count = data.length
    if(!selected || selected.length !== count) {
      return false;
    }
    let valid = true;
    for(let i=0; i<count; ++i) {
      if(!selected[i] || selected[i].length === 0) {
        valid = false;
        break;
      }
    }
    return valid;
  }

  convertSelectedToSizes = (selected) => {
    // this converts the indices to actual size string

    const data = this.getData();
    const sizes = selected.map((selectedSizes, index) => {
      const sizeArray = data[index].available_sizes.split(',')
      selectedSizes = selectedSizes.sort((a,b) => a-b)
      return selectedSizes.map(selectedSize => ({quantity: 1, tag: sizeArray[selectedSize]}))
    })

    console.log("[convertSelectedToSizes]", sizes)
    return sizes;
  }

  // getItemsParamForProduct = (product, sizes) => {
  //   const commonParams = {
  //     product: product.id,
  //     quantity: 1,
  //     is_full_catalog: false,
  //     rate: product.public_price,
  //   }
  //   return sizes.map(size => ({...commonParams, note: 'Size : ' + size}))
  // }

  // getItemsParam = (data, sizes) => {
  //   let items = []
  //   for(let i=0; i<data.length; ++i) {
  //     items = [...items, ...this.getItemsParamForProduct(data[i], sizes[i])]
  //   }
  //   return items
  // }

  onAddToCartPress = () => {
    const isValid = this.validateSizes()
    if(!isValid) {
      console.log("sizes invalid")
      return;
    }
    const selected = this.state.selected
    const data = this.getData()
    const sizes = this.convertSelectedToSizes(selected)
    const callback = this.props.navigation.getParam('callback')
    goBack();
    callback(data, sizes)
    return;
    // const itemsParam = this.getItemsParam(data, sizes)
    // const params = {items: itemsParam, add_quantity: true}
    // don't send add_size param and append 'Size : ' before note
    // {u'items': [
    //   {u'note': u'4XL', u'product': u'40116', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'360.00', u'quantity': u'1'}, 
    //   {u'note': u'2XL', u'product': u'40116', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'360.00', u'quantity': u'1'}, 
    //   {u'note': u'XL', u'product': u'40111', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'360.00', u'quantity': u'1'}, 
    //   {u'note': u'3XL', u'product': u'40111', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'360.00', u'quantity': u'1'}, 
    //   {u'note': u'M', u'product': u'40115', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'360.00', u'quantity': u'1'}, 
    //   {u'note': u'L', u'product': u'40115', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'360.00', u'quantity': u'1'}, 
    //   {u'note': u'S', u'product': u'40112', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'360.00', u'quantity': u'1'}, 
    //   {u'note': u'un-stitched', u'product': u'40112', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'360.00', u'quantity': u'1'}, 
    //   {u'note': u'XS', u'product': u'40114', u'display_amount': 0.0, u'is_full_catalog': False, u'rate': u'360.00', u'quantity': u'1'}], 
    // u'add_quantity': True, u'reseller_order': False, u'finalize': False, u'add_size': True}
    // console.log("[onAddToCartPress] params", params)
    // this.props.dispatch(addToCartAction(params))
  }

  onCheckBoxPress = (index, subIndex) => {
    // console.log("[SizedMultiSelection:onCheckBoxPress]", {index, subIndex})
    const selected = _.cloneDeep(this.state.selected)
    if(!selected[index]) {
      selected[index] = []
    } 
    const foundIndex = selected[index].findIndex(i => i === subIndex)
    if(foundIndex !== -1) {
      selected[index].splice(foundIndex, 1)
    } else {
      selected[index] = [...selected[index], subIndex];
    }
    // console.log("updating selected", selected)
    this.setState({selected})
  }

  keyExtractor = (item, index) => {
    return item.id.toString()
  }

  renderItem = ({item, index}) => {
    return (
      <SizedMultiSelectionItem 
      data={item} 
      selected={this.state.selected[index]}
      onCheckBoxPress={this.onCheckBoxPress}
      index={index}
      />
    )
  }

  divider = () => {
    return <View style={{height: EStyleSheet.hairlineWidth, width: '100%', backgroundColor: colorresource.divider, marginBottom: 10}}/>
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: []
    }
  }

  componentDidMount() {
    waitTillCartDetailsIsFetched().then(() => {
      console.log("DETAILS FETCHED")
    })
  }

  render() {
    return (
      <Container>
        <GenericHeader
        title={'Please choose size of products'}
        leftConfig={{
          icon: 'close',
          onPress: goBack,
          visible: true,
          testId: {},
        }}
        />
        <Content contentContainerStyle={{}} enableResetScrollToCoords={false}>
          <FlatList
          extraData={[this.state.selected]}
          data={this.getData()}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.divider}
          />
        </Content>
        <Footer style={{}}>
          <FooterTab style={{}}>
            <Button style={{backgroundColor: colorresource.orange,}} onPress={this.onAddToCartPress}>
              <Text style={{fontSize: 15, color: 'white'}}>Add To Cart</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

export default connect()(SizedMultiSelection);
