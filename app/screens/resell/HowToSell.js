import React, { Component } from 'react';
import { StyleSheet, WebView, Platform, ActivityIndicator } from 'react-native';
import { 
  View, 
  Button,
  Text,
  Container,
  Footer,
  FooterTab
} from 'native-base';
import { connect } from 'react-redux';

import GenericHeader from 'app/components/Header/GenericHeader'
import { colorresource } from 'app/resources/colorresource';
import { goBack } from '../../actions/navigation-actions'
import { CONSTANT_URL } from 'app/utils/URLConstants'
import { isWeb } from 'app/utils/PlatformHelper';

import { goToProductsTab } from 'app/actions/navigation-actions'

class HowToSell extends Component {

  onBrowseProductsPress = () => {
    // this.props.navigation.replace('')
    goToProductsTab()
  }

  constructor(props) {
    super(props)
    this.state = {
      webUrl: CONSTANT_URL.HOW_TO_RESELL_URL,
      title: 'Resell',
    }
  }
  
  render() {
    return (
      <Container>
        <GenericHeader
        title={this.state.title}
        />
        {isWeb?
          <View style={styles.WebViewStyle}>
            <Text
            accessibilityRole="link"
            href={this.state.webUrl}
            style={styles.LinkText}
            target="_blank"
            >
              {'Click here'}
            </Text>
          </View>
          :
          <WebView
          style={styles.WebViewStyle}
          source={{ uri: this.state.webUrl}}
          javaScriptEnabled={true}
          domStorageEnabled={true} 
          startInLoadingState={true}
          renderLoading={() => <ActivityIndicator color={colorresource.liteblue} size={'large'}/>}
          />}
        <Footer>
          <FooterTab>
            <Button style={{backgroundColor: colorresource.liteblue}} onPress={this.onBrowseProductsPress}>
              <Text style={{color: 'white', fontSize: 15}}>Browse & Share Products</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: (Platform.OS) === 'ios' ? 20 : 0
  },
  LinkText: {
    color: colorresource.liteblue,
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center'
  }
});

const mapStateToProps = (state,props) => {
  return {
  };
};
  
export default connect(mapStateToProps)(HowToSell);