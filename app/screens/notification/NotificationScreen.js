import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { 
  Content, 
  Container,
  Text,
} from 'native-base';
import { connect } from 'react-redux';

import LocalStorage from '../../db/LocalStorage';
import { colorresource } from '../../resources/colorresource';
import { ASYNC_STORAGE } from 'app/utils/const';
import GenericHeader from 'app/components/Header/GenericHeader'
import NotificationItem from './NotificationItem';
import styles from './styles';
import { goBack } from '../../actions/navigation-actions'
import { setUnreadNotificationsAction } from 'app/actions/dashboard-actions';
import UserHelper from 'app/config/userHelper';

class NotificationScreen extends Component {

  renderListEmptyComponent = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{fontSize: 25, color: colorresource.grey46, textAlign: 'center'}}>
          {'No notifications to display'}
        </Text>
      </View>
    )
  }

  resetNotificationCount = () => {
    LocalStorage.setItem(ASYNC_STORAGE.UNREAD_NOTIFICATIONS(UserHelper.getUserMobile()), 0)
    this.props.dispatch(setUnreadNotificationsAction(0))
  }

  retrieveNotifications = () => {
    LocalStorage
    .getItem(ASYNC_STORAGE.NOTIFICATIONS(UserHelper.getUserMobile()))
    .then(list => {
      console.log('list',list)
      if(list) {
        this.setState({notificationList: list.reverse()})
      }
      this.resetNotificationCount()
    })
  }
  
  constructor(props) {
    super(props);
    this.state = {
      notificationList: []
    }
  }
  
  componentDidMount(){
    this.retrieveNotifications();
  }
  
  render() {
    return (
      <Container style={{backgroundColor:'lightgrey'}}>
        <GenericHeader title={'Notifications'}/>
        <Content contentContainerStyle={{flexGrow: 1}}>
          <FlatList
          vertical
          data={this.state.notificationList}
          renderItem={(item) => <NotificationItem data={item}/>}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{flexGrow: 1,}}
          ListEmptyComponent={this.renderListEmptyComponent}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = () => {
  return ({

  })
}

export default connect(mapStateToProps)(NotificationScreen);