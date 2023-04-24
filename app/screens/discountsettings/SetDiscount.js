import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { 
  Text,
  Container,
  Content,
  Footer,
  FooterTab,
  Button
} from 'native-base';
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'

import GenericHeader from 'app/components/Header/GenericHeader';
import TextInputKeyed from 'app/components/MaterialTextInput/TextInputKeyed'
import Chip from 'app/components/Chip/Chip'
import AddChip from 'app/components/Chip/AddChip'
import { colorresource } from 'app/resources/colorresource'

import { getDiscountAction, updateDiscountAction } from 'app/actions/discount-actions';
import { goToDiscountBrandSelection, goBack } from 'app/actions/navigation-actions';
import { showToastAction } from 'app/actions/toast-actions';

const FORM_FIELD_KEYS = {
  FULL_CATALOG_DISCOUNT: 'FullCatalogDiscount',
  SINGLE_PIECE_DISCOUNT: 'SinglePieceDiscount',
}

class MyDiscount extends Component {

  showToast = (message) => {
    this.props.dispatch(showToastAction(message));
  }

  onSavePress = () => {
    Keyboard.dismiss();
    const brands = this.state.brands
    if(brands.length === 0) {
      this.showToast('Please select atleast one brand')
      return;
    }

    const fullDiscountText = this.state[FORM_FIELD_KEYS.FULL_CATALOG_DISCOUNT].text
    if(fullDiscountText === '') {
      this.setState({[FORM_FIELD_KEYS.FULL_CATALOG_DISCOUNT]: {error: "Discount can't be empty"}})
      return;
    }

    const fullDiscount = Number.parseFloat(fullDiscountText)
    if(Number.isNaN(fullDiscount)) {
      this.setState({[FORM_FIELD_KEYS.FULL_CATALOG_DISCOUNT]: {text: fullDiscountText, error: "Please enter a valid discount"}})
      return;
    }

    if(fullDiscount < 5) {
      this.setState({[FORM_FIELD_KEYS.FULL_CATALOG_DISCOUNT]: {text: fullDiscountText, error: "Please enter discount more than or equal to 5%"}})
      return;
    }

    if(fullDiscount > 100) {
      this.setState({[FORM_FIELD_KEYS.FULL_CATALOG_DISCOUNT]: {text: fullDiscountText, error: "Discount can't be more than 100%"}})
      return;
    }

    const editId = this.getEditId()
    const originalFullDiscount = Number.parseFloat(this.props.responseDiscount.cash_discount)
    if(editId && fullDiscount < originalFullDiscount) {
      this.setState({[FORM_FIELD_KEYS.FULL_CATALOG_DISCOUNT]: { text: fullDiscountText, error: "To reduce the discount, please talk to your account manager."}})
      return;
    }

    const singleDiscountText = this.state[FORM_FIELD_KEYS.SINGLE_PIECE_DISCOUNT].text;
    const singleDiscount = Number.parseFloat(singleDiscountText)
    const originalSingleDiscount = Number.parseFloat(this.props.responseDiscount.single_pcs_discount)
    if(editId && (Number.isNaN(singleDiscount) || singleDiscount < originalSingleDiscount)) {
      this.setState({[FORM_FIELD_KEYS.SINGLE_PIECE_DISCOUNT]: { text: singleDiscountText, error: "To reduce the discount, please talk to your account manager."}})
      return;
    }

    const params = {
      brands: this.state.brands.map(b => b.id),
      cash_discount: fullDiscount + '',
      single_pcs_discount: (singleDiscount || 0),
      all_brands: false,
    }
    this.props.dispatch(updateDiscountAction(params, editId, true));
  }

  onBrandsChange = (brands) => {
    this.setState({brands})
  }

  onAddMorePress = () => {
    goToDiscountBrandSelection({brands: this.state.brands, onBrandsChange: this.onBrandsChange})
  }
  
  onDeleteBrand = (index) => {
    console.log("[onDeleteBrand]", this.state.brands[index])
    const brands = [...this.state.brands]
    brands.splice(index, 1)
    this.setState({brands})
  }

  onTextInputChange = ({key, text}) => {
    text = text.replace(/[^0-9.]/g, '')
    if(text !== this.state[key].text) {
      this.setState({[key]: {text}})
    }
  }

  getEditId = () => {
    const id = this.props.navigation.getParam('id')
    return id;
  }

  renderBrandChip = ({id, name}, index) => {
    return (
      <Chip
        key={name} 
        text={name}
        onCrossPress={this.onDeleteBrand}
        index={index}
      />
    )
  }

  initializeState = (responseDiscount) => {
    if(!responseDiscount) {
      return;
    }
    const brands = responseDiscount.brands
    this.setState({
      brands,
      [FORM_FIELD_KEYS.FULL_CATALOG_DISCOUNT]: { text: responseDiscount.cash_discount },
      [FORM_FIELD_KEYS.SINGLE_PIECE_DISCOUNT]: { text: responseDiscount.single_pcs_discount },
    })
  }

  initialize = () => {
    const id = this.getEditId()
    if(id) {
      this.props.dispatch(getDiscountAction(id))
    } 
    // else {
    //   this.initializeState()
    // }
  }

  constructor(props) {
    super(props)
    this.state = {
      brands: [],
      [FORM_FIELD_KEYS.FULL_CATALOG_DISCOUNT]: {text: ''},
      [FORM_FIELD_KEYS.SINGLE_PIECE_DISCOUNT]: {text: ''},
    }
  }

  componentDidMount() {
    this.initialize()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.responseDiscount !== this.props.responseDiscount) {
      this.initializeState(this.props.responseDiscount)
    }

    if(prevProps.responseUpdateDiscount !== this.props.responseUpdateDiscount) {
      goBack()
    }
  }

  render() {
    return (
      <Container>
        <GenericHeader
          title={'Set Discount'}
        />
        <Content contentContainerStyle={{flexGrow: 1, backgroundColor: colorresource.materialbg}}>

          <View style={styles.section}>
            <Text style={styles.heading}>{'Add brands'}</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {this.state.brands.map(this.renderBrandChip)}
              <AddChip text={'+ Add More'} onPress={this.onAddMorePress}/>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>{'Discount'}</Text>
            <TextInputKeyed
              label={'Enter Full Catalog Discount(%)'}
              error={this.state[FORM_FIELD_KEYS.FULL_CATALOG_DISCOUNT].error}
              inputKey={FORM_FIELD_KEYS.FULL_CATALOG_DISCOUNT}
              onChange={this.onTextInputChange}
              value={this.state[FORM_FIELD_KEYS.FULL_CATALOG_DISCOUNT].text}
              textInputProps={{
                keyboardType: 'numeric',
                maxLength: 5,
              }}
            />

            <TextInputKeyed
              label={'Enter Single Piece Discount(%)'}
              error={this.state[FORM_FIELD_KEYS.SINGLE_PIECE_DISCOUNT].error}
              inputKey={FORM_FIELD_KEYS.SINGLE_PIECE_DISCOUNT}
              onChange={this.onTextInputChange}
              value={this.state[FORM_FIELD_KEYS.SINGLE_PIECE_DISCOUNT].text}
              textInputProps={{
                keyboardType: 'numeric',
                maxLength: 5,
              }}
            />
          </View>


        </Content>
        <Footer>
          <FooterTab>
            <Button style={{backgroundColor: colorresource.liteblue}} onPress={this.onSavePress}>
              <Text style={{color: 'white', fontSize: 16}}>SAVE</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    responseDiscount: state.discountR.responseGetDiscount,
    responseUpdateDiscount: state.discountR.responseUpdateDiscount,
  })
}

export default connect(mapStateToProps)(MyDiscount);

const styles = EStyleSheet.create({
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 20,
  },
  heading: {
    color: colorresource.liteblue,
    fontSize: 16,
  }
})