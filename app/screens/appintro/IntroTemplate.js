import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Button as PButton } from 'react-native-paper';
import styles from './styles';

export default class IntroTemplate extends Component {

    render({ image, header, info, onPress } = this.props) {
        return (
            <View style={styles.container}>
                <Image style={styles.imageContainer} source={image} resizeMode="contain" />
                <View style={styles.detailsContainer}>
                    <Text style={styles.header}>{header}</Text>
                    <Text style={styles.info}>{info}</Text>
                    <View style={styles.buttonParent}>
                        <PButton
                        mode='contained'
                        onPress={onPress}
                        >Get Started</PButton>
                    </View>
                </View>
                
            </View>
        );
    }
}

