import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { 
  Text,
  Container,
  Footer,
  Content,
} from 'native-base';
import { Button as PButton } from 'react-native-paper'
import PhotoView from 'react-native-photo-view'
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash'

import GenericHeader from 'app/components/Header/GenericHeader';
import Modal from 'app/components/Modal/Modal'
import DetailsDelivery from './DetailsDelivery';
import WButton from 'app/components/Button/WButton'
import Sharer from 'app/utils/Sharer';
import AddToCart from 'app/screens/cart/AddToCart'
import UserHelper from 'app/config/userHelper'
import { colorresource } from 'app/resources/colorresource';
import { rupeefy } from 'app/utils/formatHelper'
import { isWeb } from 'app/utils/PlatformHelper'
import * as commonHelper from './commonHelper';

import { getProductDetailsAction } from 'app/actions/catalog-actions';
import * as navigationActions from 'app/actions/navigation-actions'

import { TestIdGenerator } from 'app/utils/TestingHelper';
const screenName = "SingleProductDetails"
const buttonTestId = TestIdGenerator(screenName, '', "Button");

class SingleProductDetails extends Component {

  registerAddToCartRef = (r) => {
    this.addToCartRef = r && r.getWrappedInstance()
  }

  flag_UserIsSellerOfCatalog = () =>{
    // console.log('flag_UserIsSellerOfCatalog',UserHelper.getUsercompany_id(),this.props.responseCatalogDetails.company)
    if(UserHelper.getUsercompany_id()===this.props.responseCatalogDetails.company)
    return true
    else
    return false

}

  hideAddToCart = () => {
    const data = this.props.responseCatalogDetails;
    const hide =    (data.supplier_details && data.supplier_details.i_am_selling_this && !data.buyer_disabled)
                    || this.flag_UserIsSellerOfCatalog()===true
                    || UserHelper.getCompanyType()==='seller'
                    || (data.selling === false)
    return hide
  }

  registerSharerRef = (r) => {
    this.sharerRef = r && r.getWrappedInstance()
  }

  onAddToCartFinish = (id) => {
    // console.log("[onAddToCartFinish]");
  }

  onAddToCartPress = () => {
    this.addToCartRef.addToCart(this.props.responseCatalogDetails.id, this.onAddToCartFinish)
  }

  onSharePress = () => {
    if(!this.sharerRef) {
      console.warn("[onSharePress] ref unavailable")
      return;
    }

    const isReseller = UserHelper.isUserReseller()
    if(isReseller) {
        navigationActions.goToShareCatalog({isSingleView: true})
        return;
    }
    this.sharerRef.onOpen({showWhatsApp: true})
  }

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params;
    this.props.dispatch(getProductDetailsAction(id));
  }

  componentDidUpdate(prevProps, prevState) {

    if(prevProps.responseCatalogDetails !== this.props.responseCatalogDetails) {
      this.setState({data: this.props.responseCatalogDetails})
      // setTimeout(this.onSharePress, 3000)
    }
}  

  render() {
    const data = this.state.data;
    //console.log('data in products details',UserHelper.getCompanyType(),this.props.responseCatalogDetails)
    if(_.isEmpty(this.props.responseCatalogDetails) || _.isEmpty(data)){
      return(
        <Container>
          <GenericHeader title={"Product Details"} />
        </Container>
      )
    }
    const { height, width } = Dimensions.get('window')
    return (
      <Container>
        <GenericHeader
        title={''}
        wishlistConfig={{
          visible: true,
        }}
        cartConfig={{
          visible: true,
        }}
        />
        <Content contentContainerStyle={{backgroundColor: colorresource.materialbg}}>
          <View>
            <Image style={{height: 200, width,}} source={{uri: data.image.thumbnail_medium}} resizeMode={'contain'}/>
          </View>

          <DetailsDelivery
            data={data}
          />

          <View style={{
            paddingLeft: '10%', 
            paddingRight: '10%', 
            paddingVertical: 20, 
            backgroundColor:'#F0F0F0'
          }}>
            <PButton
            {...buttonTestId("ChatWithUs")}
            mode={'outlined'}
            uppercase={false}
            style={{borderColor: colorresource.liteblue}}
            onPress={this.onChatWithUsPress}
            >
              {'Chat With Us'}
            </PButton>
        </View>

        </Content>
        <Footer style={{
          // backgroundColor: 'white'
        }}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
              <WButton style={{flex: 1}} onPress={this.onSharePress}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={styles.footerShareText}>{'SHARE'}</Text>
              </View>
              </WButton>
            </View>

            {this.hideAddToCart()? null : 
              <View style={{flex: 1, backgroundColor: colorresource.orange}}>
                <WButton style={{flex: 1}} onPress={this.onAddToCartPress}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={styles.footerAddToCartText}>{'ADD TO CART'}</Text>
                  </View>
                </WButton>
              </View>
            }
          </View>
        </Footer>
        <AddToCart ref={this.registerAddToCartRef}/>
        <Sharer 
        ref={this.registerSharerRef}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    responseCatalogDetails: state.catalogR.responseGetProductDetails,
  })
}

export default connect(mapStateToProps)(SingleProductDetails)

const styles = EStyleSheet.create({
  productDetails: {
    paddingLeft: 5, 
    paddingRight: 5, 
    backgroundColor: 'white'
  },
  centeredRow: {
    flexDirection: 'row', 
    alignItems: 'center'
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
  }
})
