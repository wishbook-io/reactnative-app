import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Text, Left, Right, Thumbnail, Button, Body, Icon } from "native-base";
import styles from './styles';

const CatlogItem = ({
    data,
    onPress
}) => (
        <TouchableOpacity onPress={onPress}>

            <Container style={styles.catitemtop}>
                <ImageBackground style={styles.catlogflexone} resizeMode='stretch'
                 source={{ uri: (data.thumbnail === undefined)? data.values.imgUrl : data.thumbnail.full_size }}>

                    <LinearGradient
                        colors={['rgba(0,0,0,0.7)', 'transparent']}
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 0.0, y: 0.0 }}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}>
                        <View style={styles.catitemviewtop}>
                            <View style={styles.catitemviewscd}>
                                <Image style={styles.catitemviewimg} 
                                resizeMode='contain' source={require('../../images/ic_trusted_seller_small.png')} />
                            </View>
                            <View style={styles.catitemviewaftimg}>
                                <Thumbnail
                                 style={styles.catitemthumbnail} 
                                square resizeMode='stretch'
                                source={{ uri: data.brand_image }} />
                                <View style={styles.catitemthumbnailcoloumn}>
                                    <View style={styles.catitemrow}>
                                        <Left style={styles.catitemcatlogrow}>
                                            <Text style={styles.catitemcatlogtext}>Catlog :</Text>
                                            <Text style={styles.catitempricetext}>{data.title}</Text>
                                        </Left>
                                    </View>
                                    <View style={styles.catitempriceview}>
                                        <Left style={styles.catitemcatlogrow}>
                                            <Text style={styles.catitemcatlogtext}>Price :</Text>
                                            <Text style={styles.catitempricetext}>{'₹'+data.price_range+'/Pc.'}</Text>
                                        </Left>
                                    </View>
                                    <View style={styles.catitemrow}>
                                        <Left style={styles.catitemcatlogrow}>
                                            <Text style={styles.catitempricesoldbytext}>Sold By :</Text>
                                            <Text style={styles.catitempricetextsoldby}>{data.company}</Text>
                                        </Left>
                                        <Right>
                                            <Thumbnail style={styles.catitemthumbnailheight} square resizeMode='contain' source={require('../../images/ic_share_catalog_white.png')} />
                                        </Right>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </Container>
        </TouchableOpacity>

    );

CatlogItem.propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func
};

export default CatlogItem;