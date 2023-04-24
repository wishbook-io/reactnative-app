import React,  { Component } from 'react';
import { View } from 'react-native';
import { 
  Text,
  Container,
  Content,
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import _ from 'lodash';

import styles from './styles';
import { colorresource } from '../../resources/colorresource';
import { formatDateFromServer } from 'app/utils/formatHelper';

import { getIncentiveDashboardAction, getIncentiveHistoryAction, getIncentiveTiersAction} from 'app/actions/wbmoney-actions';
import { goToInAppBrowser } from 'app/actions/navigation-actions';

import { waitTillUserInfoIsFetched } from '../../utils/debugHelper';

class Incentives extends Component {

  onTCPress = () => {
    goToInAppBrowser('Incentive program T&C', 'https://www.wishbook.io/incentives-tnc.html')
  }

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    // waitTillUserInfoIsFetched().then(() => {
      this.props.dispatch(getIncentiveDashboardAction())
      this.props.dispatch(getIncentiveTiersAction())
      this.props.dispatch(getIncentiveHistoryAction())
    // })
  }

  render() {

    const totalIncentiveAmount = _.get(this.props.responseDashboard, 'total_incentive_amount', '0')
    const totalTarget = this.props.responseDashboard.total_weekly_purchase_target_amount
    const totalSales = this.props.responseDashboard.total_weekly_purchase_actual_amount
    const totalRequired = this.props.responseDashboard.total_weekly_purchase_required_to_reach_target

    return (
      
      <Container style={{backgroundColor: '#f6f6f6'}}>
        <Content>


          <View style={styles.WbMoneyHeader}>
            <Text style={[styles.WbMoneyHeadingText, {textAlign: 'center'}]}>{`₹ ${totalIncentiveAmount}`}</Text>
            <Text style={{
              fontSize: 14,
              color: colorresource.liteblue,
              alignSelf: 'center',
            }}>{'Total incentives earned'}</Text>
            <View style={{
              flexDirection: 'row',
              marginTop: 10,
              marginBottom: 10,
            }}>
              <View style={localStyles.headerValueParent}>
                <Text style={{fontSize: 16, color: colorresource.darkgreen}}>{totalTarget}</Text>
                <Text style={localStyles.headerValueHint}>{'Sales target\nthis week'}</Text>
              </View>

              <View style={[localStyles.headerValueParent, {borderLeftWidth: EStyleSheet.hairlineWidth, borderRightWidth: EStyleSheet.hairlineWidth,}]}>
                <Text style={{fontSize: 16, color: colorresource.gray}}>{totalSales}</Text>
                <Text style={localStyles.headerValueHint}>{'Total sales\nthis week'}</Text>
              </View>

              <View style={localStyles.headerValueParent}>
                <Text style={{fontSize: 16, color: colorresource.gray}}>{totalRequired}</Text>
                <Text style={localStyles.headerValueHint}>{'Sales required\nto reach target'}</Text>
              </View>

            </View>
            <Text style={{color: colorresource.liteblue, textDecorationLine: 'underline', fontSize: 14, textAlign: 'center'}} onPress={this.onTCPress}>Terms and Conditions*</Text>


            <View style={{marginTop: 10, marginLeft: 5, marginRight: 5}}>
              <View style={localStyles.tiersRow}>
                <View style={{flex: 1, paddingVertical: 7, justifyContent: 'center', borderRightColor: 'white', borderRightWidth: 1, backgroundColor: colorresource.liteblue}}>
                  <Text style={localStyles.tiersHeaderText}>{'Weekly dispatched orders'}</Text>
                </View>
                <View style={{flex: 1, paddingVertical: 7, justifyContent: 'center', backgroundColor: colorresource.liteblue}}>
                  <Text style={localStyles.tiersHeaderText}>{'% Incentive on orders'}</Text>
                </View>
              </View>

              {this.props.responseTiers.map((item) => {
                const fromAmount = item.from_amount
                const toAmount = parseInt(item.to_amount)
                const incentive = item.incentive_percentage

                const toText = toAmount? ' to ₹' + toAmount : ' and above';
                const fromText = '₹' + fromAmount
                return (
                  <View key={item.id} style={localStyles.tiersRow}>
                    <View style={localStyles.tiersCell}>
                      <Text style={{marginLeft: 5, fontSize: 14, color: colorresource.liteblack}}>{fromText + toText}</Text>
                    </View>
                    <View style={localStyles.tiersCell}>
                      <Text style={{textAlign: 'center', fontSize: 14, color: colorresource.liteblack}}>{incentive + '%'}</Text>
                    </View>
                  </View>
                );
              })}

            </View>
            
            <Text style={{ marginVertical: 10, marginHorizontal: 5, color: colorresource.darkred, fontSize: 12}}>Incentive is added weekly as WB Reward Points.</Text>
            
          </View>
          
          <View style={styles.WbMoneyHeaderHistory}>
            <Text style={styles.WbMoneyHeaderHistoryText}>History</Text>
          </View>

          <View>
            {this.props.responseHistory.map((item) => {
              return (
                <View key={item.id} style={{marginBottom: 15, marginLeft: 10, marginRight: 10, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: colorresource.gray}}>
                  <Text style={{textAlign: 'center', color: colorresource.grey46, fontSize: 14}}>{`${formatDateFromServer(item.from_date)} - ${formatDateFromServer(item.to_date)}`}</Text>
                  <HistoryItemRow label={'Target'} value={item.purchase_target_amount}/>
                  <HistoryItemRow label={'Achieved'} value={item.purchase_actual_amount}/>
                  <HistoryItemRow label={'Incentive earned'} value={item.incentive_amount}/>
                </View>
              );
            })}
          </View>

        </Content>
      </Container>
    )
  }
}

const HistoryItemRow = ({label, value}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
      <Text style={{color: colorresource.gray, fontSize: 14}}>{label}</Text>
      <Text style={{color: colorresource.liteblack, fontSize: 14}}>{'₹' + value}</Text>
    </View>
  );
}

const localStyles = EStyleSheet.create({
  headerValueParent: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  headerValueHint: {
    fontSize: 12,
    textAlign: 'center',
    color: colorresource.liteblack,
  },
  tiersRow: {
    flexDirection: 'row',
    // paddingHorizontal: 7,
    // height: 40,
    borderLeftWidth: 1,
    borderLeftColor: colorresource.gray,
  },
  tiersCell: {
    flex: 1,
    justifyContent: 'center',
    padding: 7,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colorresource.gray,
  },
  tiersHeaderText: {
    color: 'white', 
    fontSize: 14, 
    textAlign: 'center',
    marginHorizontal: 5,
  }
})

// const history = [{"id":18,"created":"2019-01-22T15:57:43.256700Z","modified":"2019-01-22T16:01:22.483759Z","from_date":"2019-01-21","to_date":"2019-01-27","purchase_target_amount":"12779.00","purchase_actual_amount":"0.00","tier_applicable":"","incentive_amount":"0.00","company":2241,"orders":[]},{"id":10,"created":"2019-01-17T12:54:20.253938Z","modified":"2019-01-22T16:01:22.503755Z","from_date":"2019-01-14","to_date":"2019-01-20","purchase_target_amount":"15334.80","purchase_actual_amount":"418.95","tier_applicable":"0","incentive_amount":"0.00","company":2241,"orders":[7006,7007,7008]},{"id":2,"created":"2019-01-17T12:46:02.543936Z","modified":"2019-01-19T11:12:06.981056Z","from_date":"2019-01-07","to_date":"2019-01-13","purchase_target_amount":"26000.00","purchase_actual_amount":"12779.00","tier_applicable":"0","incentive_amount":"0.00","company":2241,"orders":[6649,6650]}]
// const tiers = [{"id":1,"created":"2019-02-25T12:48:19.913396Z","modified":"2019-02-27T13:01:34.120555Z","cycle":"WEEKLY","from_amount":1,"to_amount":4999,"incentive_percentage":"1.00"},{"id":2,"created":"2019-02-25T12:48:32.988490Z","modified":"2019-02-27T13:01:45.957107Z","cycle":"WEEKLY","from_amount":5000,"to_amount":19999,"incentive_percentage":"2.00"},{"id":3,"created":"2019-02-25T12:48:47.585210Z","modified":"2019-02-27T13:01:54.972520Z","cycle":"WEEKLY","from_amount":20000,"to_amount":99999,"incentive_percentage":"3.00"},{"id":4,"created":"2019-02-25T12:49:15.743756Z","modified":"2019-02-27T12:58:47.185876Z","cycle":"WEEKLY","from_amount":100000,"to_amount":0,"incentive_percentage":"4.00"}]
// const dashboard = {"total_weekly_purchase_target_amount":5000,"total_weekly_purchase_required_to_reach_target":5000,"total_incentive_amount":0,"total_weekly_purchase_actual_amount":0}

const mapStateToProps = (state) => {
  return ({
    responseDashboard: state.wbMoneyR.responseGetIncentiveDashboard,
    responseTiers: state.wbMoneyR.responseGetIncentiveTiers,
    responseHistory: state.wbMoneyR.responseGetIncentiveHistory,
  })
}

export default connect(mapStateToProps)(Incentives);