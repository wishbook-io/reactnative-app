import React from 'react';
import PropTypes from 'prop-types';
import { View, Card, CardItem, Text, Left, Right } from "native-base";
import { Seperator } from '../List';
import styles from './styles';

const LeadsEnquiryCard = ({
    heading,
    headingPoints = 0,
    openPoints = 0,
    closedPoints = 0,
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
                    <Text adjustsFontSizeToFit={true} style={styles.openTextPoints}>{openPoints}</Text>
                    <Text adjustsFontSizeToFit={true} style={styles.cardItemText}>Open</Text>
                </CardItem>
                <CardItem button onPress={()=>onPress(2)} style={styles.cardItem}>
                    <Text adjustsFontSizeToFit={true} style={styles.cardLeftText}>{closedPoints}</Text>
                    <Text adjustsFontSizeToFit={true} style={styles.cardItemText}>Closed</Text>
                </CardItem>
            </View>
        </Card>
    </View>
);

LeadsEnquiryCard.propTypes = {
    heading: PropTypes.string,
    headingPoints: PropTypes.number,
    openPoints: PropTypes.number,
    closedPoints: PropTypes.number,
    onPress: PropTypes.func,
};

export default LeadsEnquiryCard;