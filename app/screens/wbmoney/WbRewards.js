import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';

import MyEarningsHeader from './MyEarningsHeader';
import MyEarningsHistory from './MyEarningsHistory';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';

// actions
import { getWbRewardsDashboardAction, getWbRewardsHistoryAction } from '../../actions/wbmoney-actions';

// debug
import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper';
import LocalStorage from '../../db/LocalStorage'

class WbMoney extends Component {

  componentDidMount() {
    // waitTillUserInfoIsFetched().then(() => {
      this.props.dispatch(getWbRewardsDashboardAction());
      this.props.dispatch(getWbRewardsHistoryAction());
    // })
  }

  render() {
    const db = this.props.responseWbMoneyDashboard
    return (
      <Container style={{backgroundColor: '#f6f6f6'}}>
        <Content>
          <MyEarningsHeader
          dashboard={this.props.responseWbMoneyDashboard}
          earningName={'WB Rewards'}
          earningNameSingular={'WB Reward'}
          amountTop={db.total_available}
          amountLeft={db.total_received}
          amountRight={db.total_redeemed}
          />
          <MyEarningsHistory
          history={this.props.responseWbMoneyHistory}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  responseWbMoneyDashboard: state.wbMoneyR.responseGetWbRewardsDashboard,
  responseWbMoneyHistory: state.wbMoneyR.responseGetWbRewardsHistory,
})

export default connect(mapStateToProps)(WbMoney);