import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View
} from 'react-native';
import { Button } from 'native-base';
import styles from './styles'

export default class MyViewListItem extends Component {

  render({ rowData } = this.props) {
    return (
      <View >
        <View style={styles.MyViewListItemTopview}>
          <View style={styles.MyViewListItemCirclelogoview}>
            <Text style={styles.MyViewListItemCircletextview}>
              {rowData.title1.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.MyViewListItemBuyercompanyTopview}>
            <Text numberOfLines={1} style={styles.MyViewListItemBuyercompanytextview}>
              {rowData.title1} </Text>
            <Text numberOfLines={1} style={styles.MyViewListItemlocationtext}>
              {rowData.title2} </Text>
          </View>
          <View style={styles.MyViewListItembooleanactiveview}>
            {rowData.btnVisibility ?
              <Button block style={styles.MyViewListItemActivebutton}>
                <Text style={styles.MyViewListItemActivebuttonText}>ADD AS BUYER</Text>
              </Button> :
              <Button bordered style={styles.MyViewListItemInActiveButton}>
                <Text style={styles.MyViewListItemInActiveText}>ADDED </Text>
              </Button>
            }
          </View>
        </View>
      </View>
    );
  }
};

MyViewListItem.propTypes = {
  rowData: PropTypes.object,
};


