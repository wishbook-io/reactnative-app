import React from 'react';
import { Text, Card, CardItem } from 'native-base';

import { colorresource } from '../../resources/colorresource';
import styles from './styles';


const MyCartCashbackInfo = () => {
  return (
    <Card borderRadius={3}>
      <CardItem style={styles.MyCartCashbackItem}>
      <Text style={styles.MyCartCashbackTitle}>Cashback from Wishbook</Text>
      </CardItem>

      <CardItem style={styles.MyCartCashbackItem}>
      <Text style={styles.MyCartCashbackDescription}>
        <Text 
        style={[styles.MyCartCashbackDescription, {color:'green'}]}>
        5% cashback {''} 
        </Text>
        on prepaid orders from Trusted Sellers</Text>
      </CardItem>

      <CardItem style={styles.MyCartCashbackItem}>
      <Text style={styles.MyCartCashbackDescription}>
        <Text 
        style={[styles.MyCartCashbackDescription, {color:'green'}]}>
        2% cashback {''} 
        </Text>
        from all other orders</Text>
      </CardItem>

    </Card>
  );
}

export default MyCartCashbackInfo;
