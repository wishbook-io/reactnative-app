import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, FlatList, Linking } from 'react-native';
import { Text } from "native-base";
import { Button as PButton } from 'react-native-paper';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { withNavigationFocus } from 'react-navigation';

import UserHelper from '../../config/userHelper';
import GenericHeader from 'app/components/Header/GenericHeader';
import Searchbar from '../../components/Searchbar';
import Banner, { IndicaterType } from '../../utils/Banner'
import BannerTemplate from './BannerTemplate'
import MostViewedCard from './MostViewedCard';
import UsersVideoReviewsView from "./UsersVideoReviewsView"
import SellerDashBoardMyProductsBar from './SellerDashBoardMyProductsBar';
import SellerDashBoardMostViewedBar from './SellerDashBoardMostViewedBar';
import DashBoardLeftAnalytics from './DashBoardLeftAnalytics';
import SellerDashBoardFollowersBar from './SellerDashBoardFollowersBar';
import DashBoardOneCatalog from './DashBoardOneCatalog';
import ImageViewCard, { getCardHeight } from './ImageViewCard';
import ImageViewCardWithFooter from './ImageViewCardWithFooter';
import PromoCategoryItem from './PromoCategoryItem';
import BrandCard from './BrandCard';
import SeeAllButton from './SeeAllButton';
import WishlistCard from './WishlistCard';
import ProductsPane from './ProductsPane';
import RecentlyViewedList from './RecentlyViewedList';
import Spacer from 'app/components/Spacer/Spacer';
import UpdateApp from "./UpdateApp";
import { checkForCodReconfirm } from 'app/screens/orders/CodReconfirm';
import { strings } from '../../utils/i18n';
import styles, { bannerAspectRatio, testimonialsAspectRatio}  from './styles';
import { colorresource } from '../../resources/colorresource';
import DownloadWishbookApp from 'app/screens/products/add/DownloadWishbookApp';
// import * as ApplozicHelper from 'app/utils/ApplozicHelper';
import * as FreshchatHelper from 'app/utils/freshchat';

//actions
import { moveToScreen } from '../../actions/navigation-actions';
import * as navigationActions from '../../actions/navigation-actions'
import { setupHomeAction } from '../../actions/home-actions';
import { getRecentlyViewedCatalogAction } from 'app/actions/catalog-actions';
import { showToastAction } from 'app/actions/toast-actions'

import { isInCart } from '../../screens/cart/serverHelper';
//import { execute } from 'app/config/saga';
//import { testCashfree } from 'app/saga/shipay-saga'

import { TestIdGenerator } from '../../utils/TestingHelper';
import AddToCart from "../cart/AddToCart";
import { isWeb } from "../../utils/PlatformHelper";
const buttonTestId = TestIdGenerator("HomeScreen", '', "Button");

//import firebase from 'react-native-firebase';

const RESELL_BANNER_URL = 'https://d1idphlwmqf0gc.cloudfront.net/promotion_image/reseller_learn_how.jpg'

class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      setupHome: false,
    };
  }

  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
    responsePublicCatalog: PropTypes.array,
  };

  static defaultProps = {
    enabledProducts: 0
  }

  debugFirebaseNotificationPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions
      console.log("fb permissions yes")
    } else {
      // user doesn't have permissionv
      console.log("fb permissions no")
    }
  }

  debugAddToCart = (id) => {
    this.addToCartRef.addToCart(id, this.onAddToCartFinish);
  }

  // debugApplozic = () => {
  //   console.log("Now calling login")
  //   ApplozicHelper.login('918412806426').then(({error, response}) => {
  //     console.log("got result", {error, response});
  //     ApplozicHelper.isLoggedIn()
  //   }) 
  // }

  // debugCashfree = async () => {
  //   const response = await execute(testCashfree)
  //   goToCashfree({tokenData: response.cftoken})
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('componentDidUpdate home 0', prevProps.error, this.props.error);
    if(prevProps.navigation.state.params !== this.props.navigation.state.params) {
      //console.log("[CDU] nav params have changed from ", prevProps.navigation.state.params, "to", this.props.navigation.state.params)
      if(this.props.navigation.state.params.refresh && this.props.refreshRecentlyViewed) {
        this.props.dispatch(getRecentlyViewedCatalogAction())
      }
    }
    
    if (this.props.error !== prevProps.error) {
      alert(`${this.props.error.statusText}`);
    }

    // mostly for debug
    if(!this.state.setupHome && this.props.responseSetupHome) {
      // console.log("DEBUG: going to product details")
      // this.debugCashfree();
      // this.debugAddToCart(30688)
      // navigationActions.goToProductDetailsScreen(40454) // single piece
      // navigationActions.goToProductsTab()
      // this.props.navigation.navigate('FilterScreen',{localFilterStateMap: new Map()})
      // this.debugFirebaseNotificationPermission()
      // navigationActions.goToOrdersListScreen('total', 'Purchase')
      // navigationActions.goToOrderDetailsScreen('Purchase', 10088)
      // navigationActions.handleDeeplink('http://app.wishbooks.io/?type=catalog&ctype=public&category=12&min_price=101&max_price=749')
      // navigationActions.goToWishlist()
      // navigationActions.goToOpenLeads()
      // navigationActions.goToAddProducts();
      // navigationActions.goToMyProducts();
      // this.props.navigation.navigate('Shipay');
      // navigationActions.goToMyBrands();
      // navigationActions.goToProductsTab({filters: {ordering: '-id'}})
      // navigationActions.goToCarts();
      // navigationActions.goToResellPayouts()
      // navigationActions.goToOpenEnquiries()
      // this.debugApplozic();
      // this.onCategoryCollectionPress(15)
      // this.onCategorySinglePcPress(15)
      // navigationActions.goToProductDetailsScreen(41775)
      // navigationActions.goToSingleProductDetailsScreen(40637)
      // navigationActions.goToMyDiscount();
      // navigationActions.goToIncentives();
      // navigationActions.goToNotifications();
      // navigationActions.goToOrdersListScreen('dispatched', 'Purchase', 2)
      this.setState({setupHome: true})
      if(isWeb) {
        const path = window.location.search;
        // console.log("window.location", window.location);
        navigationActions.handleDeeplink(path)
        try {
          history.pushState(null, null, '/')
          window.handledDeepLink = true
        } catch(error) {
          console.warn(error);
        }
      }
      if(this.updateAppRef) {
        this.updateAppRef.checkForUpdates(this.checkForCodReconfirmOrders)
      }
    }

    

    // if(prevProps.isLoading === true && this.props.isLoading === false) {
    //   this.onAddToCart({id: 25134});
    // }
  }

  checkForCodReconfirmOrders = () => {
    const orderList = this.props.responseCodReconfirmableOrder
    checkForCodReconfirm(orderList)
  }

  registerUpdateAppRef = (r) => {
    this.updateAppRef = r && r.getWrappedInstance();
  }

  registerAddToCartRef = (r) => {
    this.addToCartRef = r && r.getWrappedInstance();
  }

  registerDownloadWishbookAppRef = (r) => {
    this.downloadWishbookAppRef = r;
  }

  onAddProductsPress = () => {
    if(isWeb) {
      if(this.downloadWishbookAppRef) {
        this.downloadWishbookAppRef.showModal();
      }
    } else {
      navigationActions.goToAddProducts();
    }
  }

  onResellerBannerPress = () => {
    navigationActions.goToHowToSell()
  }

  onBackPress = () => {
    if(this.shouldExit || !this.props.isFocused) {
        return false;
    }
    this.shouldExit = true;
    this.timer = setTimeout(() => this.shouldExit = false, 2000)
    this.props.dispatch(showToastAction("Press BACK again to exit", 1000))
    return true
  }

  isUserBuyer = () => {
    const flag = UserHelper.getCompanyType() === 'buyer'
    return flag;
  }

  goToProductDetailsPage = (id) => {
    const upcomingNavigationAction = moveToScreen("OpenStack","ProductDetails", {id})  
    this.props.navigation.dispatch(upcomingNavigationAction);
  }

  onAddToCart = (params) => {
    console.log("[onAddToCart] id", params.id);
    this.addToCartRef.addToCart(params.id, this.onAddToCartFinish)
  }

  onAddToCartFinish = (id) => {
    console.log("[onAddToCartFinish]");
  }

  onGoToCart = (params) => {
    navigationActions.goToCarts();
  }

  componentWillMount(){
    // handleDeeplink()
    //remove the comment for deeplink and pass the url
  }
  openDrawer = () => {
    this.props.navigation.openDrawer();
  }

  componentDidMount() {
    this.props.dispatch(setupHomeAction());
  }

  loadBanner = () => {

  }

  navigateToProductsTab = (filters) => {
    navigationActions.goToProductsTab({filters})
  }

  onCategoryCollectionPress = (id) => {
    this.navigateToProductsTab({category: id})
  }

  onCategorySinglePcPress = (id) => {
    this.navigateToProductsTab({category: id, collection: false})
  }

  onPressBuyInSingles = () =>{
    let filters ={}
    filters["sell_full_catalog"]=false;
    navigationActions.goToProductsTab({filters:filters});
  }

  onPressPromotionalFilters = (item) => {
    console.log('item',item)
    let object=navigationActions.getUrlParams(item.url);
    navigationActions.goToProductsTab({filters:object});
  }

  onPressFestiveLehengas = () => {
    let filters ={}
    filters["ctype"]="public";
    filters["category"]="14";
    filters["min_price"]="1500";
    filters["max_price"]="100000";
    navigationActions.goToProductsTab({filters:filters});  
  }

  onPressBannerElegantPrintedCollection = () =>{
    let filters ={}
    filters["ctype"]="public";
    filters["work"]="2140";
    navigationActions.goToProductsTab({filters:filters});  
  }
  
  onPressBannerSuits = () => {
    let filters ={}
    filters["ctype"]="public";
    filters["category"]="13";
    console.log('here')
    navigationActions.goToProductsTab({filters:filters});  
  } 

  onPressBanners = (item) => {
    navigationActions.handleBannersDeepLink(item.landing_page_type, item.landing_page)
  }
  
  onPressVideoReview = (videoUrl) => {
    Linking.openURL(videoUrl)    
  }
  
/*
Updating this based on JP's profile in wishbook app

Header
Searchbar
Wishbook key features
Wishbook stories
Wishbook credit
category
promotional filters
scroller - ready to ship
scroller - Pre-Order Catalogs
BannerScroller - Non Catalogs
BannerScroller - Buy in Singles
From Your Wishlist
Banner - festival lehengas
Banner (with scroller overlap)- explore brands
scroller - Followed by Me
Banner - Suits for all occasions
Banner - Elegant, printed collection
Top 10 - most sold
Top 10 - most viewed
HappyBuyers testimonials
Contacts
Products
Recently viewed

*/



  render() {
    let sellerDashboardVisible = UserHelper.getCompanyType()==='seller'?true:false
    let userIsGuest = UserHelper.getUserIsGuest();
    const responseWishlist = this.props.responseWishlist.filter((item) => !item.supplier_disabled && !item.buyer_disabled && !item.removedFromWishlist);
    return (
      <ScrollView 
      contentContainerStyle={[styles.HomeScreentopview, {backgroundColor: colorresource.materialbg}]}
      stickyHeaderIndices={[2]}
      showsVerticalScrollIndicator={false}
      {...buttonTestId("Parent", "ScrollView")}
      >
          <Spacer/>
          <GenericHeader
          title={''} 
          leftConfig={{
            onPress: this.openDrawer,
            visible: true,
            icon: "menu",
            testId: buttonTestId("Menu"),
          }}
          wishlistConfig={{
            onPress: navigationActions.goToWishlist,
            visible: !sellerDashboardVisible,
            // count: this.props.responseStatistics['wishlist'],
            testId: buttonTestId("Wishlist"),
          }}
          cartConfig={{
            onPress: navigationActions.goToCarts,
            visible: !sellerDashboardVisible,
            // count: this.props.responseStatistics['total_cart_items'],
            testId: buttonTestId("Cart"),
          }}
          notificationConfig={{
            onPress: navigationActions.goToNotifications,
            visible: !isWeb,
            testId: buttonTestId("Notification"),
          }}
          />
          <Searchbar 
          elevation={1} 
          placeholder="Search for Brands, Seller, Work and more" 
          onPress={() => navigationActions.goToSearchScreen()}
          inputTestId={buttonTestId("Search","Input")}
          />
          
          {/* <View style={styles.HomeScreenten}>
            <DashBoardOneCatalog txt_count_view={0} imageUrl={'http://www.twenty19.com/Data/internship/large/logo_508371.jpg'} />
          </View> */}

          {/*----------------------------------------------------------------------------------------*/}
          {/* Wishbook key features*/}
          {/*----------------------------------------------------------------------------------------*/}
          <View>
            <Banner style={styles.banner_container_promotional}
              indicaterType={IndicaterType.none}
              autoPlay={true}
              autoLoop={true}
              duration={5000}>              
              {this.props.responseBanners
                // .slice(0, 2)
                .map((item, index) => <BannerTemplate key={index} aspectRatio={ bannerAspectRatio } image={{ uri: item.image.banner}} onPress={()=>this.onPressBanners(item)}/>)}
            </Banner>
          </View>
          <View style={styles.HomeScreenheighttwo} />
          {/*----------------------------------------------------------------------------------------*/}
          {/* Wishbook stories*/}
          {/*----------------------------------------------------------------------------------------*/}
          {/* <View style={styles.HomeScreenviewstories}>
            <Text>Wishbook Stories</Text>
            <View style={styles.HomeScreenlightblue}></View>
          </View>
          <View style={styles.HomeScreenheighttwo} /> */}

          {/*----------------------------------------------------------------------------------------*/}
          {/* Reseller Banner top*/}
          {/*----------------------------------------------------------------------------------------*/}
          
          {UserHelper.canUserResell()?
            <BannerTemplate aspectRatio={ bannerAspectRatio } image={{ uri: RESELL_BANNER_URL}} onPress={this.onResellerBannerPress}/>
          : null}

          {/*----------------------------------------------------------------------------------------*/}
          {/* Wishbook credit facility*/}
          {/*----------------------------------------------------------------------------------------*/}
          {/* <View elevation={0} style={styles.HomeScreenmarginfive}>
            <Card style={{overflow:'hidden'}} borderRadius={5}>
              <CardItem>
                <Left>
                  <Text>{strings('home.credit_rating_home_tile')}</Text>
                </Left>
                <Button style={{ backgroundColor: colorresource.orange }} borderRadius={5}>
                  <Text>{strings('home.apply_now')}</Text>
                </Button>
              </CardItem>
            </Card>
          </View> */}
          {/*----------------------------------------------------------------------------------------*/}
          {/* category filters */}
          {/*----------------------------------------------------------------------------------------*/}
          <View style={styles.HomeScreenmargintop}>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={this.props.responseCategory}
            renderItem={({ item: rowData }) => 
              <PromoCategoryItem 
              id={rowData.id}
              title={rowData.category_name}
              url={rowData.image.thumbnail_small} 
              noOfCards={rowData.length}
              onPress={this.onCategoryCollectionPress}
              onCollectionPress={this.onCategoryCollectionPress} 
              onSinglePcPress={this.onCategorySinglePcPress}
            />}
            keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={styles.HomeScreenheighttwo} />
          {/*----------------------------------------------------------------------------------------*/}
          {/* promotional filters */}
          {/*----------------------------------------------------------------------------------------*/}
          <View style={styles.HomeScreenmargintop}>
            <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={this.props.responseHomePromotionalTags}
            renderItem={({ item: rowData }) => <ImageViewCard itemWidth={140} itemHeight={70} rowData={rowData} url={rowData.image.banner} noOfCards={this.props.responseHomePromotionalTags.length} onPress={()=>this.onPressPromotionalFilters(rowData)}/>}
            keyExtractor={(item, index) => index.toString()} 
            />
          </View>
          <View style={styles.HomeScreenmarginToponefive} />

          {/*----------------------------------------------------------------------------------------*/}
          {/* Ready-to-ship Catalogs*/}
          {/*----------------------------------------------------------------------------------------*/}
          <View style={styles.scroller_wrapper}>
            <Text style={styles.HomeScreenpubliccatlog}>Launched Catalogs</Text>
            <View style={styles.HomeScreenmargintop}>
              <FlatList style={styles.HomeScreenImageViewCardFlatList}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.props.responseReadyToShipCatalog}
                renderItem={({ item: rowData, index }) =>
                  <ImageViewCard 
                  onPress={() => { navigationActions.goToProductDetailsScreen(rowData.id) }}
                  rowData={rowData} url={rowData.image.thumbnail_medium} 
                />}
                keyExtractor={(item, index) => index.toString()} />
                <SeeAllButton onPress={()=>navigationActions.goToProductsTab({staticfilterPreOrder:false,staticfilterReadyToShip:true})}/>
            </View>
          </View>
          <View style={styles.HomeScreenmarginToponefive} />

          {/*----------------------------------------------------------------------------------------*/}
          {/* Pre-Order Catalogs*/}
          {/*----------------------------------------------------------------------------------------*/}
          <View style={styles.scroller_wrapper}>
            <Text style={styles.HomeScreenpubliccatlog}>Pre-Launch Catalogs</Text>
            <View style={styles.HomeScreenmargintop}>
              <FlatList style={styles.HomeScreenImageViewCardFlatList}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.props.responsePreOrderCatalog}
                renderItem={({ item: rowData, index }) =>
                  <ImageViewCard onPress={() => { navigationActions.goToProductDetailsScreen(rowData.id) }}
                    rowData={rowData} url={rowData.image.thumbnail_medium} />}
                keyExtractor={(item, index) => index.toString()} />
                <SeeAllButton  onPress={()=>navigationActions.goToProductsTab({staticfilterPreOrder:true,staticfilterReadyToShip:false})}/>
            </View>
          </View>
          <View style={styles.HomeScreenmarginToponefive} />

          {/*----------------------------------------------------------------------------------------*/}
          {/* Non catalogs collection */}
          {/*----------------------------------------------------------------------------------------*/}
          <View style={styles.HomeScreenCollectionRoot}>
            <BannerTemplate onPress={()=>navigationActions.goToProductsTab({product_type:"noncatalog,set"})}  aspectRatio={1.5} image={{ uri: 'https://d1idphlwmqf0gc.cloudfront.net/promotion_image/noncat_banner.jpg' }} />
            
            <View style={{zIndex: 1}}>
              <FlatList style={styles.HomeScreenImageViewCardFlatList}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.props.responseNonCatalog}
                renderItem={({ item: rowData, index }) =>
                  <ImageViewCard onPress={() => { navigationActions.goToProductDetailsScreen(rowData.id) }}
                    rowData={rowData} url={rowData.image.thumbnail_medium} />}
                keyExtractor={(item, index) => index.toString()} />
            </View>

            <LinearGradient 
            style={[styles.HomeScreenCollectionGradient, {height: getCardHeight(), marginTop: -1 * getCardHeight()/2}]}
            colors={['#e9006e', '#460055']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 0.8, y: 1.0 }}>
              <PButton
              color={'white'}
              style={{marginBottom: getCardHeight()/4 - 15}} 
              onPress={()=>navigationActions.goToProductsTab({product_type:"noncatalog,set"})}>
                {'See All >'}
              </PButton>
            </LinearGradient>
          </View>
          <View style={styles.HomeScreenmarginToponefive} />

          {/*----------------------------------------------------------------------------------------*/}
          {/* buy in singles collection */}
          {/*----------------------------------------------------------------------------------------*/}
          <View style={styles.HomeScreenCollectionRoot}>
            <BannerTemplate onPress={this.onPressBuyInSingles} aspectRatio={2.6} image={{ uri: 'https://d1idphlwmqf0gc.cloudfront.net/__sized__/promotion_image/Single_pc_select_1-thumbnail-1200x300.png' }} />
            
            <View style={[ {zIndex: 1}]}>
              <FlatList style={styles.HomeScreenImageViewCardFlatList}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.props.responseSingleCatalog}
                renderItem={({ item: rowData, index }) =>
                  <ImageViewCard onPress={() => { navigationActions.goToProductDetailsScreen(rowData.id) }}
                    rowData={rowData} url={rowData.image.thumbnail_medium} />}
                keyExtractor={(item, index) => index.toString()} />
            </View>

            <LinearGradient 
            style={[styles.HomeScreenCollectionGradient, {height: getCardHeight(), marginTop: -1 * getCardHeight()/2}]}
            colors={['#b6e4f8', '#b6e4f8']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 0.8, y: 1.0 }}>
              <PButton
              color={'#0a3244'}
              style={{marginBottom: getCardHeight()/4 - 15}} 
              onPress={this.onPressBuyInSingles}>
                {'See All >'}
              </PButton>
            </LinearGradient>
          </View>
          <View style={styles.HomeScreenmarginToponefive} />

          {/*----------------------------------------------------------------------------------------*/}
          {/* From your wishlist */}
          {/*----------------------------------------------------------------------------------------*/}
          { responseWishlist.length !== 0 ?
            <Fragment>
              <View style={styles.scroller_wrapper}>
                <Text style={styles.HomeScreenpubliccatlog}> From Your Wishlist </Text>
                <View style={styles.HomeScreenmargintop}>
                  <FlatList 
                  showsHorizontalScrollIndicator={false}
                  style={styles.HomeScreenWishlistFlatlist}
                  horizontal
                  data={responseWishlist}
                  extraData={[this.props.responseCartDetails]}
                  renderItem={({ item }) => 
                    <WishlistCard 
                    data={item} 
                    isInCart={isInCart(item.id, this.props.responseCartDetails)} 
                    onAddToCart={this.onAddToCart}
                    onGoToCart={this.onGoToCart}
                    onPress={navigationActions.goToProductDetailsScreen}
                    />
                  }
                  keyExtractor={(item, index) => index.toString()} />
                </View>
              </View>
              <View style={styles.HomeScreenmarginToponefive} />
            </Fragment>
            : null
          }

          {/*----------------------------------------------------------------------------------------*/}
          {/*Banner - festival lehengas */}
          {/*----------------------------------------------------------------------------------------*/}
          <BannerTemplate onPress={()=>this.onPressFestiveLehengas()} image={{ uri: 'https://d1idphlwmqf0gc.cloudfront.net/promotion_image/festive_lehngas1.jpg' }} />
          <View style={styles.HomeScreenmarginfive}/>

          {/*----------------------------------------------------------------------------------------*/}
          {/*Banner - explore brands (with scroller) */}
          {/*----------------------------------------------------------------------------------------*/}
          {/* <View style={styles.HomeScreenmarginfive}/>
            <ImageBackground 
            style={styles.HomeScreenAllBrandsBackgroundImage} 
            source={{ uri: 'https://d1idphlwmqf0gc.cloudfront.net/promotion_image/banner_1.jpg' }}
            >
              <View style={{flexDirection:'column'}}>
                <View style={{alignSelf:'flex-end'}}>
                  <TouchableOpacity style={{padding: 6}} onPress={goToBrandsCard}>
                    <Text style={styles.HomeScreenAllBrandsSeeMoreText}>See more</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={[0,...this.props.responseBrands]}
                  renderItem={({item, index}) => index==0? <View style={styles.HomeScreenAllBrandsOffset}/> : <BrandCard title={item.name} imageUrl={item.image.thumbnail_small}/>}
                  keyExtractor={(item,index) => index.toString()}
                  />
                </View>
              </View>
            </ImageBackground>
          <View style={styles.HomeScreenmarginfive}/> */}

          {/*----------------------------------------------------------------------------------------*/}
          {/* Followed by Me */}
          {/*----------------------------------------------------------------------------------------*/}
          { this.props.responseFollowedBrandsCatalog.length !== 0 ?
            <Fragment>
              <View style={styles.scroller_wrapper}>
                <Text style={styles.HomeScreenpubliccatlog}>Followed by Me</Text>
                <View style={styles.HomeScreenmargintop}>
                  <FlatList style={styles.HomeScreenImageViewCardFlatList}
                    horizontal
                    data={this.props.responseFollowedBrandsCatalog}
                    renderItem={({ item: rowData, index }) =>
                      <ImageViewCard onPress={() => { navigationActions.goToProductDetailsScreen(rowData.id) }}
                        rowData={rowData} url={rowData.image.thumbnail_medium} />}
                    keyExtractor={(item, index) => index.toString()} />
                    <SeeAllButton onPress={()=>navigationActions.goToGridViewListScreen("Followed by Me",this.props.responseFollowedBrandsCatalog)}/>
                </View>
              </View>
              <View style={styles.HomeScreenmarginToponefive} />
            </Fragment>
            : null
          }

          {/*----------------------------------------------------------------------------------------*/}
          {/*view_banner_suits*/}
          {/*----------------------------------------------------------------------------------------*/}
          <View style={styles.HomeScreenmarginfive}/>
          <BannerTemplate onPress={()=>this.onPressBannerSuits()} image={{ uri: 'https://d1idphlwmqf0gc.cloudfront.net/promotion_image/suits_1_8blYENG.png' }} />

          {/*----------------------------------------------------------------------------------------*/}
          {/*view_banner_elegant_printed*/}
          {/*----------------------------------------------------------------------------------------*/}
          <View style={styles.HomeScreenmarginfive}/>
          <BannerTemplate  onPress={()=>this.onPressBannerElegantPrintedCollection()} image={{ uri: 'https://d1idphlwmqf0gc.cloudfront.net/promotion_image/printed_sarees2.jpg' }} />

          {/*----------------------------------------------------------------------------------------*/}
          {/*view_banner_single_pieces*/}
          {/*----------------------------------------------------------------------------------------*/}
          {/*}
          <BannerTemplate image={{ uri: 'https://d1idphlwmqf0gc.cloudfront.net/__sized__/promotion_image/Single_pc_select_1-thumbnail-1200x300.png' }} />
          <View style={styles.HomeScreenmarginfive}/>
          */}

          <View style={styles.HomeScreenmarginToponefive} />
          <View style={styles.HomeScreenviewone}>
            <View style={styles.HomeScreenviewsecond} />
            <Text style={styles.HomeScreenthree}>Top 10</Text>
            <View style={styles.HomeScreenviewsecond} />
          </View>

          <View style={styles.HomeScreencol}>
            <MostViewedCard data={this.props.responseMostSoldCatalog} headerTitle={'Most Sold Catalogs (30 Days)'} onPress={navigationActions.goToProductDetailsScreen}/>
            <MostViewedCard data={this.props.responseMostViewedCatalog} headerTitle={'Most Viewed Catalogs (7 Days)'}  onPress={navigationActions.goToProductDetailsScreen}/>
          </View>
          
          <View>
            <UsersVideoReviewsView data={this.props.responseUsersVideoReviewsList} headerTitle={'#HappyBuyers'} onPress={this.onPressVideoReview}/>
          </View> 
          

          {/*----------------------------------------------------------------------------------------*/}
          {/*view_banners_testimonials*/}
          {/*----------------------------------------------------------------------------------------*/}
          <View>
            <Banner style={styles.banner_container_testimonials}
            indicaterType={IndicaterType.none}
            autoPlay={true}
            autoLoop={true}
            duration={5000}
            >
              {this.props.responseUserReviewBanners.map((item, index) => <BannerTemplate key={index} aspectRatio={testimonialsAspectRatio} image={{ uri: item.image.banner}} />)}
            </Banner>
          </View>

          {/*----------------------------------------------------------------------------------------*/}
          {/* Reseller Banner bottom*/}
          {/*----------------------------------------------------------------------------------------*/}
          
          {UserHelper.canUserResell()?
            <BannerTemplate aspectRatio={ bannerAspectRatio } image={{ uri: RESELL_BANNER_URL}} onPress={this.onResellerBannerPress}/>
          : null}

          {/*----------------------------------------------------------------------------------------*/}
          {/*view_contacts*/}
          {/*----------------------------------------------------------------------------------------*/}
          {/*}
          <View style={styles.HomeScreenmarginfive}/>
          <Text style={{backgroundColor: 'lightblue'}}>Contacts</Text>
          <View style={{backgroundColor: 'lightblue', height: 100}}/>
          <View style={styles.HomeScreenmarginfive}/>
          */}

          {/*----------------------------------------------------------------------------------------*/}
          {/* Request feedback to improve credit rating*/}
          {/*----------------------------------------------------------------------------------------*/}
          {/*}
          <Text style={{backgroundColor: 'lightblue'}}>Request feedback & improve credit rating</Text>
          <View style={{backgroundColor: 'lightblue', height: 100}}/>
          <View style={styles.HomeScreenmarginfive}/>
          */}

          {/*----------------------------------------------------------------------------------------*/}
          {/* Products */}
          {/*----------------------------------------------------------------------------------------*/}
          {this.isUserBuyer()? null : 
          <Fragment>
            <View style={styles.HomeScreenmarginToponefive} />
            <View style={[styles.scroller_wrapper, {flex:1}]}>
              <Text style={styles.HomeScreenpubliccatlog}>Products</Text>
              <ProductsPane 
              enabledProducts={this.props.enabledProducts}
              onAddProductsPress={this.onAddProductsPress}
              />
            </View>
          </Fragment>
          }

         



          {/*----------------------------------------------------------------------------------------*/}
          {/* Seller Dashboard*/}
          {/*----------------------------------------------------------------------------------------*/}
          
     
          {
            sellerDashboardVisible?
            this.props.responseSellerDashboard.catalogs===undefined?
            null
            :
            <View style={styles.scroller_wrapper}>
            <Text style={styles.HomeScreenpubliccatlog}>Your Most Viewed Products</Text>
            <View style={styles.HomeScreenmargintop}>
              <FlatList style={styles.HomeScreenImageViewCardFlatList}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.props.responseSellerDashboard.catalogs.my_most_viewed_catalogs}
                renderItem={({ item: rowData, index }) =>
                  <ImageViewCard onPress={() => { navigationActions.goToProductDetailsScreen(rowData.id) }}
                    rowData={rowData} url={rowData.image} />}
                keyExtractor={(item, index) => index.toString()} />
                <SeeAllButton/>
            </View>
          </View>
          :
          null
          }
          {
            sellerDashboardVisible?
            this.props.responseSellerDashboard.catalogs===undefined?
            null
            :
          <View style={{backgroundColor:'white'}}>  
          <View style={styles.HomeScreenten}>
            <SellerDashBoardMyProductsBar 
            uploaded_catalog={this.props.responseSellerDashboard.catalogs.uploaded_catalog}
            />
          </View>
          <View style={styles.HomeScreenten}>
            <SellerDashBoardMostViewedBar 
            catalogs_under_most_viewed={this.props.responseSellerDashboard.catalogs.catalogs_under_most_viewed}
            />
          </View>
          <View style={styles.HomeScreenten}>
            <SellerDashBoardFollowersBar 
            total_followers={this.props.responseSellerDashboard.total_followers}
            />
          </View>
          <View style={styles.HomeScreenmarginToponefive} />
          </View>
          :
          null
          }

          {/*----------------------------------------------------------------------------------------*/}
          {/* Recently viewed catalogs */}
          {/*----------------------------------------------------------------------------------------*/}
          {
            this.props.responseRecentlyViewedCatalog.length !== 0 && !sellerDashboardVisible
            ? <View style={styles.scroller_wrapper}>
                <Text style={styles.HomeScreenpubliccatlog}>Recently Viewed Products</Text>
              <RecentlyViewedList 
              data={this.props.responseRecentlyViewedCatalog} 
              cartData={this.props.responseCartDetails}
              onGoToCart={this.onGoToCart}
              onAddToCart={this.onAddToCart}
              onPress={navigationActions.goToProductDetailsScreen}
              />
            </View>
            : null
          }
          <AddToCart ref={this.registerAddToCartRef}/>
          <DownloadWishbookApp ref={this.registerDownloadWishbookAppRef}/>
          <AndroidBackHandler name={'Home'} onBackPress={this.onBackPress}/>
          {isWeb? null : <UpdateApp ref={this.registerUpdateAppRef}/>}
      </ScrollView>
    );
  }
}

const HomeScreenWithNavFocus = withNavigationFocus(HomeScreen)

const mapStateToProps = (state) => {
  const getEnabledProducts = (sellerDashboard) => {
    const uploadedProducts = _.property('catalogs.uploaded_catalog')(sellerDashboard)
    if(uploadedProducts) {
      return uploadedProducts;
    }
    return 0;
  }
  return {
    error: state.homeR.error,
    // stories: state.catalogR.stories,
    responsePublicCatalog: state.catalogR.responsePublicCatalog,
    responseCategory: state.masterListR.responseCategory,
    responseBanners: state.promotionsR.responseBanners,
    responseHomePromotionalTags: state.promotionsR.responseHomePromotionalTags,
    responseUsersVideoReviewsList: state.promotionsR.responseGetUserVideoReviews,
    responseReadyToShipCatalog: state.catalogR.responseReadyToShipCatalog,
    responsePreOrderCatalog: state.catalogR.responsePreOrderCatalog,
    responseNonCatalog: state.catalogR.responseNonCatalog,
    responseSingleCatalog: state.catalogR.responseSingleCatalog,
    responseMostSoldCatalog: state.catalogR.responseMostSoldCatalog,
    responseMostViewedCatalog: state.catalogR.responseMostViewedCatalog,
    responseUserReviewBanners: state.promotionsR.responseUserReviewBanners,
    responseWishlist: state.wishlistR.responseWishlist,
    responseFollowedBrandsCatalog: state.catalogR.responseFollowedBrandsCatalog,
    responseRecentlyViewedCatalog: state.catalogR.responseRecentlyViewedCatalog,
    responseBrands: state.brandsR.responseBrands,
    responseSellerDashboard: state.dashboardR.responseSellerDashboard,
    responseBuyerDashboard: state.dashboardR.responseBuyerDashboard,
    enabledProducts: getEnabledProducts(state.dashboardR.responseSellerDashboard),
    responseStatistics: state.dashboardR.responseStatistics,
    responseCartDetails: state.cartR.responseGetCatalogWiseCartDetails,
    responseSetupHome: state.homeR.responseSetupHome,
    refreshRecentlyViewed: state.catalogR.refreshRecentlyViewed,
    responseCodReconfirmableOrder: state.ordersR.responseGetCodReconfirmableOrder,
  };
};

export default connect(mapStateToProps)(HomeScreenWithNavFocus);
/*
(05:55:37  IST) Jay:
const AppScreens = TabNavigator(
    Home: {
      screen: Home,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: "Home",
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
  },
);
(05:55:48  IST) Jay:
Try following 5 things -:
1> Add activeOpacity with value 1 because if you set alpha JS thread send this too main UI thread and hence the delay.
Ex ->

Title of Button

2> Add your component will mount code inside Interaction manager It will run your JS code after the transition will complete
Ex ->InteractionManager.runAfterInteractions(() => {
});

3>set lazy to true for tab bar, it will help in not reloading unwanted controllers/components
Ex ->
const tabNavigatorConfig = {
tabBarPosition: 'bottom',
tabBarOptions: {
},
mode: 'card',
lazy:true,
}

4> Remove all logs, and comment logger middleware if u r using.
5> Run in release mode.
*/
