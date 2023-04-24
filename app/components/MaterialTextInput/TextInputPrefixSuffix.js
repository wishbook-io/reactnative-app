import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import { Text } from 'native-base'

import { colorresource } from 'app/resources/colorresource'
import EStyleSheet from 'react-native-extended-stylesheet'

export default class TextInputPrefixSuffix extends Component {

  onFocus = () => {
    this.setState({focussed: true})
  }

  onBlur = () => {
    this.setState({focussed: false})
  }

  constructor(props) {
    super(props)
    this.state = {
      focussed: false
    }
  }

  render() {
    const {
      prefix,
      suffix,
      error,
      onChange,
      parentStyle={},
      style,
      ...rest
    } = this.props
    return (

      <View>
        
        <View style={[
          parentStyle, 
          styles.textInputParent, 
          error? 
            { borderColor: colorresource.materialerror, borderWidth: 1 }
          : this.state.focussed?
            { borderColor: colorresource.liteblue, borderWidth: 2 }
          : { borderColor: colorresource.gray, borderWidth: 1, }
        ]}>

          {prefix? <Text style={styles.prefixSuffixText}>{prefix}</Text>
          : null}

          <TextInput
            placeholder={'Enter margin'}
            underlineColorAndroid={'transparent'}
            style={[{
              textAlign: 'center',
              minWidth: 50,
              // flex: 1,
            }, style]}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={onChange}
            {...rest}
          />

          {suffix? <Text style={styles.prefixSuffixText}>{suffix}</Text>
          : null }


        </View>
        {error? <Text style={styles.errorText}>{error}</Text> : null }
        
      </View>

    )
  }
}

const styles = EStyleSheet.create({
  textInputParent: {
    borderRadius: 5, 
    // paddingBottom: 5
    flexDirection: 'row',
    justifyContent: 'center',
  },
  prefixSuffixText: {
    alignSelf: 'center',
    padding: 5,
    fontSize: 16
  },
  errorText: {
    fontSize: 12,
    color: colorresource.materialerror,
    marginTop: 5,
    textAlign: 'center',
  }
})