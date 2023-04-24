import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text, Left } from "native-base";


import styles from './styles';
import UsersVideoReviewsViewCard from './UsersVideoReviewsViewCard'
import { colorresource } from '../../resources/colorresource';
import {goToGridViewListScreen} from '../../actions/navigation-actions'

const UsersVideoReviewsView = ({
    data,    
    headerTitle,
    onPress,
}) => (
        <View style={styles.UsersVideoReviewsViewtop}>
            <LinearGradient
                colors={[ colorresource.liteblue, '#6dd5ed', '#6dd5ed']}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 0.8, y: 1.0 }}
                style={styles.UsersVideoReviewsViewCardlg}>
                <View style={styles.UsersVideoReviewsViewCardview}>
                    <Left>
                        <Text style={styles.UsersVideoReviewsViewCardheadertitle}>{headerTitle}</Text>
                    </Left>
                    
                </View>
            </LinearGradient>
            <FlatList style={styles.UsersVideoReviewsViewCardlast}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => <UsersVideoReviewsViewCard  url={item.image.banner} onPress={() => onPress(item.url)}/>}
                keyExtractor={(item, index) => index.toString()} />
        </View>
    );

UsersVideoReviewsView.propTypes = {
    data: PropTypes.array,
    onPress: PropTypes.func,
    headerTitle: PropTypes.string
};

export default UsersVideoReviewsView;
