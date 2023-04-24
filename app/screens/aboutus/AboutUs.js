import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import {
  Text,
  Container,
  Card,
  CardItem,
  Content
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import GenericHeader from 'app/components/Header/GenericHeader';
import { colorresource } from 'app/resources/colorresource';
import consts from 'app/utils/const';

export default class AboutUs extends Component {

  render() {
    return (
      <Container contentContainerStyle={{flexGrow: 1}} style={{backgroundColor: colorresource.materialbg}}>
        <GenericHeader
        title={'About Us'}
        />
        <View style={{flex: 1, margin: 20, padding: 20, paddingTop: 30, backgroundColor: 'white'}}>
        <ScrollView>
          <Text style={{color: colorresource.liteblue, fontSize: 25, fontWeight: 'bold'}}>Wishbook</Text>
            <Text style={{marginTop: 10, fontSize: 18, color: colorresource.dimgray}}>Wishbook's vision is to digitize the apparel/fashion production &amp; sales information.
        This digitized information, starting with their product catalogs for Fashion &amp; Apparel companies, will allow easy sharing of
        new catalog / product launches down the entire B2B distribution chain, offer an open B2B marketplace, and take it to the existing marketplaces.
        Combined with the production Dashboard &amp; SaaS ERP, the reverse integration promises to bring in an unprecedented level of efficiency into the eco-system.
        Our learnings coming from years of technology / product development &amp; running traditional textile manufacturing &amp; e-Commerce companies have been factor into
        technology products meant for the Fashion / Apparel companies, many of them SMEs market in our new venture, Wishbook Infoservices.
        Wishbook Infoservices started off as Triveni Labs.</Text>
        </ScrollView>
        </View>

        {/* <Card style={{flex: 1, margin: 20}}>
          <CardItem style={{margin: 20}}>
          <ScrollView>
            <Text>Wishbook\'s vision is to digitize the apparel/fashion production &amp; sales information.
        This digitized information, starting with their product catalogs for Fashion &amp; Apparel companies, will allow easy sharing of
        new catalog / product launches down the entire B2B distribution chain, offer an open B2B marketplace, and take it to the existing marketplaces.
        Combined with the production Dashboard &amp; SaaS ERP, the reverse integration promises to bring in an unprecedented level of efficiency into the eco-system.
        Our learnings coming from years of technology / product development &amp; running traditional textile manufacturing &amp; e-Commerce companies have been factor into
        technology products meant for the Fashion / Apparel companies, many of them SMEs market in our new venture, Wishbook Infoservices.
        Wishbook Infoservices started off as Triveni Labs.</Text>
        </ScrollView>
          </CardItem>
        </Card> */}
      </Container>
    );
  }
}

const localStyles = EStyleSheet.create({
  paymentText: {
    fontSize: 16,
    color: colorresource.liteblack,
  },
  detailsButtonText: {
    color: colorresource.liteblue,
    fontSize: 14,
    padding: 10,
  }
})