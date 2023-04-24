import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import { Text as TextNB, Button, Icon } from 'native-base';
import { TouchableRipple } from 'react-native-paper'

import { colorresource } from 'app/resources/colorresource';
import styles from './styles';
import assets from '../../utils/assetsObject';
import { TestIdGenerator } from "../../utils/TestingHelper";

const screenName = 'MenuSideBar';
const buttonTestId = TestIdGenerator(screenName,'','Button');


const SideBarTextView = ({
    text,
    isBold = true,
    icon = 'home',
    onPress,
    testId,
}) => (
        <View style={{ 
            flex: 1, 
            alignItems: 'flex-start', 
            // borderWidth: 1, 
            // borderColor: 'yellow' 
        }}>
            <TouchableRipple 
            transparent 
            onPress={onPress} 
            style={{ 
                flex: 1,
                flexDirection: 'row',
                width: '100%', // web
                justifyContent: undefined,
                alignItems: 'center',
                // borderWidth: 1, 
                // borderColor: 'red'
            }}
            {...buttonTestId(testId)}
            >
                {isBold ? (
                    <Text style={styles.largeText}>{text}</Text>
                ) :
                    (
                        <View style={styles.sideBarNotBoldContainer}>
                            <Image resizeMode='contain' source={assets[icon]} style={{ width: 20, height: 20, tintColor: colorresource.grey46}} />
                            <Text style={styles.mediumText}>{text}</Text>
                        </View>)
                }
            </TouchableRipple>
        </View>
    );

SideBarTextView.propTypes = {
    text: PropTypes.string,
    isBold: PropTypes.bool,
    icon: PropTypes.string,
    onPress: PropTypes.func,
};

export default SideBarTextView;
