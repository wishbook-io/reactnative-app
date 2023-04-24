import { strings } from './i18n';
import { Platform } from 'react-native';

export const PROD = Platform.OS === 'web'? window.PROD : false;

export const ENABLE_SINGLE_PCS = true;

const CASHFREE_TEST_APP_ID = "";
const CASHFREE_TEST_SECRET_KEY = "";

const CASHFREE_LIVE_APP_ID = "";
const CASHFREE_LIVE_SECRET_KEY = "";

export default {
  dbSchema: 0,
  EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  MIN_PASSWORD_LENGTH: 6,
  BASE_URL: '<your base url>',
  CLIENT_ID: '',
  CLIENT_SECRET: '',
  REGISTRATION_ID:'registration_id',
  BASE_HEADER: {
    'Accept': 'application/vnd.github.v3.full+json',
    'Content-Type': 'application/json',
  },
  BASE_PAGE_LIMIT: 10,
  LOGIN_SCREEN: 'Login',
  LOGIN_OTP: 'OTP',
  REGISTER_STRING:'To access all the features of Wishbook App,please complete your registration',
  LOGIN_PASSWORD: 'PASSWORD',
  AUTHKEY: 'key',
  FCMTOKEN: 'FCMTOKEN',
  STOP_SEELING:'You are selling this catalog',
  START_SELLING:'You were selling this catalog',
  logoutCalled: 'logoutCalled',
  isAskLocation:'isAskLocation',
  isFirstTimeLogin:'isFirstTimeLogin',
  REPOSITORY_LIST_SCREEN: 'RepositoriesList',
  REPOSITORY_DETAILS_SCREEN: 'RepositoryDetails',
  HARDWARE_PRESS_EVENT: 'hardwareBackPress',
  HomeNavigationDrawer: [
  { type: 0, values: { title: strings('homeNavigationDrawer.categories'), isBold: false, icon: 'ic_categories', testId: 'Categories' } },
  { type: 4, values: { title: strings('homeNavigationDrawer.resell_earn'), isBold: false, icon: 'ic_how_to_sell', testId: 'ResellAndEarn' } },
  // { type: 0, values: { title: strings('homeNavigationDrawer.share_app'), isBold: false, icon: 'ic_share', testId: 'ShareApp' } },
  { type: 1, values: { title: 'Seperator' } },
  { type: 2, values: { title: strings('homeNavigationDrawer.settings'), isBold: true } },
  { type: 0, values: { title: strings('homeNavigationDrawer.change_language'), isBold: false, icon: 'ic_language', testId: 'ChangeLanguage' } },
  { type: 0, values: { title: strings('homeNavigationDrawer.change_password'), isBold: false, icon: 'ic_lock', testId: 'ChangePassword' } },
  { type: 0, values: { title: strings('homeNavigationDrawer.profile'), isBold: false, icon: 'ic_user', testId: 'Profile'},  },
  { type: 3, values: { title: strings('homeNavigationDrawer.logout'), isBold: false, icon: 'ic_logout', testId: 'Logout' }, },
  { type: 1, values: { title: 'Seperator' } },
  { type: 0, values: { title: 'Bank Details', isBold: false, icon: 'ic_bank_details', testId: 'BankDetails' } },
  { type: 0, values: { title: 'Contact Us', isBold: false, icon: 'ic_contact_us', testId: 'Contact Us' } },
  { type: 0, values: { title: strings('homeNavigationDrawer.support_chat'), isBold: false, icon: 'ic_chatsupport', testId: 'SupportChat' } },
  { type: 0, values: { title: strings('homeNavigationDrawer.faq'), isBold: false, icon: 'ic_faq', testId: 'Faq' } },
  { type: 0, values: { title: strings('homeNavigationDrawer.about_us'), isBold: false, icon: 'ic_aboutus', testId: 'AboutUs' } }
  ],
  OrderItems: [{

  }],
  GET_PROFILE_LIST: 'get_profile_list',
  PROFILE_LANGUAGE: 'profile_language',
  LANGUAGE_SET: 'language_set',
  MOBILE_NO: 'MOBILE_NO',
  existingUser: (mob_no) => 'existing_user_' + mob_no,
  userInfo: 'userInfo',
  SHIPMENT_READYTOSHIP : "Ready to Ship",
  SHIPMENT_CREATED : 'Created',
  SHIPMENT_DISPATCHED : "Dispatched",
  SHIPMENT_DELIVERED : "Delivered",
  SHIPMENT_RETURNED : "Returned",
  COUNTRYID:"CountryId",
  
  //-------Products-------
  PRODUCT_TYPES: {
    CATALOG: 'Catalog',
    NON_CATALOG: 'Non-Catalog',
    SET_MATCHING: 'Set matching',
  },
  //--------------
  
  //-------Shipay-------
  PAYMENT_NOTE_OTHER: 'This option should be used only if you made the payment to our executive.\nCOD is available only in Mumbai, Ahmedabad, Surat, Patna, Pune, Indore and Delhi.',
  PAYMENT_NOTE_CHEQUE: 'Please write a cheque in the name of \'Wishbook Infoservices Pvt. Ltd\' and submit it to the bank. Your order will be dispatched only after the money is in our account.',
  PAYMENT_DETAILS: 'Payment Details',
  ACCOUNT_NAME: 'Account Name',
  ACCOUNT_NUMBER: 'Account Number',
  BRANCH_ADDRESS: 'Branch Address',
  BRANCH_IFSC: '',
  GST: '',
  RESELLER_SWITCH_ON_NOTE: 'Switch this OFF if you do not want us to ship this order to your end customer at a higher price including your margins.',
  RESELLER_SWITCH_OFF_NOTE: 'Switch this ON if you want us to ship this order to your end customer at a higher price including your margins.',
  RESELLER_RESELL_AMOUNT_NOTE: 'Enter the \'Resell Amount\' including your margin and shipping for each item. This amount will be mentioned in the bill sent to your customer.', 
  RESELLER_RESELL_AMOUNT_COD_NOTE: 'Enter the \'Resell Amount\' including your margin and shipping for each item. This\'ll be the amount that we will charge your customer.', 
  //--------------

  //-------Cashfree-------
  CASHFREE_APP_ID: PROD? CASHFREE_LIVE_APP_ID : CASHFREE_TEST_APP_ID,
  CASHFREE_SECRET_KEY: PROD? CASHFREE_LIVE_SECRET_KEY : CASHFREE_TEST_SECRET_KEY,
  //--------------

  //-------Order Details-------
  ORDER_TYPE_PREPAID: 'Prepaid',
  PAYMENT_PARTIALLY_PAID: 'Partially Paid',
  ORDER_PROCESSING_STATUS_PENDING: 'Pending',
  ORDER_PAYMENT_STATUS_PENDING: 'Pending',
  BUYER_COD_ORDER_NOTE: 'Please note that If you do not accept this order, or deny cash payment during delivery, your advance amount will NOT be refunded.',
  RESELLER_COD_ORDER_NOTE: 'Note : If your customer fails to pay the cash after delivery, the advance amount paid by you will not be refunded.',
  OFFLINE_ORDER_FULL_PAYMENT_NOTE: 'Order will not be dispatched unless the full amount is in our account.',
  //--------------

  //-------Applozic-------
  APPLOZIC_APP_ID: '',
  //--------------

  //-------Server constants-------
  SELLER_APPROVAL_PENDING: "Pending Approval",
  SELLER_APPROVAL_APPROVED: "Approved",
  SELLER_APPROVAL_REJECTED: "Disabled",
  //--------------

  //-------Resell-------
  HOW_TO_SELL_URL: '',
  //--------------
}

export const ASYNC_STORAGE = {
  "NOTIFICATIONS": (mob_no) => "Notifications_" + mob_no,
  "UNREAD_NOTIFICATIONS": (mob_no) => "UnreadNotifications_" + mob_no,
  "ORDERING": "ORDERING",
}