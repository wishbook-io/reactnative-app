import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text } from 'native-base';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

const DashBoardLeftAnalytics = ({
    txt_analytics_value,
    txt_analytics_label,
    onPress
}) => (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={
            styles.DashBoardLeftanalytics
        }>
            <View elevation={2}
             style={styles.DashBoardLeftanalyticselevation} >
                <View 
                style={styles.DashBoardLeftanalyticsnine}>
                    <Text style={styles.DashBoardLeftanalyticsninetext}>999999</Text></View>
                <View 
                style={styles.DashBoardLeftanalyticsviewall}>
                    <Text 
                    style={styles.DashBoardLeftanalyticslast}>
                        Views on all your catalogs (Last 7 days)</Text></View>
            </View>
        </TouchableOpacity>
    );

DashBoardLeftAnalytics.propTypes = {
    txt_analytics_value: PropTypes.string,
    txt_analytics_label: PropTypes.string,
    onPress: PropTypes.func
};

export default DashBoardLeftAnalytics;