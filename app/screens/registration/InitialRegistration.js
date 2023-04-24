import React,  { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Content,
  Text,
  Footer,
  FooterTab,
  Button,
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import GenericHeader from 'app/components/Header/GenericHeader';
import WButton from 'app/components/Button/WButton';
import Radio from 'app/components/Radio/Radio';
import CheckBox from 'app/components/CheckBox/CheckBox';
import Logout from 'app/screens/logout/Logout';
import UserHelper from 'app/config/userHelper';
import { colorresource } from 'app/resources/colorresource'

import { getLanguageAction, setLanguageAction } from 'app/actions/language-actions';
import { initialRegisterAction } from 'app/actions/user-actions';
import { showToastAction } from 'app/actions/toast-actions';

import { TestIdGenerator } from 'app/utils/TestingHelper';
const buttonTestId = TestIdGenerator("HomeScreen", '', "Button");

import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper'

const COMPANY_TYPE = {
  RESELLER: 1,
  RETAILER: 2,
  MANUFACTURER_OTHERS: 3,
}

const companyTypeData = [{
    id: COMPANY_TYPE.RESELLER,
    title: 'Home-based reseller',
    subtitle: 'I usually buy single pieces and sell on WhatsApp/ Facebook',
  }, {
    id: COMPANY_TYPE.RETAILER,
    title: 'Retailer',
    subtitle: 'I buy full catalogs as well as single pieces',
  }, {
    id: COMPANY_TYPE.MANUFACTURER_OTHERS,
    title: 'Manufacturer / Wholesaler / Broker',
    subtitle: 'I want to supply products to Wishbook at Wholesale Rates'
  }
]

class InitialRegistration extends Component {

  registerLogoutRef = (r) => {
    this.logoutRef = r && r.getWrappedInstance()
  }

  onRegisterPress = () => {
    const languageId = this.state.selectedLanguage
    if(!languageId) {
      this.props.dispatch(showToastAction("Please select a language"))
      return;
    }

    const companyTypes = this.state.selectedCompanyTypes
    if(companyTypes.length === 0) {
      this.props.dispatch(showToastAction("Please select a user type"));
      return;
    }

    let online_retailer_reseller = false, retailer = false, wholesaler_distributor = false;
    companyTypes.forEach(c => {
      switch(c) {
        case COMPANY_TYPE.RESELLER:
        online_retailer_reseller = true
        break;
        
        case COMPANY_TYPE.RETAILER:
        retailer = true;
        break;

        case COMPANY_TYPE.MANUFACTURER_OTHERS:
        wholesaler_distributor = true;
        break;
      }
    })
    const companyTypeParams = { online_retailer_reseller, retailer, wholesaler_distributor }
    this.props.dispatch(initialRegisterAction({languageId, companyType: companyTypeParams}))
  }

  proceedToNextScreen = () => {
    this.props.navigation.navigate("AppIntroScreen");
  }

  onRegisterDone = () => {
    // check if there were any problems
    const error = this.props.responseInitialRegister.findIndex(r => !r.response)
    if(error === -1) {
      return;
    }

    this.proceedToNextScreen()
  }

  onCompanyPress = (id) => {
    console.log("[onCompanyPress], id", id);
    const companyTypes = [...this.state.selectedCompanyTypes]
    const checkedIndex = companyTypes.findIndex(c => c === id)
    const checked = checkedIndex === -1
    if(checked) {
      // newly checked, append
      companyTypes.push(id)
    } else {
      // remove
      companyTypes.splice(checkedIndex, 1)  
    }
    console.log("[onCompanyPress], selectedCompanyTypes", companyTypes);
    this.setState({selectedCompanyTypes: companyTypes})
  }

  onLanguagePress = (id) => {
    this.setState({selectedLanguage: id})
  }

  onClosePress = () => {
    this.logoutRef.logout()
  }

  initialize = () => {
    this.props.dispatch(getLanguageAction())
    this.setState({selectedLanguage: UserHelper.getUserLanguage()})
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedCompanyTypes: [],
      selectedLanguage: 0,
    }
  }

  componentDidMount() {
    waitTillUserInfoIsFetched().then(() => {
      this.initialize();
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.responseInitialRegister !== this.props.responseInitialRegister) {
      this.onRegisterDone();
    }
  }

  render() {
    return (
      <Container>
        <GenericHeader
        title={'Welcome to Wishbook!'}
        leftConfig={{
          visible: true,
          onPress: this.onClosePress,
          icon: 'close',
          testId: buttonTestId('Close')
        }}
        />
        <Content contentContainerStyle={{ padding: 10 }}>

          <View style={styles.card}>
            <Text style={styles.header}>Select your language</Text>

            <View>
              {this.props.responseLanguages.map((item) =>
                <WButton
                key={item.id}
                onPress={() => this.onLanguagePress(item.id)}
                style={{padding: 10}}
                >
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 14, color: colorresource.liteblack}}>{item.name}</Text>
                    <Radio 
                    onPress={() => this.onLanguagePress(item.id)}
                    selected={this.state.selectedLanguage === item.id}
                    />
                  </View>
                </WButton>
              )}
            </View>
          </View>

          <View style={[styles.card, {marginTop: 20}]}>
            <Text style={styles.header}>{'Hello! Please select what describes you the best It\'ll help us provide you with a better experience'}</Text>
            <View style={{paddingTop: 10}}>
              {companyTypeData.map((item) => 
                <WButton 
                style={{paddingVertical: 10}} 
                onPress={() => this.onCompanyPress(item.id)}
                key={item.id}
                >
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox 
                    onPress={() => this.onCompanyPress(item.id)}
                    selected={!!this.state.selectedCompanyTypes.find(c => c === item.id)}
                    />
                    <View style={{flex: 1}}>
                      <Text style={{color: colorresource.liteblack, fontSize: 14}}>{item.title}</Text>
                      <Text style={{fontSize: 12, color: colorresource.gray, marginTop: 3}}>{item.subtitle}</Text>
                    </View>
                  </View>
                </WButton>
              )}
            </View>
          </View>

        </Content>
        <Footer>
          <FooterTab>
            <Button style={{backgroundColor: colorresource.liteblue}} onPress={this.onRegisterPress}>
              <Text uppercase={false} style={{fontSize: 16, color: 'white'}}>{'Start using Wishbook'}</Text>
            </Button>
          </FooterTab>
        </Footer>
        <Logout ref={this.registerLogoutRef}/>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    responseLanguages: state.languageR.languages,
    responseInitialRegister: state.userR.responseInitialRegister,
  })
}
export default connect(mapStateToProps)(InitialRegistration);

const styles = EStyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colorresource.litegray,
    borderRadius: 5,
    padding: 16,
  },
  header: {
    fontSize: 14, 
    color: colorresource.gray
  }
})