import { PermissionsAndroid } from 'react-native';

/*
simultaneously calling 2 requestPermission will only show permission dialog for one
*/

const checkPermission = async (permission) => {
  const granted = await PermissionsAndroid.check(permission)
  console.log("[checkPermission] " + permission, granted? "GRANTED" : "DENIED");
  return granted;
}


/*
input: array of permission strings like [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, ...]
output: array of boolean values like [false, true, false]
*/
const checkMultiplePermissions = async (permissions) => {
  try {
    let result = []
    for(const permission of permissions) {
      const granted = await checkPermission(permission)
      result.push(granted);
    }
    console.log("[checkMultiplePermissions] ", permissions, result);
    return result;
  } catch(error) {
    console.warn("There was some error while requesting ", permissions, "error:", error);
    return permissions.map((item) => false);
  }
}

const requestPermission = async (permission) => {
    try {  
      const granted = await PermissionsAndroid.request(permission)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permission Granted for " + permission)
        return true;
      } else {
        console.log("permission denied for " + permission)
        return false;
      }
    } catch(error) {
      console.warn("There was some error while requesting "+permission+" permission", error);
      return false;
    }
}

/*
input: array of permission strings like [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, ...]
output: array of boolean values like [false, true, false]
*/
const requestMultiplePermissions = async (permissions) => {
  try {
    console.log("[requestMultiplePermissions] checking for:", permissions);
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    console.log("[requestMultiplePermissions] result :", granted);
    return permissions.map((permission) => granted[permission] === PermissionsAndroid.RESULTS.GRANTED);
    } catch(error) {
      console.warn("There was some error while requesting ", permissions, "error:", error);
      return permissions.map((permission) => false);
    }
   
 }

const checkContactsPermission = async (request = false) => {
  let granted = await checkPermission(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
  if(request === false || granted === true) {
    return granted;
  }
  
  granted = await requestPermission(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
  return granted;
}

/*
only fine location is required and not coarse
https://stackoverflow.com/a/33800252/9167004
*/
const checkLocationPermission = async (request = false) => {
  let granted = await checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  if(request === false || granted === true) {
    return granted;
  }

  granted = await requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  return granted;
}

const requestBackendTasksPermission = async () => {
  let granted = await requestMultiplePermissions([
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  ])
  return{ contactsPermission: granted[0], locationPermission: granted[1]}
}

export { checkLocationPermission, checkContactsPermission, requestBackendTasksPermission }