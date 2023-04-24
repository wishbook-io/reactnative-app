import React, { Component, Fragment } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Text } from 'native-base';
import { connect } from 'react-redux';

import FilterControl from './FilterControl';
import BottomSheet from './BottomSheet';
import WButton from 'app/components/Button/WButton'
import { colorresource } from 'app/resources/colorresource';
import assets from 'app/utils/assetsObject'
import styles from './styles'
import { ENABLE_SINGLE_PCS } from 'app/utils/const';

const configId = {
  AVAILABILITY: 'Availability',
  TYPE: 'Type',
  CATEGORY: 'Category',
  VIEW: 'View',
}

const bottomSheetConfigObject = {
  [configId.AVAILABILITY]: {
    data: ['Full Catalog', 'Single Pcs.', 'Both'],
    title: 'Availability',
    selected: 'Both',
    id: configId.AVAILABILITY,
  },
  [configId.TYPE]: {
    data: ['Catalog', 'Non-Catalog'],
    title: 'Product Type',
    selected: 'Catalog',
    id: configId.TYPE,
  },
  [configId.CATEGORY]: {
    data: [],
    title: 'Category',
    selected: 'select',
    id: configId.CATEGORY,
  },
  [configId.VIEW]: {
    data: ['Collection', 'Single Pcs'],
    title: 'View Type',
    selected: 'Collection',
    id: configId.VIEW,
  }
}

class FilterHeader extends Component {

  // public methods start
  isSingleView = () => {
    const viewType = this.stateMap('collection')
    if(viewType === false || viewType === 'false') {
      return true
    }
    return false
  }
  // public methods end

  onCategorySelectAllPress = () => {
    this.onBottomSheetClosePress()
    this.props.onFilterChange({
      param: 'category',
      value: undefined
    })
  }

  onViewItemPress = (index) => {
    this.props.onFilterChange({
      param: 'collection',
      value: index === 0? true : false,
    })
  }

  onCategoryItemPress = (index) => {
    const categoryItem = this.props.responseCategory[index]
    this.props.onFilterChange({
      param: 'category',
      value: categoryItem.id,
    })
  }

  onTypeItemPress = (index) => {
    this.props.onFilterChange({
      param: 'product_type',
      value: index === 0? 'catalog' : 'noncatalog,set'
    })
  }

  onAvailabilityItemPress = (index) => {
    // TODO: think of a better way
    this.props.onFilterChange({
      param: 'sell_full_catalog',
      value: 
      index === 0? true : 
        index === 1? false : undefined
    })
  }

  onItemPress = ({id, index}) => {
    switch(id) {
      case configId.AVAILABILITY:
      this.onAvailabilityItemPress(index)
      break;

      case configId.TYPE:
      this.onTypeItemPress(index)
      break;

      case configId.CATEGORY:
      this.onCategoryItemPress(index)
      break;

      case configId.VIEW:
      this.onViewItemPress(index)
      break;

      default:
      console.warn("[FilterHeader:onItemPress] FATAL: id not found", id);
      return;
    }
    this.onBottomSheetClosePress()
  }

  stateMap = (key) => {
    return this.props.localFilterStateMap[key]
  }

  getAvailabilityValue = () => {
    const sellFullCatalog = this.stateMap('sell_full_catalog')
    const collectionFalse = this.stateMap('collection') === false
    if(sellFullCatalog === true) {
      return 'Full Catalog'
    }
    if(sellFullCatalog === false || collectionFalse) {
      return 'Single Pcs.'
    } else {
      return 'Both'
    }
  }

  getTypeValue = () => {
    const productType = this.stateMap('product_type') || this.stateMap('type');
    if(productType === 'catalog') {
      return 'Catalog'
    } else if(productType == undefined) {
      return 'Select'
    } else {
      return 'Non-Catalog'
    }
  }

  getCategoryValue = () => {
    const categoryId = parseInt(this.stateMap('category'))

    const categoryItem = this.props.responseCategory.find(c => c.id === categoryId);
    if(!categoryItem) {
      //console.log("no category found", {id: categoryId, response: this.props.responseCategory})
      return null
    }
    return categoryItem.category_name;
  }

  getViewValue = () => {
    const viewType = this.stateMap('collection')
    // console.log("viewType", {viewType})
    if(viewType === false || viewType === 'false') {
      // console.log("single", {viewType})
      return 'Single Pcs'
    }
      // console.log("collection", {viewType})
      return 'Collection'
  }

  onBottomSheetClosePress = () => {
    this.setState({bottomSheetVisible: false})
  }

  onAvailabilityPress = () => {
    const bottomSheetConfig = {
      ...bottomSheetConfigObject['Availability'],
      selected: this.getAvailabilityValue(),
    }
    this.setState({bottomSheetVisible: true, bottomSheetConfig})
  }

  onTypePress = () => {
    const bottomSheetConfig = {
      ...bottomSheetConfigObject['Type'],
      selected: this.getTypeValue(),
    }
    this.setState({bottomSheetVisible: true, bottomSheetConfig})
  }

  onCategoryPress = () => {
    const selected = this.getCategoryValue()
    let bottomSheetConfig = {
      ...bottomSheetConfigObject['Category'],
      selected,
      data: this.props.responseCategory.map(c => c.category_name),
      onSelectAllPress: selected && this.onCategorySelectAllPress,
    }
    // console.log("onCategoryPress", bottomSheetConfig)
    this.setState({bottomSheetVisible: true, bottomSheetConfig})
  }

  onViewPress = () => {
    const bottomSheetConfig = {
      ...bottomSheetConfigObject[configId.VIEW],
      selected: this.getViewValue(),
    }
    this.setState({bottomSheetVisible: true, bottomSheetConfig})
  }
  
  constructor(props) {
    super(props)
    this.state = {
      bottomSheetVisible: false,
      bottomSheetConfig: {

      }
    }
  }

  render() {
    const {
      onFilterPress,
      filterCount,
    } = this.props

    //console.log("now rendering filter header", this.props.localFilterStateMap)

    return (
      <Fragment>

        <View style={styles.Header}>
          <WButton onPress={onFilterPress}>
            <View style={styles.HeaderLeft}>
              <Image style={{height: 24, width: 24, marginTop: 2}} source={assets['ic_filter']}/>
              <Text style={{fontSize: 14, color: colorresource.liteblue}}>Filter</Text>
              {filterCount?
                <View style={styles.HeaderFilterBadge}>
                  <Text style={{fontSize: 7.5, color: 'white'}}>{filterCount}</Text>
                </View>
              : null}
            </View>
          </WButton>
          <ScrollView 
          horizontal 
          contentContainerStyle={{alignItems: 'center'}}
          showsHorizontalScrollIndicator={false}
          >
            <FilterControl
            title={'Availability'}
            value={this.getAvailabilityValue()}
            disabled={this.getViewValue() === 'Single Pcs'}
            onPress={this.onAvailabilityPress}
            />
            <FilterControl
            title={'Type'}
            value={this.getTypeValue()}
            onPress={this.onTypePress}
            />
            <FilterControl
            title={'Category'}
            value={this.getCategoryValue() || 'Select'}
            onPress={this.onCategoryPress}
            onSelectAllPress={this.onCategorySelectAllPress}
            />

            {ENABLE_SINGLE_PCS? <FilterControl
            title={'View'}
            value={this.getViewValue()}
            onPress={this.onViewPress}
            /> : null }
          </ScrollView>
        </View>

        <BottomSheet 
        visible={this.state.bottomSheetVisible}
        onClosePress={this.onBottomSheetClosePress}
        {...this.state.bottomSheetConfig}
        onItemPress={this.onItemPress}
        />

      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    responseCategory: state.categoryR.responseCategory
  })
}

export default connect(mapStateToProps, null, null, { withRef: true })(FilterHeader)