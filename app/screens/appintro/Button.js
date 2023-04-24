/**
 * Button component
 * Renders a button and calls a function passed via onPress prop once tapped
 */

import React, { Component } from 'react';
import {
  StyleSheet,       // CSS-like styles
  Text,             // Renders text
  TouchableHighlight, // Pressable container
  View              // Container component
} from 'react-native';
import { colorresource } from '../../resources/colorresource';
import styles from './styles'

export default class Button extends Component {
  render({ onPress,buttonColor } = this.props) {
    return (
      <TouchableHighlight onPress={onPress}>
        <View style={[styles.button,{backgroundColor:buttonColor}]}>
          <Text style={styles.text}>{this.props.text.toUpperCase()}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

