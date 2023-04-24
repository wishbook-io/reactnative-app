import React, { Component } from 'react';
import { View, Linking } from 'react-native';
import {
  Text,
  Container,
  Content
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import _ from 'lodash';

import GenericHeader from 'app/components/Header/GenericHeader';
import { colorresource } from 'app/resources/colorresource';
import { fontresource } from 'app/resources/fontresource';
import consts from 'app/utils/const';
import { getConfigAction } from 'app/actions/dashboard-actions';

const WHATSAPP_GROUP = {
  FASHION_TREND: 'FASHION_TREND_WHATSAPP_GROUP',
  FULL_SET: 'FULL_SET_WHATSAPP_GROUP',
  SINGLE_PIECES: 'SINGLE_PC_WHATSAPP_GROUP',
}

class ContactUs extends Component {

  openTelLinkForSection = (index) => {
    Linking.openURL(`tel:${this.state.sections[index].call}`)
  }

  openWebLinkForSection = (index) => {
    Linking.openURL(`${this.state.sections[index].whatsapp}`)
  }

  openWebLink = (link) => {
    Linking.openURL(`${link}`)
  }

  constructor(props) {
    super(props)
    this.state = {
      full: 'https://chat.whatsapp.com/FudL9bnNVeC5JyCxuP5Oxs',
      single: 'https://chat.whatsapp.com/BceuGPYBm9d0XxrLYqVkee',
      fashion: 'https://chat.whatsapp.com/GRVOZcoeDfiG6VDQIa6bd7',

      sections: [
        {
          title: 'Wishbook Buyer Support',
          call: '09978618989',
          whatsapp: 'https://wa.me/919978618989',
        },
        {
          title: 'Wishbook Seller Support',
          call: '09537518989',
          whatsapp: 'https://wa.me/919537518989',
        },
        {
          title: 'Wishbook Catalog Upload Team',
          call: '08469218980',
          whatsapp: 'https://wa.me/918469218980',
        },
      ]
    }
  }

  componentDidMount() {
    this.props.dispatch(getConfigAction())
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.responseConfig.length === 0 && this.props.responseConfig.length > 0) {
      const configByKey = _.keyBy(this.props.responseConfig, 'key')
      this.setState({
        full: _.get(configByKey, `${WHATSAPP_GROUP.FULL_SET}.value`, ''),
        single: _.get(configByKey, `${WHATSAPP_GROUP.SINGLE_PIECES}.value`, ''),
        fashion: _.get(configByKey, `${WHATSAPP_GROUP.FASHION_TREND}.value`, ''),
      })
    }
  }

  render() {
    return (
      <Container style={{backgroundColor: colorresource.materialbg}}>
        <GenericHeader
        title={'Contact Us'}
        />
        <Content>
          <View style={localStyles.section}>
            <Text style={localStyles.headerText}>{this.state.sections[0].title}</Text>
            <Text style={localStyles.subHeaderText}>Call: <Text style={localStyles.linkText} onPress={() => this.openTelLinkForSection(0)}>{this.state.sections[0].call}</Text></Text>
            <Text style={localStyles.subHeaderText}>Whatsapp: <Text style={localStyles.linkText} onPress={() => this.openWebLinkForSection(0)}>{this.state.sections[0].whatsapp}</Text></Text>
          </View>

          <View style={localStyles.section}>
            <Text style={localStyles.headerText}>{this.state.sections[1].title}</Text>
            <Text style={localStyles.subHeaderText}>Call: <Text style={localStyles.linkText} onPress={() => this.openTelLinkForSection(1)}>{this.state.sections[1].call}</Text></Text>
            <Text style={localStyles.subHeaderText}>Whatsapp: <Text style={localStyles.linkText} onPress={() => this.openWebLinkForSection(1)}>{this.state.sections[1].whatsapp}</Text></Text>
          </View>

          <View style={localStyles.section}>
            <Text style={localStyles.headerText}>{this.state.sections[2].title}</Text>
            <Text style={localStyles.subHeaderText}>Call: <Text style={localStyles.linkText} onPress={() => this.openTelLinkForSection(2)}>{this.state.sections[2].call}</Text></Text>
            <Text style={localStyles.subHeaderText}>Whatsapp: <Text style={localStyles.linkText} onPress={() => this.openWebLinkForSection(2)}>{this.state.sections[2].whatsapp}</Text></Text>
          </View>

          <View style={localStyles.section}>
            <Text style={localStyles.headerText}>Join whatsapp group for single piece updates</Text>
            <Text style={localStyles.linkText} onPress={() => this.openWebLink(this.state.single)}>{this.state.single}</Text>
          </View>

          <View style={localStyles.section}>
            <Text style={localStyles.headerText}>Join whatsapp group for full catalog updates</Text>
            <Text style={localStyles.linkText} onPress={() => this.openWebLink(this.state.full)}>{this.state.full}</Text>
          </View>

          <View style={localStyles.section}>
            <Text style={localStyles.headerText}>Join whatsapp group for Fashion Trends News/Articles</Text>
            <Text style={localStyles.linkText} onPress={() => this.openWebLink(this.state.fashion)}>{this.state.fashion}</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    responseConfig: state.dashboardR.responseGetConfig,
  })
}

export default connect(mapStateToProps)(ContactUs);

const localStyles = EStyleSheet.create({
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
  },
  headerText: {
    color: colorresource.liteblack,
    fontFamily: fontresource.medium,
    fontSize: 16,
    marginBottom: 5,
  },
  subHeaderText: {
    color: colorresource.gray,
    fontSize: 14,
    marginTop: 10,
  },
  linkText: {
    color: colorresource.liteblue,
    fontSize: 14,
    textDecorationLine: 'underline',
  },

})