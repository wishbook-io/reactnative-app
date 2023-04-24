import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import styles, { bannerAspectRatio } from './styles';

const deviceWidth = Dimensions.get('window').width;

export default class BannerTemplate extends Component {

    render({ image, aspectRatio = bannerAspectRatio, onPress } = this.props) {
        return (
            <TouchableOpacity style={{height:deviceWidth/aspectRatio}} onPress={onPress}>
                <Image style={styles.img} source={image} resizeMode="stretch" />
            </TouchableOpacity>
        );
    }
}
