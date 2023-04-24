import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { colorresource } from '../../resources/colorresource';

const imageWidth = Dimensions.get('window').width / 2;

const styles = EStyleSheet.create({
  $largeContainerSize: imageWidth,
  $largeImageSize: imageWidth / 2,
  $smallContainerSize: imageWidth / 2,
  $smallImageSize: imageWidth / 4,
  container: {
    alignItems: 'center',
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '$largeContainerSize',
    height: '$largeContainerSize',
  },
  image: {
    width: '$largeImageSize',
    tintColor: colorresource.liteblue,
  },
  text: {
    fontWeight: '600',
    fontSize: 28,
    letterSpacing: -0.5,
    marginTop: 15,
    color: colorresource.white,
  },
});

export default styles;
