import { Platform } from 'react-native';
import Resource from './Resource';
import consts from '../utils/const';

export default class UserRepo {
  
  constructor(url, model, cache = false) {
    this.resource = new Resource(url, model, cache)
    //this.resource = new Resource(`/companies/${companyId}/catalogs/`, 'ResponsePromotion' , true);
    //this.resourceDropDown = new Resource(`companies/${consts.COMPANY_ID}/catalog/dropdown`, "CatalogDropDown", true);
  }
  
  getListOfCountries() {
    return this.resource.list();
  }
  getListofStates(){
    return this.resource.list();
  }
  generateOTP(action) {
    var jsonBody = JSON.stringify({
      'phone_number': action.phone_number,
      'country': action.country,
      'registration_id': action.registration_id
    });
    return this.resource.save(jsonBody)
  }
  
  loginWithOtpPwd(action) {
    const isOtp = action.loginType === consts.LOGIN_OTP
    const jsonBody = {
      'phone_number': action.phone_number,
      'country': action.country,
      ...(isOtp? {otp: action.otp} : {password: action.password}),
      'registration_id': action.token,
      'login_for': Platform.select({
        ios: 'iphone',
        android: 'android',
        web: 'lite',
        default: 'unknown',
      })
    };
    
    return this.resource.save(JSON.stringify(jsonBody))
  }
  
  resendOTP(action) {
    var jsonBody = JSON.stringify({
      'phone_number': action.phone_number,
      'country': action.country
    });
    return this.resource.save(jsonBody)
  }
  
  getUserDetails = () => {
    return this.resource.get()
  }
  
  getUserCompany() {
    return this.resource.get()
  }
  
  getUserDetailsForgot() {
    return this.resource.get()
  }
  
  getResetPasswordOTP(action){
    var jsonBody = JSON.stringify({ 
      "country": action.country,
      "phone_number": action.phone_number  
    });
    return this.resource.save(jsonBody);
  }
  
  getResetPassword(action){
    var jsonBody = JSON.stringify({ 
      "otp": action.otp,
      "password": action.password,
      "country": action.country,
      "phone_number": action.phone_number  
    });
    return this.resource.save(jsonBody);
  }
  
  registerGuestUser(params){
    return this.resource.save(JSON.stringify(params));
  }
  
  setPlatformInfo(deviceId, fcmToken) {
    var jsonBody = JSON.stringify({
      'device_id': deviceId,
      'registration_id': fcmToken,
      'cloud_message_type': 'FCM',
    });
    return this.resource.save(jsonBody);
  }
  
  patchUserProfile = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }

  patchCompanyProfile = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }

  patchCompanyType = (params = {}) => {
    const queryParams = {
      ...params,
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }

  registerApns(registration_id,deviceId, active){
      var jsonBody = JSON.stringify({
          'deviceId':deviceId,
          'registration_id': registration_id,
          'active': active,
      });
      console.log('registerApns request',jsonBody)
      return this.resource.save(jsonBody);
  }
  
  changePassword = (password) => {
    const queryParams = {
      new_password1: password,
      new_password2: password,
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }

  logout = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }

  getKyc = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  postKyc = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }

  patchKyc = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }

  getBankDetails = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  postBankDetails = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }

  patchBankDetails = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.patch(JSON.stringify(queryParams), false);
  }

  getNotificationPreferences = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.list(queryParams, false);
  }

  postNotificationPreferences = (params = {}) => {
    const queryParams = {
      ...params
    }
    return this.resource.save(JSON.stringify(queryParams), false);
  }
}
