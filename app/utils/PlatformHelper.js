import { Platform } from 'react-native'
export const isWeb = Platform.OS === 'web'
export const isIos = Platform.OS === 'ios'
export const isDroid = Platform.OS === 'android'

export const getPlatformToPost = () => {
  return  Platform.select({
    ios: 'iOS',
    android: 'Android',
    web: 'Lite',
  })
}