import React from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    View,
    StyleSheet,
    Keyboard
} from 'react-native';
import { Input, Item, Label, Icon } from 'native-base';
import FloatingLabel from 'react-native-floating-labels';
import { colorresource } from '../../resources/colorresource';

/*
TODO:
1. the library react-native-floating-labels 1.1.8 needs https://github.com/mayank-patel/react-native-floating-labels/pull/35
2. changing font size back and forth when secureTextEntry changes is due to a cursor reset bug
3. since this component is not used anywhere except Verify OTP screen, the fontSize is hardcoded for now
*/

export default class PasswordInputText extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            floatingLabelColor: colorresource.Darkgrayishblue,
            bottomborder: colorresource.Darkgrayishblue,
            labelStyle: this.props.defaultLabelStyle || styles.defaultLabelStyle,
            icEye: 'visibility-off',
            password: true,
            isFocussed: false,
        }
    }

    changePwdType = () => {
      // Keyboard.dismiss();
        let newState;
        if (this.state.password) {
            newState = {
                icEye: 'visibility',
                password: false
            }
        } else {
            newState = {
                icEye: 'visibility-off',
                password: true
            }
        }

        // set new state value
        this.setState(newState)

    };

    handleOnFocus = (labelColorOnFocus, isFocus, bottomBorderColor) => {
        if (isFocus) {
            this.setState({ 
                floatingLabelColor: labelColorOnFocus, 
                bottomborder: bottomBorderColor,
                labelStyle: this.props.focussedLabelStyle,
                isFocussed: true,
            })
        } else {
            this.setState({ 
                floatingLabelColor: colorresource.Darkgrayishblue, 
                bottomborder: bottomBorderColor,
                labelStyle: this.props.defaultLabelStyle,
                isFocussed: false,
            })
        }
    }
    
    onFocusHandler = () => {
      this.handleOnFocus(this.props.labelColorOnFocus, true, colorresource.liteblue)
    }
    
    onBlurHandler = () => {
      this.handleOnFocus(this.props.labelColorOnFocus, false, '#aaaaaa')
    }


    render({ label, labelColorOnFocus, bottomBorderColor, onChangeText, value, onSubmitEditing, inputTestId, eyeTestId } = this.props) {
        return (
            <View style={styles.inputContainer}>
                <View style={styles.itemContainer}>
                    <FloatingLabel 
                    inputStyle={{ fontSize: this.state.password? 14 : 13, borderWidth: 0 }}
                    multiline={false} 
                    numberOfLines={1} 
                    labelStyle={this.state.labelStyle}
                    onFocus={this.onFocusHandler}
                    onBlur={this.onBlurHandler}
                    selectionColor={colorresource.liteblue}
                    secureTextEntry={this.state.password} 
                    underlineColorAndroid={"transparent"}
                    onChangeText={onChangeText}
                    value={value}
                    onSubmitEditing={onSubmitEditing}
                    {...inputTestId}
                    >
                        {label}
                    </FloatingLabel>
                    <View style={{marginLeft: 9, marginTop: -7, height: this.state.isFocussed? 2 : 0.5, backgroundColor: this.state.bottomborder}}/>
                </View>
                <Icon style={styles.iconContainer}
                    name={this.state.icEye}
                    type="MaterialIcons"
                    size={this.props.iconSize}
                    color={this.props.iconColor}
                    onPress={this.changePwdType}
                    {...eyeTestId}
                />
            </View>
        );
    }
}


export const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    itemContainer: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        borderColor: 'transparent',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    iconContainer: {
        //flex: 1,
        position: 'absolute',
        right: 0,
        alignSelf: 'flex-end',
        //alignItems: 'center',
        //justifyContent: 'center',
        //marginTop: 20,
        padding: 10,
        fontSize: 24,
        // borderWidth: 1,
        // borderColor: 'purple',
    },
    defaultLabelStyle: {
        fontSize: 10
    },
    focussedLabelStyle: {
        fontSize: 10,
        color: colorresource.liteblue,
    }
});

PasswordInputText.defaultProps = {
    iconSize: 25,
    label: ''
}
