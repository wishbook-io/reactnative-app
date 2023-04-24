import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableHighlight } from 'react-native';
import { View, Button, Icon, Text, Body, Card } from 'native-base';
import IconText from './IconText';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

const FilterSortComponent = ({
    onPress,
    filterBadgeVisible = false,
    sortBadgeVisible = false,
    badgeText = 2,
    badgeColorVisible = false,
    badgeColor = colorresource.orange,
}) => (
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
            <IconText onPress={() => onPress(0)} isImage={true} imagePath={require('./images/ic_funnel.png')} imageStyle={{ width: 28, height: 28 }}
                text='Filter' textColor={colorresource.liteblue} textFontSize={13}
                badgeVisible={filterBadgeVisible} badgeText={badgeText} badgeColorVisible={badgeColorVisible} badgeColor={badgeColor} />
            <IconText onPress={() => onPress(1)} isImage={true} imagePath={require('./images/ic_sort.png')} imageStyle={{ width: 28, height: 28 }}
                text='Sort' textColor={colorresource.liteblue} textFontSize={13}
                badgeVisible={sortBadgeVisible} badgeText={badgeText} badgeColorVisible={badgeColorVisible} badgeColor={badgeColor} />
        </View>
    );

FilterSortComponent.propTypes = {
    onPress: PropTypes.func,
    filterBadgeVisible: PropTypes.bool,
    sortBadgeVisible: PropTypes.bool,
    badgeText: PropTypes.number,
    badgeColorVisible: PropTypes.bool,
    badgeColor: PropTypes.string,
};

export default FilterSortComponent;