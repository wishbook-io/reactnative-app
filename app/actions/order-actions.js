export const GET_SALES_ORDERS_ACTIONS = "GET_SALES_ORDERS_ACTIONS";
export const GET_SALES_ORDERS_SUCCESS = "GET_SALES_ORDERS_SUCCESS";

export const GET_PURCHASE_ORDERS_ACTIONS = "GET_PURCHASE_ORDERS_ACTIONS";
export const GET_PURCHASE_ORDERS_SUCCESS = "GET_PURCHASE_ORDERS_SUCCESS";

export const GET_SALES_ORDER_DETAIL_ACTION ="GET_SALES_ORDER_DETAIL_ACTION";
export const GET_SALES_ORDER_DETAIL_SUCCESS ="GET_SALES_ORDER_DETAIL_SUCCESS";

export const GET_PURCHASE_ORDER_DETAIL_ACTION ="GET_PURCHASE_ORDER_DETAIL_ACTION";
export const GET_PURCHASE_ORDER_DETAIL_SUCCESS ="GET_PURCHASE_ORDER_DETAIL_SUCCESS";

export const CANCEL_PURCHASE_ORDER_ACTION ="CANCEL_PURCHASE_ORDER_ACTION";
export const CANCEL_PURCHASE_ORDER_SUCCESS ="CANCEL_PURCHASE_ORDER_SUCCESS";

export const GET_LEADQUIRY_ACTION = 'GET_LEADQUIRY_ACTION';
export const GET_LEADQUIRY_SUCCESS = 'GET_LEADQUIRY_SUCCESS';

export const GET_GROUPED_LEADS_ACTION = 'GET_GROUPED_LEADS_ACTION';
export const GET_GROUPED_LEADS_SUCCESS = 'GET_GROUPED_LEADS_SUCCESS';

export const GET_COD_RECONFIRMABLE_ORDER_ACTION = 'GET_COD_RECONFIRMABLE_ORDER_ACTION';
export const GET_COD_RECONFIRMABLE_ORDER_SUCCESS = 'GET_COD_RECONFIRMABLE_ORDER_SUCCESS';

export const PATCH_PURCHASE_ORDER_ACTION = 'PATCH_PURCHASE_ORDER_ACTION';
export const PATCH_PURCHASE_ORDER_SUCCESS = 'PATCH_PURCHASE_ORDER_SUCCESS';

export const getSalesOrdersAction = (params, isRefreshing) => ({
  type: GET_SALES_ORDERS_ACTIONS,
  params,
  isRefreshing,
});

export const setSalesOrdersSuccess = (responseSalesOrders, isRefreshing) => ({
  type: GET_SALES_ORDERS_SUCCESS,
  responseSalesOrders,
  isRefreshing,
});

export const getPurchaseOrdersAction = (params, isRefreshing) => ({
  type: GET_PURCHASE_ORDERS_ACTIONS,
  params,
  isRefreshing,
});

export const setPurchaseOrdersSuccess = (responsePurchaseOrders, isRefreshing) => ({
  type: GET_PURCHASE_ORDERS_SUCCESS,
  responsePurchaseOrders,
  isRefreshing,
});

export const getSalesOrderDetailAction = (id=null)=>({
  type:GET_SALES_ORDER_DETAIL_ACTION,
  id
})

export const setSalesOrderDetailSuccess = (responseSalesOrderDetail)=>({
  type:GET_SALES_ORDER_DETAIL_SUCCESS,
  responseSalesOrderDetail
})

export const getPurchaseOrderDetailAction = (id=null)=>({
  type:GET_PURCHASE_ORDER_DETAIL_ACTION,
  id
})

export const setPurchaseOrderDetailSuccess = (responsePurchaseOrderDetail)=>({
  type:GET_PURCHASE_ORDER_DETAIL_SUCCESS,
  responsePurchaseOrderDetail
})


export const cancelPurchaseOrderAction =(id,processing_status,supplier_cancel)=>({
  type:CANCEL_PURCHASE_ORDER_ACTION,
  id,
  processing_status,
  supplier_cancel
})

export const setCancelPurchaseOrderSuccess = (responseCancelOrder)=>({
  type:CANCEL_PURCHASE_ORDER_SUCCESS,
  responseCancelOrder
})

export const getLeadquiryAction = (params) => ({
  type: GET_LEADQUIRY_ACTION,
  params,
});

export const getLeadquirySuccess = (responseGetLeadquiry) => ({
  type: GET_LEADQUIRY_SUCCESS,
  responseGetLeadquiry,
});

export const getGroupedLeadsAction = (params) => ({
  type: GET_GROUPED_LEADS_ACTION,
  params,
});

export const getGroupedLeadsSuccess = (responseGetGroupedLeads) => ({
  type: GET_GROUPED_LEADS_SUCCESS,
  responseGetGroupedLeads,
});

export const getCodReconfirmableOrderAction = (params) => ({
  type: GET_COD_RECONFIRMABLE_ORDER_ACTION,
  params,
});

export const getCodReconfirmableOrderSuccess = (responseGetCodReconfirmableOrder) => ({
  type: GET_COD_RECONFIRMABLE_ORDER_SUCCESS,
  responseGetCodReconfirmableOrder,
});

export const patchPurchaseOrderAction = (id, params) => ({
  type: PATCH_PURCHASE_ORDER_ACTION,
  id,
  params,
});

export const patchPurchaseOrderSuccess = (responsePatchPurchaseOrder) => ({
  type: PATCH_PURCHASE_ORDER_SUCCESS,
  responsePatchPurchaseOrder,
});