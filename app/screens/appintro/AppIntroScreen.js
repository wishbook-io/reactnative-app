import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import IntroTemplate from './IntroTemplate'
import { strings } from '../../utils/i18n';

import { TestIdGenerator } from '../../utils/TestingHelper';
const testId = TestIdGenerator("IntroScreen");

class AppIntroScreen extends Component {

  handlePress = () => {
    this.props.navigation.navigate('MainStack');
  };

  render() {
    return (
      <Swiper 
      autoplay={true} 
      navigateButtonColor={'#2196F3'} 
      navigateButtonVisible={true}
      activeDotColor={'#2196F3'} 
      navigateButtonText={strings('appIntro.get_started')}
      navigationButtonOnPress={() => { this.handlePress() }} 
      buttonTestId={testId("Ok", "Button")} 
      viewTestId={testId("Swiper", "View")}>
        
        <IntroTemplate 
        image={require('../../images/tutorial_one.png')}
        header={strings('appIntro.tutorial_one_text')} 
        info={strings('appIntro.tutorial_one_sub_text')} 
        onPress={this.handlePress}
        />
        
        <IntroTemplate 
        image={require('../../images/tutorial_two.png')}
        header={strings('appIntro.tutorial_two_text')} 
        info={strings('appIntro.tutorial_two_sub_text')} 
        onPress={this.handlePress}
        />
        
        <IntroTemplate 
        image={require('../../images/tutorial_three.png')}
        header={strings('appIntro.tutorial_three_text')} 
        info={strings('appIntro.tutorial_three_subtext')} 
        onPress={this.handlePress}
        />

      </Swiper>
    );
  }
}


export default connect()(AppIntroScreen)