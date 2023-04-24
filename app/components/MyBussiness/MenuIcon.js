import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import assets from '../../utils/assetsObject';
import { colorresource } from '../../resources/colorresource';

export default class MenuIcon extends Component {
    render({ iconName,
        iconColor,
        iconSize,
        title,
        subtitle,
        titleColor,
        titleWeight,
        titleSize,
        onPress,
        underlayColor,
        testId,
    } = this.props) {
        return (
            <TouchableHighlight style={styles.container} underlayColor={underlayColor} onPress={onPress} {...testId}>
                <View style={styles.itemContainer}>
                    <Image resizeMode='contain' source={assets[iconName]} style={[{ padding: 5, margin: 5, width: iconSize, height: iconSize}, iconColor ? {tintColor: iconColor } : {}]} />
                    <Text style={[styles.title, { color: titleColor, fontWeight: titleWeight, fontSize: titleSize }]}>{title}</Text>
                    { subtitle
                    ? <Text style={{fontSize: 12}}>{subtitle}</Text>
                    : null }
                </View>
            </TouchableHighlight>
        );
    }
}

MenuIcon.propTypes = {
    iconName: PropTypes.string,
    title: PropTypes.string,
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    titleColor: PropTypes.string,
    titleWeight: PropTypes.string,
    titleSize: PropTypes.number,
    onPress: PropTypes.func,
    underlayColor: PropTypes.string,
}

MenuIcon.defaultProps = {
    iconColor: colorresource.liteblue,
    iconSize: 30,
    titleColor: 'grey',
    titleWeight: 'normal',
    titleSize: 14,
    onPress: () => { },
    underlayColor: colorresource.Verylightgray,
    testId: {}
}