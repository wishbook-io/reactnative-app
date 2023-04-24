import React from 'react';
import { Platform, View,Text, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import {Card} from 'native-base';
import styles from './styles';

const isIOS = Platform.OS === 'ios';

export class ImageRenderer extends React.Component {
    shouldComponentUpdate(newProps) {
        return this.props.imageUrl !== newProps.imageUrl;
    }
    componentWillUpdate() {
        //On iOS while recycling till the new image is loaded the old one remains visible. This forcefully hides the old image.
        //It is then made visible onLoad
        if (isIOS && this.imageRef) {
            this.imageRef.setNativeProps({
                opacity: 0,
            });
        }
    }
    handleOnLoad = () => {
        if (isIOS && this.imageRef) {
            this.imageRef.setNativeProps({
                opacity: 1,
            });
        }
    };
    render() {
        console.log('imageUrl', this.props.imageUrl)
        const renderIf = this.props.imageUrl.image.thumbnail_small ? true : false;
        return (
            renderIf ?
                (   <TouchableOpacity onPress={this.props.onPressItem} style={styles.Imagerendererviewtop}>    
                        <Image
                            resizeMode={'contain'}
                            style={styles.ImagerendererviewFastImage}
                            source={{ uri: this.props.imageUrl.image.thumbnail_small }}
                        />

                        <Text style={styles.Imagerendererviewtext}>{this.props.imageUrl.category_name}</Text>
                    </TouchableOpacity>
                    
                ) : (<View />)
        );
    }
}
