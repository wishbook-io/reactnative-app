import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, View, Text, TouchableHighlight } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card, Button } from 'native-base';
import styles from './styles';

const isIOS = Platform.OS === 'ios';

export default class GridImageView extends Component {

    shouldComponentUpdate(newProps) {
        return this.props.imageUrl !== newProps.imageUrl;
    }
    componentWillUpdate() {
        //On iOS while recycling till the new image is loaded the old one remains visible. This forcefully hides the old image.
        //It is then made visible onLoad
        if (isIOS && this.imageRef) {
            this.imageRef.setNativeProps({
                opacity: 0,
            });
        }
    }
    handleOnLoad = () => {
        if (isIOS && this.imageRef) {
            this.imageRef.setNativeProps({
                opacity: 1,
            });
        }
    };

    render() {
        const renderIf = this.props.imageUrl ? true : false;
        return (
            renderIf ?
                (<Button style={styles.GridImagebutton} transparent onPress={this.props.onPressItem}>
                        <View
                            style={styles.GridImagetopview} >
                            <FastImage
                                ref={ref => {
                                    this.imageRef = ref;
                                }}
                                style={styles.GridImagefastimage}
                                onLoad={this.handleOnLoad}
                                resizeMode='stretch'
                                source={{ uri: this.props.imageUrl }}
                            />
                        </View>
                    </Button>
                ) : (<View />)
        );
    }
}