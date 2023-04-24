import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { 
  Text,
  Button,
  Container,
  Content,
  Footer,
  FooterTab
}from 'native-base'
import _ from 'lodash'

import ProfileAddress from 'app/screens/profile/ProfileAddress';
import GenericHeader from 'app/components/Header/GenericHeader';
import { strings } from '../../utils/i18n';
import { NBRoot } from 'app/components/Root/NBRoot';

import { colorresource } from '../../resources/colorresource';

// server, store
import { showToastAction } from 'app/actions/toast-actions'
import { getAddressAction } from 'app/actions/shipay-actions'

import { TestIdGenerator, SuffixedTestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'UpdateBillingAddress';
const checkBoxTestId = TestIdGenerator(screenName, '', 'CheckBox')

import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper';

const FORM_FIELD_KEYS = {
  WA_NOTIFICATIONS: 'WhatsAppNotifications',
  WA_PROMOTIONS: 'WhatsAppPromotions',
}

const testIds = {
  notifs: checkBoxTestId('Notifications'),
  promotions: checkBoxTestId('Promotions'),
}

class UpdateBillingAddress extends Component {

  onProfileAddressUpdated = async () => {
    this.props.dispatch(getAddressAction());
    this.showToast("Billing Address updated successfully");
    this.goBack();
  }

  registerProfileAddressRef = (r) => {
    this.profileAddressRef = r && r.getWrappedInstance();
  }
  
  onSaveChangesPress = () => {
    Keyboard.dismiss();
    console.log("[onSaveChangesPress]");

    const isValid = this.profileAddressRef.onSaveChangesPress()
    if(!isValid) {
      return;
    }

    // we are valid, time to wait
  }
  
  goBack = () => {
    this.props.navigation.goBack()
  }

  showToast = (message, duration=1500) => {
    this.props.dispatch(showToastAction(message, duration))
  }
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <NBRoot style={{flex: 1}}>
      <Container>
      
        <GenericHeader title={"Update Billing Address"} />
        <Content contentContainerStyle={{paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
          
          <ProfileAddress
          ref={this.registerProfileAddressRef}
          onProfileAddressUpdated={this.onProfileAddressUpdated}
          />

        </Content>
        <Footer>
          <FooterTab>
            <Button style={{ backgroundColor: colorresource.liteblue }} onPress={this.onSaveChangesPress} {...testIds.save}>
              <Text style={{ color: colorresource.white, fontSize: 14 }}>{strings('profile.save_changes')}</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
      </NBRoot>
    );
  }
}
  
const mapStateToProps = (state) => {
  return ({
  })
}

export default connect(mapStateToProps)(UpdateBillingAddress)