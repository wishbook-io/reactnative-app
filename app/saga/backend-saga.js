import { Platform, Dimensions } from 'react-native';
import { all, takeEvery, call, put } from 'redux-saga/effects';

import {
  POST_CONTACTS_ACTION,       setPostContactsSuccess,
  POST_LOCATION_ACTION,       setPostLocationSuccess,
  GET_APP_VERSION_ACTION,     getAppVersionSuccess,
  POST_USER_PLATFORM_ACTION,  postUserPlatformSuccess,
} from '../actions/backend-actions';
import { errorActionSet } from '../actions/error-actions';
import BackendRepo from './repository/backend-repo';
import { URLConstants, CONSTANT_URL } from "../utils/URLConstants";
import consts from '../utils/const';

import { getAllContacts } from "../utils/ContactsHelper";
import { getLocation } from "../utils/LocationHelper";
import LocalStorage from '../db/LocalStorage';
import UserHelper from '../config/userHelper';
import { getAppVersionCode } from 'app/utils/DeviceInfo'
import { getPlatformToPost } from 'app/utils/PlatformHelper';

import { debugLog } from '../utils/debugVars';

function* postContacts(action) {
  try {
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('contacts_onwishbook', '');
    debugLog? console.log("[postContacts] url obj", url) : null;
    
    let contactsArray = yield getAllContacts();
    if(!contactsArray || contactsArray.length == 0) {
      debugLog? console.log("[postContacts] Aborting saga, no contacts to upload") : null;
      return;
    }
    
    debugLog? console.log("[postContacts] now uploading "+contactsArray.length+" contacts.") : null;
    
    const backendRepo = new BackendRepo(url, model = '', false);
    
    const { response, error } = yield call(backendRepo.postContacts.bind(backendRepo), contactsArray);
    
    debugLog? console.log("[postContacts] call response: ", response, error) : null;
    /*
    find sample output for this below        
    */
    
    if (response) {
      yield put(setPostContactsSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

function* postLocation(action) {
  try {
    debugLog? console.log("[postLocation] requesting location") : null;
    const location = yield getLocation();
    debugLog? console.log("[postLocation] Got location", location) : null;
    if(!location) {
      debugLog? console.log("[postLocation] error getting location. Aborting") : null;
      return;
    }
    
    const addressId = UserHelper.getCompanyAddressId();
    if(!addressId) {
      debugLog? console.log("[postLocation] error getting addressid. Aborting") : null;
      return;
    }
    let urlObj = new URLConstants();
    let url = yield urlObj.companyUrl('address', '');
    url += addressId + '/';
    debugLog? console.log("[postLocation] url obj", url) : null;
    
    const backendRepo = new BackendRepo(url, model = '', false);
    const { response, error } = yield call(backendRepo.postLocation.bind(backendRepo), location);
    debugLog? console.log("[postLocation] call response", response) : null;
    
    if (response) {
      yield put(setPostLocationSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
    
  } catch(error) {
    yield put(errorActionSet(error));
  }
}

export function* getAppVersion(action) {
  try {
    const url = CONSTANT_URL.APP_VERSION_URL
    debugLog? console.log("[getAppVersion] url, action", url, action) : null;

    const versionCode = getAppVersionCode()
    const platform = getPlatformToPost()
    const params = {platform, version_code: versionCode}

    const backendRepo = new BackendRepo(url, model = '', false);
    const { response, error } = yield call(backendRepo.getAppVersion, params);
    debugLog? console.log("[getAppVersion] call response", response) : null;

    if (response) {
      yield put(getAppVersionSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export function* postUserPlatform(action) {
  try {
    const urlObj = new URLConstants()
    const url = yield urlObj.userUrl('user_platform', UserHelper.getUserId())

    const { width, height } = Dimensions.get('window')
    const params = {
      platform: getPlatformToPost(),
      app_version_code:  getAppVersionCode(),
      screen_width: width,
      screen_height: height,
    }

    const backendRepo = new BackendRepo(url, mode = '', false);
    const { response, error } = yield call(backendRepo.postUserPlatform, params)
    if (response) {
      yield put(postUserPlatformSuccess(response));
    } else {
      yield put(errorActionSet(error));
    }
  } catch (error) {
    yield put(errorActionSet(error));
  }
}

export default backendRootSaga = [
  takeEvery(POST_CONTACTS_ACTION,       postContacts),
  takeEvery(POST_LOCATION_ACTION,       postLocation),
  takeEvery(GET_APP_VERSION_ACTION,     getAppVersion),
  takeEvery(POST_USER_PLATFORM_ACTION,  postUserPlatform),
]

/*
[postContacts] call response: ', [ { name: 'Arvind Saraf  Wishbook',
chat_user: '919909618932',
credit_reference_id: null,
company_id: 4194,
phone: '9909618932',
connected_as: '',
company_name: 'Test ',
city_name: 'Surat',
company_image: 'http://b2b.trivenilabs.com/media/logo-single.png',
type: '',
group_type: [],
state_name: 'Gujarat' },
{ name: 'Gaurav  WB',
chat_user: '919971281998',
credit_reference_id: null,
company_id: 4292,
phone: '9971281998',
connected_as: '',
company_name: 'Wishbook',
city_name: 'Surat',
company_image: 'http://b2b.trivenilabs.com/media/logo-single.png',
type: 'buyer',
group_type: [ 4 ],
state_name: 'Gujarat' },
{ name: 'Gaurav  WB',
phone: '9971281998',
credit_reference_id: null,
company_id: 4292,
chat_user: '919971281998',
connected_as: '',
company_name: 'Wishbook',
city_name: 'Surat',
company_image: 'http://b2b.trivenilabs.com/media/logo-single.png',
type: 'supplier',
group_type: [ 2 ],
state_name: 'Gujarat' },
{ name: 'Puna Sim 1',
chat_user: '918412806426',
credit_reference_id: null,
company_id: 4269,
phone: '8412806426',
connected_as: '',
company_name: 'Murtaza Wholsaler Company',
city_name: 'Ahmedabad',
company_image: 'http://b2b.trivenilabs.com/media/logo-single.png',
type: '',
group_type: [],
state_name: 'Gujarat' },
{ name: 'Shubhanga  WB',
chat_user: '919113802059',
credit_reference_id: null,
company_id: 4217,
phone: '9113802059',
connected_as: '',
company_name: 'Shubhashree Creations',
city_name: 'Bengaluru',
company_image: 'http://b2b.trivenilabs.com/media/logo-single.png',
type: '',
group_type: [],
state_name: 'Karnataka' },
{ name: 'Wishbook  Support',
chat_user: 'wishbook_infoservices',
credit_reference_id: null,
company_id: 10,
phone: '9978618989',
connected_as: '',
company_name: 'Wishbook Infoservices',
city_name: 'Surat',
company_image: 'http://b2b.trivenilabs.com/media/logo-single.png',
type: '',
group_type: [],
state_name: 'Gujarat' } ]
*/