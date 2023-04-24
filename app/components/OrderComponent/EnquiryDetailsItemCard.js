import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Left, Right, Thumbnail, Button } from "native-base";
import { Seperator } from '../List';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

const EnquiryDetailsItemCard = ({
    data,
    onPress
}) => (
        <View style={{ flexDirection: 'row', padding: 5, backgroundColor: 'white' }}>
            <Thumbnail style={{ flex: 1, height: 140 }} square source={{ uri: 'http://b2b.trivenilabs.com/media/__sized__/category_images/Kurti-thumbnail-150x150.png' }} />
            <View style={{ flex: 2, flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', margin: 5 }}>
                    <Left style={{ marginLeft: 5 }}>
                        <Text style={{ fontSize: 16 }}>Catlog Name</Text>
                    </Left>
                    <Right>
                        <Text note style={{ fontSize: 12 }}>1 hour ago</Text>
                    </Right>
                </View>
                <View style={{ flexDirection: 'row', margin: 5 }}>
                    <Left style={{ marginLeft: 5 }}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 16 }}>Order Value</Text>
                    </Left>
                </View>
                <View style={{ flexDirection: 'row', margin: 5 }}>
                    <Right>
                        <Text note numberOfLines={1} style={{ fontSize: 12, fontStyle: 'italic' }}>Status: {'Open'}</Text>
                    </Right>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Right>
                        <Button transparent>
                            <Text note numberOfLines={1} style={{ color: colorresource.liteblue, fontSize: 15 }}>Create Sales Order</Text>
                        </Button>
                    </Right>
                </View>
            </View>
        </View>
    );

EnquiryDetailsItemCard.propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func
};

export default EnquiryDetailsItemCard;