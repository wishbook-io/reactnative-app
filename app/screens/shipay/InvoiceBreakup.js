import React from 'react';
import { View } from 'react-native';
import { 
  Header, 
  Title, 
  Content, 
  Button, 
  Left, 
  Right, 
  Body, 
  Icon, 
  Text,
  Container } from 'native-base';

import { colorresource } from '../../resources/colorresource';

import {goBack} from 'app/actions/navigation-actions';

import InvoiceSummary from './InvoiceSummary';
import InvoiceBreakupItem from './InvoiceBreakupItem';
import styles from './styles';

export default ({navigation:{state: {params: {cartDetails}}}}) => {
  return (
    <Container style={{backgroundColor: colorresource.materialbg}}>
      <Header  style={{backgroundColor: colorresource.liteblue}}>
        <Left>
          <Button transparent onPress={goBack}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Invoice Details</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        
        <View style={styles.InvoiceBreakupParent}>
          <InvoiceSummary cartDetails={cartDetails}/>
        </View>
        
        {cartDetails.catalogs.map((item, index) => 
          <View key={index} style={styles.InvoiceBreakupParent}>
            <InvoiceBreakupItem single={true} data={item}/>
          </View>
        )}
      
      </Content>
    </Container>
  );
}