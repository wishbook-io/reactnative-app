import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Text } from 'native-base';
import styles from './styles';
import { strings } from '../../utils/i18n';
import { colorresource } from '../../resources/colorresource';


const DashBoardOneCatalog = ({
    txt_count_view = 3,
    imageUrl,
    onPress
}) => (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <View style={styles.DaseboardOneCatalogtopview} >
                <ImageBackground style={styles.backgroundImage} source={require('../../images/manufacture_latest_bg.png')}>
                    <View style={styles.DaseboardOneCatalogview}>
                        <View style={styles.DaseboardOneCatalogscdview}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.DaseboardOneCatalogcountview}>
                                {txt_count_view}</Text></View>
                        <View style={styles.DaseboardOneCataloglatestcatview}>
                            <Text style={styles.DaseboardOneCataloglatesttext}>{strings('home.latest_catalog_view')}</Text></View>
                    </View>
                    <Image style={styles.DaseboardOneCatalogfinal} resizeMode='stretch' source={{ uri: imageUrl }} />
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
DashBoardOneCatalog.propTypes = {
    txt_count_view: PropTypes.number,
    imageUrl: PropTypes.string,
    onPress: PropTypes.func
};

export default DashBoardOneCatalog;