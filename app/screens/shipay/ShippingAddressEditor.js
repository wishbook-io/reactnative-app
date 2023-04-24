import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button, Picker } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Inputtext } from '../../components/Inputtextbutton';
import { colorresource } from '../../resources/colorresource';
import FloatingTextInput from 'app/components/Inputtextbutton/FloatingTextInput';
import { Button as PButton } from 'react-native-paper'

import styles from './styles';

import {fetchCities} from './serverHelper';

const Item = Picker.Item;
/*
TODO:
this editor is used not only to edit existing address items, 
but also to add new ones. therefore, this component needs to be 
modified so as to fit in both the scenarios

changes required: 
1. Text: edit address -> add new address
2. Button Text:
  a. Update -> Save
  b. Discard -> Cancel

*/
class ShippingAddressEditor extends Component {
  
  static defaultProps = {
    index: 0,
    data: {
      name: {
        text: '',
        error: null,
      },
      phone: {
        text: '',
        error: null,
      },
      address: {
        text: '',
        error: null,
      },
      pincode: {
        text: '',
        error: null,
      },
      state: {
        id: 0,
        name: '-',
      },
      city: {
        id: 0,
        name: '-',
      },
      stateList: [],
      cities: [],

    },
  }

  onCitiesFetched = (response) => {
    this.setState({cities: response})
    // no need to inform parent of the newly selected city here
    // because onCityChange will get triggered and will do just that
  }

  onEditorChange = (update) => {
    this.props.onEditorChange({index: this.props.index, update})
  }

  onNameChange = (text) => {
    this.onEditorChange({name: {text}})
  }

  onPhoneChange = (text) => {
    this.onEditorChange({phone: {text}})
  }

  onAddressChange = (text) => {
    this.onEditorChange({address: {text}})
  }

  onStateChange = (stateId, index) => {
    // console.log("[onStateChange] state, index", state, index)
    // const stateId = this.props.responseStates[index].id;
    const stateObj = this.props.stateList[index];
    this.onEditorChange({state: stateObj})
    // fetchCities(stateId, this.onCitiesFetched)
  }

  onCityChange = (city, index) => {
    this.onEditorChange({city: this.props.data.cities[index]})
  }

  onPincodeChange = (text) => {
    this.onEditorChange({pincode: {text}})
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedState: 'Gujarat',
      selectedCity: 'Surat',
      cities: [
        {
          id: 0,
          city_name: '-',
        }
      ]
    }
  }

  render() {
    return (
      <View style={{borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingBottom: 20}}>
        <Text style={{color:colorresource.liteblue}}>Edit address</Text>
        <View>
          <View>

            <FloatingTextInput
            label={'Enter Name'}
            defaultValue={this.props.data.name.text}
            onChangeText={this.onNameChange}
            error={this.props.data.name.error}
            />

            <FloatingTextInput
            label={'Enter Mobile number'}
            defaultValue={this.props.data.phone.text}
            onChangeText={this.onPhoneChange}
            error={this.props.data.phone.error}
            textInputProps={{
              keyboardType: 'number-pad',
              maxLength: 10,
            }}
            />

            <FloatingTextInput
            label={'Enter address lines'}
            defaultValue={this.props.data.address.text}
            error={this.props.data.address.error}
            onChangeText={this.onAddressChange}
            textInputProps={{multiline: true}}
            />

          </View>
          
          <View style={{flexDirection:'row', marginTop: 15}}>
            <View style={{flex:1}}>
              <Text style={{color:colorresource.liteblue}}>Select state</Text>

            <Picker
            mode="dropdown"
            selectedValue={this.props.data.state.id}
            style={styles.Mycatalogtab}
            onValueChange={this.onStateChange}>
              {
                this.props.stateList.map((item, key) => {
                return (<Item label={item.state_name} value={item.id} key={item.id}/>);
                })
              }
            </Picker>



            </View>
            <View style={{flex:1}}>
              <Text style={{color:colorresource.liteblue}}>Select city</Text>
              <Picker
              mode="dropdown"
              selectedValue={this.props.data.city.id}
              style={styles.Mycatalogtab}
              onValueChange={this.onCityChange}>
                {this.props.data.cities.map((item, index) => <Item label={item.city_name} value={item.id} key={item.id}/>)}
              </Picker>
            </View>
          </View>
          
          <View>
            <FloatingTextInput
            label={'Enter Delivery Pincode'}
            defaultValue={this.props.data.pincode.text}
            onChangeText={this.onPincodeChange}
            error={this.props.data.pincode.error}
            textInputProps={{
              keyboardType: 'number-pad',
              maxLength: 6,
            }}
            />
          </View>
        </View>
        <View style={{alignItems:'center'}}>
          <View style={{ flexDirection:'row', marginTop: 15}}>
            <PButton
            mode={'contained'}
            color={colorresource.liteblue}
            onPress={this.props.successButton.onPressCallback}
            >
              {this.props.successButton.text}
            </PButton>
            <PButton
            mode={'outlined'}
            color={colorresource.sharpred}
            onPress={this.props.failureButton.onPressCallback}
            style={{borderColor: colorresource.sharpred, marginLeft: 10}}
            >
              {this.props.failureButton.text}
            </PButton>
            
          </View>
        </View>
      
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    responseStates: state.stateR.states,
    responseCities: state.stateR.response_cities,
  })
}

export default connect(mapStateToProps)(ShippingAddressEditor);