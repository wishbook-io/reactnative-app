import { getNetInfo, filterResponse } from '../utils/network';
import { CallAPI } from '../api/callApi';
import Queries from '../db/Queries';
import { METHOD } from "../api/ApiUtils";
import queryString from 'query-string';
import {Alert}  from 'react-native';

// import { debugLog } from '../utils/debugVars';
import { isDev } from '../utils/debugVars';
const debugLog = false;
const errorLog = isDev;

export default class Resource {
  
  constructor(apiUrl, dbModel, cache = false) {
    debugLog? console.log("Resource: constructor - " + apiUrl) : null;
    this.dbModel = dbModel;
    this.apiUrl = apiUrl;
    this.cache = cache;
  }
  
  
  realmToJSONObject =(realmObj)=> {
    return JSON.parse(JSON.stringify(realmObj));
  }
  
  getFromDB(queryParams, list=false) {
    debugLog? console.log("getFromDB" + this.dbModel) : null;
    if (!Queries.isEmpty(this.dbModel)) {//fetch data from cache if cache is not empty
      //get the data from realm
      if (queryParams) {
        //not working, but we should be able to filter by json
        debugLog? console.log("getFromDB response query: ", queryParams) : null;
        var responseFinal = { response: Queries.query(this.dbModel, queryParams) }
        debugLog? console.log("getFromDB responseFinal: ", responseFinal) : null;
        if (responseFinal) {
          return responseFinal;
        } else {
          //temporary till issue get resolved
          return this.getFromNetwork(METHOD.GET, queryParams);
        }
      } else {
        var responseFinal = { response: Queries.getDataFromModel(this.dbModel, list) }
        debugLog? console.log("getFromDB response: ", responseFinal) : null;
        let responseFinalJSONObject=this.realmToJSONObject(responseFinal);
        return responseFinalJSONObject;
      }
    } else {
      debugLog? console.log('getFromNetwork called') : null;
      return this.getFromNetwork(METHOD.GET, queryParams);
    }
  }
  
  async checkJsonImproved(response, url){
    let responseJson = null;
    try {
      responseJson = await response.json();
    } catch(e) {
      responseJson = {}
      console.log("Error while parsing json", e)
    }
    return responseJson
  }
  
  async checkJson(response, url){
    console.log("checkJson response", response)
    const contentType = response.headers.get("content-type");
    console.log("checkJson content-type", contentType)
    if (contentType && contentType.indexOf("application/json") !== -1) {
      debugLog?console.log('response is  json') :null
      let reponseJson = await response.json();
      return reponseJson
    }
    else {
      errorLog? console.log('response is not json for', {url, response}) : null;
      var json = '{}';
      return json; 
    }
  }
  
  
  async getFromNetwork(method, body = null) {
    
    debugLog? console.log("getFromNetwork: ", this.apiUrl) : null;
    if (method == METHOD.GET && body) {
      if (body.hasOwnProperty('id')) {
        //  var id = parseInt(body, 10);
        var id = body.id;
        debugLog? console.log("getFromNetwork:  id = " + id) : null;
        
        this.apiUrl = this.apiUrl + id + "/";
        debugLog? console.log("getFromNetwork: GET FinalURL: ", this.apiUrl) : null;
      } else {
        debugLog? console.log("getFromNetwork:  query" + JSON.stringify(body)) : null;
        
        //var qs = require('qs');
        const query = queryString.stringify(body);
        //const query = JSON.stringify(body);
        this.apiUrl = `${this.apiUrl}?${query}`;
        
        debugLog? console.log("getFromNetwork: query FinalURL: " + this.apiUrl) : null;
      }
    }
    
    if (true || getNetInfo()) {
      debugLog? console.log('2 url', this.apiUrl) : null;
      var response = await CallAPI(this.apiUrl, method, body);
      debugLog? console.log('2 response', response) : null;
      let responseObj=await this.checkJsonImproved(response, this.apiUrl)
      debugLog? console.log('2 responseObj', responseObj) : null;
      
      if (response.ok) {
        var responseFinal  = { response: responseObj };
        // var responseFinal;
        // if (responseObj && responseObj.constructor === Array && responseObj.length === 0) {   
        //     responseFinal = [];
        // }
        // else{
        //     responseFinal  = { response: responseObj };
        // }    
        
        if (this.cache) {
          //cache in realm
          debugLog? console.log("savingDataInRealm: " + responseObj) : null;
          await filterResponse(responseObj);
          await Queries.create(this.dbModel, responseObj);
        }
        return responseFinal;
      } else {
        debugLog? console.log('2 error', response.ok) : null;
        //var error = { error: response, dateTime: Date.now() };
        var error = { error: {status: response.status, ...response, errorResponse: responseObj} };
        debugLog? console.log('2 error', error) : null;
        return error;
      }
    } else {
      var error = { error: 'No Internet' };
      debugLog? console.log("getFromNetwork: Error " + error) : null;
      return error;
    }
  }
  
  get(queryParams = "", cache = false) { // id or general JSON?
    debugLog? console.log("get Resource : " + this.apiUrl) : null;
    this.cache = cache;
    if (cache) {
      return this.getFromDB(queryParams);
    } else {
      return this.getFromNetwork(METHOD.GET, queryParams);
    }
  }
  
  
  list(queryParams = "", cache = false) { // id or general JSON?
    debugLog? console.log("list Resource : " + this.apiUrl, queryParams) : null;
    this.cache = cache;
    if (cache) {
      return this.getFromDB(queryParams, true);
    } else {
      return this.getFromNetwork(METHOD.GET, queryParams);
    }
  }
  
  save(body) {
    debugLog? console.log("save Resource : " + this.apiUrl) : null;
    return this.getFromNetwork(METHOD.POST, body);
  }
  
  saveFileUpload(body) {
    debugLog? console.log("save Resource : " + this.apiUrl) : null;
    return this.getFromNetwork(METHOD.FILEUPLOAD, body);
  }
  
  update(body) {
    //todo
    debugLog? console.log("update Resource : " + this.apiUrl) : null;
    return this.getFromNetwork(METHOD.PUT, body);
  }
  
  delete(){
    //todo
    console.log("delte Resource : " + this.apiUrl);
    return this.getFromNetwork(METHOD.DELETE);
  }
  
  patch(body) {
    //todo
    debugLog? console.log("patch Resource : " + this.apiUrl) : null;
    return this.getFromNetwork(METHOD.PATCH, body);
  }
  
  
  
}
