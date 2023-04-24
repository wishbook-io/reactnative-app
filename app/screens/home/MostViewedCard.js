import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text, Left } from "native-base";
import { Button as PButton } from 'react-native-paper'

import styles from './styles';
import ImageViewCard from './ImageViewCard';
import { colorresource } from '../../resources/colorresource';
import {goToGridViewListScreen} from '../../actions/navigation-actions'

const MostViewedCard = ({
    data,
    onPress,
    headerTitle
}) => (
        <View style={styles.MostViewCardtop}>
            <LinearGradient
                colors={['#d40159', '#e8330a']}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 0.8, y: 1.0 }}
                style={styles.MostViewCardlg}>
                <View style={styles.MostViewCardview}>
                    <Left>
                        <Text style={styles.MostViewCardheadertitile}>{headerTitle}</Text>
                    </Left>
                    <PButton color={'white'} onPress={()=>goToGridViewListScreen(headerTitle,data)}>
                    {'See all'}
                    </PButton>
                </View>
            </LinearGradient>
            <FlatList style={styles.MostViewCardlast}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item: rowData }) => <ImageViewCard rowData={rowData} onPress={() => onPress(rowData.id)} url={rowData.image.thumbnail_medium} />}
                keyExtractor={(item, index) => index.toString()} />
        </View>
    );

MostViewedCard.propTypes = {
    data: PropTypes.array,
    onPress: PropTypes.func,
    headerTitle: PropTypes.string
};

export default MostViewedCard;
