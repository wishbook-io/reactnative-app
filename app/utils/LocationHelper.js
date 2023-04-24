import { checkLocationPermission } from './AndroidPermissionHelper';

/*
with highAccuracy as false
{
   mocked:false,
   timestamp:1540450297785,
   coords:{
      speed:0,
      heading:0,
      accuracy:23.305999755859375,
      longitude:72.8336529,
      altitude:0,
      latitude:21.184612
   }
}
*/
const getLocation = async () => {

  const available = await checkLocationPermission();
  if(!available) {
    console.log("[getLocation] permission denied")
    return null;
  }

  console.log("[getLocation] permission granted")
  return new Promise((resolve, reject) => {
    console.log("[getLocation] making the call");
    navigator.geolocation.getCurrentPosition(
        position => {
          console.log("[getLocation] location received", position);
          resolve({latitude: position.coords.latitude, longitude: position.coords.longitude});
        },
        error => {
          console.log("[getLocation] rejecting with", error);
          reject(error)
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      );
  })
}

export { getLocation }