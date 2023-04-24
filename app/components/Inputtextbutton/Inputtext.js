import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';
import { Item, Input, Label } from 'native-base';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

class Inputtext extends Component {

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

  render({ buttonText, labelColorOnFocus, bottomBorderColor } = this.props) {
    return (
      <View backgroundColor={colorresource.white}>
        <Item floatingLabel >
          <Label style={[styles.editfontsize, { color: this.state.floatingLabelColor }]}>{buttonText}</Label>
          <Input style={styles.editfontsize} multiline={false}
            onFocus={() => this.handleOnFocus(labelColorOnFocus, true, bottomBorderColor)}
            onBlur={() => this.handleOnFocus(labelColorOnFocus, false, bottomBorderColor)}
            onChangeText={this.handleOnTextChange}
            underlineColorAndroid="transparent" />
        </Item>
        <View style={{ height: 1, backgroundColor: this.state.bottomborder }} />
      </View>
    );
  }
};

Inputtext.propTypes = {
  buttonText: PropTypes.string,
  labelColorOnFocus: PropTypes.string,
  bottomBorderColor: PropTypes.string
};

Inputtext.defaultProps = {
  buttonText: "",
};

export default Inputtext;