import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Linking, ImageBackground } from 'react-native';
import SendIntentAndroid  from 'react-native-send-intent';
// local imports
import styles from './styles';
import { Header, Container, Content, View, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';
import { strings } from '../../utils/i18n';
import { HeaderBackNativeBase } from '../../components/Header';
// import Share from 'react-native-share';

import customData from '../../locales/en.json';

class ShareAppScreen extends Component {

    openDrawer = () => {
        this.props.navigation.navigate("DrawerOpen")
    }

    CallwhatsappShare(ShareType){
		let shareOptions = {
			title: "WishBook",
			message: `${customData.sharemessage.share_app_message}`,
			url: "",
			social: ShareType
		};

		Share.shareSingle(shareOptions);
	}
	
	CallsmsShare(ShareType){
		Linking.openURL(`sms:?body=${customData.sharemessage.share_app_message}`);
	}
	
	callothersShare(){
		let shareOptions = {
			title: "WishBook",
			message: `${customData.sharemessage.share_app_message}`,
			url: "com.wishbook.catalogone.sales",
			subject: "WishBook"
		};
		Share.open(shareOptions);
	}

    render() {
        
        return (
            <Container style={styles.container}>
                <HeaderBackNativeBase title={strings('homeNavigationDrawer.share_app')} onPress={this.openDrawer} icon="menu" />
                <ImageBackground source={require('../../images/intro_bg.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.containerImageView}>
                    <Image style={styles.imageView}
                        source={require('../../images/applogo.png')}
                    />
                </View>
                <Content padder style={styles.contentView}>
                    <Text padder style={styles.shareappText}>
                        {strings('shareapp.share_app_sub_txt')}
                    </Text>
                    <Body style={styles.body}>
                        <Button iconLeft bordered onPress={()=>{this.CallwhatsappShare('whatsapp')}} style={styles.whatsappButton}>
                            <Icon type="FontAwesome" name='whatsapp' style={styles.whatsappIcon} />
                            <Text style={styles.whatsappText}>{strings('shareapp.whatsapp')}</Text>
                        </Button>
                        <Button iconLeft bordered onPress={()=>{this.CallsmsShare()}} style={styles.smsButton}>
                            <Icon type="MaterialIcons" name='textsms' style={styles.smsIcon} />
                            <Text style={styles.smsText}>{strings('shareapp.sms')}</Text>
                        </Button>
                        <Button iconLeft bordered onPress={()=>{this.callothersShare()}} style={styles.otherButton}>
                            <Icon type="MaterialIcons" name='share' style={styles.otherIcon} />
                            <Text style={styles.otherText}>{strings('shareapp.other')}</Text>
                        </Button>
                    </Body>
                </Content>
                </ImageBackground>
            </Container>
        );
    }
}

export default connect()(ShareAppScreen);