import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableHighlight } from 'react-native';
import { View, Button, Icon, Text, Body, Card } from 'native-base';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

const BadgesScrollViewComponent = ({
    data = [],
    headerText = 'Saree',
    onPress
}) => (
        <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
            <ScrollView horizontal={true}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>{headerText}</Text>
                {
                    data.map((item, key) =>
                        (
                            <TouchableHighlight onPress={()=>onPress(item)} underlayColor={styles.underlayColor}>
                                <Text style={{
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

BadgesScrollViewComponent.propTypes = {
    data: PropTypes.array,
    headerText: PropTypes.string,
    onPress: PropTypes.func
};

export default BadgesScrollViewComponent;