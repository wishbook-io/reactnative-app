import React, { Component } from 'react'
import { Button, Text } from 'native-base'

import styles from './styles'

export default class SeeAllButton extends Component{
  render() {
    return (
      <Button style={[styles.see_all_button]} borderRadius={3} onPress={this.props.onPress}>
        <Text uppercase={false} style={{fontSize: 12}}>See all</Text>
      </Button>
      )
    }
  }