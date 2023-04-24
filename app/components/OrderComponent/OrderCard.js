import React from 'react';
import PropTypes from 'prop-types';
import { View, Card, CardItem, Text, Left, Right } from "native-base";
import { Seperator } from '../List'
import styles from './styles';

const OrderCard = ({
    heading,
    headingPoints = 0,
    pendingPoints = 0,
    dispatchedPoints = 0,
    cancelledPoints = 0,
    onPress
}) => (
        <View>
            <Card>
                <CardItem button onPress={()=>onPress(0)}>
                    <Left>
                        <Text adjustsFontSizeToFit={true} style={styles.cardLeftText}>{heading}</Text>
                    </Left>
                    <Right>
                        <Text adjustsFontSizeToFit={true} style={styles.cardRightText}>{headingPoints}</Text>
                    </Right>
                </CardItem>
                <View style={styles.seperatorView}>
                    <Seperator />
                </View>
                <View style={styles.statusView}>
                    <CardItem button onPress={()=>onPress(1)} style={styles.cardItem}>
                        <Text adjustsFontSizeToFit={true} style={styles.pendingTextPoints}>{pendingPoints}</Text>
                        <Text adjustsFontSizeToFit={true} style={styles.cardItemText}>Pending</Text>
                    </CardItem>
                    <CardItem button onPress={()=>onPress(2)} style={styles.cardItem}>
                        <Text adjustsFontSizeToFit={true} style={styles.cardLeftText}>{dispatchedPoints}</Text>
                        <Text adjustsFontSizeToFit={true} style={styles.cardItemText}>Dispatched</Text>
                    </CardItem>
                    <CardItem button onPress={()=>onPress(3)} style={styles.cardItem}>
                        <Text adjustsFontSizeToFit={true} style={styles.cardLeftText}>{cancelledPoints}</Text>
                        <Text adjustsFontSizeToFit={true} style={styles.cardItemText}>Cancelled</Text>
                    </CardItem>
                </View>
            </Card>
        </View>
    );


OrderCard.propTypes = {
    heading: PropTypes.string,
    headingPoints: PropTypes.number,
    pendingPoints: PropTypes.number,
    dispatchedPoints: PropTypes.number,
    cancelledPoints: PropTypes.number,
    onPress: PropTypes.func,
};

export default OrderCard;