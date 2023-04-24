import { all, takeEvery, call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga'

import {getCititesAction, getStatesAction} from '../actions/state-actions';
import {getListOfStates, getListOfCities} from './state-saga';

import { 
  getCatalogWiseCartDetailsAction, 
  clearCatalogWiseCartDetails,
  updateCartAfterPatch,
} from '../actions/cart-actions';
import { getCatalogWiseCartDetails } from './cart-saga';

import { getStatisticsAction } from '../actions/dashboard-actions';
import { getStatistics } from './dashboard-saga';

import {
  GET_ADDRESS_ACTION,                 getAddressSuccess,                getAddressAction,
  INITIALIZE_SHIPPING_DETAILS_ACTION, initializeShippingDetailsSuccess,
  UPDATE_ADDRESS_ACTION,              updateAddressSuccess,
  DELETE_ADDRESS_ACTION,              deleteAddressSuccess,
  GET_SHIPPING_CHARGES_ACTION,        getShippingChargesSuccess,        getShippingChargesAction,
  SELECT_SHIPPING_ADDRESS_ACTION,     selectShippingAddressSuccess,
  PATCH_SHIPPING_CHARGES_ACTION,      patchShippingChargesSuccess,
  GET_PAYMENT_MODES_ACTION,           getPaymentModesSuccess,
  OFFLINE_PAYMENT_ACTION,             offlinePaymentSuccess,
  GET_CASHFREE_TOKEN_DATA_ACTION,     getCashfreeTokenDataSuccess,
  PATCH_DISPLAY_AMOUNT_ACTION,        patchDisplayAmountSuccess,
  PATCH_RESELLER_TOTAL_AMOUNT_ACTION, patchResellerTotalAmountSuccess,
  GET_PINCODES_ACTION,                getPincodesSuccess,
  GET_DELIVERY_INFO_ACTION,           getDeliveryInfoSuccess,           getDeliveryInfoFailure,
} from '../actions/shipay-actions';
import { errorActionSet } from '../actions/error-actions';

import ShipayRepo from './repository/shipay-repo';
import { URLConstants, CONSTANT_URL } from "../utils/URLConstants";
import consts from '../utils/const';
import UserHelper from '../config/userHelper';
import { debugLog } from '../utils/debugVars';

export function* getAddress(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('address', '');
    // url = 
    debugLog? console.log("[getAddress] url, action", url, action) : null;

    const shipayRepo = new ShipayRepo(url, model = '', false);
    const { response, error } = yield call(shipayRepo.getAddress, action.params);
    debugLog? console.log("[getAddress] call response: ", response, error) : null;
    
    if (response) {
      yield put(getAddressSuccess(response));
      return { response }
    } else {
      yield put(errorActionSet(error, action.type));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error, action.type));
    return { error }
  }
}

// this saga is responsible to do the following
// 1. fetch the addresses
// 2. fetch the states
// 3. fetch the cities for the states mentioned in 1
// 4. get shipping charges
//
// 1 & 2 can be run in parallel
// 3 consists of multiple calls to be done
export function* initializeShippingDetails(action) {
  try {
    const [
      {response: responseGetAddress, error: errorGetAddress}, 
      // { response: responseShippingCharges, error: errorShippingCharges}
    ] = yield all([
      call(getAddress, getAddressAction()),
      // call(getShippingCharges, getShippingChargesAction({cart: UserHelper.getLatestCartId()})),
    ]);

    if(errorGetAddress) {
      return { error: errorGetAddress } 
    }

    // if(errorShippingCharges) {
    //   return { error: errorShippingCharges } 
    // }

    const result = {
      responseGetAddress,
      // responseShippingCharges,
    }
    
    yield put(initializeShippingDetailsSuccess(result));
    return { response: result }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* updateAddress(action) {
  try {
    let repo = 'addAddress'
    let urlKey = 'address'
    if(action.id) {
      urlKey = 'address-id'
      repo = 'patchAddress'
    }
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl(urlKey, action.id);
    debugLog? console.log("[updateAddress] url, action", url, action) : null;

    const shipayRepo = new ShipayRepo(url, model = '', false);
    const { response, error } = yield call(shipayRepo[repo], action.params);
    debugLog? console.log("[updateAddress] call response: ", response, error) : null;

    if(action.fetchAddresses) {
      yield call(getAddress, getAddressAction())
    }
    
    if (response) {
      yield put(updateAddressSuccess(response));
      return { response };
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* deleteAddress(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('address-id', action.id);
    // url = 
    debugLog? console.log("[deleteAddress] url, action", url, action) : null;

    const shipayRepo = new ShipayRepo(url, model = '', false);
    const { response, error } = yield call(shipayRepo.deleteAddress);
    debugLog? console.log("[deleteAddress] call response: ", response, error) : null;
    
    if(action.fetchAddresses) {
      yield call(getAddress, getAddressAction())
    }

    if (response) {
      yield put(deleteAddressSuccess(response));
      return { response };
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* getShippingCharges(action) {
  try {
    const url = CONSTANT_URL.SHIPPING_CHARGE

    debugLog? console.log("[getShippingCharges] url, action", url, action) : null;

    const shipayRepo = new ShipayRepo(url, model = '', false);
    const { response, error } = yield call(shipayRepo.getShippingCharges, action.params);
    debugLog? console.log("[getShippingCharges] call response: ", response, error) : null;

    // [
    //   {
    //     "shipping_charge": 225,
    //     "weight": 3,
    //     "shipping_method_id": 1,
    //     "shipping_method_name": "Air",
    //     "is_default": false,
    //     "only_wishbook_shipping": true,
    //     "shipping_method_duration": "3-6 days from dispatch",
    //     "is_available_reseller": true
    //   },
    //   {
    //     "shipping_charge": 179,
    //     "weight": 3,
    //     "shipping_method_id": 2,
    //     "shipping_method_name": "Surface",
    //     "is_default": true,
    //     "only_wishbook_shipping": true,
    //     "shipping_method_duration": "5-10 days from dispatch",
    //     "is_available_reseller": true
    //   }
    // ]

    if (response) {
      yield put(getShippingChargesSuccess(response));
      return { response };
    } else {
      yield put(errorActionSet(error, action.type));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error, action.type));
    return { error }
  }
}

// whenever user changes the shipping address, we need to
// 1. inform server about it via patching cart ship_to
// 2. now, the shipping charges will have been changed and accordingly the invoice
// 3. therefore, inform the server regarding new shipping charges
// 4. get the cart to update the invoice
// 5. also, due to change in address, the payment methods will have changed

export function* selectShippingAddress(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('cart-id', '');
    
    debugLog? console.log("[selectShippingAddress] url, action", url, action) : null;
    const shipayRepo = new ShipayRepo(url, model = '', false);
    const { response, error } = yield call(shipayRepo.selectShippingAddress, action.params);
    debugLog? console.log("[selectShippingAddress] call response: ", response, error) : null;
    if(error) {
      yield put(errorActionSet(error, action.type))
      return { error }
    }

    yield put(updateCartAfterPatch(response))
    yield put(selectShippingAddressSuccess(response))
    return { response } 

  } catch (error) {
    yield put(errorActionSet(error, action.type));
    return { error }
  }
}

export function* patchShippingCharges(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('cart-id', '');
    
    debugLog? console.log("[patchShippingCharges] url, action", url, action) : null;

    const shipayRepo = new ShipayRepo(url, model = '', false);
    const { response, error } = yield call(shipayRepo.patchShippingCharges, action.params);
    debugLog? console.log("[patchShippingCharges] call response: ", response, error) : null;


    if (response) {
      yield put(updateCartAfterPatch(response));
      yield put(patchShippingChargesSuccess(response));
      return { response }
    } else {
      yield put(errorActionSet(error, action.type));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error, action.type));
    return { error }
  }
}

// a lot of processing has to be done from UI side
// before the payment modes can be displayed, so it is better 
// to return the response to UI so that state can be created
export function* getPaymentModes(action) {
  try {
    let url = CONSTANT_URL.PAYMENT_METHOD_URL
    const cartId = UserHelper.getLatestCartId();
    
    debugLog? console.log("[getPaymentModes] url, action", url, action) : null;

    const shipayRepo = new ShipayRepo(url, model = '', false);
    const { response, error } = yield call(shipayRepo.getPaymentModes, {cart: cartId, ...action.params});
    debugLog? console.log("[getPaymentModes] call response: ", response, error) : null;

    if (response) {
      yield put(getPaymentModesSuccess(response));
      return { response };
    } else {
      yield put(errorActionSet(error));
      return { error }
    }
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* offlinePayment(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('cart-payment', '');
    
    debugLog? console.log("[offlinePayment] url, action", url, action) : null;

    const shipayRepo = new ShipayRepo(url, model = '', false);
    const { response, error } = yield call(shipayRepo.offlinePayment, action.params);
    debugLog? console.log("[offlinePayment] call response: ", response, error) : null;
    // { success: 'Payment done successfully.' }
    if(error) {
      yield put(errorActionSet(error));
      return { error }
    }
    // also clear cart here
    yield put(clearCatalogWiseCartDetails());
    // clear UserHelper as well
    yield put(getStatisticsAction());
    yield put(offlinePaymentSuccess(response));
    return { response };
  } catch (error) {
    yield put(errorActionSet(error));
    return { error }
  }
}

export function* getCashfreeTokenData(action) {
  try {
    const params = {      
      "orderCurrency": "INR",
      "orderAmount": action.amount,
      "orderId": action.orderId + '',
    }
    const url = CONSTANT_URL.CASHFREE_TOKEN;
    const allParams = {
      'method': 'POST',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "X-Client-Secret": consts.CASHFREE_SECRET_KEY,
        "X-Client-Id": consts.CASHFREE_APP_ID,
      },
      'body': JSON.stringify(params)
    }
    debugLog? console.log("[getCashfreeTokenData] params", allParams) : null;
    let response = yield fetch(url, allParams)
    response = yield response.json();
    debugLog? console.log("[getCashfreeTokenData] response", response) : null;
    yield put(getCashfreeTokenDataSuccess(response));
    return response;
  } catch(error) {
    console.log("[getCashfreeTokenData] error", error)
  }
}

export function* patchDisplayAmount(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('cart-id', '');

    debugLog? console.log("[patchDisplayAmount] url, action", url, action) : null;

    const shipayRepo = new ShipayRepo(url, model = '', false);
    const { response, error } = yield call(shipayRepo.patchDisplayAmount, action.params);
    debugLog? console.log("[patchDisplayAmount] call response: ", response, error) : null;

    yield call(getCatalogWiseCartDetails, getCatalogWiseCartDetailsAction())

    if (response) {
      yield put(patchDisplayAmountSuccess(response));
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

export function* patchResellerTotalAmount(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('cart-id', '');

    debugLog? console.log("[patchResellerTotalAmount] url, action", url, action) : null;

    const shipayRepo = new ShipayRepo(url, model = '', false);
    const { response, error } = yield call(shipayRepo.patchResellerTotalAmount, action.params);
    debugLog? console.log("[patchResellerTotalAmount] call response: ", response, error) : null;
    if (response) {
      yield put(patchResellerTotalAmountSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* getPincodes(action) {
  try {
    let url = CONSTANT_URL.PINCODE_ZONE
    debugLog? console.log("[getPincodes] url, action", url, action) : null;

    const shipayRepo = new ShipayRepo(url, model = '', false);
    const { response, error } = yield call(shipayRepo.getPincodes, action.params);
    debugLog? console.log("[getPincodes] call response: ", response, error) : null;
    if (response) {
      yield put(getPincodesSuccess(response));
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

export function* getDeliveryInfo(action) {
  try {
    let url = CONSTANT_URL.DELIVERY_INFO
    debugLog? console.log("[getDeliveryInfo] url, action", url, action) : null;

    const shipayRepo = new ShipayRepo(url, model = '', false);
    const { response, error } = yield call(shipayRepo.getDeliveryInfo, action.params);
    debugLog? console.log("[getDeliveryInfo] call response: ", response, error) : null;
    // yield delay(2000)
    if (response) {
      yield put(getDeliveryInfoSuccess(response));
    } else {
      // yield put(getDeliveryInfoFailure(error));
      yield put(errorActionSet(error, action.type));
    }
  } catch (error) {
    // yield put(getDeliveryInfoFailure(error));
    yield put(errorActionSet(error, action.type));
  }
}

export default shipayRootSaga = [
  takeEvery(GET_ADDRESS_ACTION,                 getAddress),
  takeEvery(INITIALIZE_SHIPPING_DETAILS_ACTION, initializeShippingDetails),
  takeEvery(UPDATE_ADDRESS_ACTION,              updateAddress),
  takeEvery(DELETE_ADDRESS_ACTION,              deleteAddress),
  takeEvery(GET_SHIPPING_CHARGES_ACTION,        getShippingCharges),
  takeEvery(SELECT_SHIPPING_ADDRESS_ACTION,     selectShippingAddress),
  takeEvery(PATCH_SHIPPING_CHARGES_ACTION,      patchShippingCharges),
  takeEvery(GET_PAYMENT_MODES_ACTION,           getPaymentModes),
  takeEvery(OFFLINE_PAYMENT_ACTION,             offlinePayment),
  takeEvery(GET_CASHFREE_TOKEN_DATA_ACTION,     getCashfreeTokenData),
  takeEvery(PATCH_DISPLAY_AMOUNT_ACTION,        patchDisplayAmount),
  takeEvery(PATCH_RESELLER_TOTAL_AMOUNT_ACTION, patchResellerTotalAmount),
  takeEvery(GET_PINCODES_ACTION,                getPincodes),
  takeEvery(GET_DELIVERY_INFO_ACTION,           getDeliveryInfo),
]
