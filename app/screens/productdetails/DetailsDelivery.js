import React, { Component, Fragment } from 'react';
import { View, Clipboard } from 'react-native';
import { Text } from 'native-base';
import { Button as PButton } from 'react-native-paper';
import PhotoView from 'react-native-photo-view'
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import _ from 'lodash';

import Info from './Info';
import PincodeChecker from './PincodeChecker';
import * as commonHelper from './commonHelper';
import Modal from 'app/components/Modal/Modal'
import { rupeefy, formatSlugString } from 'app/utils/formatHelper';
import { formatCatalogDetails } from 'app/screens/products/formatHelper'
import { colorresource } from 'app/resources/colorresource';
import UserHelper from 'app/config/userHelper'
import { isWeb } from 'app/utils/PlatformHelper';

import { showToastAction } from 'app/actions/toast-actions'
import { goToProductDetailsScreen } from 'app/actions/navigation-actions';

const PRODUCT_TYPE_SET = 'set'
const PRODUCT_TYPE_SINGLE = 'single'

const LENGTH_EAV = ['top', 'bottom', 'dupatta']
const IGNORED_EAV = ['work', 'fabric', 'other', 'gender', 'number_pcs_design_per_set', 'size', ...LENGTH_EAV]

const slugEavMapper = (eav) => {
  switch(eav) {
    case 'stitching_type':
    eav = 'stitch'
    break;

    case 'occasion_wear':
    eav = 'occasion'
    break;
  }
  return formatSlugString(eav)
}

const SIZE_CHART_HEIGHT_TO_WIDTH_RATIO = 1.34
const SIZE_CHART_IMAGE_URL = 'https://d1idphlwmqf0gc.cloudfront.net/promotion_image/size-chart.png'

class DetailsDelivery extends Component {

  hideSizeChart = () => {
    this.setState({sizeChartVisible: false})
  }

  onViewSizeChartPress = () => {
    this.setState({sizeChartVisible: true})
  }

  onCatalogPress = () => {
    // console.log("catalog", this.props.data.catalog);
    goToProductDetailsScreen(this.props.data.catalog)
  }

  onCopyDetailsPress = () => {
    const pastableText = formatCatalogDetails(this.props.data)
    Clipboard.setString(pastableText)
    this.props.dispatch(showToastAction('Copied to Clipboard'))
  }

  constructor(props) {
    super(props)
    this.state = {
      sizeChartVisible: false,
    }
  }

  render() {
    const data = this.props.data;
    const isGuest = this.props.isGuest
    if(!data) {
      return null
    }
    const isSingle = data.product_type === PRODUCT_TYPE_SINGLE;
    const productOrCatalog = isSingle? 'Product' : 'Catalog'
    const isSet = data.product_type === PRODUCT_TYPE_SET
    const cDesignCount = isSet? data.no_of_pcs_per_design : data.products.length
    const dynamicEav = Object.entries(data.eavdata).filter(([k, v]) => !IGNORED_EAV.includes(k.toLowerCase()))
    const lengthEav = Object.entries(data.eavdata).filter(([k, v]) => LENGTH_EAV.includes(k.toLowerCase()))
    const lengthInfo = lengthEav.map(([k, v]) => formatSlugString(k) + ": " + v).join(', ')
    const isCatalog = data.product_type === 'catalog'
    const userIsSellerOfCatalog = UserHelper.getUsercompany_id() === data.company;
    const isSetColor = isSet && data.multi_set_type === 'color_set'
    const colorValue = isSetColor && data.set_type_details
    return(
      <Fragment>
        <View style={styles.productDetails}>
            
          <View style={styles.centeredRow}>
            <Text style={styles.headingText}>{productOrCatalog + ' Details'}</Text>
            <PButton
            icon='content-copy'
            mode='text'
            uppercase={false}
            style={{marginLeft: 'auto'}}
            onPress={this.onCopyDetailsPress}
            >
            {'Copy Details'}</PButton>
          </View>

          <Info
          label={'Collection'}
          value={data.catalog_title}
          hide={!isSingle}
          onPress={this.onCatalogPress}
          />

          <Info
          label={'Designs'}
          value={cDesignCount}
          hide={isSingle}
          />

          <Info
          label={productOrCatalog + ' Id'}
          value={data.id}
          />

          {isSingle? 
            <View style={{flexDirection: 'row', paddingVertical: 5, alignItems: 'center'}}>
              <View style={styles.infoLabel}>
                <Text style={styles.infoLabelText}>{'Price :'}</Text>
              </View>
              <View style={styles.infoValue}>
                <Text style={styles.infoValueText}>{rupeefy(data.mwp_single_price)}
                  {'  '}<Text style={styles.originalPriceText}>{'' + rupeefy(data.single_piece_price)}</Text>
                  <Text style={styles.discountText}>{'  ' + data.single_discount + '% off'}</Text>
                </Text>
              </View>
            </View>
          : null }

          <Info
          label={'Category'}
          value={data.category_name}
          />

          {data.available_sizes? 
            <View style={{flexDirection: 'row', paddingVertical: 5, alignItems: 'center'}}>
              <View style={styles.infoLabel}>
                <Text style={styles.infoLabelText}>{'Size :'}</Text>
              </View>

              <View style={styles.infoValueRowCentered}>
                <View style={styles.infoValue}>
                  <Text style={styles.infoValueText}>{data.available_sizes.replace(/,/g, ', ')}</Text>
                </View>
                <View style={{marginLeft: 'auto'}}>
                <PButton
                mode='text'
                uppercase={false}
                onPress={this.onViewSizeChartPress}
                >{'View Size Chart'}</PButton>
              </View>
              </View>


            </View>
          : null }

          <View style={styles.divider}/>
          
          <Info
            label={"Color"}
            value={colorValue}
          />
          
          {dynamicEav.map(([label, value]) => 
            <Info
            key={label}
            label={slugEavMapper(label)}
            value={value}
            />
          )}

          {dynamicEav.length > 0 || colorValue? <View style={styles.divider}/> : null }

          <Info
          label={'Work'}
          value={_.get(data, 'eavdata.work')}
          />

          <Info
          label={'Fabric'}
          value={_.get(data, 'eavdata.fabric')}
          />

          <Info
          label={'Lengths'}
          value={lengthInfo}
          />

          <Info 
          label={'Other'}
          value={_.get(data, 'eavdata.other')}
          />

          <View style={styles.divider}/>
          
          <Info
          label={'Sold by'}
          hide={userIsSellerOfCatalog || isCatalog}
          value={data.supplier_name}
          subInfoValueText={`${data.supplier_details.city_name}, ${data.supplier_details.state_name}`}
          subInfoValueStyle={{
            color: colorresource.gray,
            fontSize: 12,
          }}
          infoValueStyle = {{
            color: colorresource.liteblue,
            fontWeight: 'bold',
          }}
          />
          
          <Info
          label={'Delivery'}
          value={commonHelper.getDelivery(data)}
          />

          <Info
          label={'Return policy'}
          value={commonHelper.getReturnPolicy(data)}
          />

        </View>

        { !isGuest? (
          <PincodeChecker
            productId={data.id}
          />
        ) : null  
        }

        <Modal 
          isVisible={this.state.sizeChartVisible}
          onBackdropPress={this.hideSizeChart}
          onBackButtonPress={this.hideSizeChart}
        >
          <View style={{flex:1,}}>
            <PhotoView
              source={{uri: SIZE_CHART_IMAGE_URL}}
              maximumZoomScale={3}
              androidScaleType="fitCenter"
              style={{flex: 1, backgroundColor: 'transparent'}}
              {...(isWeb? {resizeMode: 'contain'} : {})}
              onViewTap={this.hideSizeChart}
            />
          </View>
        </Modal>
      </Fragment>
    )
  }
}

export default connect()(DetailsDelivery)

const styles = EStyleSheet.create({
  productDetails: {
    paddingLeft: 5, 
    paddingRight: 5, 
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  centeredRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    // flexWrap: 'wrap',
    // flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  headingText: {
    color: colorresource.liteblack, 
    fontSize: 16
  },
  footerShareText: {
    textAlign: 'center', 
    fontWeight: 'bold', 
    color: colorresource.liteblue
  },
  footerAddToCartText: {
    textAlign: 'center', 
    fontWeight: 'bold', 
    color: 'white'
  },
  divider: {
    backgroundColor: colorresource.divider, 
    height: EStyleSheet.hairlineWidth, 
    width: '100%',
    marginVertical: 5,
  },
  infoLabel: {
    width: 100,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabelText: {
    color: colorresource.gray,
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
  },
  infoValue: {
    flexWrap: 'wrap',
    flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // borderWidth: 1,
  },
  infoValueRowCentered: {
    flexWrap: 'wrap', 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  infoValueText: {
    color: colorresource.liteblack,
    fontSize: 12,
  },
  originalPriceText: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  discountText: {
    fontSize: 12,
    color: colorresource.darkgreen,
  }
})
