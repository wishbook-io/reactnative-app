import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text, Left, Right, Thumbnail, Button, Body, Icon } from "native-base";
import styles from './styles';

const ShareStatusItem = ({
    data,
    onPress
}) => (
        <TouchableOpacity onPress={onPress}>
            <Card style={styles.Sharestatustopview} >
                <Thumbnail style={styles.Sharestatuscatname} square resizeMode='stretch' source={{ uri: 'http://b2b.trivenilabs.com/media/__sized__/category_images/Kurti-thumbnail-150x150.png' }} />
                <View style={styles.Sharestatuscatnameview}>
                    <Text style={styles.Sharestatuscatnametext}>Catalog Name</Text>
                    <View style={styles.Sharestatuscatnamerow}>
                        <Text note numberOfLines={1} style={styles.Sharestatuscatnamedesigntext}>Designs :</Text>
                        <Right>
                            <Text style={styles.Sharestatusfontsizefouteen}>{'1'}</Text>
                        </Right>
                    </View>
                    <View style={styles.Sharestatus}>
                        <Text note numberOfLines={1} style={styles.Sharestatuscatnamedesigntext}>Shares :</Text>
                        <Right>
                            <Text style={styles.Sharestatusfontsizefouteen}>{'1'}</Text>
                        </Right>
                    </View>
                    <View style={styles.Sharestatuscatnamerow}>
                        <Text note numberOfLines={1} style={styles.Sharestatuscatnamedesigntext}>Catalog Views :</Text>
                        <Right>
                            <Text style={styles.Sharestatusfontsizefouteen}>{'1'}</Text>
                        </Right>
                    </View>
                    <View style={styles.Sharestatuscatnamerow}>
                        <Text note numberOfLines={1} style={styles.Sharestatuscatnamedesigntext}>Products Views :</Text>
                        <Right>
                            <Text style={styles.Sharestatusfontsizefouteen}>{'1'}</Text>
                        </Right>
                    </View>
                    <View style={styles.Sharestatuscatnamerow}>
                        <Text note numberOfLines={1} style={styles.Sharestatuscatnamedesigntext}>Status :</Text>
                        <Right>
                            <Text style={styles.Sharestatusfontsizefouteen}>{'pending'}</Text>
                        </Right>
                    </View>
                </View>
                <Right style={styles.Sharestatusflex}>
                    <Thumbnail style={styles.Sharestatusheight} square resizeMode='contain' source={require('../../images/forward.png')} />
                </Right>
            </Card>
        </TouchableOpacity>
    );

ShareStatusItem.propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func
};

export default ShareStatusItem;