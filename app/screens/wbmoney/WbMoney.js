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
import { getWbMoneyDashboardAction, getWbMoneyHistoryAction } from '../../actions/wbmoney-actions';

// debug
import LocalStorage from '../../db/LocalStorage'

class WbMoney extends Component {

  componentDidMount() {
    this.props.dispatch(getWbMoneyDashboardAction());
    this.props.dispatch(getWbMoneyHistoryAction());
  }

  render() {
    const db = this.props.responseWbMoneyDashboard
    return (
      <Container style={{backgroundColor: '#f6f6f6'}}>
        <Content>
          <MyEarningsHeader
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
  responseWbMoneyDashboard: state.wbMoneyR.responseWbMoneyDashboard,
  responseWbMoneyHistory: state.wbMoneyR.responseWbMoneyHistory,
})

export default connect(mapStateToProps)(WbMoney);