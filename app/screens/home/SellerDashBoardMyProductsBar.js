import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text } from 'native-base';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';
import {goToAddCatalog,goToMyProducts} from '../../actions/navigation-actions'

const SellerDashBoardMyProductsBar = ({
    uploaded_catalog,
    txt_analytics_label,
    onPress
}) => (

        <View elevation={2} 
        style={styles.Manifacturetopview} >
            <TouchableOpacity activeOpacity={1} onPress={()=>goToMyProducts()}
                style={styles.Manifacturetopac}>
                <View style={styles.Manifacturetpacview}>
                    <View style={styles.Manifacturetpacviewsec}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.Manifacturetpactxt}>
                            {uploaded_catalog}</Text></View>
                    <View style={styles.Manifactureactiveview}>
                        <Text style={styles.Manifactureactivetxt}>Active Products</Text></View>
                </View>
            </TouchableOpacity>
            <Button block style={styles.Manifacturebutton} onPress={()=>goToAddCatalog()}><Text style={styles.Manifacturelasttxt}>+ Add New Products</Text></Button>
        </View>

    );

SellerDashBoardMyProductsBar.propTypes = {
    uploaded_catalog: PropTypes.number,
    txt_analytics_label: PropTypes.string,
    onPress: PropTypes.func
};

export default SellerDashBoardMyProductsBar;