import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TextInput
} from 'react-native';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

class CustomTextInput extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            floatingLabelColor: colorresource.Darkgrayishblue,
            textlength: 0,
            bottomborder: colorresource.Darkgrayishblue
        });
    }

    handleOnFocus = (labelColorOnFocus, isFocus, bottomBorderColor) => {
        const { textlength } = this.state
        if (isFocus || textlength > 0) {
            this.setState({ floatingLabelColor: labelColorOnFocus, bottomborder: bottomBorderColor })
        } else {
            this.setState({ floatingLabelColor: colorresource.Darkgrayishblue, bottomborder: colorresource.Darkgrayishblue })
        }
    }

    handleOnTextChange = (text) => {
        this.setState({ textlength: text.length })
    }

    render({ placeholder, value, labelColorOnFocus, bottomBorderColor, onChangeText } = this.props) {
        return (
            <View style={{ flexDirection: 'column' }} backgroundColor={colorresource.white}>
                <TextInput style={styles.customTextInputfontsize} multiline={false}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={() => onChangeText()}
                    underlineColorAndroid="transparent" />
                <View style={{ height: 1, backgroundColor: this.state.bottomborder }} />
            </View>
        );
    }
};

CustomTextInput.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    labelColorOnFocus: PropTypes.string,
    bottomBorderColor: PropTypes.string,
    onChangeText: PropTypes.func
};

CustomTextInput.defaultProps = {
    placeholder: "",
    value: ""
};

export default CustomTextInput;