import { getNetInfo } from '../utils/network';
import Queries from '../db/Queries';
import { CallAPI } from '../api/callApi';

export async function getFromNetwork(obj, cacheIt = false) {
    console.log('1', obj.body)
    if (getNetInfo) {
        var response = await CallAPI(obj.url, obj.method, obj.body, obj.headers);
        if (cacheIt) {
            //cache in realm
            await Queries.create(obj.model, response);
        }
        console.log('2', JSON.stringify(obj))
        if (response.ok) {
            let responseObj = await response.json();
            var responseFinal = { response: responseObj }
            return responseFinal;
        } else {
            console.log('2 error', response.ok)
            // if (response.status == 400) {
            //     let responseObj = await response.json();
            //     var error = { error: responseObj }
            //     console.log('2 error json', error)
            //     return error;
            // } else {
            var error = { error: response.statusText }
            console.log('2 error', error)
            return error;
            // }
        }
    } else {
        console.log('3', JSON.stringify(obj), response)
        var error = { error: 'No Internet' }
        return error;
    }
}

export function getFromCache(obj, cacheIt = false) {
    console.log('4', JSON.stringify(obj.model))
    if (!Queries.isEmpty(obj.model)) {//fetch data from cache if cache is not empty
        //get the data from realm
        console.log('5', JSON.stringify(obj))
        var responseFinal = { response: Queries.getCountries(obj.model) }
        return responseFinal;
    } else {
        console.log('6', JSON.stringify(obj))
        return getFromNetwork(obj, cacheIt);
    }
}