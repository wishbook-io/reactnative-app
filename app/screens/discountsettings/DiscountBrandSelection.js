import React, { Component } from 'react';
import { View, FlatList, Platform, TextInput } from 'react-native';
import { 
  Text,
  Container,
  Content,
  Header,
  Icon,
  Item,
  Button,
  Footer,
  FooterTab,
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux'
import _ from 'lodash';

import GenericHeader from 'app/components/Header/GenericHeader';
import SelectionHeader from './SelectionHeader';
import SelectionItem from './SelectionItem';
import CheckBox from 'app/components/CheckBox/CheckBox';
import { colorresource } from 'app/resources/colorresource'

import { listUsedDiscountAction } from 'app/actions/discount-actions';
import { showToastAction } from 'app/actions/toast-actions';
import { getBrandsIOwnAction, getBrandsISellAction } from 'app/actions/brand-actions'
import { goToSetDiscount, goBack } from 'app/actions/navigation-actions';

class DiscountBrandSelection extends Component {

  isAllBrandsSelected = () => {
    const brandsISellSelected = this.isBrandsISellSelected()
    return brandsISellSelected && this.isBrandsIOwnSelected();
  }

  isListSelected = (brandList) => {

    if(brandList.length === 0) {
      return false;
    }

    const selectable = this.getSelectableFromList(brandList)
    const selected = (selectable.length === 0)
    return selected;
    
    // let i=0;
    // for(; i<brandList.length; ++i) {
    //   const name = brandList[i].name;
    //   if(!this.state.alreadyApplied[name] && !this.state.selectedBrands[name]) {
    //     return false;
    //   }
    // }
    // return !!i // don't tick if list empty
  }

  isBrandsIOwnSelected = () => {
    const brandsIOwn = this.props.responseBrandsIOwn
    const selected = this.isListSelected(brandsIOwn);
    return selected;
  }

  isBrandsISellSelected = () => {
    const brandsISell = this.getBrandsISell()
    const selected = this.isListSelected(brandsISell)
    return selected
  }

  onAllBrandsSelect = () => {
    const selected = this.isAllBrandsSelected()
    if(selected) {
      this.setState({selectedBrands: []})
    } else {
      const selectableBrandsIOwn = this.getSelectableFromList(this.props.responseBrandsIOwn)
      const selectableBrandsISell = this.getSelectableFromList(this.getBrandsISell())
      const selectedBrands = {...this.state.selectedBrands}
      selectableBrandsIOwn.forEach(b => selectedBrands[b.name] = b.id)
      selectableBrandsISell.forEach(b => selectedBrands[b.name] = b.id)
      this.setState({selectedBrands})
    }
  }

  getSelectableFromList = (brandList) => {
    const selectableBrands = brandList
      .filter(b => (
        !this.state.alreadyApplied[b.name]
        && !this.state.selectedBrands[b.name]
      ))
    return selectableBrands;  
  }

  onListSelect = (brandList) => {
    const remainingToSelect = this.getSelectableFromList(brandList)
    const selectedBrands = {...this.state.selectedBrands}
    if(remainingToSelect.length === 0) {
      brandList.forEach(b => delete selectedBrands[b.name])
    } else {
      remainingToSelect.forEach(b => selectedBrands[b.name] = b.id)
    }
    this.setState({selectedBrands})
  }

  onBrandsIOwnSelect = () => {
    this.onListSelect(this.props.responseBrandsIOwn)
  }


  onBrandsISellSelect = () => {
    const brandsISell = this.getBrandsISell()
    this.onListSelect(brandsISell);
  }

  getBrandsISell = () => {
    const brandsISell = _.get(this.props.responseBrandsISell, '[0].brand', [])
    return brandsISell;
  }

  getAlreadyAppliedDiscount = (alreadySelected) => {
    let allBrands;
    const alreadyApplied = this.props.responseListDiscount.reduce((acc, cur) => {
      if(cur.all_brands) {
        allBrands = true;
        return acc;
      }
      const name = _.get(cur, 'brands[0].name', '')
      if(alreadySelected[name]) {
        return acc;
      }
      acc[name] = {
        single: cur.single_pcs_discount,
        full: cur.cash_discount,
      }
      return acc;
    }, {})

    return alreadyApplied;
  }

  getCurrentlySelectedBrands = () => {
    const currentlySelected = Object.entries(this.state.selectedBrands)
      .map(([k, v]) => ({name: k, id: v}))
    return currentlySelected
  }

  getBrandsIfChanged = (currentlySelected) => {
    const alreadySelected = this.getAlreadySelectedBrands(); 
    // this is an object

    if(currentlySelected.length !== Object.keys(alreadySelected).length) {
      return currentlySelected;
    }

    // same size
    for(let {name, id} of currentlySelected) {
      if(!alreadySelected[name]) {
        return currentlySelected
      }
    }
    return false;
  }

  onSavePress = () => {
    const currentlySelected = this.getCurrentlySelectedBrands()
    if(currentlySelected.length === 0) {
      this.props.dispatch(showToastAction('Please select atleast one brand'))
      return;
    }
    const changedBrands = this.getBrandsIfChanged(currentlySelected)
    // console.log("[onSavePress]", { changedBrands});
    if(changedBrands) {
      const callback = this.props.navigation.getParam('onBrandsChange', () => {});
      callback(changedBrands);
    }
    goBack();
  }

  onSelectionItemPress = ({name, id}) => {
    // console.log("[onSelectionItemPress]", {name, id})
    const selectedBrands = {...this.state.selectedBrands}
    const current = selectedBrands[name]
    if(current) {
      // time to delete
      delete selectedBrands[name]
    } else {
      selectedBrands[name] = id
    }
    // console.log("[onSelectionItemPress]", {selectedBrands})
    this.setState({
      selectedBrands,
    })
  }

  getAlreadySelectedBrands = () => {
    const brands = this.props.navigation.getParam('brands', [])
    const selectedBrands = brands.reduce((acc, cur) => (acc[cur.name] = cur.id, acc), {});
    // console.log("[getAlreadySelectedBrands]", {brands, selectedBrands})
    return selectedBrands;
  }

  onSearchTextChange = (text) => {
    this.setState({searchText: text})
  }

  shouldShowBrand = (brand) => {
    const searchText = this.state.searchText
    if(!searchText) {
      return true;
    }
    const show = brand.toLowerCase().includes(searchText.toLowerCase())
    return show
  }

  renderSelectionItem = (brand, index) => {
    // console.log("[renderBrandsIOwn]", { brand, index })
    const name = brand.name
    if(this.shouldShowBrand(name)) {
      return(
        <SelectionItem
          key={name}
          text={name}
          selected={this.state.selectedBrands[name]}
          onPress={this.onSelectionItemPress}
          alreadyApplied={this.state.alreadyApplied[name]}
          id={brand.id}
        />
      )
    } else {
      return null;
    }
  }

  initialize = () => {
    this.props.dispatch(getBrandsIOwnAction())
    this.props.dispatch(getBrandsISellAction())
  }

  constructor(props) {
    super(props)
    const selectedBrands = this.getAlreadySelectedBrands();
    // selectedBrands holds the running value of selected brands as an object

    const alreadyApplied = this.getAlreadyAppliedDiscount(selectedBrands);
    // this stores the discount rules already applied - as an object {single: 5%, full: 2%} percentage

    this.state = {
      brandsIOwn: [],
      brandsISell: [],
      searchText: '',
      selectedBrands,
      alreadyApplied,
    }
  }

  componentDidMount() {
    this.initialize()
  }

  render() {
    const brandsISell = this.getBrandsISell()
    return (
      <Container style={{backgroundColor: 'white'}}>
        <Header searchBar rounded style={{backgroundColor:'white'}}>
          <Item style={{marginLeft: 0}}>
            <Button transparent style={{alignSelf: 'center'}} onPress={goBack} >
              <Icon name="arrow-back" style={{color: colorresource.liteblue}}/>
            </Button>
            <TextInput 
            style={styles.searchInput} 
            placeholder='Search' 
            onChangeText={this.onSearchTextChange}
            // onSubmitEditing={() => this.onSubmitEditing()}
            returnKeyType={'search'}
            // autoFocus={true}
            autoCorrect={false}
            placeholderTextColor={Platform.OS === 'ios'? undefined : '#c9c9c9'}
            selectionColor={colorresource.liteblue}
            />
          </Item>
        </Header>
        <Content contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
          <SelectionHeader 
            text={'All Brands'} 
            onPress={this.onAllBrandsSelect}
            selected={this.isAllBrandsSelected()}
          />
          <SelectionHeader 
            text={'Brands I Own'} 
            onPress={this.onBrandsIOwnSelect}
            selected={this.isBrandsIOwnSelected()}  
            />
          {this.props.responseBrandsIOwn.map(this.renderSelectionItem)}
          <SelectionHeader 
            text={'Brands I Sell'} 
            onPress={this.onBrandsISellSelect}
            selected={this.isBrandsISellSelected()}
            />
          {brandsISell.map(this.renderSelectionItem)}
        </Content>
        <Footer>
          <FooterTab>
            <Button style={{backgroundColor: colorresource.liteblue}} onPress={this.onSavePress}>
              <Text style={{fontSize: 16, color: 'white'}}>SAVE</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    // responseListUsedDiscount: state.discountR.responseListUsedDiscount,
    responseBrandsIOwn: state.brandsR.responseBrandsIOwn,
    responseBrandsISell: state.brandsR.responseBrandsISell,
    responseListDiscount: state.discountR.responseListDiscount,
  })
}

export default connect(mapStateToProps)(DiscountBrandSelection);

const styles = EStyleSheet.create({
  header: {
    backgroundColor: colorresource.liteblue,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18, 
    paddingTop: 0, 
    paddingBottom: 0,
    // borderWidth: 0.5,
    // borderColor: 'yellow',
  },
})