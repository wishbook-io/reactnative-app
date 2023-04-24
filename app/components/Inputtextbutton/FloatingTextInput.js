import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    View,
    StyleSheet
} from 'react-native';
import {TextField} from 'react-native-materialui-textfield';
import { colorresource } from '../../resources/colorresource';

/*
TODO:
1. the library react-native-floating-labels 1.1.8 needs https://github.com/mayank-patel/react-native-floating-labels/pull/35
2. changing font size back and forth when secureTextEntry changes is due to a cursor reset bug
3. since this component is not used anywhere except Verify OTP screen, the fontSize is hardcoded for now
*/

export default class FloatingTextInput extends Component {

    value = () => {
        return this.ref.value();
    }

    registerRef = (ref) => {
        this.ref = ref;
    }

    constructor(props) {
        super(props);

        this.state = {
            // floatingLabelColor: colorresource.litegray,
            bottomborder: this.props.defaultUnderlineColor || 'red',
            labelStyle: this.props.defaultLabelStyle || styles.defaultLabelStyle,
        }
    }

    onFocusHandler = () => {
      this.setState({ 
        // floatingLabelColor: labelColorOnFocus, 
        bottomborder: this.props.focussedUnderlineColor,
        labelStyle: this.props.focussedLabelStyle,
    })
    }

    onBlurHandler = () => {
      this.setState({ 
        // floatingLabelColor: colorresource.Darkgrayishblue, 
        bottomborder: this.props.defaultUnderlineColor,
        labelStyle: this.props.defaultLabelStyle,
    })
    }

    render({ label, inputTestId, defaultValue, onChangeText, error, textInputProps, textColor} = this.props) {
        return (
            <View style={styles.inputContainer}>
                <View style={styles.itemContainer}>
                    <TextField 
                        // multiline={false} 
                        // numberOfLines={1} 
                        // labelStyle={this.state.labelStyle}
                        // onFocus={this.onFocusHandler}
                        // onBlur={this.onBlurHandler}
                        // selectionColor={colorresource.liteblue}
                        containerStyle={{}}
                        labelHeight={16}
                        {...inputTestId}
                        label={label}
                        ref={this.registerRef}
                        value={defaultValue}
                        onChangeText={onChangeText}
                        error={error}
                        {...textInputProps}
                        textColor={textColor}
                        />
                </View>
            </View>
        );
    }
}


export const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        flex: 1,
        borderColor: 'transparent',
    },
    defaultLabelStyle: {

    },
    focussedLabelStyle: {
        fontSize: 10,
        color: colorresource.liteblue,
    },
    defaultUnderlineColor: {

    }
});

FloatingTextInput.defaultProps = {
    iconSize: 25,
    label: ''
}

