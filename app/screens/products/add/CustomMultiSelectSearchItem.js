import React, { PureComponent } from 'react'
import { View, InteractionManager } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Text } from 'native-base';

import Radio from 'app/components/Radio/Radio';
import CheckBox from 'app/components/CheckBox/CheckBox';
import WButton from 'app/components/Button/WButton';
import { colorresource } from 'app/resources/colorresource';

export default class CustomMultiSelectSearchItem extends PureComponent {
  
  onItemPress = () => {
    InteractionManager.runAfterInteractions(() => {
      const id = this.props.data.id
      this.props.onItemPress(id)
    })
  }
  render(){
    const item = this.props.data
    const radio = this.props.radio
    //console.log("checking this component")
    return(
      <WButton style={localStyles.Button} onPress={this.onItemPress}>
        <View style={localStyles.ItemRow}>
          <Text style={localStyles.ItemText}>{item.value}</Text>
          {radio
            ? <Radio 
              selected={this.props.selected} 
              onPress={this.onItemPress}
              />
            : <CheckBox 
              checkBoxStyle={localStyles.CheckBox} 
              selected={this.props.selected} 
              onPress={this.onItemPress}
              />
          }
          </View>
      </WButton>
    )
  }
}

const localStyles = EStyleSheet.create({
  Button: {
    flex: 1
  },
  ItemRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 25,
  },
  ItemText: {
    color: colorresource.liteblack,
    fontSize: 14,
    flex: 1,
  },  
  CheckBox: {
    marginRight: 15,
  },
});