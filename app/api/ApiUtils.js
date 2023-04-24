import { errorActionSet } from '../actions/error-actions';
import { put } from 'redux-saga/effects';

import { isDev } from '../utils/debugVars';
const logErrors = isDev;

export var METHOD = {
    GET: 'GET',
    POST: 'POST',
    OPTIONS: 'OPTIONS',
    HEAD: 'HEAD',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    CONNECT: 'CONNECT',
    TRACE: 'TRACE',
    DELETE: 'DELETE',
    FILEUPLOAD: 'FILEUPLOAD'
}

export var HEADERS = {
    BASE: {
        'Accept': 'application/json'
    },
    CONTENT: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

export var ApiUtils = {
    checkStatus: function (response) {
        // isDev? console.log('Response API ', response) : null;
        if (response.ok) {
            response['dateTime'] = Date.now();
            return response;
        } else {

            if (response.status == 401 || response.status == 401) {
                logErrors? console.log("checkStatus Error: doLogout " + response.status) : null;
                response.statusText = "Logout";
            } else if (response.status == 404) {
                logErrors? console.log("checkStatus Error: not found " + response.status) : null;
                response.statusText = "Data not found";
            } else if (response.status == 400) {
                logErrors? console.log("checkStatus Error: showAlert " + response.status) : null;
                response.statusText = "Invalid details";
            } else if (response.status == 500 || response.status == 502) {
                logErrors? console.log("checkStatus Error: server error " + response.status) : null;
                response.statusText = "Server Error";
                logErrors? console.log(response._bodyText) : null;
            } else {
                logErrors? console.log("checkStatus unknown error", response) : null;
            }

            //var error = { error: response, dateTime: Date.now() };
            //put(errorActionSet(error));
            response['dateTime'] = Date.now();
            throw response;
        }
    }
};


export function objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
}