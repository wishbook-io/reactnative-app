import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { colorresource } from '../../resources/colorresource';

const {
  width = 0,
  height = 0
} = Dimensions.get('window');

export const bannerAspectRatio = 2.4
export const testimonialsAspectRatio = 2.4

const imageCardHeight = 1.3 * (width/3 - 8)

const styles = EStyleSheet.create({
  scroller_wrapper: {
    backgroundColor: 'white',
    paddingBottom: 5
  },
  no_padding: {
    paddingRight:0, 
    paddingLeft:0, 
    paddingTop:0, 
    paddingBottom:0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  card_text_padding: {
    paddingRight:7, 
    paddingLeft:7, 
    paddingTop:5, 
    paddingBottom:5
  },
  see_all_button: {
    position: 'absolute',
    right: -10,
    top: imageCardHeight/2 - 60/2 + 5,
    height: 60,
    paddingLeft: 0,
    paddingRight: 0,
    //margin: 0,
    //padding: 0,
    //paddingRight: 0,
    //marginRight: 0,
    //left: width - 100,
    //bottom: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  tab_button: {
    backgroundColor: 'transparent', 
    paddingLeft: 0,
    paddingRight: 0,
  },
  $tabIconSize: 24,
  tab_icon_active: {
    tintColor: colorresource.liteblue,
    width: '$tabIconSize',
    height: '$tabIconSize',
  },
  tab_icon_inactive: {
    tintColor: colorresource.gray,
    width: '$tabIconSize',
    height: '$tabIconSize',
  },
  tab_text_active: {
    color: colorresource.liteblue,
    fontSize: 12,
    paddingLeft: 0,
    paddingRight: 0,
  },
  tab_text_inactive: {
    color: colorresource.gray,
    fontSize: 12,
    paddingLeft: 0,
    paddingRight: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colorresource.white,
  },
  banner_container_promotional: {
    //marginTop: 1,
    flexGrow: 1,
    height: width/bannerAspectRatio
  },
  img: {
    flex: 1,
    width: width,
  },
  banner_container_testimonials: {
    marginTop: 1,
    flexGrow: 1,
    height: width/testimonialsAspectRatio
  },
  
  most_view_width: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    flex: 1, flexDirection: 'row',
    padding: 10,
  },
  DashBoardLeftanalytics:{
    height: 80, marginLeft: 15, marginRight: 15
  },
  
  DashBoardLeftanalyticselevation:{
    flex: 1, flexDirection: 'row', borderRadius: 5, borderColor: 'green', borderWidth: 1
  },
  
  DashBoardLeftanalyticsnine:{
    flex: 1, backgroundColor: colorresource.darkgreen, alignItems: 'center', justifyContent: 'center'
  },
  
  DashBoardLeftanalyticsninetext:{
    color: 'white', fontWeight: 'bold', fontSize: 26
  },
  
  DashBoardLeftanalyticsviewall:{
    flex: 2, alignItems: 'center', justifyContent: 'center', padding: 5
  },
  
  DashBoardLeftanalyticslast:{
    color: colorresource.darkblue, fontSize: 16, textAlign: 'center'
  },
  DashBoardLeftanalyticssecview:{
    flex: 0.8, alignItems: 'center', justifyContent: 'center'
  },
  DashBoardLeftanalyticssectext:{
    color: colorresource.darkgreen, fontWeight: 'bold', fontSize: 26
  },
  DaseboardOneCatalogtopview:{
    flex: 1, flexDirection: 'row', height: 150, marginLeft: 15, marginRight: 15
  },
  DaseboardOneCatalogview:{
    flex: 1.5, flexDirection: 'column'
  },
  DaseboardOneCatalogscdview:{
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5
  },
  DaseboardOneCatalogcountview:{
    color: colorresource.darkblue, fontSize: 26, textAlign: 'center'
  },
  DaseboardOneCataloglatestcatview:{
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  DaseboardOneCataloglatesttext:{
    color: colorresource.darkblue, textAlign: 'center', fontSize: 16 
  },
  DaseboardOneCatalogfinal:{
    flex: 0.5, padding: 5, alignItems: 'center', justifyContent: 'center'
  },
  DashBoardRightAnalyticstopview:{
    height: 80, marginLeft: 15, marginRight: 15 
  },
  DashBoardRightAnalyticselevation:{
    flex: 1, flexDirection: 'row', borderRadius: 5, borderColor: colorresource.yellow, borderWidth: 1
  },
  DashBoardRightAnalyticsview:{
    flex: 2, alignItems: 'center', justifyContent: 'center', padding: 5
  },
  DashBoardRightAnalyticstext:{
    color: colorresource.liteblack, fontSize: 16, textAlign: 'center'
  },
  DashBoardRightAnalyticslastview:{
    flex: 1, backgroundColor: colorresource.yellow, alignItems: 'center', justifyContent: 'center' 
  },
  DashBoardRightAnalyticslasttext:{
    color: 'white', fontWeight: 'bold', fontSize: 26
  },
  HomeScreentopview:{
    flexGrow: 1, flexDirection: 'column', marginBottom: 20 
  },
  HomeScreenheighttwo:{
    height: 2
  },
  HomeScreenviewstories:{
    height: 100, backgroundColor: 'lightblue', marginTop: 5
  },
  HomeScreenlightblue:{
    flex: 1, backgroundColor: 'lightblue'
  },
  HomeScreenmarginfive:{
    margin: 5
  },
  HomeScreenmargintop:{
    marginTop: 5
  },
  HomeScreenflatlistviewcard:{
    height: 120, backgroundColor: 'transparent', marginLeft: 5, marginRight: 5
  },
  HomeScreenpubliccatlog:{
    marginLeft: 5, marginTop: 20, padding: 5, fontSize: 18
  },
  HomeScreenflatlistdeeplink:{
    height: 180, backgroundColor: 'transparent', marginLeft: 5, marginRight: 5
  },
  HomeScreenImageViewCardFlatList: {
    backgroundColor: 'transparent', marginLeft: 5, marginRight: 5,
  },
  HomeScreenmarginToponefive:{
    marginTop: 15
  },
  HomeScreenviewone:{
    flexDirection: 'row', margin: 5, alignItems: 'center'
  },
  HomeScreenviewsecond:{
    flex: 1, height: 3, backgroundColor: colorresource.red, alignItems: 'center'
  },
  HomeScreencol:{
    flexDirection: 'column'
  },
  HomeScreenten:{
    marginTop: 10
  },
  HomeScreenthree:{
    flex: 1, alignItems: 'center', textAlign: 'center', fontSize: 28, color: 'red', fontWeight: '500'
  },
  Manifacturetopview:{
    flex: 1, flexDirection: 'row', height: 80, marginLeft: 15, marginRight: 15 
  },
  Manifacturetopac:{
    flex: 1, flexDirection: 'row', borderRadius: 5, borderColor: colorresource.liteblue, borderWidth: 1, marginRight: 5 
  },
  Manifacturetpacview:{
    flex: 1, flexDirection: 'row'
  },
  Manifacturetpacviewsec:{
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5 
  },
  Manifacturetpactxt:{
    color: colorresource.liteblue, fontSize: 26, textAlign: 'center'
  },
  Manifactureactiveview:{
    flex: 1, alignItems: 'center', justifyContent: 'center' 
  },
  Manifactureactivetxt:{
    color: 'black', textAlign: 'center', fontSize: 16
  },
  Manifacturebutton:{
    backgroundColor: colorresource.liteblue,
    flex: 1, alignItems: 'center', justifyContent: 'center',
    borderRadius: 5, height: 80
  },
  Manifacturelasttxt:{
    color: 'white', fontSize: 14, textAlign: 'center'
  },
  MostViewCardtop:{
    flexDirection: 'column', marginTop: 5, marginBottom: 5,
  },
  UsersVideoReviewsViewtop:{
    // borderWidth: 1,
    flexDirection: 'column', marginTop: 5, marginBottom: 5,
  },
  MostViewCardlg:{
    height: 100, 
    alignItems: 'center', 
    borderTopLeftRadius: 8, 
    borderTopRightRadius: 8,
    // borderColor: 'white',
    // borderWidth: 1,
  },
  UsersVideoReviewsViewCardlg:{
    height: 28, 
    alignItems: 'center', 
    borderTopLeftRadius: 8, 
    borderTopRightRadius: 8,
    // borderColor: 'white',
    // borderWidth: 1,
  },
  MostViewCardview:{
    flexDirection: 'row', 
    width: '100%',
    padding: 5, 
    marginTop: 10, 
    marginLeft: 10, 
    marginRight: 10, 
    // justifyContent: 'space-between',
    // borderWidth: 0.5, 
    // borderColor: 'purple',
  },
  UsersVideoReviewsViewCardview:{
    flexDirection: 'row', 
    width: '100%',
    // padding: 5, 
    marginTop: 5, 
    marginLeft: 30, 
    marginRight: 10, 
    // borderWidth: 1,
    // justifyContent: 'space-between',
    // borderWidth: 0.5, 
    // borderColor: 'purple',
  },
  MostViewCardheadertitile:{
    fontSize: 18, color: 'white' 
  },
  UsersVideoReviewsViewCardheadertitle:{
    // borderWidth: 1,
    fontSize: 15, color: 'white',
  },
  MostViewCardlast:{
    backgroundColor: 'transparent', marginTop: -30, marginLeft: 5, marginRight: 5
  },
  UsersVideoReviewsViewCardlast:{
    backgroundColor: 'transparent', marginTop: 1, marginLeft: 5, marginRight: 5
  },
  HomeScreenCollectionRoot: {
    flexDirection: 'column',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  HomeScreenCollectionGradient: {
    zIndex: 0,
    flex: 1,
    justifyContent: 'flex-end',
    //backgroundColor: 'red'
  },
  HomeScreenWishlistFlatlist: {
    //height: 220, 
    backgroundColor: 'transparent', 
    marginLeft: 5, 
    marginRight: 5        
  },
  HomeScreenWishlistCard: {
    //borderRadius: 8,
    overflow:'hidden',
    width: 320,
    padding: 8,
  },
  HomeScreenWishlistCardItemTop: {
    //borderWidth: 1,
    //borderColor: 'purple',
  },
  HomeScreenWishlistCardItemBottom: {
    //backgroundColor: 'red',
    //borderWidth: 1,
    //borderColor: 'red',
    paddingTop:5, 
  },
  HomeScreenWishlistParentTextView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    //borderWidth: 1,
    //borderColor: 'gray',
    paddingLeft: 5, /* space between image and text */
  },
  HomeScreenWishlistCardInfo: {
    //borderWidth: 1,
    //borderColor: 'red',
    //alignSelf: 'flex-start', 
    flex: 1,
  },
  HomeScreenWishlistCardQtyType: {
    //borderWidth: 1,
    //borderColor: 'red',
    justifyContent: 'flex-end',
    //alignSelf: 'flex-end', 
    //flex: 1, /* so that info and qty don't take equal space */
  },
  HomeScreenWishlistGrayText: {
    color: 'gray',
    fontSize: 13,
  },
  HomeScreenWishlistCatalogName: {
    fontWeight: 'bold',
  },
  HomeScreenWishlistNumericInfo: {
    fontSize: 15,
  },
  HomeScreenWishlistPrice: {
    fontWeight: 'bold',
  },
  HomeScreenWishlistAddToCart: {
    fontSize: 13, 
    paddingLeft: 5, 
    paddingRight: 5,
  },
  HomeScreenProductsCard: {
    flex: 1, 
    borderWidth: 0.5,
    borderColor: colorresource.gray,
    //borderWidth: 1, 
    //borderColor: 'yellow', 
    margin: 5,
    overflow:'hidden',
  },
  HomeScreenProductsCardItem: {
    flex:1, 
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth: 1, 
    //borderColor: 'black', 
    paddingTop: 5, 
    paddingRight: 5, 
    paddingBottom: 5, 
    paddingLeft:5
  },
  HomeScreenRecentlyViewedFlatlist: {
    //height: 180, 
    backgroundColor: 'transparent', 
    marginLeft: 5, 
    marginRight: 5,
  },
  HomeScreenRecentlyViewedInfo: {
    width: '100%',
    flexDirection: 'column',
    //borderWidth: 1,
    //borderColor: 'purple',
    alignSelf: 'flex-start',
    //alignItems: 'flex-start',
    //justifyContent: 'flex-start',
  },
  HomeScreenRecentlyViewedMoreParent: {
    flex: 1, 
    alignItems: 'center',
  },
  HomeScreenRecentlyViewedMoreText: {
    marginRight: 0, 
    fontSize: 17, 
    color: colorresource.liteblue,
    paddingRight: 0,
  },
  HomeScreenRecentlyViewedMoreIcon: {
    color: colorresource.liteblue
  },
  HomeScreenAllBrandsBackgroundImage: {
    height: 160,
    width: width,
  },
  HomeScreenAllBrandsSeeMoreText: {
    color: '#e58d00',
    fontWeight: 'bold',
    fontSize: 14,
  },
  HomeScreenAllBrandsOffset: {
    width: width/2,
  }
});

export default styles;
