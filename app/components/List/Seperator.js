import React from 'react';
import { View } from 'react-native';

import styles from './styles';

const Seperator = ({
    setMargin = false
}) => (
        <View style={{flex:1}}>
            {setMargin ? (<View style={styles.seperatorMarginLeft} />) : (<View style={styles.seperator} />)}
        </View>
    );

export default Seperator;
