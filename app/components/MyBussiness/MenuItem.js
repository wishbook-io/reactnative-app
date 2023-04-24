import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import assets from '../../utils/assetsObject';
import { colorresource } from '../../resources/colorresource';


export default class MenuItem extends Component {
    render({ iconName,
        iconColor,
        iconSize,
        title,
        titleColor,
        titleWeight,
        titleSize,
        onPress,
        underlayColor,
        testId,
    } = this.props) {
        return (
            <TouchableHighlight style={styles.itemrootContainer} underlayColor={underlayColor} onPress={onPress} {...testId}>
                <View style={styles.itemcontainer}>
                    <Image resizeMode='contain' source={assets[iconName]} style={[{ padding: 5, margin: 5, width: iconSize, height: iconSize }]} />
                    <Text style={[styles.itemtitle, { color: titleColor, fontWeight: titleWeight, fontSize: titleSize }]}>{title}</Text>
                    { this.props.new
                    ? <Image resizeMode='contain' source={assets['ic_new']} style={[{ alignSelf: 'flex-end', padding: 5, margin: 5, width: iconSize*2, height: iconSize*2*9/16 }]} />
                    : null}
                </View>
            </TouchableHighlight>
        );
    }
}

MenuItem.propTypes = {
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

MenuItem.defaultProps = {
    iconColor: colorresource.Vividblue,
    iconSize: 28,
    titleColor: colorresource.liteblue,
    titleWeight: 'normal',
    titleSize: 16,
    onPress: () => { },
    underlayColor: colorresource.Verylightgray,
    testId: {}
}