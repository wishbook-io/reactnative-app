import React, { Component } from 'react';
import { View, Switch, ActivityIndicator, Keyboard } from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Text,
  Button,
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import _ from 'lodash';

import { ResellerAmountSection } from './ShipayResellerSection';
import GenericHeader from 'app/components/Header/GenericHeader';
import CustomTextInput from 'app/screens/products/add/CustomTextInput';

import { colorresource } from 'app/resources/colorresource';
import consts from 'app/utils/const';

import { goBack } from 'app/actions/navigation-actions';
import { getCatalogWiseCartDetailsAction } from 'app/actions/cart-actions';
import { showToastAction } from 'app/actions/toast-actions'
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';
import * as serverHelper from './serverHelper';
import { waitTillCartDetailsIsFetched } from 'app/utils/debugHelper'

const screenName = "ChangeResaleAmount";

class ChangeResaleAmount extends Component {

  calculatePriceForCatalog = (index) => {
    const item = this.props.responseCart.catalogs[index]
    const amount = parseInt(item.catalog_total_amount) + parseInt(item.catalog_shipping_charges)
    return amount;
  }

  calculateTotalResaleAmount = () => {
    const amount = this.state.resaleAmounts.reduce((total, curr) => total + (curr.text? curr.text : 0), 0)
    return amount
  }

  validate = () => {
    // return true if validated, else false
    let validateResult = [...this.state.resaleAmounts]
    for(let i=0; i<validateResult.length; i++) {
      const resaleAmount = Number.parseInt(validateResult[i].text)
      
      if(Number.isNaN(resaleAmount)) {
        validateResult[i].error = "Please enter resale amount"
        continue;
      }
      const actualAmount = this.calculatePriceForCatalog(i)
      if(resaleAmount <= actualAmount) {
        validateResult[i].error = "Resell value should be higher than its order value."
      }
    }

    const firstErrored = validateResult.find(i => i.error)
    if(firstErrored) {
      this.setState({resaleAmounts: validateResult})
      this.props.dispatch(showToastAction(firstErrored.error))
      return false;
    }

    // ---- commented, as we are already checking item wise ----
    // const totalResaleAmount = this.calculateTotalResaleAmount()
    // const totalCatalogAmount = Number.parseInt(this.props.responseCart.total_amount)
    // if(totalResaleAmount > totalCatalogAmount) {
    //   showToastAction("")
    // }

    return true;
  }

  createCartItem = (item, displayAmount) => {
    const quantity = Number.parseInt(item.quantity)
    const noOfPcs = Number.parseInt(item.no_of_pcs)
    return ({
      rate: item.rate,
      quantity: noOfPcs? quantity * noOfPcs : quantity,
      product: item.product,
      is_full_catalog: item.is_full_catalog,
      note: item.note,
      display_amount: displayAmount,
    })
  }

  prepareParams = () => {
    let result = []
    this.props.responseCart.catalogs.forEach((catalog, index) => {
      
      let samePriceCase = true;
      const productId = catalog.products[0].product
      _.forEach(catalog.products, (p) => {
        if(p.product !== productId) {
          samePriceCase = false;
          return false; // come out of loop
        }
      })

      if(samePriceCase) {
        result.push(this.createCartItem(catalog.products[0], this.state.resaleAmounts[index].text))
        return; // finish current iteration
      }

      const perProductDisplayAmount = _.round(this.state.resaleAmounts[index].text / catalog.products.length, 2)
      let subResult = catalog.products.map((item, index) => this.createCartItem(item, perProductDisplayAmount))
      result = [...result, ...subResult]
    })

    const params = {
      items: result,
      reseller_order: true,
    }
    return params
  }

  onDisplayAmountPatched = ({response, error}) => {
    this.props.dispatch(requestHideLoaderAction(screenName))
    
    if(error) {
      return;
    }
    // const keys = Object.keys(response)
    // console.log(keys)
    goBack()
  }

  onDonePress = () => {
    Keyboard.dismiss()
    const validated = this.validate()
    if(!validated) {
      return;
    }
    const params = this.prepareParams()
    this.props.dispatch(requestShowLoaderAction(screenName))
    serverHelper.patchDisplayAmount(params).then(this.onDisplayAmountPatched)
  }

  onResaleAmountChange = (text, index) => {
    // TODO: avoid re rendering entire items by NOT storing resale amounts in an array
    let updatedResaleAmounts = [...this.state.resaleAmounts]
    let amount = Number.parseInt(text)
    amount = Number.isNaN(amount)? null : amount
    updatedResaleAmounts[index] = {text: amount, error: null}
    // console.log("[onResaleAmountChange]", updatedResaleAmounts);
    this.setState({resaleAmounts: updatedResaleAmounts}) 
  }

  onResellerOrderSwitchChange = (value) => {
    this.setState({resellerOrderSwitch: value})
  }

  getInitialState = () => {
    return ({
      resaleAmounts: this.props.responseCart.catalogs.map((catalog) => {
        let amount = Number.parseInt(catalog.catalog_display_amount)
        amount = amount? amount : null
        return {text: amount, error: null}
      })
    })
  }

  onCartUpdated = () => {
    const initialState = this.getInitialState();
    this.setState({...initialState, loading: false}, this.validate)
  }
  
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      resaleAmounts: [],
    }
  }

  componentDidMount() {
    this.props.dispatch(getCatalogWiseCartDetailsAction())
  }

  componentDidUpdate(prevProps) {
    if(prevProps.responseCart !== this.props.responseCart) {
      this.onCartUpdated();
    }
  }

  render() {
    if(this.state.loading) {
      return <ActivityIndicator
        size={'large'}
        color={colorresource.liteblue}
        animating={true}
      />
    }
    return (
      <Container>
        <GenericHeader
        title={'Change Resale Amount'}
        leftConfig={{
          icon: 'close',
          onPress: goBack,
          visible: true,
          testId: {},
        }}
        />
        <Content contentContainerStyle={{padding: 16}} enableResetScrollToCoords={false}>
          <Text style={{fontSize: 14, color: colorresource.grey46}}>{true? consts.RESELLER_RESELL_AMOUNT_NOTE : consts.RESELLER_RESELL_AMOUNT_COD_NOTE}</Text>
          <ResellerAmountSection
            totalAmount={this.props.responseCart.total_amount}
            resaleAmount={this.calculateTotalResaleAmount()}
          />
          {this.props.responseCart.catalogs.map((item, i) => {
            const isFullCatalog = item.is_full_catalog
            const catalogName = isFullCatalog? item.catalog_title : item.products[0].product_sku
            const quantity = item.products[0].quantity
            const total = this.calculatePriceForCatalog(i)
            return(
              <ChangeResaleAmountCatalogItem
              key={i.toString()}
              name={catalogName}
              quantity={quantity}
              index={i}
              total={total}
              onAmountChange={this.onResaleAmountChange}
              amountText={this.state.resaleAmounts[i].text}
              amountError={this.state.resaleAmounts[i].error}
              />
            );
          })}
        </Content>
        <Footer style={{}}>
          <FooterTab style={{}}>
            <Button style={{backgroundColor: colorresource.liteblue,}} onPress={this.onDonePress}>
              <Text style={{fontSize: 14, color: 'white'}}>DONE</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    responseCart: state.cartR.responseGetCatalogWiseCartDetails,
  })
}

export default connect(mapStateToProps)(ChangeResaleAmount)



const ChangeResaleAmountCatalogItem = ({index, total, name, quantity, onAmountChange, amountText, amountError}) => {
  return (
    <View style={{marginTop: 16}}>
      <View style={{position: 'absolute', height: 25, width: 25, borderRadius: 12.5, borderWidth: 1, borderColor: colorresource.gray, justifyContent: 'center'}}>
        <Text style={{fontSize: 16, textAlign: 'center', color: colorresource.grey46}}>{index+1}</Text>
      </View>
      <View style={{marginLeft: 50}}>
        <View style={catalogItemStyles.ItemRow}>
          <Text style={{fontSize: 14, color: colorresource.liteblack}}>{name}</Text>
          <Text style={{fontSize: 14, marginLeft: 10, color: colorresource.gray}}>{`(${quantity})`}</Text>
        </View>
        <View style={catalogItemStyles.ItemRow}>
          <Text style={{fontSize: 14, color: colorresource.liteblack}}>{'Total (GST & Shipping incl.):'}</Text>
          <Text style={{fontSize: 14, marginLeft: 10, color: colorresource.gray}}>{`₹${total}`}</Text>
        </View>
        <CustomTextInput
        placeholder={'Enter Resale Amount'}
        onChange={(text) => onAmountChange(text, index)}
        value={amountText === 0 || amountText? String(amountText) : undefined}
        error={amountError}
        textInputProps={{
          keyboardType: 'numeric',
          maxLength: undefined,
        }}
        textInputStyle={{
          // marginLeft: 5,
        }}
        />
      </View>
    </View>
  );
}

const catalogItemStyles = EStyleSheet.create({
  ItemRow: {
    flexDirection: 'row',
    marginBottom: 7,
  }
})