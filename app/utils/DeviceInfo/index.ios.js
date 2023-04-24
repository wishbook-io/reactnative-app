import DeviceInfo from 'react-native-device-info';

class DeviceInfoClass {
  getDeviceId = async () => {
    let id = DeviceInfo.getUniqueID();
    // let newId = id.replace(/-/g,"")
    // var trimmedString = newId.substring(0, 15);
    
    console.log('device id new',id);
    return id;
  } 
  
  // getDeviceId = async () => {
  //     return '0x1';
  // }
}
const deviceInfo = new DeviceInfoClass()
export default deviceInfo;

export const getAppVersionCode = () => {
  return DeviceInfo.getVersion();
  // return DeviceInfo.getBuildNumber();
}