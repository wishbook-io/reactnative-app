import React, { Component } from 'react';
import { StyleSheet, Platform, ActivityIndicator, Text } from 'react-native';
import { View, Container } from 'native-base';
import { connect } from 'react-redux';

import GenericHeader from 'app/components/Header/GenericHeader'
import WebView from 'app/components/WebView/WebView';
import { goBack, handleDeeplink } from '../../actions/navigation-actions'
import { colorresource } from 'app/resources/colorresource';

import { isWeb } from 'app/utils/PlatformHelper'

class WebViewScreen extends Component {
  
  renderError = (error) => {
    return (<Text>{error}</Text>)
  }
  
  onError = (error) => {
    console.warn("[WebViewScreen]", { error })
  }
  
  canFireRequest = (request) => {
    if (request.url.startsWith('wishbk://')) {
      console.log("[WebViewScreen:canFireRequest] wishbook deep link")
      if(!this.webview) {
        console.warn("[WebViewScreen:canFireRequest] ref n/a")
      } else {
        console.log("[WebViewScreen:canFireRequest] stop loading")
        this.webview.stopLoading();
      }
      handleDeeplink(request.url)
      return false
    }
    return true
  }
  
  registerRef = (ref) => {
    this.webview = ref;
  }
  
  handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    if (!url) return;

    console.log("[WebViewScreen]", {newNavState})

    if (url.startsWith('wishbk://')) {
      console.log("[WebViewScreen] stop loading")
      this.webview && this.webview.stopLoading();
      goBack();
      // open a modal with the PDF viewer
    }
  }
  
  render() {
    // console.log("Now rendering: ", this.props.webUrl)
    return (
      <Container>
        <GenericHeader
        title={this.props.title}
        />
        {isWeb?
          <View style={styles.WebViewStyle}>
            <Text
            accessibilityRole="link"
            href={this.props.webUrl}
            style={styles.LinkText}
            target="_blank"
            >
              {'Click here'}
            </Text>
          </View>
          :
          <WebView
          style={styles.WebViewStyle}
          source={{ uri: this.props.webUrl}}
          javaScriptEnabled={true}
          domStorageEnabled={true} 
          startInLoadingState={true}
          renderLoading={() => <ActivityIndicator color={colorresource.liteblue} size={'large'}/>}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
          onShouldStartLoadWithRequest={this.canFireRequest}
          ref={this.registerRef}
          onError={this.onError}
          renderError={this.renderError}
          />}
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
    webUrl:props.navigation.state.params.webUrl,
    title:props.navigation.state.params.title
  };
};
  
export default connect(mapStateToProps)(WebViewScreen);