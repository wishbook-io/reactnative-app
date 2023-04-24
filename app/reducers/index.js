import { combineReducers } from 'redux';

import themeR from './themeR';
// import nav from './nav';
import loginR from './loginR';
import verifyotpR from './verifyotpR';
import promotionsR from './promotionsR';
import masterListR from './masterListR';
import catalogR from './catalogR';
import brandsR from './brandsR';
import languageR from './languageR';
import enumgroupR from './enumgroupR';
import verifyforgotR from './verifyforgotR';
import wishlistR from './wishlistR';
import productFilterR from './productFilterR.js';
import stateR from './stateR';
import categoryR from './categoryR';
import userR from './userR';
import searchR from './searchR';
import dashboardR from './dashboardR';
import backendR from './backendR';
import wbMoneyR from './wbmoneyR';
import ordersR from './orderR';
import homeR from './homeR';
import cartR from './cartR';
import shipayR from './shipayR';
import creditR from './creditR';
import errorHandlerR from './errorhandlerR';
// import errorHandlerPlaygroundR from './errorhandlerplaygroundR';
import toastR from './toastR';
import loaderR from './loaderR';
import notifierR from './notifierR';
import discountR from './discountR';

const combinedReducers = {
  loginR,
  verifyotpR,
  catalogR,
  dashboardR,
  brandsR,
  promotionsR,
  masterListR,
  themeR,
  productFilterR,
  // nav,
  languageR,
  verifyforgotR,
  enumgroupR,
  wishlistR,
  stateR,
  categoryR,
  userR,
  searchR,
  backendR,
  wbMoneyR,
  ordersR,
  homeR,
  cartR,
  shipayR,
  creditR,
  errorHandlerR,
  // errorHandlerPlaygroundR,
  toastR,
  loaderR,
  notifierR,
  discountR,
}

export default combineReducers(combinedReducers);
