import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from 'react-native';

// local imports
import LoginFlow from 'app/screens/login/LoginFlow';
import { Container } from '../../components/Container';
import styles from './styles';
import { getNetInfo } from '../../utils/network';
import * as navigationActions from 'app/actions/navigation-actions';
import { isWeb } from 'app/utils/PlatformHelper';

let timeFrame = 200;

class SplashScreen extends Component {
  
  state = { progress: 0 }
  
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    primaryColor: PropTypes.string,
  };

  registerLoginFlowRef = (r) => {
    this.loginFlowRef = r && r.getWrappedInstance();
  }

  onStartUpCheck = () => {
    if(isWeb){
      const hashPath = window.location.hash
      if(hashPath && hashPath.includes("/catalog")){
        const urlKey = hashPath.substr(hashPath.lastIndexOf('/')+1)
        //console.log("url key",urlKey)
        navigationActions.goToGuestProductDetailsScreen(urlKey)
        return
      }      
    } 
    this.startLoginFlow()  
  }
  
  startLoginFlow = () => {
    if(this.loginFlowRef) {
      this.loginFlowRef.startLoginFlow();
    } else {
      console.warn('FATAL: login flow ref is not registered');
    }
  }
  
  componentDidMount() {
    getNetInfo();
    this.timer = setInterval(() => {
      if (this.state.progress == 1) {
        clearInterval(this.timer);
        setTimeout(() => {
          this.onStartUpCheck()
        }, timeFrame);
      } else {
        let random = Math.random() * 0.5;
        let progress = this.state.progress + random;
        if (progress > 1) {
          progress = 1;
        }
        this.setState({ progress });
      }
    }, timeFrame)
  }

  render() {
    return (
      <Container backgroundColor={this.props.primaryColor}>
        <Image style={styles.containerImage}
        resizeMode="contain"
        source={require('../../images/applogo.png')}
        />
        <LoginFlow 
        ref={this.registerLoginFlowRef}
        showLoading={false}
        skipKeyCheck={false}
        />
      </Container>
      );
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      primaryColor: state.themeR.primaryColor,
    };
  };
  
  export default connect(mapStateToProps)(SplashScreen);
  
