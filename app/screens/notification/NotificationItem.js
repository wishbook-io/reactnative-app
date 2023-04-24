import React from 'react';
import { View, Image } from 'react-native';
import { Text, Card,Left,Body,Thumbnail, CardItem } from 'native-base';

import { colorresource } from '../../resources/colorresource';

import styles from './styles';

export default ({data}) => {
  console.log('nptification item',data);
  
  return (
    data.item.image===''?
      <Card style={styles.NotificationItemParent}>
       <CardItem>
          <Left>
          <Thumbnail source={require('../../images/applogo.png')}/>
            <Body>
              <Text style={styles.NotificationItemHeadingText}>{data.item.message}</Text>
              <Text style={styles.NotificationItemDescriptionText}>{data.item.title}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>  
           
      :
      <Card style={styles.NotificationItemParent}>
      <CardItem header>
        <Text style={styles.NotificationItemHeadingText}>{data.item.message}</Text>
      </CardItem> 
       <CardItem style={{paddingTop: 0}}>
        <Image style={styles.NotificationItemImage} source={{uri:data.item.image}} resizeMode='contain'/>
      </CardItem>
      <CardItem footer>
        <Body>
          <Text style={styles.NotificationItemDescriptionText}>{data.item.title}</Text>
        </Body>
      </CardItem>
      </Card>

      
     
     
  );
  
}
