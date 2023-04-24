import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text } from 'native-base';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

const SellerDashBoardMostViewedBar = ({
    catalogs_under_most_viewed,
    txt_analytics_label,
    onPress
}) => (
        <TouchableOpacity elevation={2} onPress={onPress} style={styles.DashBoardLeftanalytics}>
            <View  style={styles.DashBoardLeftanalyticselevation} >
                <View style={styles.DashBoardLeftanalyticssecview}>
                    <Text style={styles.DashBoardLeftanalyticssectext}>{catalogs_under_most_viewed}</Text></View>
                <View style={styles.DashBoardLeftanalyticsviewall}>
                    <Text style={styles.DashBoardLeftanalyticslast}>
                        Products under "Top 10 Most viewed catalogs in last 7 days"</Text></View>
            </View>
        </TouchableOpacity>
    );

SellerDashBoardMostViewedBar.propTypes = {
    catalogs_under_most_viewed: PropTypes.number,
    txt_analytics_label: PropTypes.string,
    onPress: PropTypes.func
};

export default SellerDashBoardMostViewedBar;