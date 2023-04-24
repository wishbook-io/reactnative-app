import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text } from 'native-base';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

const SellerDashBoardFollowersBar = ({
    total_followers,
    txt_analytics_label,
    onPress
}) => (
        <TouchableOpacity elevation={2} onPress={onPress} style={styles.DashBoardRightAnalyticstopview}>
            <View  style={styles.DashBoardRightAnalyticselevation} >
                <View style={styles.DashBoardRightAnalyticsview}>
                    <Text style={styles.DashBoardRightAnalyticstext}>
                        Total Followers</Text></View>
                <View style={styles.DashBoardRightAnalyticslastview}>
                    <Text style={styles.DashBoardRightAnalyticslasttext}>{total_followers}</Text></View>
            </View>
        </TouchableOpacity>
    );

SellerDashBoardFollowersBar.propTypes = {
    total_followers: PropTypes.number,
    txt_analytics_label: PropTypes.string,
    onPress: PropTypes.func
};

export default SellerDashBoardFollowersBar;