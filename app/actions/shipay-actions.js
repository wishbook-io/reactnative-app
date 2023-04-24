export const INITIALIZE_SHIPPING_DETAILS_ACTION = 'INITIALIZE_SHIPPING_DETAILS_ACTION';
export const INITIALIZE_SHIPPING_DETAILS_SUCCESS = 'INITIALIZE_SHIPPING_DETAILS_SUCCESS';

export const GET_ADDRESS_ACTION = 'GET_ADDRESS_ACTION';
export const GET_ADDRESS_SUCCESS = 'GET_ADDRESS_SUCCESS';

export const ADD_ADDRESS_ACTION = 'ADD_ADDRESS_ACTION';
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS';

export const UPDATE_ADDRESS_ACTION = 'UPDATE_ADDRESS_ACTION';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';

export const DELETE_ADDRESS_ACTION = 'DELETE_ADDRESS_ACTION';
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';

export const GET_SHIPPING_CHARGES_ACTION = 'GET_SHIPPING_CHARGES_ACTION';
export const GET_SHIPPING_CHARGES_SUCCESS = 'GET_SHIPPING_CHARGES_SUCCESS';

export const SELECT_SHIPPING_ADDRESS_ACTION = 'SELECT_SHIPPING_ADDRESS_ACTION';
export const SELECT_SHIPPING_ADDRESS_SUCCESS = 'SELECT_SHIPPING_ADDRESS_SUCCESS';

export const PATCH_SHIPPING_CHARGES_ACTION = 'PATCH_SHIPPING_CHARGES_ACTION';
export const PATCH_SHIPPING_CHARGES_SUCCESS = 'PATCH_SHIPPING_CHARGES_SUCCESS';

export const GET_PAYMENT_MODES_ACTION = 'GET_PAYMENT_MODES_ACTION';
export const GET_PAYMENT_MODES_SUCCESS = 'GET_PAYMENT_MODES_SUCCESS';

export const OFFLINE_PAYMENT_ACTION = 'OFFLINE_PAYMENT_ACTION';
export const OFFLINE_PAYMENT_SUCCESS = 'OFFLINE_PAYMENT_SUCCESS';

export const GET_CASHFREE_TOKEN_DATA_ACTION = 'GET_CASHFREE_TOKEN_DATA_ACTION';
export const GET_CASHFREE_TOKEN_DATA_SUCCESS = 'GET_CASHFREE_TOKEN_DATA_SUCCESS';

export const PATCH_DISPLAY_AMOUNT_ACTION = 'PATCH_DISPLAY_AMOUNT_ACTION';
export const PATCH_DISPLAY_AMOUNT_SUCCESS = 'PATCH_DISPLAY_AMOUNT_SUCCESS';

export const PATCH_RESELLER_TOTAL_AMOUNT_ACTION = 'PATCH_RESELLER_TOTAL_AMOUNT_ACTION';
export const PATCH_RESELLER_TOTAL_AMOUNT_SUCCESS = 'PATCH_RESELLER_TOTAL_AMOUNT_SUCCESS';

export const GET_PINCODES_ACTION = 'GET_PINCODES_ACTION';
export const GET_PINCODES_SUCCESS = 'GET_PINCODES_SUCCESS';

export const GET_DELIVERY_INFO_ACTION = 'GET_DELIVERY_INFO_ACTION';
export const GET_DELIVERY_INFO_SUCCESS = 'GET_DELIVERY_INFO_SUCCESS';
export const GET_DELIVERY_INFO_FAILURE = 'GET_DELIVERY_INFO_FAILURE';

export const initializeShippingDetailsAction = (params) => ({
  type: INITIALIZE_SHIPPING_DETAILS_ACTION,
  params,
});

export const initializeShippingDetailsSuccess = (responseInitializeShippingDetails) => ({
  type: INITIALIZE_SHIPPING_DETAILS_SUCCESS,
  responseInitializeShippingDetails,
});

export const getAddressAction = (params) => ({
  type: GET_ADDRESS_ACTION,
  params,
});

export const getAddressSuccess = (responseGetAddress) => ({
  type: GET_ADDRESS_SUCCESS,
  responseGetAddress,
});

export const updateAddressAction = (id, params, fetchAddresses) => ({
  type: UPDATE_ADDRESS_ACTION,
  id,
  params,
  fetchAddresses,
});

export const updateAddressSuccess = (responseUpdateAddress) => ({
  type: UPDATE_ADDRESS_SUCCESS,
  responseUpdateAddress,
});

export const deleteAddressAction = (id, fetchAddresses) => ({
  type: DELETE_ADDRESS_ACTION,
  id,
  fetchAddresses,
});

export const deleteAddressSuccess = (responseDeleteAddress) => ({
  type: DELETE_ADDRESS_SUCCESS,
  responseDeleteAddress,
});

export const getShippingChargesAction = (params) => ({
  type: GET_SHIPPING_CHARGES_ACTION,
  params,
});

export const getShippingChargesSuccess = (responseGetShippingCharges) => ({
  type: GET_SHIPPING_CHARGES_SUCCESS,
  responseGetShippingCharges,
});

export const selectShippingAddressAction = (params) => ({
  type: SELECT_SHIPPING_ADDRESS_ACTION,
  params,
});

export const selectShippingAddressSuccess = (responseSelectShippingAddress) => ({
  type: SELECT_SHIPPING_ADDRESS_SUCCESS,
  responseSelectShippingAddress,
});

export const patchShippingChargesAction = (params) => ({
  type: PATCH_SHIPPING_CHARGES_ACTION,
  params,
});

export const patchShippingChargesSuccess = (responsePatchShippingCharges) => ({
  type: PATCH_SHIPPING_CHARGES_SUCCESS,
  responsePatchShippingCharges,
});

export const getPaymentModesAction = (params) => ({
  type: GET_PAYMENT_MODES_ACTION,
  params,
});

export const getPaymentModesSuccess = (responseGetPaymentModes) => ({
  type: GET_PAYMENT_MODES_SUCCESS,
  responseGetPaymentModes,
});

export const offlinePaymentAction = (params) => ({
  type: OFFLINE_PAYMENT_ACTION,
  params,
});

export const offlinePaymentSuccess = (responseOfflinePayment) => ({
  type: OFFLINE_PAYMENT_SUCCESS,
  responseOfflinePayment,
});

export const getCashfreeTokenDataAction = (params) => ({
  type: GET_CASHFREE_TOKEN_DATA_ACTION,
  ...params,
});

export const getCashfreeTokenDataSuccess = (responseGetCashfreeTokenData) => ({
  type: GET_CASHFREE_TOKEN_DATA_SUCCESS,
  responseGetCashfreeTokenData,
});

export const patchDisplayAmountAction = (params) => ({
  type: PATCH_DISPLAY_AMOUNT_ACTION,
  params,
});

export const patchDisplayAmountSuccess = (responsePatchDisplayAmount) => ({
  type: PATCH_DISPLAY_AMOUNT_SUCCESS,
  responsePatchDisplayAmount,
});

export const patchResellerTotalAmountAction = (params) => ({
  type: PATCH_RESELLER_TOTAL_AMOUNT_ACTION,
  params,
});

export const patchResellerTotalAmountSuccess = (responsePatchResellerTotalAmount) => ({
  type: PATCH_RESELLER_TOTAL_AMOUNT_SUCCESS,
  responsePatchResellerTotalAmount,
});

export const getPincodesAction = (params) => ({
  type: GET_PINCODES_ACTION,
  params,
});

export const getPincodesSuccess = (responseGetPincodes) => ({
  type: GET_PINCODES_SUCCESS,
  responseGetPincodes,
});

export const getDeliveryInfoAction = (params) => ({
  type: GET_DELIVERY_INFO_ACTION,
  params,
});

export const getDeliveryInfoSuccess = (responseGetDeliveryInfo) => ({
  type: GET_DELIVERY_INFO_SUCCESS,
  responseGetDeliveryInfo,
});

export const getDeliveryInfoFailure = (errorGetDeliveryInfo) => ({
  type: GET_DELIVERY_INFO_FAILURE,
  errorGetDeliveryInfo,
});