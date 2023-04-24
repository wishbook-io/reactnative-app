import { Platform } from 'react-native';

export const fontresource = {
  medium: Platform.select({ios: 'HelveticaNeue-Medium', default: 'sans-serif-medium'})
}