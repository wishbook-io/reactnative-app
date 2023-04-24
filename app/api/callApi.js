import { ApiUtils, METHOD, HEADERS } from './ApiUtils'
import { getNetInfo } from '../utils/network';
import LocalStorage from '../db/LocalStorage';
import consts from '../utils/const';
import { isWeb } from 'app/utils/PlatformHelper'

// import { debugLog } from '../utils/debugVars';
import { isDev } from '../utils/debugVars';
const debugLog = false;

const logErrors = process.env.NODE_ENV === 'development';

export function CallAPI(url, method, postData = "") {
  if (getNetInfo()) {
    isDev || debugLog? console.log("[CallAPI]",url,method, postData) : null;
    if (method.toUpperCase() === METHOD.GET) {
      return callGetApi(url);
    }
    else if (method.toUpperCase() == METHOD.FILEUPLOAD) {
      return fileUpload(url, postData);
    } 
    else {
      return callPostApi(url, method, postData);
    }
  } else {
    var error = { error: 'No Internet' }
    return error;
  }
}

async function callGetApi(url) {
  
  var key = await LocalStorage.getItem(consts.AUTHKEY);
  
  var headers = HEADERS.CONTENT;
  if (key) {
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + key
    };
  }
  
  debugLog? console.log(url, headers) : null;
  return fetch(url, {
    'method': METHOD.GET,
    'headers': headers
  })
  .then(ApiUtils.checkStatus)
  .then(response => {
    isDev || debugLog? console.log('[callGetApi] DONE url', url) : null;
    return response;
  }).catch((error) => {
    logErrors || debugLog? console.log("[callGetApi] url, error", url, error) : null;
    return error;
  });
}

async function callPostApi(url, method, postData) {
  var key = await LocalStorage.getItem(consts.AUTHKEY);
  var headers = HEADERS.CONTENT;
  if (key) {
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + key
    };
  }
  debugLog? console.log(url, method, postData, headers) : null;
  return fetch(url, {
    'method': method,
    'headers': headers,
    'body': postData
  })
  .then(ApiUtils.checkStatus)
  .then(response => {
    isDev || debugLog? console.log("[callPostApi] DONE url", url) : null;
    return response;
  })
  .catch((error) => {
    logErrors || debugLog? console.log("[callPostApi] url, error", url, error) : null;
    return error;
  });
}

async function fileUpload(url, formData) {
  var key = await LocalStorage.getItem(consts.AUTHKEY);
  var headers = HEADERS.CONTENT;
  if (key) {
    var headers = {
      'Accept': 'application/json',
      'Authorization': 'Token ' + key
    };
    if(!isWeb) {
      headers['Content-Type'] = 'multipart/form-data'
    }
  }
  debugLog? console.log("[fileUpload]", url, formData, headers) : null;
  return fetch(url, {
    'method': METHOD.POST,
    'headers': headers,
    'body': formData
  })
  .then(ApiUtils.checkStatus)
  .then(response => {
    debugLog? console.log("[fileUpload]", response) : null;
    return response;
  })
  .catch((error) => {
    logErrors || debugLog? console.log("[fileUpload] url, error", url, error) : null;
    return error;
  });
}
