import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { View, Content, Card, CardItem, Text, Left, Right, Thumbnail, Body, Button, H3 } from "native-base";
import { Seperator } from '../List';
import styles from './styles';

const OrderDetailsItemCard = ({
    data,
    onPress
}) => (
        <View>
            <View style={{ flexDirection: 'column', padding: 5 }}>
                <CardItem style={{ alignItems: 'center' }}>
                    <Left><H3>{'txt_order_no'}</H3></Left>
                    <Right><Text>{'txt_order_date'}</Text></Right>
                </CardItem>
                <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                    <Thumbnail style={{ flex: 1, height: 180 }} square source={{ uri: 'http://b2b.trivenilabs.com/media/__sized__/category_images/Kurti-thumbnail-150x150.png' }} />
                    <View style={{ flex: 2, flexDirection: 'column', margin: 5, height: 180 }}>
                        <View style={{ height: 60, flexDirection: 'row', padding: 5 }}>
                            <Body style={{ alignItems: 'flex-start', margin: 5 }}>
                                <Text style={{ textAlign: 'left' }}>Seller</Text>
                                <Text note numberOfLines={1} ellipsizeMode='tail' style={{ textAlign: 'left' }}>{'txt_seller_name'}</Text>
                            </Body>
                            <Body style={{ alignItems: 'flex-start', margin: 5 }}>
                                <Text style={{ textAlign: 'left' }}>Buyer</Text>
                                <Text note numberOfLines={1} ellipsizeMode='tail' style={{ textAlign: 'left' }}>{'txt_buyer_name'}</Text>
                            </Body>
                            <Body style={{ alignItems: 'flex-start', margin: 5 }}>
                                <Text style={{ textAlign: 'left' }}>Broker</Text>
                                <Text note numberOfLines={1} ellipsizeMode='tail' style={{ textAlign: 'left' }}>{'txt_broker_name'}</Text>
                            </Body>
                        </View>
                        <View style={{ height: 60, flexDirection: 'row', padding: 5 }}>
                            <Body style={{ alignItems: 'flex-start', margin: 5 }}>
                                <Text style={{ textAlign: 'left' }}>Order Value</Text>
                                <Text note numberOfLines={1} ellipsizeMode='tail' style={{ textAlign: 'left' }}>{'txt_order_value'}</Text>
                            </Body>
                            <Body style={{ alignItems: 'flex-start', margin: 5 }}>
                                <Text style={{ textAlign: 'left' }}>Brokerage</Text>
                                <Text note numberOfLines={1} ellipsizeMode='tail' style={{ textAlign: 'left' }}>{'txt_brokerage'}</Text>
                            </Body>
                        </View>
                        <View style={{ height: 60, flexDirection: 'row', padding: 5 }}>
                            <Body style={{ alignItems: 'flex-start', margin: 5 }}>
                                <Text style={{ textAlign: 'left' }}>Payment Status</Text>
                                <Text note numberOfLines={1} ellipsizeMode='tail' style={{ textAlign: 'left' }}>{'txt_payemnt_status'}</Text>
                            </Body>
                            <Body style={{ alignItems: 'flex-start', margin: 5 }}>
                                <Text style={{ textAlign: 'left' }}>Order Status</Text>
                                <Text note numberOfLines={1} ellipsizeMode='tail' style={{ textAlign: 'left' }}>{'txt_order_status'}</Text>
                            </Body>
                        </View>
                    </View>
                </View>
                <View style={{ height: 2 }}>
                    <Seperator />
                </View>
                <View style={{ height: 55, backgroundColor: 'white', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ flex: 2, padding: 5, textAlign: 'left' }} numberOfLines={2}>Buyer's credit rating</Text>
                    <Image style={{ flex: 1.5, padding: 5 }} resizeMode="contain" source={require('../../images/ic_credit_rating_good.png')}></Image>
                    <Button style={{ flex: 2, padding: 6 }} numberOfLines={2} transparent onPress={() => onPress()}>
                        <Text style={{ textAlign: 'right' }}>SEE DETAILS</Text>
                    </Button>
                    <Text style={{ flex: 2, padding: 5, textAlign: 'right' }} numberOfLines={2}>{'txt_unrated'}</Text>
                </View>
            </View>
        </View>
    );

OrderDetailsItemCard.propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func
};

export default OrderDetailsItemCard;