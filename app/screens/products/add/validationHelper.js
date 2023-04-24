import { getCatalogDropdownAction, validateSetNameAction } from 'app/actions/catalog-actions';
import { getCatalogDropDownList, validateSetName } from 'app/saga/catalog-saga';

import { checkDiscountAction } from 'app/actions/discount-actions';
import { checkDiscount } from 'app/saga/discount-saga';

import { getCategoryEVPAction } from 'app/actions/masterlist-actions';
import { getCategoryEavAttribute } from 'app/saga/masterlist-saga';

import { call } from 'redux-saga/effects';
import {execute} from 'app/config/saga';

export const validateProductNameFromServer = async (text, brandId, categoryId) => {

  // console.log("[validateProductNameFromServer] text:", text);
  const action = getCatalogDropdownAction(text, brandId, categoryId);
  // console.log("[validateProductNameFromServer] action:", action);
  const result = await execute(getCatalogDropDownList, action)
  // console.log("got result: ", result);
  return result;
}

export const validateDiscountFromServer = async (brandId) => {
  
  const action = checkDiscountAction(brandId);
  //console.log("validation action ", action);
  const result = await execute(checkDiscount, action);
  //console.log("validation result", result);  
  return result;
}

export const validateSetNameFromServer = async(text) => {
  const action = validateSetNameAction(text);
  const result = await execute(validateSetName, action);
  return result;
}

export const getDesignNameFromPath = (path, returnType=false) => {
  if(!path) {
    return ''
  }
  const regexFileName = new RegExp('^.*[\\\/](.*?)(?:\.(png|jpeg|jpg|gif))?$');
  const matchObj = path.match(regexFileName);
  if(matchObj && matchObj[1]) {
    path = matchObj[1]
  }
  if(returnType) {
    return [path, matchObj[2] || 'png']
  } else {
    return path;
  }
}

export const getFormData = (params={}, uri, paramName='image') => {
  let formData = new FormData();
  if(uri) {
    let [name, type] = getDesignNameFromPath(uri, true);
    formData.append(paramName, {
      uri,
      type: "image/" + type,
      name: name + '.' + type, // TODO: check if this needs to be unique, if yes append timestamp
    })
  }

  for( const [key, value] of Object.entries(params)) {
    let val = value
    if(typeof value == 'object' && value instanceof Object) {
      // have to stringify the nested object first!
      console.log("[getFormData] found nested object with key, value:", key, value)
      val = JSON.stringify(value);
    }
    formData.append(key, val)
  }

  return formData;

}

export const calculateExpiryDate = (expiry) => {
  let expiryPeriod = parseInt(expiry);
  if(Number.isNaN(expiryPeriod)) {
    expiryPeriod = 30;
  }

  let expiryDate = new Date(new Date().getTime()+(expiryPeriod*24*60*60*1000));
  expiryDate = expiryDate.toISOString();
  return expiryDate;
}

export const getDynamicAttributes = async (categoryId) => {
  const action = getCategoryEVPAction(categoryId, true);
  const result = await execute(getCategoryEavAttribute, action)
  return result;
}
