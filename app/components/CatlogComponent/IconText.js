import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableHighlight } from 'react-native';
import { View, Button, Icon, Text, Badge } from 'native-base';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

_showTextBadge = (badgeText, badgeColorVisible, badgeColor) => {
    {
        return badgeColorVisible ?
            (<View style={{
                position: 'absolute', top: 0, right: 0, backgroundColor: colorresource.orange, borderRadius: 6, width: 12, height: 12,
                alignItems: 'center', justifyContent: 'center'
            }} />)
            :
            (<View style={{
                position: 'absolute', top: 0, right: 0, backgroundColor: colorresource.darkbluelite, borderRadius: 9, width: 18, height: 18,
                alignItems: 'center', justifyContent: 'center'
            }}>
                <Text style={{
                    textAlign: 'center', color: 'white', fontSize: 8
                }}>{badgeText}</Text>
            </View>)
    }
}

const IconText = ({
    isImage = false,
    imagePath = require('../../images/mobile.png'),
    iconName = 'android',
    iconType = 'Zocial',
    iconColor = colorresource.black,
    imageStyle = {},
    text = 'Text',
    textFontSize = 16,
    textColor = colorresource.black,
    badgeVisible = false,
    badgeText = 2,
    badgeColorVisible = false,
    badgeColor = colorresource.orange,
    onPress
}) => (
        <Button transparent onPress={onPress} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 5, margin: 5 }}  >
            <View style={{ alignItems: 'center', position: 'relative', top: 0, left: 0, right: 0 }}>
                {isImage ? (<Image style={[imageStyle]} resizeMode="contain" source={imagePath} />) :
                    (<Icon name={iconName} type={iconType} style={[{ color: iconColor }]} />)}
                <Text style={[{ color: textColor, fontSize: textFontSize }]}>{text}</Text>
            </View>
            {badgeVisible ?
                (_showTextBadge(badgeText, badgeColorVisible, badgeColor)) : null
            }
        </Button>
    );

IconText.propTypes = {
    onPress: PropTypes.func,
    isImage: PropTypes.bool,
    imagePath: PropTypes.any,
    imageWidth: PropTypes.number,
    imageStyle: PropTypes.object,
    text: PropTypes.string,
    iconType: PropTypes.string,
    iconColor: PropTypes.string,
    textFontSize: PropTypes.number,
    textColor: PropTypes.string,
    textFontFamily: PropTypes.string,
    badgeVisible: PropTypes.bool,
    badgeText: PropTypes.number,
    badgeColorVisible: PropTypes.bool,
    badgeColor: PropTypes.string,
};

export default IconText;