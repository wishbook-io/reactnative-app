import {NavigationActions, StackActions} from 'react-navigation'
import * as FreshchatHelper from 'app/utils/freshchat';

import DeepLink from '../config/deepLinkhelper';

export const goBack = () => {
    DeepLink.fireDispatch({ type: 'Navigation/BACK' });
}

export function goToProductDetailsScreen(id){
    let params ={};
    params["id"]=id;
    let upcomingNavigationAction =moveToScreen('OpenStack', 'ProductDetails', params)  
    console.log(upcomingNavigationAction )

    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToSingleProductDetailsScreen(id){
    let params ={};
    params["id"]=id;
    let upcomingNavigationAction =moveToScreen('OpenStack', 'SingleProductDetails', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToBecomeSeller(params){
    let upcomingNavigationAction = moveToScreen('OpenStack', 'BecomeSeller', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToProductsImageViewer(params){
    // let params ={};
    // params["products"]=products;
    let upcomingNavigationAction =moveToScreen('OpenStack', 'ProductsImageViewer', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToSizedSelection(params){
    let upcomingNavigationAction = moveToScreen('OpenStack', 'SizedSelection', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToSizedMultiSelection(params){
    let upcomingNavigationAction = moveToScreen('OpenStack', 'SizedMultiSelection', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToSizedStartStopSelling(params){
    let upcomingNavigationAction = moveToScreen('OpenStack', 'SizedStartStopSelling', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToInAppBrowser(title,webUrl){
    let params ={};
    params["webUrl"]=webUrl;
    params["title"]=title;
    let upcomingNavigationAction =moveToScreen('OpenStack', 'WebViewScreen', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToGuestProductDetailsScreen(urlKey){
  let params ={};
  // console.log("params", urlKey) 
  params["urlKey"]=urlKey
  let upcomingNavigationAction =moveToScreen('StartupStack', 'GuestProductDetailsScreen', params)
  DeepLink.fireDispatch(upcomingNavigationAction);  
}

export function goToGridViewListScreen(title,data){
    let params ={};
    params["title"]=title;
    params["data"]=data;
    let upcomingNavigationAction =moveToScreen('OpenStack', 'GridViewListScreen', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

// export function goToOrdersTab(params) {
//     let upcomingNavigationAction =moveToScreen('OrdersTab', 'OrdersTab', params)
//     DeepLink.fireDispatch(upcomingNavigationAction);
// }

export function goToOrderDetailsScreen(orderType,id){
    let params ={};
    params["orderType"]=orderType;
    params["id"]=id;
    let upcomingNavigationAction =moveToScreen('OpenStack', 'OrdersDetailScreen', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToOrdersListScreen(picktype, screenName, newOrders){
    let params ={};
    params["picktype"]=picktype;
    params["screenName"]=screenName;
    params.newOrders = newOrders
    let upcomingNavigationAction =moveToScreen('OrdersTab', 'OrdersListScreen', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToCodReconfirm(orderList, callback) {
    navigateToOpenStackScreen('CodReconfirm', {orderList, callback})
}

export function goToCarts (data=null){
    let params ={};
    let upcomingNavigationAction =moveToScreen('OpenStack', 'MyCartStack', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToWishlist (data=null){
    let params ={};
    let upcomingNavigationAction =moveToScreen('OpenStack', 'MyWishlist', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToNotifications (){
    let params ={};
    let upcomingNavigationAction =moveToScreen('OpenStack', 'NotificationScreen', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToDiscountSettings(){
    let params ={};
    let upcomingNavigationAction =moveToScreen('MyBusiness', 'DiscountSettings', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToAddCatalog(){
    let params ={};
    let upcomingNavigationAction =moveToScreen('MyBusiness', 'AddCatalog', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToMyViewers(){
    let params ={};
    let upcomingNavigationAction =moveToScreen('MyBusiness', 'MyViewers', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToMyProducts(){
    let params ={};
    let upcomingNavigationAction =moveToScreen('OpenStack', 'MyProducts', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToWbMoney(){
    let params ={};
    let upcomingNavigationAction =moveToScreen('MyBusinessStack', 'WbMoney', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToWbRewards() {
    let params ={};
    let upcomingNavigationAction =moveToScreen('MyBusinessStack', 'WbRewards', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToIncentives() {
    let params ={};
    let upcomingNavigationAction =moveToScreen('MyBusinessStack', 'Incentives', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToHowToSell() {
    let params ={};
    let upcomingNavigationAction =moveToScreen('OpenStack', 'HowToSell', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToResellPayouts() {
    let params = {}
    let upcomingNavigationAction = moveToScreen('MyBusinessStack', 'ResellPayouts', params)
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToSharedByMe() {
    let params = {}
    let upcomingNavigationAction = moveToScreen('MyBusinessStack', 'SharedByMe', params)
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToResellAddresses() {
    let params = {}
    let upcomingNavigationAction = moveToScreen('MyBusinessStack', 'ResellAddresses', params)
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToResellPreferences() {
    let params = {}
    let upcomingNavigationAction = moveToScreen('MyBusinessStack', 'ResellPreferences', params)
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToBuyerGroups(){
    let params ={};
    let upcomingNavigationAction =moveToScreen('MyBusiness', 'BuyerGroups', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}
 
export function goToRegisterNewUserScreen(){
    let params ={};
    let upcomingNavigationAction =moveToScreen('OpenStack', 'RegistrationScreen', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToRejectBuyers(){
    let params ={};
    let upcomingNavigationAction =moveToScreen('MyBusiness', 'RejectBuyers', params)  
    DeepLink.fireDispatch(upcomingNavigationAction);
}

export function goToProductsPromotion(params) {
    let upcomingNavigationAction =moveToScreen('ProductsTab',"ProductsPromotion", params)  
    DeepLink.fireDispatch(upcomingNavigationAction,params);
}

export function goToProductsTab({staticfilterPreOrder=false,staticfilterReadyToShip=true,product_type='catalog',filters={}}={}){
    let params={}
    params["staticfilterPreOrder"]=staticfilterPreOrder
    params["staticfilterReadyToShip"]=staticfilterReadyToShip;
    params["product_type"]=product_type;
    params["filters"]=filters;
    let upcomingNavigationAction =moveToScreen('OpenStack',"ProductsScreen", params)  
    DeepLink.fireDispatch(upcomingNavigationAction,params);
}

export function goToHomeTab(params = {}){
    let upcomingNavigationAction =moveToScreen('HomeScreen', "Home", params)  
    DeepLink.fireDispatch(upcomingNavigationAction); 
}

export function goToMyFilters(params) {
    navigateToOpenStackScreen('MyFilters', params)
}

// not using this, encountered a bug wherein all stack components get mounted if I keep this in OpenStack
export function goToMySetMatchingProducts(params) {
    const action = moveToScreen('MySetMatchingProducts', null, params)
    DeepLink.fireDispatch(action);
}

export function goToLoginScreen(params) {
    const action = moveToScreen('AuthStack', null, params)
    DeepLink.fireDispatch(action);
}

export function goToInitialRegistration(params) {
    const action = moveToScreen('InitialRegistration', null, params)
    DeepLink.fireDispatch(action);
}

export function goToMainStack(params) {
    const action = moveToScreen('MainStack', null, params)
    DeepLink.fireDispatch(action);
}

export function goToCashfree(params) {
    const action = moveToScreen('OpenStack', 'Cashfree', params);
    DeepLink.fireDispatch(action)
}

export function goToBrandsCard(params) {
    const action = moveToScreen('OpenStack', 'Brands', params);
    DeepLink.fireDispatch(action);
}

export function goToBrandsIFollow(params = {}) {
    const action = moveToScreen('OpenStack', 'Brands', {following: true, ...params});
    DeepLink.fireDispatch(action);
}

export function goToBrandedProducts(params) {
    const action = moveToScreen('OpenStack', 'BrandedProducts')
    DeepLink.fireDispatch(action)
}

export function goToKycBank(params = {}) {
    const action = moveToScreen('OpenStack', 'KycBank', params);
    DeepLink.fireDispatch(action);
}

export function goToAddProducts(params = {}) {
    const action = moveToScreen('OpenStack', 'AddProducts', params);
    DeepLink.fireDispatch(action);
}

export function goToMyBrands(params = {}) {
    const action = moveToScreen('OpenStack', 'MyBrands', params);
    DeepLink.fireDispatch(action);
}

export function goToMyOrders(params = {}) {
    const action = moveToScreen('OpenStack', 'MyOrders', params);
    DeepLink.fireDispatch(action);
}

export function goToSupportChat() {
    FreshchatHelper.showConversations();
}

export function goToFaqs() {
    FreshchatHelper.showFAQs();
}

export function goToOpenLeads() {
    goToLeads('Open')
}

export function goToResolvedLeads() {
    goToLeads('Resolved')
}

export function goToLeads(status='All') {
    goToLeadquiry({status, screenName: 'GroupedLeads'})
}

export function goToOpenEnquiries() {
    goToEnquiries('Open')
}

export function goToResolvedEnquiries() {
    goToEnquiries('Resolved')
}

export function goToEnquiries(status='All') {
    goToLeadquiry({status, screenName: 'Enquiries'})
}

export function goToLeadquiry(params = {}) {
    const action = moveToScreen('OpenStack', 'Leadquiry', params);
    DeepLink.fireDispatch(action);
}

export function pushLeadquiry(params={}) {
    const action = pushScreen('OpenStack', 'Leadquiry', params);
    DeepLink.fireDispatch(action);
}

export function goToAddressSelection(params) {
    const action = moveToScreen('OpenStack', 'SelectDeliveryAddress', params);
    DeepLink.fireDispatch(action);
}

export function goToAddressEditor(params) {
    const action = moveToScreen('OpenStack', 'UpdateDeliveryAddress', params);
    DeepLink.fireDispatch(action);
}

export function goToSearchScreen(params) {
    const action = moveToScreen('OpenStack', 'SearchScreen', params);
    DeepLink.fireDispatch(action);
}

export function goToDiscountBrandSelection(params) {
    navigateToOpenStackScreen('DiscountBrandSelection', params)
}

export function goToSetDiscount(params) {
    navigateToOpenStackScreen('SetDiscount', params)
}

export function goToMyDiscount(params) {
    navigateToOpenStackScreen('MyDiscount', params)
}

export function goToShareCatalog(params) {
    navigateToOpenStackScreen('ShareCatalog', params);
}

export function goToProductViewer(params) {
    navigateToOpenStackScreen('ProductViewer', params)
}

export const navigateToOpenStackScreen = (screen, params) => {
    navigateToScreen('OpenStack', screen, params)
}

export const navigateToScreen = (routeNameRoot, routeNameChild, params = null) => {
    const action = moveToScreen(routeNameRoot, routeNameChild, params);
    DeepLink.fireDispatch(action);
}  

export const moveToScreen = (routeNameRoot,routeNameChild,params=null) => {
    if(routeNameChild!==null){
    const upcomingNavigationAction = NavigationActions.navigate({
        routeName: routeNameRoot,
        action: NavigationActions.navigate({
            routeName: routeNameChild,
            params
        }),
    });
    return upcomingNavigationAction;
    }
    else{

    const upcomingNavigationAction = NavigationActions.navigate({
        routeName: routeNameRoot,
        params
    });
    // console.log('else upcomingNavigationAction',upcomingNavigationAction)
    return upcomingNavigationAction;
    }
}

export const pushScreen = (routeNameRoot,routeNameChild,params=null) => {
    if(routeNameChild!==null){
    const upcomingNavigationAction = StackActions.push({
        routeName: routeNameRoot,
        action: StackActions.push({
            routeName: routeNameChild,
            params
        }),
    });
    return upcomingNavigationAction;
    }
    else{

    const upcomingNavigationAction = StackActions.push({
        routeName: routeNameRoot,
        params
    });
    // console.log('else upcomingNavigationAction',upcomingNavigationAction)
    return upcomingNavigationAction;
    }
}

export function handleBannersDeepLink(pageType, page) {
    pageType = (pageType || '').toLowerCase();
    // page = (page || '').toLowerCase();
    switch(pageType) {
      
      case "webview":
      goToInAppBrowser('Wishbook', page)
      break;

      case "support_chat":
      goToSupportChat();
      break;

      case "deep_link":
      handleDeeplink(page)
      break;
    }
}

export function getUrlParams(search) {
    let hashes = search.slice(search.indexOf('?') + 1).split('&')
    let params = {}
    hashes.map(hash => {
        let [key, val] = hash.split('=')
        params[key] = decodeURIComponent(val)
    })
    return params
}


function parseTabDeeplink(data) {

    if (data.hasOwnProperty("page")){
        let page = data["page"];
        switch (page.toLowerCase()) {
                case "catalogs":
                    goToProductsTab(null) //with public catalog move to product tab
                    break;
                case "catalogs/mycatalog":
                    goToMyProducts()
                    break;
                case "catalogs/brands":
                    //move to public brands page (on click on brands homescreen)
                    break;
                case "buyers":
                    //my network - buyers selected
                    break;
                case "suppliers":
                    //my network - suppliers selected
                    break;               
                case "order/salesorder/pending":
                    goToOrdersListScreen('pending','Sales')
                    break;
                case "order/salesorder/dispatched":
                    goToOrdersListScreen('dispatched','Sales')
                    break;
                case "order/salesorder/cancelled":
                    goToOrdersListScreen('cancelled','Sales')
                    break;
                case "order/purchaseorder/total":
                    goToOrdersListScreen('total','Purchase')
                    break;
                case "order/purchaseorder/pending":
                    goToOrdersListScreen('pending','Purchase')
                    break;
                case "order/purchaseorder/dispatched":
                    goToOrdersListScreen('dispatched','Purchase')
                    break;
                case "order/purchaseorder/cancelled":
                    goToOrdersListScreen('dispatched','cancelled')
                    break;
                case "gst":
                    //mybusiness -> kyc and bank details page 
                    break;
                case "setttings/discount":
                    goToDiscountSettings();
                    break;
                case "profile":
                   //my business -> profile page 
                    break;
                case "myfollowers":
                    //my business -> my followers page 
                    break;
                case "mycart":
                    goToCarts(); 
                    break;
                case "wbmoney":
                case "myearning/wbmoney":
                    goToWbMoney();
                    break;
                case "myearning/rewardpoint":
                    goToWbRewards();
                    break;
            }

        }


    }

/*
ran a script on 22753 records from sept 2018 to feb 6
and found that in notifications, only these deeplinks
are used:

http://b2b.wishbook.io/?ctype=public&type=catalog
http://b2b.wishbook.io/?page=myearning/incentive&type=tab           *
http://b2b.wishbook.io/?page=myearning/rewardpoint&type=tab
http://b2b.wishbook.io/?page=wbmoney&type=tab
http://b2b.wishbook.io/?type=catalog&ctype=mycatalog
http://b2b.wishbook.io/?type=catalog&page=mycatalog                
http://b2b.wishbook.io/?type=purchase&id=7777
http://b2b.wishbook.io/?type=sales&id=7777
http://b2b.wishbook.io/?type=tab&page=myfollowers                   *
http://b2b.wishbook.io/?type=tab&page=order/purchaseorder/total

WB-4209
https://b2b.wishbook.io/?type=catalog&ctype=public&brand=547&min_price=500&max_price=1500
*/

export function handleDeeplink(url){
    // let url = 'https://app.wishbook.io/?type=tab&page=catalogs'
    console.log("handleDeeplink",url)
    if(url===null)
    return;
    let data = getUrlParams(url);
    if (data.hasOwnProperty("type")) {
        let type=data["type"]
        switch (type) {
            
            case "product":
                parseProductsDeepLink(data);
                break;    
            case "catalog":
                parseProductsDeepLink(data);
                break;    
            case "tab":
                parseTabDeeplink(data);
                break;
            case "sales":
                //move to order deatila screen (sales one)
                goToOrderDetailsScreen("Sales",data["id"]);
                break;
            case "purchase":
                //move to order deatila screen (purchase one)
                goToOrderDetailsScreen("Purchase",data["id"]);
                break;    
            case "buyer":
                //buyer details screen (mynetwrok -> buyer -> details)
                getContactsDeepLink(data);
                break;
            case "supplier":
                //supplier details screen (mynetwrok -> supplier -> details)
                getContactsDeepLink(data);
                break;
            case "brands":
                //products tab with particular brand selected    
                getBransDeepLink(context, param);
                break;
            case "catalogwise-enquiry-supplier":
                getCatalogEnquiry(context, param);//related to app lozic
                break;
            case "promotional":
                ////on click this should take user to device browsers
                break;
            case "html":
               //same as faq
                break;
            case "faq":
                goToFaqs();
                break;
            case "webview":
                //add a web view screen and set that here 
                break;
            case "support_chat":
                goToSupportChat();
                break;      
            default : console.log('default')
                break;    
        }
    }

}

function parseProductsDeepLink(object) {

        if (object.hasOwnProperty("id")){
            goToProductDetailsScreen(object["id"]);
        }
        else if(object["ctype"] === 'mycatalog' || object['page'] === 'mycatalog') {
            goToMyProducts();
        }
        else{
            let data = parseFilters(object);
            goToProductsTab({filters: data})
        }
}


export function parseFilters(object){

          let data={}
          delete object["ctype"];  
          return object;

    //       for (var key in object) {
          
    //        if(key==='brand'){
    //         // let data=object[key];
    //         obj['brand']=data.toString();
    //       }
    //        if(key==='work'){
    //         let data=object[key];
    //        obj['work']=data.toString();;
    //       }
    //        if(key==='state'){
    //         let data=object[key];
    //        obj['state']=data.toString();;
    //       }
    //        if(key==='size'){
    //         let data=object[key];
    //         if(data.length===0)
    //         delete object['Size'];
    //         else
    //         obj['size']=data.toString();
    //       }
    //        if(key==='fabric'){
    //         let data=object[key];
    //         obj['fabric']=data.toString();;
    //       }
    //        if(key==='stitch'){
    //         let data=object[key];
    //         if(data.length===0)
    //         delete object['Stitch'];
    //         else
    //         obj['stitching_type']=data.toString();
    //       }
    //        if(key==='price'){
    //           obj['min_price']=this.calculateMinPrice(object[key][0]);
    //           obj['max_price']=this.caculateMaxPrice(object[key][object[key].length-1])
    //       }
    //     if(key==='category'){
    //         if(object['Category']===null)
    //         delete object['Category'];
    //         else
    //         obj['category']=object['Category'];
    //       }
    //       if(key==='product_type'){
    //         obj["product_type"]=object["product_type"]
    //       }
    //       if(key==="ready_to_ship"){
    //         obj["ready_to_ship"]=object["ready_to_ship"]
    //       }
    //       if(key==="Style"){
    //         obj["style"]=object["Style"]
    //       }
    //       if(key==="min_price"){
    //           obj["min_price"]=obj["min_price"]
    //       }
    //       if(key==="max_price"){
    //           obj["max_price"]=obj["max_price"]

    //       }
    //       else{
    //           let newKey=key.toLowerCase();
    //           // obj[newKey]=object[key];
    //          // delete this.state[key] 
    //          console.log('discarded keys',key)
    //       }
    //   }


}
  








// for (var key in object) {
//     if (object.hasOwnProperty(key){
//       }
//     else if(key==='Stitch'){
//         obj['stitching_type']=object[key];
//     }
//     else if(key=='Price'){
//         obj['min_price']=this.calculateMinPrice(object[key][0]);
//         obj['max_price']=this.caculateMaxPrice(object[key][object[key].length-1])
//     }
//     else{
//         let newKey=key.toLowerCase();
//         obj[newKey]=object[key];
     
//     }
// }


// case "buyers/on_wishbook":
// //it was there in older version
// break;
// case "suppliers/on_wishbook":
// //it was there in older version
// break;
// case "buyers/all":
// //it was there in older version
// break;
// case "suppliers/all":
// //it was there in older versions
// break;



// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ increment, decrement }, dispatch);
// }