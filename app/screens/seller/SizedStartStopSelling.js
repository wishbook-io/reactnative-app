import React, { Component, Fragment } from 'react';
import { View, FlatList, InteractionManager, ActivityIndicator } from 'react-native';
import { Container, Content, Footer, FooterTab, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet'
import _ from 'lodash';

import CheckBox from 'app/components/CheckBox/CheckBox';
import SinglePieceItem from './SinglePieceItem'
import GenericHeader from 'app/components/Header/GenericHeader';
import { colorresource } from 'app/resources/colorresource';

import { goBack } from 'app/actions/navigation-actions';
import { getCategoryEavAction } from 'app/actions/category-actions';
import { bulkUpdateStartStopAction, getMyProductDetailsAction } from 'app/actions/catalog-actions';
import { showToastAction } from 'app/actions/toast-actions'

class SizedStartStopSelling extends Component {

  onItemsSellingPress = (index) => {
    let itemsSelling = _.cloneDeep(this.state.itemsSelling);
    itemsSelling[index] = !itemsSelling[index];
    this.setState({itemsSelling})
  }

  onItemsCheckBoxPress = (index, subIndex) => {
    //console.log("[onItemsCheckBoxPress]", { index, subIndex, selected });
    let selected = _.cloneDeep(this.state.itemsSizes)
    if(!selected[index]) {
      selected[index] = []
    } 
    const foundIndex = selected[index].findIndex(i => i === subIndex)
    if(foundIndex !== -1) {
      selected[index].splice(foundIndex, 1)
    } else {
      selected[index] = [...selected[index], subIndex];
    }
    //console.log("updating selected", selected)
    this.setState({itemsSizes: selected})
  }

  itemSeparator = () => {
    return (
      <View style={{width: '100%', height: EStyleSheet.hairlineWidth, backgroundColor: colorresource.divider}}/>
    )
  }

  keyExtractor = (item, index) => {
    return item.id.toString()
  }

  renderItem = ({item, index}) => {
    return (
      <SinglePieceItem
      data={item}
      sizes={this.getSizes()}
      index={index}
      onSellingPress={this.isSized()? undefined : this.onItemsSellingPress}
      selling={this.state.itemsSelling[index]}
      onCheckBoxPress={this.onItemsCheckBoxPress}
      selectedSizes={this.state.itemsSizes[index]}
      />
    )
  }

  isStart = () => {
    return this.props.navigation.getParam("start", true);
  }

  isSized = () => {
    const sizes = this.getSizes()
    return sizes.length > 0
  }

  getSizes = () => {
    if(this.sizes) {
      return this.sizes
    }
    const sizeEav = this.getSizeEav()
    if(sizeEav.length === 0) {
      this.sizes = []
    } else {
      this.sizes = sizeEav[0] && sizeEav[0].attribute_values.map(s => s.value)
    }
    return this.sizes
  }

  getSizeEav = () => {
    const sizeEav = this.props.navigation.getParam('sizeEav')
    if(!sizeEav) {
      console.warn("[SizedStartStopSelling] Attempting to get sizes which doesn't exist")
      return;
    }
    return sizeEav;
  }

  isFull = () => {
    const full = this.props.navigation.getParam('full', true)
    return full;
  }

  getAvailableSizes = (selectedSizeIndices) => {
    if(!selectedSizeIndices) {
      return ''
    }
    const selectedSizes = selectedSizeIndices.sort((a,b) => a-b)
    const sizes = selectedSizes.map(s => this.state.sizeValues[s]).join(',')
    return sizes;
  }

  onBulkUpdateDone = () => {
    goBack()
    this.props.dispatch(showToastAction("Start/Stop updated successully"))
  }

  onUpdatePress = () => {
    let params;

    if(this.isFull()) {
      // check here if something was updated
      const originalAvailableSizes = this.props.responseMyDetails.available_sizes || ''
      const newAvailableSizes = this.getSizes().filter((size) => this.state.fullSizedSelected[size]).join(',')
      if(originalAvailableSizes === newAvailableSizes) {
        goBack()
        return;
      }
      params = {
        products: [{
          product_id: this.props.catalogDetails.id,
          available_sizes: newAvailableSizes,
          is_enable: !!newAvailableSizes,
        }]
      }
    } else {
      let changed = false;
      const products = this.props.responseMyDetails.products.map((p, i) => {
        console.log("[onUpdatePress] now iterating for", i, p.id)
        const originalAvailableSizes = p.available_sizes || ''
        const newAvailableSizes = this.getAvailableSizes(this.state.itemsSizes[i])
        console.log("[onUpdatePress] sizes: original, new", originalAvailableSizes, newAvailableSizes)
        if(originalAvailableSizes !== newAvailableSizes) {
          console.log("[onUpdatePress] size changed")
          changed = true;
        }
        const originalSelling = p.currently_selling || false
        const newSelling = this.state.itemsSelling[i] || false
        // console.log("[onUpdatePress] selling: original, new", originalSelling, newSelling)

        if(!this.isSized() && originalSelling !== newSelling) {
          // console.log("[onUpdatePress] selling changed")
          changed = true
        }
        return ({
          product_id: p.id,
          is_enable: this.isSized()? !!newAvailableSizes : newSelling,
          ...(this.isSized()? {available_sizes: newAvailableSizes} : {} ),

        })
      })
      if(!changed) {
        goBack()
        return;
      }
      params = {
        products,
      }
    }
    this.props.dispatch(bulkUpdateStartStopAction(params, this.props.catalogDetails.id))
  }

  onFullSizedCheckBoxPress = (size) => {
    const fullSizedSelected = _.cloneDeep(this.state.fullSizedSelected)
    if(fullSizedSelected[size]) {
      fullSizedSelected[size] = false
    } else {
      fullSizedSelected[size] = true
    }
    this.setState({fullSizedSelected})
  }

  onCategoryEavFetched = () => {
    const categoryEav = this.props.responseCategoryEav
    if(categoryEav.length) {
      const sizeEav = categoryEav[0]
      this.sizeMandatory = sizeEav.is_required // this will be needed in validation
      const sizeValues = sizeEav.attribute_values.map(a => a.value)
      this.setState({sizeValues})
    }
  }

  fetchEavForCategory = () => {
    const categoryId = this.props.catalogDetails.category
    this.props.dispatch(getCategoryEavAction(categoryId, 'size'))
  }

  onMyDetailsFetched = () => {
    const myDetails = this.props.responseMyDetails;
    if(this.isFull() && myDetails.available_sizes) {
      // console.log("[onMyDetailsFetched] full catalog with sizes")
      const fullSizedSelected = {}
      myDetails.available_sizes.split(',').forEach(s => fullSizedSelected[s] = true)
      // console.log("[onMyDetailsFetched]", {fullSizedSelected})
      this.setState({fullSizedSelected})
      return;
    }
    if(!this.isFull() && this.isSized()) {
      const sizes = this.getSizes()
      // console.log("[onMyDetailsFetched] single catalog with sizes", { sizes })
      const itemsSizes = myDetails.products.map(p => {
        // console.log("now iterating over ", p.id)
        if(!p.available_sizes) {
          return []
        }
        const availableSizes = p.available_sizes.split(',')
        const sellingSizes = sizes.reduce((acc, s, i) => {
          // console.log("reducer", {acc, s, i})
          // console.log("availableSizes", {availableSizes})
          const found = availableSizes.find(item => item === s)
          // console.log("found", found)
          if(found) {
            acc.push(i)
          }
          return acc
        }, [])
        return sellingSizes
      })
      this.setState({itemsSizes})
      return;
    }
    if(!this.isFull() && !this.isSized()) {
      const itemsSelling = myDetails.products.map(s => s.currently_selling)
      this.setState({itemsSelling})
    }
  }

  fetchMyDetails = () => {
    this.props.dispatch(getMyProductDetailsAction(this.props.catalogDetails.id))
  }

  initialize = () => {
    this.setState({animationDone: true})
    this.fetchMyDetails()
  }

  constructor(props) {
    super(props)
    this.state = {
      fullSizedSelected: {},
      sizeValues: this.getSizes(),
      itemsSizes: [],
      itemsSelling: [],
      animationDone: false,
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.initialize)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.responseCategoryEav !== this.props.responseCategoryEav) {
      this.onCategoryEavFetched()
    }
    if(prevProps.responseBulkUpdateStartStop !== this.props.responseBulkUpdateStartStop) {
      this.onBulkUpdateDone()
    }

    if(prevProps.responseMyDetails !== this.props.responseMyDetails) {
      this.onMyDetailsFetched()
    }

  }

  render() {
    if(!this.state.animationDone) {
      return <ActivityIndicator color={colorresource.liteblue} size={'large'}/>
    }

    // console.log("[render]", {fullSizedSelected: this.state.fullSizedSelected, sizeValues: this.state.sizeValues})
    return(
      <Container>
        <GenericHeader
        title={`${this.isStart()? 'Start' : 'Stop'} selling ${this.props.catalogDetails.title}`}
        leftConfig={{
          visible: true,
          icon: 'close',
          onPress: goBack
        }}/>
        <Content contentContainerStyle={{padding: 10}}>
        {this.isFull()?
          <Fragment>
            <Text style={{fontSize: 15, color: colorresource.grey46}}>Note: Checked sizes will be made available for sale. Unchecked sizes will be disabled</Text>
            {this.state.sizeValues.map(s => 
              <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5}} key={s}>
                <CheckBox selected={this.state.fullSizedSelected[s]} onPress={() => this.onFullSizedCheckBoxPress(s)}/>
                <Text>{s}</Text>
              </View>
            )}
          </Fragment> :
          <FlatList
            contentContainerStyle={{paddingBottom: 16}}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            data={this.props.catalogDetails.products}
            extraData={[this.state.itemsSizes]}
            ItemSeparatorComponent={this.itemSeparator}
            />
           }
        </Content>
        <Footer>
          <FooterTab>
            <Button style={{backgroundColor: colorresource.liteblue}} onPress={this.onUpdatePress}>
              <Text style={{fontSize: 16, color: 'white'}}>Update</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    catalogDetails: state.catalogR.responseCatalogDetails,
    responseCategoryEav: state.categoryR.responseGetCategoryEav,
    responseMyDetails: state.catalogR.responseGetMyProductDetails,
    responseBulkUpdateStartStop: state.catalogR.responseBulkUpdateStartStop,
  })
}

export default connect(mapStateToProps)(SizedStartStopSelling);