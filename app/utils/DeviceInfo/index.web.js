class DeviceInfo {
  getDeviceId = async () => {
    return '0x1';
  }
}

const deviceInfo = new DeviceInfo()
export default deviceInfo;


export const getAppVersionCode = () => {
  return 1;
}