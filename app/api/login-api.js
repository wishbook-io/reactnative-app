import consts from "../utils/const";
import { METHOD } from "./ApiUtils";
import LocalStorage from '../db/LocalStorage';


export function getListOfCountriesApi() {
    var url = `${consts.BASE_URL}/api/v1/country/`;
    var headers = {
        'Accept': 'application/json'
    };
    var obj = { "url": url, "method": METHOD.GET, "model": 'Countries', "headers": headers };
    return obj;
}


// {"registration_id":"fcm refresh token",
// "country":"1","phone_number":"6987412369"}
export function generateOTPApi(phone_number, country, registration_id) {
    var url = `${consts.BASE_URL}/api/v1/user-authentication/`;
    var jsonBody = JSON.stringify({
        'phone_number': phone_number,
        'country': country,
        'registration_id': registration_id
    });
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    var obj = { "url": url, "method": METHOD.POST, "model": 'AuthenticationModel', "body": jsonBody, "headers": headers };
    return obj;
}

// {"otp":"6 digit", or password:"adadfaf"
// "country":"1","phone_number":"6987412369"}
// response {"key":"5662e1bc9540ed3635a688d9bf3bb1e05ab74680"}
export function loginWithOtpPwd(loginType, phone_number, country, otp = '', password = '') {
    console.log('value login with otp pwd ---------------------------------------------------', loginType, phone_number, country, otp, password)
    var url = `${consts.BASE_URL}/api/v1/user-authentication/`;
    var jsonBody = ''
    if (loginType === consts.LOGIN_OTP) {
        jsonBody = JSON.stringify({
            'phone_number': phone_number,
            'country': country,
            'otp': otp
        });
    }

    if (loginType === consts.LOGIN_PASSWORD) {
        jsonBody = JSON.stringify({
            'phone_number': phone_number,
            'country': country,
            'password': password
        });
    }

    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    var obj = { "url": url, "method": METHOD.POST, "body": jsonBody, "headers": headers };
    return obj;
}


// {"country":"1","phone_number":"6987412369"}
export function resendOTPApi(phone_number, country) {
    var url = `${consts.BASE_URL}/api/v1/user-authentication/`;
    var jsonBody = JSON.stringify({
        'phone_number': phone_number,
        'country': country
    });
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    var obj = { "url": url, "method": METHOD.POST, "model": 'AuthenticationModel', "body": jsonBody, "headers": headers };
    return obj;
}

//header {"Authorization":"Token 5662e1bc9540ed3635a688d9bf3bb1e05ab74680"}
//response : {"id":4597,"username":"919087899315","first_name":"hjikngftui","last_name":"","email":"919087899315@wishbooks.io","groups":[1],
//"companyuser":{"id":4251,"username":"919087899315","companyname":"Colan Info Tech","company_type":"manufacturer","brand_added_flag":"no",
//"deputed_to_name":null,"total_my_catalogs":0,"total_brand_followers":0,"company_group_flag":{"id":3845,"name":"Colan Info Tech","city":"Chennai",
//"phone_number":"9087899315","manufacturer":true,"wholesaler_distributor":false,"retailer":false,"online_retailer_reseller":false,"broker":false,
//"company":4080},"address":3933,"company":4080,"deputed_from":null,"user":4597,"deputed_to":null},"userprofile":{"alternate_email":"","country":1,
//"phone_number":"9087899315","phone_number_verified":"yes","user_image":null,"tnc_agreed":true,"warehouse":null,"browser_notification_disable":false,
//"user_approval_status":"Approved","is_profile_set":false,
//"language":1},"date_joined":"2018-05-03T13:42:04.147349Z","last_login":"2018-06-13T13:05:19.011820Z","is_active":true,"is_staff":false}
export async function getUserDetailsApi() {
    var url = `${consts.BASE_URL}/api/v1/auth/user/`;
    var key = await LocalStorage.getItem(consts.AUTHKEY);
    console.log('token', key);
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + key
    };
    var obj = { "url": url, "method": METHOD.GET, "model": 'UserInfo', 'headers': headers };
    return obj;
}