import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';

import MyEarningsHeader from 'app/screens/wbmoney/MyEarningsHeader';
import MyEarningsHistory from 'app/screens/wbmoney/MyEarningsHistory';
import { colorresource } from '../../resources/colorresource';

// actions
import { getResettlementDashboardAction, getResettlementHistoryAction } from '../../actions/wbmoney-actions';

// debug
import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper';
import LocalStorage from '../../db/LocalStorage'

class ResellPayouts extends Component {

  componentDidMount() {
    // waitTillUserInfoIsFetched().then(() => {
      this.props.dispatch(getResettlementDashboardAction());
      this.props.dispatch(getResettlementHistoryAction());
    // })
  }

  render() {
    const db = this.props.responseResettlementDashboard
    
    let cEarned = parseInt(db.total_earned)
    cEarned = cEarned? cEarned : '0'

    let cDue = parseInt(db.total_due)
    cDue = cDue && cDue > 0? cDue : '0'

    let cReceived = parseInt(db.total_received)
    cReceived = cReceived? cReceived : '0'

    return (
      <Container style={{backgroundColor: '#f6f6f6'}}>
        <Content>
          <MyEarningsHeader
          earningName={''}
          earningNameSingular={''}
          hideConversion={true}
          redeemedText={'due'}
          amountTop={`₹ ${cEarned}`}
          amountLeft={`₹ ${cReceived}`}
          amountRight={`₹ ${cDue}`}
          />
          <MyEarningsHistory
          history={this.props.responseResettlementHistory}
          amountKey={'amount'}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  responseResettlementDashboard: state.wbMoneyR.responseGetResettlementDashboard,
  responseResettlementHistory: state.wbMoneyR.responseGetResettlementHistory,
})

export default connect(mapStateToProps)(ResellPayouts);