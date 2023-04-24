import React, { Component } from 'react';
import { View, Image } from 'react-native';
import {
  Text,
  Card,
  CardItem,
} from 'native-base'

import { colorresource } from 'app/resources/colorresource'

const EnquiryCard = ({title, image, about, status, fromNow, onPress}) => {
  return (
    <Card>
      <CardItem button onPress={onPress}>
        <Image source={{uri: image}} style={{width: 90, height: 110}}/>
        <View style={{flex: 1, marginLeft: 8}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={{color: colorresource.liteblack, fontSize: 14}} ellipsizeMode={'tail'} numberOfLines={1}>{title}</Text>
            </View>
            <View style={{alignSelf: 'center', marginLeft: 5}}>
              <Text style={{color: colorresource.gray, fontSize: 10, alignSelf: 'center'}}>{fromNow}</Text>
            </View>
          </View>
          <Text style={{marginTop: 5, flex: 1, flexWrap: 'wrap', color: colorresource.gray, fontSize: 14}} numberOfLines={2}>{'Enquired about '}
            <Text style={{color: colorresource.liteblack, fontSize: 14}}>{about}</Text>
          </Text>
          <Text style={{color: colorresource.liteblack, fontSize: 12, fontStyle: 'italic'}}>{`Status: ${status}`}</Text>
        </View>
      </CardItem>
    </Card>
  )
}

export default EnquiryCard