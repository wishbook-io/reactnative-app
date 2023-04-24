import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, Image
} from 'react-native';
import { Card, Button } from 'native-base';
import styles from './styles'

export default class MyViewItem extends Component {

  render({ rowData, onPress } = this.props) {
    return (
      <View style={styles.MyViewItemTopview}>
        <Card style={styles.MyViewItemTopview}>
          <Image style={styles.MyViewItemCatalogimg} resizeMode='stretch' source={{ uri: rowData.imageUrl }} />
          <View style={styles.MyViewItemLeftview}>
            <View style={styles.MyViewItemLeftinnerview}>
              <Text numberOfLines={1} style={styles.MyViewItemCatelogname}>
                {rowData.title1}
              </Text>
            </View>
            <View style={styles.MyViewItemLeftinnerview}>
              <Text numberOfLines={2} style={styles.MyViewItemCatelogviewed}>
                {rowData.title2}
              </Text>
            </View>
            <View style={styles.MyViewItemFinalview}>
              <Button transparent small onPress={onPress}>
                <Text style={styles.MyViewItemViewButton}>
                  VIEW
                  </Text>
              </Button>
            </View>
          </View>
        </Card>
      </View>
    );
  }
};

MyViewItem.propTypes = {
  rowData: PropTypes.object,
  onPress: PropTypes.object
};