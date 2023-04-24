import EStyleSheet from 'react-native-extended-stylesheet';
import StyleSheet from 'react-native';
import { colorresource } from '../../resources/colorresource';

const INPUT_HEIGHT = 48;
const BORDER_RADIUS = 4;

const styles = EStyleSheet.create({
  $buttonBackgroundColorBase: colorresource.white,
  $buttonBackgroundColorModifier: 0.1,

  container: {
    backgroundColor: colorresource.white,
    width: '90%',
    height: INPUT_HEIGHT,
    borderRadius: BORDER_RADIUS,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 11,
  },
  containerDisabled: {
    backgroundColor: colorresource.Verylightgray,
  },
  buttonContainer: {
    height: INPUT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorresource.white,
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    paddingHorizontal: 16,
    color: colorresource.liteblue,
  },
  input: {
    height: INPUT_HEIGHT,
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 8,
    color: colorresource.verydarkgraybrown,
  },
  border: {
    height: INPUT_HEIGHT,
    width: StyleSheet.hairlineWidth,
    backgroundColor: colorresource.verylitebrown,
  },
});

export default styles;
