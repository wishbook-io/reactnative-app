import React, { Component } from 'react';
import { View } from 'react-native';
import { Left, CardItem, Button, Text } from 'native-base';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import { colorresource } from '../../resources/colorresource';

itemSeparator = () => {
    return (
        <View style={{height: 1, width: '80%', backgroundColor: 'gray'}}/>
    );
}

export default class RecentlyViewed extends Component {
    render() {
        return (
            <CardItem style={{flex: 1/*borderWidth: 1, borderColor: 'yellow'*/}}>
                <Left style={{flex: 1, /*borderWidth: 1, borderColor: 'black',*/ alignItems: 'stretch'}}>
                    <FastImage 
                    style={[{ width: 100, height: 120, borderRadius: 3 }]} 
                    resizeMode='contain'
                    source={{ uri: this.props.data.thumbnail.thumbnail_small }} />
                    
                    <View style={{ /*borderWidth: 1, borderColor: 'red',*/ flex: 1, justifyContent: 'space-between'}}>
                        
                        <View style={styles.HomeScreenRecentlyViewedInfo}>
                            <Text style={{ width: '100%', textAlign: 'left'}}>{this.props.data.title + ", " + this.props.data.category_name} </Text>
                            <Text style={{ width: '100%', textAlign: 'left'}}>{this.props.data.total_products + " designs, " + '\u20B9' + this.props.data.price_range + "/Pc."}</Text>
                        </View>
                        
                        <View style={{alignSelf: 'flex-end' }}>
                            <Button style={{backgroundColor: colorresource.orange, borderRadius: 3}}>
                                <Text>Add to Cart</Text>
                            </Button>
                        </View>
                    
                    </View>
                </Left>
            </CardItem>
        );
    }
}
