import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableHighlight } from 'react-native';
import { View, Button, Icon, Text, Body, Card } from 'native-base';
import IconText from './IconText';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

const BadgesComponent = ({
    data = [],
    onPress
}) => (
        <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
            <ScrollView horizontal={true}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <IconText onPress={() => onPress(2)} isImage={true} imagePath={require('./images/ic_search.png')}
                    imageStyle={{ width: 28, height: 28 }} text='Search' textColor={colorresource.liteblue} textFontSize={13} />
                <IconText onPress={() => onPress(3)} isImage={true} imagePath={require('./images/ic_my_filter.png')}
                    imageStyle={{ width: 28, height: 28 }} text='My Filter' textColor={colorresource.liteblue} textFontSize={13} />
                {
                    data.map((item, key) =>
                        (
                            <TouchableHighlight onPress={() => onPress(4, item)} underlayColor={styles.underlayColor}>
                                <Text style={{
                                    borderRadius: 5, borderColor: colorresource.liteblue, borderWidth: 1,
                                    textAlign: 'center', padding: 5, margin: 5, color: colorresource.liteblue
                                }}>
                                    {item}
                                </Text>
                            </TouchableHighlight>
                        ))
                }
            </ScrollView>
        </View>
    );

BadgesComponent.propTypes = {
    data: PropTypes.array,
    onPress: PropTypes.func
};

export default BadgesComponent;