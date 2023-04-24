import { NetInfo } from "react-native";

import { isIos } from "./PlatformHelper";

export const getNetInfo = () => {
  if (isIos) {
    return true;
  }
  return NetInfo.isConnected.fetch().then(isConnected => {
    // console.log('First, is ' + isConnected);
    return isConnected;
  });
};

export const filterResponse = obj => {
  for (var key in obj) {
    if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    } else if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
      filterResponse(obj[key]);
    } else if (Array.isArray(obj[key])) {
      // console.log("hello" + obj[key]);
      if (obj[key].length === 0) {
        delete obj[key];
      } else {
        for (var _key in obj[key]) {
          filterResponse(obj[key][_key]);
        }
        obj[key] = obj[key].filter(function(v) {
          return v !== undefined;
        });
        if (obj[key].length === 0) {
          delete obj[key];
        }
      }
    }
  }
  return obj;
};
