/**
 * Created by prane on 19-03-2016.
 */
import Queries from "../db/Queries";
import LocalStorage from "../db/LocalStorage";
import consts, { PROD } from "../utils/const";
import { isWeb } from "../utils/PlatformHelper";
import UserHelper from "../config/userHelper";

// TODO: find a better way of getting company id
// either store it in the store during startup
// or transfer this function to utils section
const getCompanyId = async () => {
  if (!Queries.isEmpty("UserInfo")) {
    let userInfo = await Queries.getDataFromModel("UserInfo");
    let userData = {};
    userInfo.map(function(item) {
      userData = item;
    });
    // console.log('userData value ->', userData);
    if (userData.companyuser.id != null && userData.companyuser.id != "") {
      return userData.companyuser.id;
    }
  }

  return null;
};

export { getCompanyId };

export const getUserInfo = async () => {
  if (!Queries.isEmpty("UserInfo")) {
    let userData = await Queries.getDataFromModel("UserInfo");
    let userInfo = {};
    userData.map(function(item) {
      userInfo = item;
    });
    return userInfo;
  } else if (isWeb) {
    // UserInfo is not present in DB, try looking for it in LocalStorage only if we are on Web
    const userInfo = await LocalStorage.getItem(consts.userInfo);
    if (userInfo) {
      return userInfo;
    }
  }

  return null;
};

export var BASE_URL = {
  // ISPRODUCTION = false;
  BARCODE_APP_URL: "https://app.wishbook.io",

  APP_URL: PROD ? (isWeb && false ? "https://lite.wishbook.io" : "https://app.wishbook.io") : "https://blite.wishbook.io",

  API_VERSION: "/api/v1/"
};

const CASHFREE_TEST_TOKEN = "https://test.cashfree.com/api/v2/cftoken/order";
const CASHFREE_LIVE_TOKEN = "https://api.cashfree.com/api/v2/cftoken/order";

export var CONSTANT_URL = {
  //     LOGIN_URL : BASE_URL.APP_URL + "/api/rest-auth/login/",
  //     USER_URL : BASE_URL.APP_URL + "/api/v1/auth/user/",
  //     COMPANY_URL : BASE_URL.APP_URL + "/api/companies/",
  //      CHECK_PHONE : BASE_URL.APP_URL + "/api/checkphonenoexist/",
  //      REGISTER_USER : BASE_URL.APP_URL + "/api/rest-auth/registration/",

  NEW_REGISTER_USER: BASE_URL.APP_URL + "/api/senduserdetail/",

  CHECKOTP_URL: BASE_URL.APP_URL + "/api/checkotpanduser/",
  MOBILE_CHECKOTP_URL: BASE_URL.APP_URL + "/api/checkotpandmobile/",
  PROFILE_CHECKOTP_URL: BASE_URL.APP_URL + "/api/registrationopt/",
  CHECKOTP_URL_CHANGEPASSWORD: BASE_URL.APP_URL + "/api/checkotpandchangepassword/",

  RESENDOTP_URL: BASE_URL.APP_URL + "/api/resendotp/",
  //    CHECKOTP_URL : BASE_URL.APP_URL + "/api/checkotpandmobile/",
  //   RESENDOTP_URL : BASE_URL.APP_URL + "/api/registrationopt/",
  RESET_PASSWORD_URL: BASE_URL.APP_URL + "/api/rest-auth/password/reset/",
  GET_MYSENT_CAT_URL: BASE_URL.APP_URL + "/api/pushes/?view_type=mysent",
  //    GET_MYBRANDS_URL : BASE_URL.APP_URL + "/api/brands/",
  GET_BRANDS_URL: BASE_URL.APP_URL + "/api/brandapp/",
  GET_CATEGORIES_URL: BASE_URL.APP_URL + "/api/category/",
  GET_SALES_ORDERS: BASE_URL.APP_URL + "/api/salesorders/",
  GET_STATES: BASE_URL.APP_URL + "/api/state/",
  GET_CITIES: BASE_URL.APP_URL + "/api/city/?state=",
  //    USER_EXISTENCE_CHECK:BASE_URL.APP_URL + "/api/checkuserexist/",
  REGISTRATION_OTP: BASE_URL.APP_URL + "/api/registrationopt/?format=json",
  //    LOGOUT_URL:BASE_URL.APP_URL + "/api/rest-auth/logout/",
  PRODUCT_LIKE: BASE_URL.APP_URL + "/api/productlike/",
  GET_SELECTIONS_URL: BASE_URL.APP_URL + "/api/selections/",
  GET_SELECTIONPRODUCTS_URL: BASE_URL.APP_URL + "/api/products/?selection=",
  ADDCATALOG: BASE_URL.APP_URL + "/api/catalogs/",
  ADDPRODUCT: BASE_URL.APP_URL + "/api/products/",
  GET_BUYERGROUPS: BASE_URL.APP_URL + "/api/buyersegmentation/",
  GET_GROUPTYPES: BASE_URL.APP_URL + "/api/buyersegmentation/",
  GET_GROUPS: BASE_URL.APP_URL + "/api/grouptype/",
  SHARECATALOG_URL: BASE_URL.APP_URL + "/api/pushes/",
  BUYERS: BASE_URL.APP_URL + "/api/buyers/",
  BUYERSONLY: BASE_URL.APP_URL + "/api/buyersonly/",
  PENDING_BUYERS: BASE_URL.APP_URL + "/api/buyersonly/?status=pending",
  APPROVED_BUYERS: BASE_URL.APP_URL + "/api/buyersonly/?status=approved",
  REJECTED_BUYERS: BASE_URL.APP_URL + "/api/buyersonly/?status=rejected",
  BRANDADD: BASE_URL.APP_URL + "/api/brandapp/",
  INVITE: BASE_URL.APP_URL + "/api/invites/",
  INVITEARRAY: BASE_URL.APP_URL + "/api/importarrayinvitee/",
  //   PROFILE:BASE_URL.APP_URL + "/api/rest-auth/user/",
  MEETINGS: BASE_URL.APP_URL + "/api/meeting/",
  GETPRODUCTSBYCAT: BASE_URL.APP_URL + "/api/products/?catalog=",
  MEETINGREPORT: BASE_URL.APP_URL + "/api/apptable/",
  //    RECENTSHAREDCAT:BASE_URL.APP_URL + "/api/catalogapp/?view_type=shared",
  //    RECIEVED_CAT:BASE_URL.APP_URL + "/api/catalogapp/?view_type=myreceived",
  RECEIVED_SELECTIONS: BASE_URL.APP_URL + "/api/selections/?type=push",
  SYNC_ACTIVITYLOG: BASE_URL.APP_URL + "/api/syncactivitylog",
  DISABLE_CATALOG: BASE_URL.APP_URL + "/api/disableitem/",
  ENABLE_CATALOG: BASE_URL.APP_URL + "/api/enableitem/",
  MYCATALOGS: BASE_URL.APP_URL + "/api/catalogapponly/?view_type=mycatalogs",

  SUPPLIERS_APPROVED: BASE_URL.APP_URL + "/api/sellersonly/?status=approved",
  SUPPLIERS_PENDING: BASE_URL.APP_URL + "/api/sellersonly/?status=pending",
  SUPPLIERS_REJECTED: BASE_URL.APP_URL + "/api/sellersonly/?status=rejected",
  GET_INVOICE: BASE_URL.APP_URL + "/api/invoice",

  CREATEORDER: BASE_URL.APP_URL + "/api/salesorders/",
  ADDBUYER: BASE_URL.APP_URL + "/api/addbuyerusingnumber/",
  GETUSERNAME: BASE_URL.APP_URL + "/api/getusernamefromno/",
  GET_WISHBOOK_CONTACTS: BASE_URL.APP_URL + "/api/onwishbook/",
  GCM: BASE_URL.APP_URL + "/api/device/gcm/",
  APNS: BASE_URL.APP_URL + "/api/device/apns/",
  GET_CATALOGS: BASE_URL.APP_URL + "/api/catalogapponly/",
  GET_CATALOGSAPPFULL_URL: BASE_URL.APP_URL + "/api/catalogapp/",
  GET_DASHBOARD_URL: BASE_URL.APP_URL + "/api/dashboard/",
  COMPANYTYPE: BASE_URL.APP_URL + "/api/companytype/",
  RECIEVED_CAT_APP: BASE_URL.APP_URL + "/api/v1/catalogs/?view_type=myreceived",
  RECENTSHAREDCATAPP: BASE_URL.APP_URL + "/api/sharedbyme/",
  ADDSELLER: BASE_URL.APP_URL + "/api/addsupplierusingnumber/",
  RESEND_SELLER: BASE_URL.APP_URL + "/api/resendsupplier/",
  RESEND_BUYER: BASE_URL.APP_URL + "/api/resendbuyer/",
  BUYER_LIST: BASE_URL.APP_URL + "/api/buyerlist/",
  GET_COMPANYLIST: BASE_URL.APP_URL + "/api/companylist/",
  PUSH: BASE_URL.APP_URL + "/api/pushes/",
  GET_CATALOGSUPPLIER: BASE_URL.APP_URL + "/api/catalogsupplier/",
  GET_BROKERS: BASE_URL.APP_URL + "/api/brokerlist/",
  PURCHASE: BASE_URL.APP_URL + "/api/purchseorders/",
  GET_SELECTIONSUPPLIER: BASE_URL.APP_URL + "/api/selectionsupplier/",
  GET_BUYER: BASE_URL.APP_URL + "/api/buyers/",
  GET_SELLER: BASE_URL.APP_URL + "/api/sellers/",
  GET_BRANDDISTRIBUTOR: BASE_URL.APP_URL + "/api/branddistributor/",
  TERMSCONDITION: BASE_URL.APP_URL + "/api/tnc/",

  GET_WAREHOUSE: BASE_URL.APP_URL + "/api/warehouse/",
  BARCODE_SAVE: BASE_URL.APP_URL + "/api/v1/barcode/",
  SAVE_INVENTORY: BASE_URL.APP_URL + "/api/v1/inventoryadjustment/",
  SAVE_OPENING_STOCK: BASE_URL.APP_URL + "/api/v1/openingstock/",

  GET_ATTENDANCE: BASE_URL.APP_URL + "/api/attendance/",

  // NEW API VERSION 1:
  USERS: BASE_URL.APP_URL + "/api/v1/users/",
  REGISTER_USER: BASE_URL.APP_URL + "/api/v1/auth/registration/",
  //     NEW_REGISTER_USER:BASE_URL.APP_URL + "/api/senduserdetail/",
  PROFILE: BASE_URL.APP_URL + "/api/v1/auth/user/",
  LOGIN_URL: BASE_URL.APP_URL + "/api/v1/auth/login/",
  PASSWORD_RESET: BASE_URL.APP_URL + "/api/v1/auth/password-reset/",
  CHANGE_PASSWORD: BASE_URL.APP_URL + "/api/v1/auth/password/change/",
  LOGOUT_URL: BASE_URL.APP_URL + "/api/v1/auth/logout/",
  NOTIFY: BASE_URL.APP_URL + "/api/v1/notify/",
  INVENTORY: BASE_URL.APP_URL + "/api/v1/inventory/",
  INVENTORY_DASHBOARD: BASE_URL.APP_URL + "/api/v1/inventory/dashboard/",

  PAYTM_RESPONSE: BASE_URL.APP_URL + "/api/v1/paytm/response/",
  GENERATE_CHECKSUM: BASE_URL.APP_URL + "/api/v1/generate-checksum/",
  GENERATE_CHECKSUM_V2: BASE_URL.APP_URL + "/api/v1/generate-checksum-v2/",
  //    VERIFY_CHECKSUM:BASE_URL.APP_URL + "/api/v1/verify-checksum/",
  PYTM_CALLBACK_URL: "https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp",

  //Companies Will Include Following URL
  //Brands,Catalogs,

  COMPANY_URL: BASE_URL.APP_URL + "/api/v1/companies/",
  COUNTRIES: BASE_URL.APP_URL + "/api/v1/country/",
  BANNER_URL: BASE_URL.APP_URL + "/api/v1/promotions/",

  PAYMENT_METHOD_URL: BASE_URL.APP_URL + "/api/v2/payment-method/",
  BUYER_DISCOUNT_URL: BASE_URL.APP_URL + "/api/v1/buyer-discount/",
  CONFIG_URL: BASE_URL.APP_URL + "/api/v1/config/",
  SHIPPING_CHARGE: BASE_URL.APP_URL + "/api/v2/shipping-charges/",
  ENUM_GROUP: BASE_URL.APP_URL + "/api/v1//enumgroup/",
  LANGUAGE: BASE_URL.APP_URL + "/api/v1/languages/",
  SHORT_URL: BASE_URL.APP_URL + "/api/v1//deeplink/",
  CATEGORY_EVP: BASE_URL.APP_URL + "/api/v1/category-eav-attribute/",
  CATEGORY_EAV: BASE_URL.APP_URL + "/api/v2/category-eav-attribute/",
  FEEDBACK_URL: BASE_URL.APP_URL + "/api/v2/user-reviews/",
  PROMOTIONAL_TAG: BASE_URL.APP_URL + "/api/v1/promotional-tags/",
  PRODUCT_TAB_PROMOTION: BASE_URL.APP_URL + "/api/v2/promotional-tags/",

  ACTIONLOG: BASE_URL.APP_URL + "/api/v1/action-log/",

  CAMPAIGNLOG: BASE_URL.APP_URL + "/api/v1/user-campaign-click/",

  AUTHENTICATION: BASE_URL.APP_URL + "/api/v1/user-authentication/",

  CHANGECOMPANY: BASE_URL.APP_URL + "/api/v1/companies/change_company/",

  USER_SAVE_FILER: BASE_URL.APP_URL + "/api/v1/user-saved-filter/",

  APP_VERSION_URL: BASE_URL.APP_URL + "/api/v1/app-version/",

  PREDEFINED_FILTER_URL: BASE_URL.APP_URL + "/api/v1/predefined-filters/categories/",

  PREDEFINED_SUB_FILTER_URL: BASE_URL.APP_URL + "/api/v1/predefined-filters/",

  RESET_GUEST_USER: BASE_URL.APP_URL + "/api/v1/reset-to-guest-user/",

  DISCOUNT_RULE: BASE_URL.APP_URL + "/api/v2/discount-rule/",

  STORIES: BASE_URL.APP_URL + "/api/v1/stories/",

  //-------Cashfree-------
  CASHFREE_TOKEN: PROD ? CASHFREE_LIVE_TOKEN : CASHFREE_TEST_TOKEN,
  CASHFREE_NOTIFY_URL: BASE_URL.APP_URL + "/api/v1/cashfree/response/",
  CASHFREE_RETURN_URL: BASE_URL.APP_URL,
  //--------------

  //-------Resell-------
  HOW_TO_RESELL_URL: "https://www.wishbook.io/resell-and-earn.html",
  //--------------

  //-------Product Details-------
  DELIVERY_INFO: BASE_URL.APP_URL + "/api/v2/delivery-info",
  //--------------

  //-------Address-------
  PINCODE_ZONE: BASE_URL.APP_URL + "/api/v2/pincode-zone/"
  //--------------
};

export class URLConstants {
  constructor() {
    this.company_id = "1";
  }

  async companyUrl(type, id) {
    var COMPANY_URL = "";
      this.company_id = UserHelper.getUsercompany_id();
      this.latestCartId = UserHelper.getLatestCartId();

    switch (type) {
      //TNC
      case "tnc":
        //TERMSCONDITION
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/tnc/";
        return COMPANY_URL;
      //COUNTRY , STATE , CITY

      case "country":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/country/";
        return COMPANY_URL;

      case "state":
        //GET_STATES
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/state/";
        return COMPANY_URL;

      case "city":
        //GET_CITIES
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/city/?state=" + id;
        return COMPANY_URL;

      case "grouptype":
        //GET_GROUPS
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/group-types/";
        return COMPANY_URL;

      //CATEGORY
      case "category":
        //GET_CATEGORIES_URL
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/category/";
        return COMPANY_URL;

      case "categoryV2":
        //GET_CATEGORIES_URL
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/category/";
        return COMPANY_URL;

      //COMPANYLIST
      case "companylist":
        //GET_COMPANYLIST
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/dropdown/";
        return COMPANY_URL;
    }

    if (!Queries.isEmpty("UserInfo")) {
      // let userInfo = await Queries.getDataFromModel('UserInfo');
      console.log("in queries.empty");
      const userInfo = await LocalStorage.getItem(consts.userInfo);

      let userData = {};
      userInfo.map(function(item) {
        userData = item;
      });
      console.log("userData value ->", userData);
      if (userData.companyuser.id != null && userData.companyuser.id != "") {
        this.company_id = userData.companyuser.id;
      }
    }

    switch (type) {
      //DASHBOARD

      case "dashboard":
        //GET_DASHBOARD_URL
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/dashboard/";
        return COMPANY_URL;

      case "buyer_dashboard":
        //Buyer_Dahsboard URL
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/dashboard/buyer/";
        return COMPANY_URL;

      case "seller_dashboard":
        //Seller_Dahsboard URL (Manufacturer)
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/dashboard/seller/";
        return COMPANY_URL;

      case "companytype":
        //COMPANYTYPE
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/types/" + (id ? id + "/" : "");
        return COMPANY_URL;

      //BRANDS
      case "brands":
        //GET_MYBRANDS_URL
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brands/";
        return COMPANY_URL;

      case "brandswithparams":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brands/" + id + "/";
        return COMPANY_URL;

      case "brands_expand_false":
        //GET_BRANDS_URL or BRANDADD
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brands?" + "expand=false";
        return COMPANY_URL;

      /*   case "brands_expand_falsewithparams":
                   COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id+"/";
                   return COMPANY_URL;
   */
      case "brands_distributor":
        //GET_BRANDDISTRIBUTOR
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brand-distributor/";
        return COMPANY_URL;

      case "brands_dropdown":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brands/dropdown/";
        return COMPANY_URL;

      case "brands_i_sell_dropdown":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brands/dropdown/?type=brandisell";
        return COMPANY_URL;

      /*  case "brands_expand_truewithparams":
                  COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id;
                  return COMPANY_URL;
  */

      //CATALOG

      case "brands-follow":
        //POST_BRAND_FOLLOW_URL
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brand-follow/" + id + "/";
        return COMPANY_URL;

      /* case "brands-unfollow":
                 //GET_BRAND_UNFOLLOW_URL
                 COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brand-follow/" +id;
                 return COMPANY_URL;
 */
      case "catalog_view_count":
        //ADDCATALOG
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/company-catalog-view/";
        return COMPANY_URL;

      case "upload_catalogs":
        //ADDCATALOG
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalogs/";
        return COMPANY_URL;

      case "catalogs":
        //ADDCATALOG
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/products/";
        return COMPANY_URL;

      case "screen-catalog-grouping":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalogs/"; //use with expand=true
        return COMPANY_URL;

      case "catalogs_suggestion":
        //ADDCATALOG
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/products/suggestion/";
        return COMPANY_URL;

      case "catalogs_upload_option":
        //ADDCATALOG
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/catalog-upload-options/";
        return COMPANY_URL;
      case "catalogs_upload_option_with_id":
        //ADDCATALOG
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/catalog-upload-options/?catalog=" + id;
        return COMPANY_URL;

      case "catalogs_received":
        //ADDCATALOG
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalogs/?view_type=myreceived";
        return COMPANY_URL;

      case "catalogs_disable":
        //DISABLE_CATALOG
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/products/" + id + "/disable/";
        return COMPANY_URL;

      case "catalogs_enable":
        //  ENABLE_CATALOG
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/products/" + id + "/enable/";
        return COMPANY_URL;

      case "catalogs_supplier":
        //GET_CATALOGSUPPLIER
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalogs/" + id + "/suppliers/";
        return COMPANY_URL;

      case "catalogs_expand_false":
        //GET_CATALOGSBASE_URL.APP_URL
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/products/?" + "expand=false";
        return COMPANY_URL;

      case "catalogs_expand_true":
        //companyUrl(getActivity(),"catalogs_expand_true","")
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/products/?" + "expand=true";
        return COMPANY_URL;

      case "catalogs_expand_true_id":
        //companyUrl(getActivity(),"catalogs_expand_true","")
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/products/" + id + "/?expand=true";
        return COMPANY_URL;

      case "catalogs_id":
        //companyUrl(getActivity(),"catalogs_expand_true","")
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/products/" + id + "/";
        return COMPANY_URL;

      case "catalog-seller":
        // add seller for particular catalog
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalog-seller/";
        return COMPANY_URL;

      case "mycatalogs":
        //MYCATALOGS
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalogs/" + "?view_type=mycatalogs/";
        return COMPANY_URL;

      case "catalog_dropdown":
        //catalog_dropdown (id == search_keyword)
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalogs/dropdown/";
        return COMPANY_URL;

      case "dropdownvalidate":
        //catalog_dropdown (id == search_keyword)
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalogs/dropdownvalidate/";
        return COMPANY_URL;
        
      case "catalog_urlkey":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/catalogs/urlkey/" + id + "/"
        return COMPANY_URL;

      //SELECTIONS
      case "selections":
        //GET_SELECTIONS_URL
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/selections/" + "?expand=true";
        return COMPANY_URL;

      case "selections_expand_false":
        //GET_SELECTIONS_URL
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/selections/";
        return COMPANY_URL;

      case "selections_supplier":
        //GET_SELECTIONSUPPLIER
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/selections/" + id + "/suppliers/";
        return COMPANY_URL;

      case "selections_disable":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/selections/" + id + "/disable/";
        return COMPANY_URL;

      case "selections_enable":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/selections/" + id + "/enable/";
        return COMPANY_URL;

      //INVOICE

      case "invoice":
        //GET_INVOICE
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/invoice/";
        return COMPANY_URL;

      case "buyergroups":
        //GET_BUYERGROUPS
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyer-groups/";
        return COMPANY_URL;

      //WAREHOUSE
      case "warehouse":
        //GET_WAREHOUSE
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/warehouse/";
        return COMPANY_URL;

      //SHARE
      case "pushes_with_id":
        //SHARECATALOG_URL
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/shares/" + id + "/";
        return COMPANY_URL;

      case "pushes":
        //SHARECATALOG_URL
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/shares/";
        return COMPANY_URL;

      case "mysent_catalog":
        //GET_MYSENT_CAT_URL
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/shares/?view_type=mysent";
        return COMPANY_URL;

      //PRODUCTS

      case "products":
        //ADDPRODUCT or GETPRODUCTSBYCAT
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/catalogs/" + id + "/products/" + "?expand=true";
        return COMPANY_URL;

      case "products_details":
        //ADDPRODUCT or GETPRODUCTSBYCAT
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/products/" + id + "/?expand=true";
        return COMPANY_URL;

      case "productsonly":
        //ADDPRODUCT or GETPRODUCTSBYCAT
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/products/";
        return COMPANY_URL;

      case "productsonlywithoutcatalog":
        //ADDPRODUCT or GETPRODUCTSBYCAT
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/products/";
        return COMPANY_URL;

      case "products_photos":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/products-photos/";
        return COMPANY_URL;

      case "single_product":
        //ADDPRODUCT or GETPRODUCTSBYCAT
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/products/" + id + "?expand=true";
        return COMPANY_URL;

      case "products_selection":
        //GET_SELECTIONPRODUCTS_URL
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/products/?selection=" + id;
        return COMPANY_URL;

      case "products_disable":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/products/" + id + "/disable/";
        return COMPANY_URL;

      case "products_enable":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/products/" + id + "/enable/";
        return COMPANY_URL;

      case "productlike":
        //PRODUCT_LIKE
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/products/" + id + "/likes/";
        return COMPANY_URL;

      //Contacts

      case "contactsinvites":
        //INVITEARRAY
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/contacts/invites/";
        return COMPANY_URL;

      case "contacts_onwishbook":
        //GET_WISHBOOK_CONTACTS
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/contacts/onwishbook/";
        return COMPANY_URL;

      //BUYERS

      case "buyers_expand_true":
        //GET_BUYER
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/?" + "expand=true";
        return COMPANY_URL;

      //URLConstants.companyUrl(getActivity(),"sellers_expand_true","")
      case "buyers_rejected":
        // REJECTED_BUYERS
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/?" + "status=rejected";
        return COMPANY_URL;

      case "buyers_enquiry":
        //APPROVED_BUYERS
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/?" + "status=enquiry";
        return COMPANY_URL;

      case "buyers_approved":
        //APPROVED_BUYERS
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/?" + "status=approved";
        return COMPANY_URL;

      case "buyers_approved_chat":
        //APPROVED_BUYERS
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/?" + "status=approved&fields=buying_company_name,buying_company_chat_user";
        return COMPANY_URL;

      case "buyers_pending":
        //PENDING_BUYERS
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/?" + "status=pending";
        return COMPANY_URL;

      case "buyers_expand_false_statewise":
        //BUYERSONLY  STATEWISE
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/statewise/?" + "expand=false";
        return COMPANY_URL;

      case "buyers":
        //ADDBUYER or RESEND_BUYER
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/";
        return COMPANY_URL;

      case "buyer_transfer":
        //ADDBUYER or RESEND_BUYER
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/" + id + "/transfer/";
        return COMPANY_URL;

      case "buyerlist":
        //BUYER_LIST
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/dropdown/";
        return COMPANY_URL;

      case "buyers_group_list":
        //ADDBUYER or RESEND_BUYER
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/?buyer_segmentation=" + id;
        return COMPANY_URL;

      case "buyerlist_no_deputed":
        //BUYER_LIST
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/dropdown/?without_deputed=true";
        return COMPANY_URL;

      case "brokerlist":
        //GET_BROKERS
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brokers/";
        return COMPANY_URL;

      //SUPPLIER

      case "sellers_rejected":
        //SUPPLIERS_REJECTED
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/suppliers/?" + "status=rejected";
        return COMPANY_URL;

      case "sellers_enquiry":
        //SUPPLIERS_APPROVED
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/suppliers/?" + "status=enquiry";
        return COMPANY_URL;

      case "sellers_approved":
        //SUPPLIERS_APPROVED
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/suppliers/?" + "status=approved";
        return COMPANY_URL;

      case "sellers_approved_chat":
        //SUPPLIERS_APPROVED
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/suppliers/?" + "status=approved&fields=selling_company_chat_user,selling_company_name";
        return COMPANY_URL;

      case "sellers_pending":
        //SUPPLIERS_PENDING
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/suppliers/?" + "status=pending";
        return COMPANY_URL;

      case "sellers":
        //ADDSELLER or RESEND_SELLER
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/suppliers/";
        return COMPANY_URL;

      case "_supplier_detail":
        // supplier details
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/suppliers/company_details/?company=" + id;
        return COMPANY_URL;

      case "suppliers_list":
        //SUPPLIER_LIST
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/suppliers/dropdown/";
        return COMPANY_URL;

      case "seller-policy":
        // GET SUPPLIER POLICY
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/seller-policy/?company=" + id;
        return COMPANY_URL;

      //ORDERS

      case "multiorder":
        //CREATEORDER or GET_SALES_ORDERS
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/multiorder/";
        return COMPANY_URL;

      case "salesorder":
        //CREATEORDER or GET_SALES_ORDERS
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/sales-orders/" + id;
        return COMPANY_URL;

      case "brokerage_order":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brokerage-orders/";
        return COMPANY_URL;

      case "salesorders_catalogwise":
        //GET_SALES_ORDERS Catalogwise
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/companies/" + this.company_id + "/sales-orders/" + id + "/catalogwise/?expand=true";
        return COMPANY_URL;

      case "salesorders_transfer":
        //GET_SALES_ORDERS Catalogwise
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/sales-orders/" + id + "/transfer/";
        return COMPANY_URL;

      case "purchaseorder":
        //PURCHASE
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/purchase-orders/" + id + "/";
        return COMPANY_URL;

      case "payment":
        //PURCHASE
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/purchase-orders/" + id + "/payment/";
        return COMPANY_URL;

      case "create_invoice":
        //PURCHASE
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/order-invoice/";
        return COMPANY_URL;

      case "invoice_payment":
        //PURCHASE
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/order-invoice/" + id + "/payment/";
        return COMPANY_URL;

      case "invoice_dispatch":
        //PURCHASE
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/order-invoice/" + id + "/dispatched/";
        return COMPANY_URL;

      case "purchaseorders_catalogwise":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/companies/" + this.company_id + "/purchase-orders/" + id + "/catalogwise/?expand=true";
        return COMPANY_URL;

      case "shipping-charges":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/shipping-charges/?order=" + id + "/";
        return COMPANY_URL;

      case "add_order_rating":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/order-rating/";
        return COMPANY_URL;

      case "order_rating":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/order-rating/?order=" + id;
        return COMPANY_URL;

      //Broker
      case "add_buyers":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/suppliers/" + id + "/add_buyers/";
        return COMPANY_URL;

      case "add_suppliers":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/" + id + "/add_suppliers/";
        return COMPANY_URL;

      case "get_connected_buyers_broker":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/dropdown/?selling_company=" + id;
        return COMPANY_URL;

      case "get_connected_suppliers_broker":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/suppliers/dropdown/?buying_company=" + id;
        return COMPANY_URL;

      case "remove_connected_buyers":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/suppliers/" + id + "/remove_buyers/";
        Log.i("TAG", "companyUrl: ==>" + COMPANY_URL);
        return COMPANY_URL;

      case "remove_connected_suppliers":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/" + id + "/remove_suppliers/";
        return COMPANY_URL;

      case "purchase_brokerage_orders_catalogwise":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brokerage-orders/" + id + "/catalogwise/?expand=true";
        return COMPANY_URL;

      case "brokerageorder":
        //PURCHASE
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brokerage-orders/";
        return COMPANY_URL;

      //SYNCACTIVITYLOG

      case "syncactivitylog":
        //PRODUCT_LIKE
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/syncactivitylog/";
        return COMPANY_URL;

      case "company_otp_url":
        //otp register and validate for company profile
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/phone_number/";
        return COMPANY_URL;

      case "company_types":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/types/";
        return COMPANY_URL;

      case "company_kyc":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/kyc/";
        return COMPANY_URL;

      case "company_kyc_id":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/kyc/" + id + "/";
        return COMPANY_URL;

      case "bank_details":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/bank-details/";
        return COMPANY_URL;

      case "bank_details_id":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/bank-details/" + id + "/";
        return COMPANY_URL;

      case "address":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/address/";
        return COMPANY_URL;
      case "address-id":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/address/" + id + "/";
        return COMPANY_URL;

      case "my_followers":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brands/followers/";
        return COMPANY_URL;

      case "brands_permission":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/brands/has_permission/";
        return COMPANY_URL;

      case "catalog_all_seller":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalogs/" + id + "/all_suppliers/";
        return COMPANY_URL;

      case "suggested_broker":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/buyers/" + id + "/suggested_brokers/";
        return COMPANY_URL;

      case "statistics":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/companies/" + this.company_id + "/statistics/";
        return COMPANY_URL;

      case "credit-rating":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/credit-rating/?company=" + id;
        return COMPANY_URL;

      case "credit-reference":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/credit-reference/?buying_company=" + id;
        return COMPANY_URL;

      case "my-viewers":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalogs/my-viewers/";
        return COMPANY_URL;

      case "my-viewers-live":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalogs/my-viewers-live";
        return COMPANY_URL;

      case "catalog-viewers":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalogs/" + id + "/catalog-viewers";
        return COMPANY_URL;

      case "solo-propreitorship-kyc":
        //ADDCATALOG
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/solo-propreitorship-kyc/";
        return COMPANY_URL;

      case "catalog-enquiries":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalog-enquiries/";
        return COMPANY_URL;

      case "buyer-leads":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/catalog-enquiries/buyer-leads/";
        return COMPANY_URL;
      case "add-credit-reference":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/credit-reference/";
        return COMPANY_URL;

      case "cart-catalogwise":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/companies/" + this.company_id + "/carts/" + this.latestCartId + "/catalogwise/";
        return COMPANY_URL;
      case "cart":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/companies/" + this.company_id + "/carts/";
        return COMPANY_URL;
      case "cart-id":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/companies/" + this.company_id + "/carts/" + this.latestCartId + "/";
        return COMPANY_URL;
      case "cart-delete":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/companies/" + this.company_id + "/carts/" + this.latestCartId + "/delete-items/";
        return COMPANY_URL;
      case "cart-payment":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/companies/" + this.company_id + "/carts/" + this.latestCartId + "/payment/";
        return COMPANY_URL;

      case "user-credit-submissions":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/user-credit-submissions/";
        return COMPANY_URL;

      case "credit-approved-line":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/credits-approved-line/";
        return COMPANY_URL;

      case "wbmoney-log":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/wbmoney-log/";
        return COMPANY_URL;

      case "wbmoney-log-dashboard":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/wbmoney-log/dashboard/";
        return COMPANY_URL;

      case "wbpoint-log":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/wbpoint-log/";
        return COMPANY_URL;

      case "wbpoint-log-dashboard":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/wbpoint-log/dashboard/";
        return COMPANY_URL;

      case "reseller-settlement":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/companies/" + this.company_id + "/reseller-settlement/";
        return COMPANY_URL;

      case "reseller-settlement-dashboard":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/companies/" + this.company_id + "/reseller-settlement/dashboard/";
        return COMPANY_URL;

      case "placetoship":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/sales-orders/" + id + "/placetoship/";
        return COMPANY_URL;

      case "companyProfile":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + id + "/";
        return COMPANY_URL;

      case "product-share/start-sharing":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/product-share/start-sharing/";
        return COMPANY_URL;

      case "product-share":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/product-share/";
        return COMPANY_URL;

      case "incentive-tiers":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/incentive-tiers/";
        return COMPANY_URL;

      case "incentive-history":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/companies/" + this.company_id + "/incentives/";
        return COMPANY_URL;

      case "incentive-dashboard":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/companies/" + this.company_id + "/incentives/dashboard/";
        return COMPANY_URL;

      case "bulk-update-product-seller":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/products/bulk-update-product-seller/";
        return COMPANY_URL;

      case "mydetails":
        COMPANY_URL = BASE_URL.APP_URL + "/api/v2/products/" + id + "/mydetails/";
        return COMPANY_URL;

      default:
        COMPANY_URL = BASE_URL.APP_URL + "/api/v1/companies/" + this.company_id + "/";
        return COMPANY_URL;
    }
  }

  async userUrl(type, id) {
    var USER_URL = "";
    switch (type) {
      case "new_registration":
        //NEW_REGISTER_USER
        USER_URL = BASE_URL.APP_URL + "/api/v1/users/" + id;
        return USER_URL;

      case "user_platform":
        //STORE USER DEVICE INFO
        USER_URL = BASE_URL.APP_URL + "/api/v1/users/" + id + "/platform/";
        return USER_URL;
    }

    const userId = UserHelper.getUserId();
    if (userId) {
      if (userId != null && userId != "" && userId != undefined) {
        switch (type) {
          case "attendance":
            //GET_ATTENDANCE
            USER_URL = BASE_URL.APP_URL + "/api/v1/users/" + userId + "/attendance/";
            return USER_URL;
          case "meetings":
            //MEETINGS
            USER_URL = BASE_URL.APP_URL + "/api/v1/users/" + userId + "/meetings/";
            return USER_URL;

          case "meetings_with_id":
            //MEETINGS
            USER_URL = BASE_URL.APP_URL + "/api/v1/users/" + userId + "/meetings/" + id + "/";
            return USER_URL;

          case "meetingsreport":
            //MEETINGREPORT
            USER_URL = BASE_URL.APP_URL + "/api/v1/users/" + userId + "/meetings/report/";
            return USER_URL;

          case "profile_number_verify":
            //MEETINGREPORT
            USER_URL = BASE_URL.APP_URL + "/api/v1/users/" + userId + "/phone_number/";
            return USER_URL;
          case "wishlist-catalog":
            //Show Wishlist Catalog
            USER_URL = BASE_URL.APP_URL + "/api/v2/wishlist/";
            return USER_URL;
          case "wishlist-delete":
            //Show Wishlist Catalog
            USER_URL = BASE_URL.APP_URL + "/api/v2/wishlist/delete-product/";
            return USER_URL;

          case "recent-catalog":
            //Show Wishlist Catalog
            USER_URL = BASE_URL.APP_URL + "/api/v2/products/recently-viewed/";
            return USER_URL;

          case "notification-preference":
            USER_URL = BASE_URL.APP_URL + "/api/v2/users/" + userId + "/notification-preference/";
            return USER_URL;

          default:
            USER_URL = BASE_URL.APP_URL + "/api/v1/users/" + userId + "/";
            return USER_URL;
        }
      } else {
        alert("Something went wrong please Logout and then Login Again");
      }
    } else {
      alert("Something went wrong please Logout and then Login Again");
    }
  }
}
