import React, { Component } from 'react';
import {
  Text, View, ScrollView, KeyboardAvoidingView
} from 'react-native';
import { Container, Button } from 'native-base';
import { Inputtext } from '../../components/Inputtextbutton';
import styles from './styles';
import { HeaderBackNativeBase } from '../../components/Header';
import { strings } from '../../utils/i18n';
import { colorresource } from '../../resources/colorresource';

export default class DiscountSettings extends Component {

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}>
        <Container>
          <HeaderBackNativeBase title={strings('mybussiness.discount_settings')} onPress={this.goBack}/>
          <ScrollView>
            <Text style={styles.textheadergreen}>Set discount for all your buyer in one shot.</Text>
            <Text style={styles.textheadergreensecond}>None of your buyers will be able to see the discounts provided to another buyer.</Text>
            <View style={styles.viewbox}>
              <Text style={styles.textheaderBlack}>{strings('discountSettings.for_wholeseller')}</Text>
              <View style={styles.container1}>
                <View style={styles.viewinnerleftbox}>
                  <Inputtext buttonText={strings('discountSettings.cash_discount')} labelColorOnFocus={colorresource.blue} bottomBorderColor={colorresource.blue} >
                  </Inputtext>
                </View>
                <View style={styles.viewinnecenterbox}>
                </View>
                <View style={styles.viewinnerleftbox}>
                  <Inputtext buttonText={strings('discountSettings.cash_discount')} labelColorOnFocus={colorresource.blue} bottomBorderColor={colorresource.blue} >
                  </Inputtext>
                  <Inputtext buttonText={strings('discountSettings.days_of_credit')} labelColorOnFocus={colorresource.blue} bottomBorderColor={colorresource.blue}>
                  </Inputtext>
                </View>
              </View>
            </View>
            <View style={styles.viewbox}>
              <Text style={styles.textheaderBlack}>{strings('discountSettings.for_retailer')}</Text>
              <View style={styles.container1}>
                <View style={styles.viewinnerleftbox}>
                  <Inputtext buttonText={strings('discountSettings.cash_discount')} labelColorOnFocus={colorresource.blue} bottomBorderColor={colorresource.blue}>
                  </Inputtext>
                </View>
                <View style={styles.viewinnecenterbox}>
                </View>
                <View style={styles.viewinnerleftbox}>
                  <Inputtext buttonText={strings('discountSettings.cash_discount')} labelColorOnFocus={colorresource.blue} bottomBorderColor={colorresource.blue} >
                  </Inputtext>
                  <Inputtext buttonText={strings('discountSettings.days_of_credit')} labelColorOnFocus={colorresource.blue} bottomBorderColor={colorresource.blue}>
                  </Inputtext>
                </View>
              </View>
            </View>
            <View style={styles.viewbox}>
              <Text style={styles.textheaderBlack}>{strings('discountSettings.for_broker')}</Text>
              <View style={styles.container1}>
                <View style={styles.viewinnerleftbox}>
                  <Inputtext buttonText={strings('discountSettings.cash_discount')} labelColorOnFocus={colorresource.blue} bottomBorderColor={colorresource.blue}>
                  </Inputtext>
                </View>
                <View style={styles.viewinnecenterbox}>
                </View>
                <View style={styles.viewinnerleftbox}>
                  <Inputtext buttonText={strings('discountSettings.cash_discount')} labelColorOnFocus={colorresource.blue} bottomBorderColor={colorresource.blue}>
                  </Inputtext>
                  <Inputtext buttonText={strings('discountSettings.days_of_credit')} labelColorOnFocus={colorresource.blue} bottomBorderColor={colorresource.blue}>
                  </Inputtext>
                </View>
              </View>
            </View>
            <View style={styles.viewbox}>
              <Text style={styles.textheaderBlack}>{strings('discountSettings.for_public')}</Text>
              <View style={styles.container1}>
                <View style={styles.viewinnerleftbox}>
                  <Inputtext buttonText={strings('discountSettings.cash_discount')} labelColorOnFocus={colorresource.blue} bottomBorderColor={colorresource.blue} >
                  </Inputtext>
                </View>
                <View style={styles.viewinnecenterbox}>
                </View>
                <View style={styles.viewinnerleftbox}>
                  <Inputtext buttonText={strings('discountSettings.cash_discount')} labelColorOnFocus={colorresource.blue} bottomBorderColor={colorresource.blue}>
                  </Inputtext>
                  <Inputtext buttonText={strings('discountSettings.days_of_credit')} labelColorOnFocus={colorresource.blue} bottomBorderColor={colorresource.blue}>
                  </Inputtext>
                </View>
              </View>
            </View>
          </ScrollView>
          <View>
            <View style={styles.container1}>
              <Button full style={styles.btnwhite}>
                <Text style={styles.btntextwhite}>{strings('common.cancel')}</Text>
              </Button>
              <Button full success style={styles.btnblue}>
                <Text style={styles.btntextblue}>{strings('common.submit')}</Text>
              </Button>
            </View>
          </View>
        </Container>
      </KeyboardAvoidingView>
    );
  }
};