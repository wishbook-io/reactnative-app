import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableHighlight } from 'react-native';
import { View, Button, Icon, Text, Body, Card, CardItem } from 'native-base';
import FilterSortComponent from './FilterSortComponent';
import BadgesComponent from './BadgesComponent';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

const CatlogFilterSortComponent = ({
    data = [],
    filterBadgeVisible = false,
    sortBadgeVisible = false,
    badgeText = 2,
    badgeColorVisible = false,
    badgeColor = colorresource.orange,
    onPress,
}) => (
        <Card style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
            <FilterSortComponent onPress={onPress}
                filterBadgeVisible={filterBadgeVisible} 
                sortBadgeVisible={sortBadgeVisible} 
                badgeText={badgeText}
                badgeColorVisible={badgeColorVisible} 
                badgeColor={badgeColor} 
            />
            <View style={{ width: 1, backgroundColor: colorresource.darkgray }} />
            <BadgesComponent onPress={onPress} />
        </Card>
    );

CatlogFilterSortComponent.propTypes = {
    data: PropTypes.array,
    onPress: PropTypes.func,
    filterBadgeVisible: PropTypes.bool,
    sortBadgeVisible: PropTypes.bool,
    badgeText: PropTypes.number,
    badgeColorVisible: PropTypes.bool,
    badgeColor: PropTypes.string,
};

export default CatlogFilterSortComponent;