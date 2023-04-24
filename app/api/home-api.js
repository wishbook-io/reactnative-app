import consts from "../utils/const";
import { METHOD, objToQueryString } from "./ApiUtils";
import LocalStorage from '../db/LocalStorage';

export async function getBannerApi() {
    var url = `${consts.BASE_URL}/api/v1/promotions/?language_code=${'en'}`;
    var key = await LocalStorage.getItem(consts.AUTHKEY);
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + key
    };
    var obj = { "url": url, "method": METHOD.GET, "model": 'ResponsePromotion', 'headers': headers };
    return obj;
}

export async function getCatalogApi(type, offset = 0, limit = 10) {
    //get companyId from the userInfo
    let companyId = '';

    const queryString = objToQueryString({
        'view_type': type,
        'limit': limit,
        'offset': offset
    });

    var url = `${consts.BASE_URL}/api/v1/companies/${companyId}/catalogs/?${queryString}`;

    var key = await LocalStorage.getItem(consts.AUTHKEY);
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + key
    };
    var obj = { "url": url, "method": METHOD.GET, "model": 'ResponsePromotion', 'headers': headers };
    return obj;
}