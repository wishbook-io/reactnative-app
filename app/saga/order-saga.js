import { all, takeEvery, call, put } from 'redux-saga/effects';

import {
  GET_PURCHASE_ORDERS_ACTIONS,        setPurchaseOrdersSuccess,
  GET_SALES_ORDERS_ACTIONS,           setSalesOrdersSuccess,
  GET_SALES_ORDER_DETAIL_ACTION,      setSalesOrderDetailSuccess,
  GET_PURCHASE_ORDER_DETAIL_ACTION,   setPurchaseOrderDetailSuccess,
  CANCEL_PURCHASE_ORDER_ACTION,       setCancelPurchaseOrderSuccess,
  GET_LEADQUIRY_ACTION,               getLeadquirySuccess,
  GET_GROUPED_LEADS_ACTION,           getGroupedLeadsSuccess,
  GET_COD_RECONFIRMABLE_ORDER_ACTION, getCodReconfirmableOrderSuccess,
  PATCH_PURCHASE_ORDER_ACTION,        patchPurchaseOrderSuccess,
} from '../actions/order-actions';
import { errorActionSet } from '../actions/error-actions';
import OrderRepo from './repository/order-repo';
import { URLConstants } from "../utils/URLConstants";

import { debugLog } from 'app/utils/debugVars'

function* getPurchaseOrders(action){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('purchaseorder', '');
    
    debugLog? console.log("[getPurchaseOrders] url, action", url, action) : null;
    if(url===undefined) {
      console.log("########returning from saga, received an undefined URL");
      return;
    }
    
    var orderRepo = new OrderRepo(url, model = '', false);
    
    const { response, error } = yield call(orderRepo.getOrders.bind(orderRepo),action.params);
    
    debugLog? console.log("[getPurchaseOrders] call response: ", response, error) : null;
    
    if (response) {
      yield put(setPurchaseOrdersSuccess(response, action.isRefreshing));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}


function* getSalesOrders(action){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('salesorder', '');
    
    debugLog? console.log("[getSalesOrders] url, action", url, action) : null;
    if(url===undefined) {
      console.log("########returning from saga, received an undefined URL");
      return;
    }
    
    var orderRepo = new OrderRepo(url, model = '', false);
    
    const { response, error } = yield call(orderRepo.getOrders.bind(orderRepo),action.params);
    
    debugLog? console.log("[getSalesOrders] call response: ", response, error) : null;
    
    if (response) {
      yield put(setSalesOrdersSuccess(response, action.isRefreshing));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function * getSalesOrderDetail(actions){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('salesorders_catalogwise',actions.id);
    
    debugLog? console.log("[getSalesOrderDetail] url obj", url) : null;
    
    var orderRepo = new OrderRepo(url, model = '', false);
    
    const { response, error } = yield call(orderRepo.getOrderDetail.bind(orderRepo));
    
    debugLog? console.log("[getSalesOrderDetail] call response: ", response, error) : null;
    
    if (response) {
      yield put(setSalesOrderDetailSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function * getPurchaseOrderDetail(actions){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('purchaseorders_catalogwise', actions.id);
    debugLog? console.log("[getPurchaseOrderDetail] url obj", url) : null;
    
    
    var orderRepo = new OrderRepo(url, model = '', false);
    
    const { response, error } = yield call(orderRepo.getOrderDetail.bind(orderRepo));
    
    debugLog? console.log("[getPurchaseOrderDetail] call response: ", response, error) : null;
    
    if (response) {
      yield put(setPurchaseOrderDetailSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function * cancelPurchaseOrder(actions){
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('purchaseorder', actions.id);
    debugLog? console.log("[cancelPurchaseOrder] url obj", url) : null;
    
    
    var orderRepo = new OrderRepo(url, model = '', false);
    
    const { response, error } = yield call(orderRepo.cancelOrder.bind(orderRepo),actions.id,actions.processing_status,actions.supplier_cancel);
    
    debugLog? console.log("[cancelPurchaseOrder] call response: ", response, error) : null;
    
    if (response) {
      yield getPurchaseOrderDetail(actions);
      yield put(setCancelPurchaseOrderSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getLeadquiry(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('catalog-enquiries', '');
    debugLog? console.log("[getLeadquiry] url, action", url, action) : null;

    var orderRepo = new OrderRepo(url, model = '', false);
    
    const { response, error } = yield call(orderRepo.getLeadquiry, action.params);

    if (response) {
      yield put(getLeadquirySuccess(response));
      return { response }
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* getGroupedLeads(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('buyer-leads', '');
    debugLog? console.log("[getGroupedLeads] url, action", url, action) : null;

    var orderRepo = new OrderRepo(url, model = '', false);
    
    const { response, error } = yield call(orderRepo.getGroupedLeads, action.params);
    if (response) {
      yield put(getGroupedLeadsSuccess(response));
      return { response }
    } else {
      yield put(errorActionSet(error));
      return { error }
  }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* getCodReconfirmableOrder(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('purchaseorder', '');
    
    debugLog? console.log("[getCodReconfirmableOrder] url, action", url, action) : null;
    
    const orderRepo = new OrderRepo(url, model = '', false);
    
    const { response, error } = yield call(orderRepo.getCodReconfirmableOrder, action.params);
    
    debugLog? console.log("[getCodReconfirmableOrder] call response: ", response, error) : null;
    if (response) {
      yield put(getCodReconfirmableOrderSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* patchPurchaseOrder(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('purchaseorder', action.id);
    debugLog? console.log("[patchPurchaseOrder] url obj", url) : null;
    
    var orderRepo = new OrderRepo(url, model = '', false);
    
    const { response, error } = yield call(orderRepo.patchPurchaseOrder, action.params);
    
    debugLog? console.log("[patchPurchaseOrder] call response: ", response, error) : null;
    if (response) {
      yield put(patchPurchaseOrderSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export default orderTabRootSaga = [
  takeEvery(GET_PURCHASE_ORDERS_ACTIONS,        getPurchaseOrders),
  takeEvery(GET_SALES_ORDERS_ACTIONS,           getSalesOrders),
  takeEvery(GET_SALES_ORDER_DETAIL_ACTION,      getSalesOrderDetail),
  takeEvery(GET_PURCHASE_ORDER_DETAIL_ACTION,   getPurchaseOrderDetail),
  takeEvery(CANCEL_PURCHASE_ORDER_ACTION,       cancelPurchaseOrder),
  takeEvery(GET_LEADQUIRY_ACTION,               getLeadquiry),
  takeEvery(GET_GROUPED_LEADS_ACTION,           getGroupedLeads),
  takeEvery(GET_COD_RECONFIRMABLE_ORDER_ACTION, getCodReconfirmableOrder),
  takeEvery(PATCH_PURCHASE_ORDER_ACTION,        patchPurchaseOrder),
]