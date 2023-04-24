import React, { Component } from 'react'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Text, Header, Left, Body, Title, Icon, Container, Content, Footer, FooterTab, Button } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet'
import _ from 'lodash'

import { colorresource } from 'app/resources/colorresource'
import { fontresource } from 'app/resources/fontresource'

import { requestShowLoaderAction } from 'app/actions/loader-actions'
import { goBack } from 'app/actions/navigation-actions'

import { TestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'AddToCart';
const inputTestId = TestIdGenerator(screenName, '', 'Input');
const buttonTestId = TestIdGenerator(screenName,'','Button');

const SIZE_TYPES = {
  "S": "Small",
  "M": "Medium",
  "L": "Large",
  "XL": "Extra Large",
  "XS": "Extra Small",
  "2XL": "Double Extra Large",
  "3XL": "Triple Extra Large",
}

class SizedSelection extends Component {

  goBack = () => {
    goBack();
  }

  getUpdateCallback = () => {
    const callback = this.props.navigation.getParam('callback', () => {})
    return callback;
  }

  onDonePress = () => {
    if(this.state.totalQuantity === 0) {
      return;
    }
    // this.props.dispatch(requestShowLoaderAction(screenName))
    this.goBack()
    const callback = this.getUpdateCallback()
    callback(this.state.sizeItems, true);
  }

  getUpdatedSizeItems = (index, update) => {
    let updatedSizeItems = [...this.state.sizeItems];
    const sizeItem = {...updatedSizeItems[index], ...update}
    updatedSizeItems[index] = sizeItem;
    return updatedSizeItems;
  }

  onMinusPress = (index) => {
    const currentQuantity = this.state.sizeItems[index].quantity;
    if(currentQuantity === 0) {
      return;
    }
    const updatedSizeItems = this.getUpdatedSizeItems(index, {quantity: currentQuantity - 1})
    // console.log("[onMinusPress] updatedSizeItems: ", updatedSizeItems);
    this.setState({sizeItems: updatedSizeItems})
  }

  onPlusPress = (index) => {
    const updatedSizeItems = this.getUpdatedSizeItems(index, {quantity: this.state.sizeItems[index].quantity + 1})
    this.setState({sizeItems: updatedSizeItems})
  }

  getStateFromSize = (size) => {
    let sizeLabel = SIZE_TYPES[size.toUpperCase()];
    if(size.toUpperCase() === 'FREE-SIZE') {
      sizeLabel = 'Free size';
    } else {
      sizeLabel = `${size} (${sizeLabel? sizeLabel : size})`;
    }
    const state = {
      quantity: 0,
      size: sizeLabel,
      tag: size,
    }
    return state;
  }

  getStateFromProductDetails = (productDetails) => {
    const sizes = productDetails.available_sizes.split(',')
    const designs = productDetails.total_products;
    const range = productDetails.price_range;
    const state = {
      sizeItems: sizes.map(this.getStateFromSize),
      designs: parseInt(designs),
      range,
    }
    return state;
  }

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    const productDetails = this.props.navigation.getParam('data')
    this.productDetails = productDetails
    const state = this.getStateFromProductDetails(productDetails)
    this.setState(state);
  }

  render() {
    if(!this.state.sizeItems) {
      return <ActivityIndicator color={colorresource.liteblue} large/>
    }
    const totalQuantity = this.state.sizeItems.reduce((acc, item) => acc+item.quantity, 0)
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Header style={styles.headerParent}>
          <Left style={{flex: 0.3}}>
            <TouchableOpacity style={{marginRight: 0, }} onPress={this.goBack}>
              <Icon style={{color: colorresource.liteblue, }} name="close" type="MaterialCommunityIcons"/>
            </TouchableOpacity>
          </Left>
          {/* <Body style={{borderWidth: 1, borderColor: 'purple'}}> */}
          <View style={{marginLeft: 10}}>
            <Text style={styles.headerTitle}>{`Select size & quantity (${totalQuantity} sets)`}</Text>
            <Text style={styles.headerSubTitle}>{`1 set = ${this.state.designs} Pcs., ₹ ${this.state.range}/Pc.`}</Text>
          </View>
          {/* </Body> */}
        </Header>
        <Content>
        {this.state.sizeItems.map((item, index) => 
          <View key={index} style={styles.itemContainer}>
          <View style={styles.itemParent}>
            <View style={{flex: 3/10, paddingRight: 5,}}>
              <Text multiline={true} style={{fontWeight: 'bold', fontSize: 14, color: colorresource.liteblack}}>{item.size}</Text>
            </View>
            <View style={{flex: 7/10, alignItems: 'flex-end'}}>
            <View style={[styles.itemRightParent]}>
              <View>
                <Text style={{marginRight: 8, fontFamily: fontresource.medium, fontSize: 15, color: colorresource.gray}}>No. of sets</Text>
              </View>
              <View>
                <CartQuantityUpdate
                index={index}
                onPlusPress={this.onPlusPress}
                onMinusPress={this.onMinusPress}
                count={item.quantity}
                />
              </View>
            </View>
            </View>
          </View>
          <Text style={{textAlign: 'right', marginRight: 35, fontSize:12, color: colorresource.gray}}>{`${item.quantity*this.state.designs} Pcs.`}</Text>
          </View>
        )}
        </Content>
        <Footer style={{/*borderWidth: 1, borderColor: 'black'*/}}>
          <FooterTab style={{}}>
            <Button disabled={totalQuantity === 0} full style={{backgroundColor: totalQuantity === 0? undefined : colorresource.liteblue}} onPress={this.onDonePress} {...buttonTestId("Submit")}>
              <Text style={{marginTop: 5, color: 'white', fontSize: 17, lineHeight: 17}}>Done</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

export default SizedSelection

const CartQuantityUpdate = ({onMinusPress, onPlusPress, count, index}) => {
  const styleButton = {
    alignItems:'center',
    justifyContent:'center',
    width:32,
    height:32,
    borderRadius:32,
    marginLeft: 5,
  }
  const styleText = {
    fontSize: 20,
    paddingTop: 0,
    paddingBottom: 0,
  }
  return (
    <View style={{
      flexDirection: 'row',
      alignSelf: 'flex-end',
      //borderWidth: 1, 
      //borderColor: 'red'
    }}>
      <TouchableOpacity onPress={() => onMinusPress(index)}>
        <View style={[styleButton, { borderWidth:1.5, borderColor: colorresource.liteblack,}]}>
          <Text style={[styleText, {color:'black'}]}>-</Text>
        </View>
      </TouchableOpacity>

      <View style={[styleButton, {backgroundColor:colorresource.litegray,}]}>
        <Text style={[styleText, {color:'black', fontSize: 12}]}>{count}</Text>
      </View>

      <TouchableOpacity onPress={() => onPlusPress(index)}>
        <View style={[styleButton, {backgroundColor:colorresource.liteblue,}]}>
          <Text style={[styleText, {color:'white', paddingBottom: 2}]}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}


const styles = EStyleSheet.create({
  headerParent: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingLeft: 0,
    // paddingRight: 0,
    // marginLeft: 0,
    // marginRight: 0,
    justifyContent: 'flex-start',
    // flex: 1,
    // elevation: 3, 
    // shadowColor: 'black', 
    // shadowOffset: {width: 0, height: 2}, 
    // shadowRadius: 1.2, 
    // shadowOpacity: 0.2,
  },
  headerTitle: {
    fontSize: 16,
    color: colorresource.liteblue,
  },
  headerSubTitle: {
    fontSize: 12,
    color: colorresource.gray,
  },
  itemContainer: {
    borderBottomWidth: 0.5, 
    borderBottomColor: colorresource.litebrown, 
    padding: 16, 
    paddingBottom: 0,
  },
  itemParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemRightParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})