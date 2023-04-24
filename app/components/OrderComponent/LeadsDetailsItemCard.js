import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Content, Card, Text, Thumbnail, Body, Button } from "native-base";
import { Seperator } from '../List';
import styles from './styles';

const LeadsDetailsItemCard = ({
    data,
    onPress
}) => (
        <View>
            <View style={{ flexDirection: 'row', padding: 5 }}>
                <Thumbnail style={{ width: 80, height: 80 }} resizeMode='contain' square
                    source={{ uri: 'http://b2b.trivenilabs.com/media/__sized__/category_images/Kurti-thumbnail-150x150.png' }} />
                <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'space-around' }}>
                    <Body style={{ alignItems: 'flex-start' }}>
                        <Text adjustsFontSizeToFit={true} numberOfLines={1} ellipsizeMode='tail'
                            style={{ textAlign: 'left', paddingVertical: 5 }}>Buyer Company Name</Text>
                        <Text adjustsFontSizeToFit={true} note numberOfLines={1} ellipsizeMode='tail'
                            style={{ textAlign: 'left', paddingVertical: 5 }}>{'Location Name'}</Text>
                    </Body>
                    <Button transparent onPress={() => onPress()}>
                        <Text style={{ textAlign: 'right' }} >99 enquiries</Text>
                    </Button>
                </View>
            </View>
            <View style={{ height: 1 }}>
                <Seperator />
            </View>
        </View>
    );

LeadsDetailsItemCard.propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func
};

export default LeadsDetailsItemCard;