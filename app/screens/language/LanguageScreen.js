import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToolbarAndroid, FlatList, View,Platform } from 'react-native';
import { 
  Header,
	Left,
	Text,
	Footer,
	FooterTab,
	Button,
	Icon,
	Right,
	Body,
  Title 
} from 'native-base';
import { TouchableRipple } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { RadioList, Seperator } from '../../components/List';
import { colorresource } from '../../resources/colorresource';
import LocalStorage from '../../db/LocalStorage';
import consts from '../../utils/const';
import _load from 'lodash';
import { HeaderBackNativeBase } from '../../components/Header';
import { strings } from '../../utils/i18n';
import { execute } from 'app/config/saga';

// actions
import { setUserLanguage } from 'app/saga/language-saga';
import { getLanguageAction, setLanguageAction, saveLanguage } from '../../actions/language-actions';
import { setPlatformInfoAction } from '../../actions/user-actions';
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';

import { TestIdGenerator } from '../../utils/TestingHelper';
const screenName = 'LanguageScreen'
const testId = TestIdGenerator(screenName);

class LanguageScreen extends Component {
  
  constructor(props) {
    super(props);
    console.log('[LanguageScreen::ctor]', props.navigation.state)
    this.state = {
      selectedLangId: 2,
      tempLangId: 0,
      isLangSet: false,
      enableHeader: (props.navigation.state.params !== undefined)? true : false,
    }
  }
  
  componentWillMount() {
    this.getLocalLang();
    this.props.dispatch(getLanguageAction());
    const fromOtpScreen = this.props.navigation.getParam('fromOtpScreen', false);
    if(fromOtpScreen) {
      Platform.OS === 'ios' ?null:this.props.dispatch(setPlatformInfoAction());
    }
  }
  
  getLocalLang = async () => {
    let langId = await LocalStorage.getItem(consts.PROFILE_LANGUAGE);
    let isLangSet = await LocalStorage.getItem(consts.LANGUAGE_SET);
    
    if (langId !== null && langId !== undefined) {
      this.setState({
        selectedLangId: langId,
      });
    }
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate 0', prevProps.error, this.props.error, this.props.responseLanguage);
    if (this.props.error !== prevProps.error) {
      alert(`${this.props.error.statusText}`);
    }
    
    if(prevProps.languages !== this.props.languages){
      LocalStorage.setItem(consts.GET_PROFILE_LIST, this.props.languages);
    }
  }
  
  handlePress = (data) => {
    this.setState({
      selectedLangId: data.id,
    });
  };
  
  onDonePress = async () => {
    LocalStorage.setItem(consts.PROFILE_LANGUAGE, this.state.selectedLangId);
    
    this.props.dispatch(requestShowLoaderAction(screenName))
    const { response } = await execute(setUserLanguage, setLanguageAction(this.state.selectedLangId));
    this.props.dispatch(requestHideLoaderAction(screenName))
    
    const fromOtpScreen = this.props.navigation.getParam('fromOtpScreen', false);
    if(fromOtpScreen) {
      this.props.navigation.navigate('AppIntroScreen')
    } else {
      this.props.navigation.goBack()
    }
  }
  
  onBackPress = () => {
    const fromOtpScreen = this.props.navigation.getParam('fromOtpScreen', false);
    if(fromOtpScreen) {
      this.props.navigation.navigate('AppIntroScreen')
    } else {
      this.props.navigation.goBack()
    }
  }
  
  render() {
    const { languages } = this.props;
    
    return (
      <View style={{ flex: 1 }}>
        <Header style={{backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'black'}}>
          <Left>
            <Button transparent onPress={this.onBackPress} {...testId("Back", "Button")}>
              <Icon name={'arrow-back'} style={{color:colorresource.liteblue, fontSize: 24}}/>
            </Button>
          </Left>
          <Body style={{flex: 2.5, marginLeft: 10}}>
            <Title>
              <Text style={{fontSize: 20, color: colorresource.liteblue}}>{strings('routes.select_language')}</Text>
            </Title>
          </Body>
          <Right/>
        </Header>
        {/* <HeaderBackNativeBase title={strings('routes.select_language')} onPress={this.goBack} icon="arrow-back" /> */}
        <FlatList
        data={languages}
        renderItem={({ item }) => (
          <RadioList
          text={item.name}
          onPress={() => this.handlePress(item)}
          selected={true}
          checkmark={item.id === this.state.selectedLangId}
          iconBackground={colorresource.liteblue}
          radioTestId={testId(item.name,"Radio")}
          />
        )}
        extraData={[]}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={Seperator}
        />
        <Footer>
          <FooterTab>
            <Button style={{backgroundColor:colorresource.liteblue}} onPress={() => this.onDonePress()} {...testId("Done", "Button")}>
              <Text uppercase={false} style={{lineHeight: 17, fontSize: 17, color:'white'}}>Done</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}
    
const mapStateToProps = (state) => {
  return {
    languages: state.languageR.languages,
    error: state.languageR.error,
    responseLanguage: state.languageR.responseLanguage,
  };
}
    
export default connect(mapStateToProps)(LanguageScreen);
    