import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import _ from 'lodash';

import styles from './styles';
import { colorresource } from '../../resources/colorresource';

export default MyEarningsHeader = ({
  amountTop,
  amountLeft,
  amountRight, 
  earningName='WB Money', 
  earningNameSingular=earningName, 
  hideConversion, 
  redeemedText='redeemed'
}) => {
  
  return (
    <View style={styles.WbMoneyHeader}>
      <View style={styles.WbMoneyHeaderTop}>
        {hideConversion? null :
          <Fragment>
            <Text style={styles.WbMoneyHeadingText}>{`${earningName}`}</Text>
            <Text style={styles.WbMoneySubHeadingText}>{`1 ${earningNameSingular} = ₹ 1`}</Text>
          </Fragment>}
        <Text style={[styles.WbMoneyHeadingText, {marginTop: 10}]}>{amountTop}</Text>
        {hideConversion? null : <Text style={styles.WbMoneySubHeadingText}>{`Available ${earningName}`}</Text>}
      </View>
      <View style={styles.WbMoneyHeaderRow}>
        <View style={[styles.WbMoneyHeaderRowItem, {borderRightWidth: 0.5, borderRightColor: colorresource.gray}]}>
          <Text style={styles.WbMoneyHeaderReceivedAmount}>{amountLeft}</Text>
          <Text style={styles.WbMoneyHeaderAmountDescriptionText}>Total received</Text>
        </View>
        <View style={styles.WbMoneyHeaderRowItem}>
          <Text style={styles.WbMoneyHeaderRedeemedAmount}>{amountRight}</Text>
          <Text style={styles.WbMoneyHeaderAmountDescriptionText}>{`Total ${redeemedText}`}</Text>
        </View>
      </View>
      <View style={styles.WbMoneyHeaderHistory}>
        <Text style={styles.WbMoneyHeaderHistoryText}>History</Text>
      </View>
      {/* <View style={styles.WbMoneyHeaderBack}>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon name='arrow-back' style={{color: colorresource.liteblue}}/>
        </Button>
      </View> */}
    </View>
  );
}