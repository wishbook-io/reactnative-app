import React, { Component } from "react";

import { Platform, AppState, PushNotificationIOS } from 'react-native';
import firebase from 'react-native-firebase'

import { handleDeeplink } from 'app/actions/navigation-actions';
import LocalStorage from 'app/db/LocalStorage';
import consts, { ASYNC_STORAGE } from "../../utils/const";
import UserHelper from 'app/config/userHelper';
// import * as ApplozicHelper from 'app/utils/ApplozicHelper';

import { setUnreadNotificationsAction } from 'app/actions/dashboard-actions'
import { setUnreadNotifications } from 'app/saga/dashboard-saga';
import { execute } from 'app/config/saga'
import { isIos } from 'app/utils/PlatformHelper';

const CHANNEL_ID = {
  id: 'com.wishbook.catalog.react.android',
  name: 'Default Notification Channel',
}

const incrementUnreadNotificationCount = () => {
  const notificationKey = ASYNC_STORAGE.UNREAD_NOTIFICATIONS(UserHelper.getUserMobile())
  LocalStorage.getItem(notificationKey).then((count) => {
    count = Number.parseInt(count)
    if(Number.isNaN(count)) {
      count = 0
    }
    console.log("NOT: setting unread notifications to ", count+1)
    LocalStorage.setItem(notificationKey, count + 1)
    execute(setUnreadNotifications, setUnreadNotificationsAction(count + 1))
  })
}

// needed for android headless task
export const backgroundMessageHandler = (message) => {
  messageHandler(message);
  return Promise.resolve();
}

const messageHandler = async (message) => {
  console.log('got message', message)
  // const applozicWillHandleThis = await ApplozicHelper.willAplozicHandleIt(message.data)
  // if(applozicWillHandleThis) {
  //   return;
  // }
  const localNotification = new firebase.notifications.Notification({
    sound: 'default',
    show_in_foreground: true,
  })
  .setNotificationId(message.messageId || message.notificationId)
  .setTitle(message.data.title)
  .setBody(message.data.message)
  .setData(message.data)
  .android.setChannelId(CHANNEL_ID.id) 
  .android.setColor('#000000')
  if(message.data.image) {
    localNotification.android.setBigPicture(message.data.image)
    .android.setLargeIcon(message.data.image)
  }
  // .android.setSmallIcon("ic_stat_notification") // create this icon in Android Studio
  localNotification.android.setPriority(firebase.notifications.Android.Priority.High);
  console.log('notification created',localNotification)
  firebase.notifications()
  .displayNotification(localNotification)
  .catch(err => console.error('error',err));
  const notificationKey = ASYNC_STORAGE.NOTIFICATIONS(UserHelper.getUserMobile())
  LocalStorage
  .getItem(notificationKey)
  .then(list => {
    list = list? list : []
    list.push(message.data)
    LocalStorage.setItem(notificationKey, list)
    incrementUnreadNotificationCount()
  })
}

export default class PushNotificationController extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    console.log('Notifications set')
    
    if(isIos) {
      PushNotificationIOS.addEventListener('register', (token) => {
        console.log('this is the token', token);
        LocalStorage.setItem(consts.REGISTRATION_ID, token)
      });
      PushNotificationIOS.requestPermissions(); 
      // someone from the community said 
      // this is required to receive the above callback, not sure.
      PushNotificationIOS.addEventListener('registrationError', (error) => console.log("##########", error))
    }
    
    const channel = new firebase.notifications.Android.Channel(CHANNEL_ID.id, CHANNEL_ID.name, firebase.notifications.Android.Importance.Max)
    .setDescription('My apps default channel');
    // Create the channel
    firebase.notifications().android.createChannel(channel);
  }
  
  componentDidMount() {
    
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      console.log('Notifications',notification)
      
      
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    
    this.messageListener = firebase.messaging().onMessage(messageHandler)
    
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const action = notificationOpen.action;
      const notification = notificationOpen.notification;
      console.log('handled',notificationOpen)
      if(notification._data && notification._data.other_para) {
        const otherPara = notification._data.other_para
        console.log("other_para", otherPara)
        let deepLink = null;
        if(otherPara.deep_link) {
          deepLink = otherPara.deep_link
        } else {
          try {
            const otherParaJson = JSON.parse(otherPara)
            if(otherParaJson.deep_link) {
              deepLink = otherParaJson.deep_link
            }
          }catch(e) {
            console.log("[onNotificationOpened] error while parsing JSON", e)
          }
        }
        // const otherPara = JSON.parse(notification._data.other_para)
        if(deepLink) {
          handleDeeplink(deepLink)
        } else {
          console.log("[onNotificationOpened] couldn't find deep link")
        }
      }
    });
    
    this.notificationListener = firebase.notifications().onNotification((notif) => {
      console.log("[onNotification]",notif);
    
      if (AppState.currentState === "active") {
        messageHandler(notif);
        console.log('notification in forground')

      }
    });
    
  }
  
  componentWillUnmount() {
    console.log('Notifications UNset')
    this.notificationDisplayedListener();
    this.messageListener();
    this.notificationOpenedListener();
    this.notificationListener();    
  }
  
  render() {
    return null;
  }
}

/*

Remote message:
{ ttl: 2419200,
  sentTime: 1549452042419,
  from: '479030482746',
  messageId: '0:1549452042427970%3882137cf9fd7ecd',
  data: 
  { title: 'My Catalog DeepLink',
  notId: '402329',
  message: 'My Catalog DeepLink',
  misc: 'data',
  other_para: '{"deep_link":"http:\\/\\/app.wishbooks.io\\/?type=catalog&ctype=mycatalog"}',
  push_type: 'promotional',
  image: '',
  priority: 'high' } }
  
  when clicked
  { action: null,
    notification: 
    { _body: 'My Catalog DeepLink',
    _data: { deep_link: 'http://app.wishbooks.io/?type=catalog&ctype=mycatalog' },
    _notificationId: '0:1549454751850057%3882137cf9fd7ecd',
    _sound: 'default',
    _subtitle: undefined,
    _title: 'My Catalog DeepLink',
    _android: 
    { _notification: [Circular],
      _actions: [],
      _autoCancel: undefined,
      _badgeIconType: undefined,
      _bigPicture: { picture: '' },
      _bigText: undefined,
      _category: undefined,
      _channelId: 'com.wishbook.catalog.react.android',
      _clickAction: undefined,
      _color: '#000000',
      _colorized: undefined,
      _contentInfo: undefined,
      _defaults: undefined,
      _group: undefined,
      _groupAlertBehaviour: undefined,
      _groupSummary: undefined,
      _largeIcon: '',
      _lights: undefined,
      _localOnly: undefined,
      _number: undefined,
      _ongoing: undefined,
      _onlyAlertOnce: undefined,
      _people: [],
      _priority: 1,
      _progress: undefined,
      _remoteInputHistory: undefined,
      _shortcutId: undefined,
      _showWhen: undefined,
      _smallIcon: { icon: 'ic_launcher' },
      _sortKey: undefined,
      _tag: undefined,
      _ticker: undefined,
      _timeoutAfter: undefined,
      _usesChronometer: undefined,
      _vibrate: undefined,
      _visibility: undefined,
      _when: undefined },
      _ios: { _notification: [Circular], _attachments: [] } },
      results: undefined }
      
      
      
      
      
      
      02-07 10:00:01.431  7684 13050 I ReactNativeJS: 'got message', { ttl: 2419200,
        02-07 10:00:01.431  7684 13050 I ReactNativeJS:   sentTime: 1549513801120,
        02-07 10:00:01.431  7684 13050 I ReactNativeJS:   from: '479030482746',
        02-07 10:00:01.431  7684 13050 I ReactNativeJS:   messageId: '0:1549513801125951%3882137cf9fd7ecd',
        02-07 10:00:01.431  7684 13050 I ReactNativeJS:   data: 
        02-07 10:00:01.431  7684 13050 I ReactNativeJS:    { title: 'Supplier Status Approved',
        02-07 10:00:01.431  7684 13050 I ReactNativeJS:      notId: '84',
        02-07 10:00:01.431  7684 13050 I ReactNativeJS:      type: 'catalog',
        02-07 10:00:01.431  7684 13050 I ReactNativeJS:      message: 'Your catalogs are active now.',
        02-07 10:00:01.431  7684 13050 I ReactNativeJS:      misc: 'data',
        02-07 10:00:01.431  7684 13050 I ReactNativeJS:      other_para: '{"deep_link":"http:\\/\\/b2b.wishbook.io\\/?type=catalog&ctype=mycatalog"}',
        02-07 10:00:01.431  7684 13050 I ReactNativeJS:      push_type: 'promotional',
        02-07 10:00:01.431  7684 13050 I ReactNativeJS:      priority: 'high' } }
        02-07 10:00:01.440  7684 13050 I ReactNativeJS: 'notification created', { _body: 'Your catalogs are active now.',
        02-07 10:00:01.440  7684 13050 I ReactNativeJS:   _data: { deep_link: 'http://b2b.wishbook.io/?type=catalog&ctype=mycatalog' },
        02-07 10:00:01.440  7684 13050 I ReactNativeJS:   _notificationId: '0:1549513801125951%3882137cf9fd7ecd',
        02-07 10:00:01.440  7684 13050 I ReactNativeJS:   _sound: 'default',
        02-07 10:00:01.440  7684 13050 I ReactNativeJS:   _subtitle: undefined,
        02-07 10:00:01.440  7684 13050 I ReactNativeJS:   _title: 'Supplier Status Approved',
        02-07 10:00:01.440  7684 13050 I ReactNativeJS:   _android: 
        02-07 10:00:01.440  7684 13050 I ReactNativeJS:    { _notification: [Circular],
          02-07 10:00:01.440  7684 13050 I ReactNativeJS:      _actions: [],
          02-07 10:00:01.440  7684 13050 I ReactNativeJS:      _people: [],
          02-07 10:00:01.440  7684 13050 I ReactNativeJS:      _smallIcon: { icon: 'ic_launcher' },
          02-07 10:00:01.440  7684 13050 I ReactNativeJS:      _channelId: 'com.wishbook.catalog.react.android',
          02-07 10:00:01.440  7684 13050 I ReactNativeJS:      _color: '#000000',
          02-07 10:00:01.440  7684 13050 I ReactNativeJS:      _bigPicture: 
          02-07 10:00:01.440  7684 13050 I ReactNativeJS:       { contentTitle: undefined,
            02-07 10:00:01.440  7684 13050 I ReactNativeJS:         largeIcon: undefined,
            02-07 10:00:01.440  7684 13050 I ReactNativeJS:         picture: undefined,
            02-07 10:00:01.440  7684 13050 I ReactNativeJS:         summaryText: undefined },
            02-07 10:00:01.440  7684 13050 I ReactNativeJS:      _largeIcon: undefined,
            02-07 10:00:01.440  7684 13050 I ReactNativeJS:      _priority: 1 },
            02-07 10:00:01.440  7684 13050 I ReactNativeJS:   _ios: { _notification: [Circular], _attachments: [] } }
            02-07 10:00:01.515  7684 13050 E ReactNativeJS: 'error', { [Error: Could not send notification]
              02-07 10:00:01.515  7684 13050 E ReactNativeJS:   framesToPop: 1,
              02-07 10:00:01.515  7684 13050 E ReactNativeJS:   code: 'notification/display_notification_error' }
              02-07 10:00:01.545  7684 13050 W ReactNativeJS: Unable to symbolicate stack trace: Network request failed
              
              
              02-07 10:33:59.968 20763 20818 I ReactNativeJS: 'got message', { _collapseKey: undefined,
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:   _data: 
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:    { priority: 'high',
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:      earned_points: '5',
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:      title: 'WB-Reward Received',
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:      table_id: '4015',
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:      available_points: '10',
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:      push_type: 'promotional',
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:      other_para: '{"deep_link":"http:\\/\\/b2b.wishbook.io\\/?page=myearning\\/rewardpoint&type=tab"}',
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:      misc: 'data',
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:      message: 'Hey! Aapne 5 WB Reward points kamaye hai. Ab aapke account me total 10 WB Reward points hai. Aap apne agale order me discount le sakte hai',
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:      type: 'tab',
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:      notId: '4015' },
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:   _from: '479030482746',
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:   _messageId: '0:1549515838175547%3882137cf9fd7ecd',
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:   _messageType: undefined,
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:   _sentTime: 1549515838168,
                02-07 10:33:59.968 20763 20818 I ReactNativeJS:   _ttl: 3600 }
                02-07 10:33:59.973 20763 20818 I ReactNativeJS: 'notification created', { _body: 'Hey! Aapne 5 WB Reward points kamaye hai. Ab aapke account me total 10 WB Reward points hai. Aap apne agale order me discount le sakte hai',
                02-07 10:33:59.973 20763 20818 I ReactNativeJS:   _data: { deep_link: 'http://b2b.wishbook.io/?page=myearning/rewardpoint&type=tab' },
                02-07 10:33:59.973 20763 20818 I ReactNativeJS:   _notificationId: '0:1549515838175547%3882137cf9fd7ecd',
                02-07 10:33:59.973 20763 20818 I ReactNativeJS:   _sound: 'default',
                02-07 10:33:59.973 20763 20818 I ReactNativeJS:   _subtitle: undefined,
                02-07 10:33:59.973 20763 20818 I ReactNativeJS:   _title: 'WB-Reward Received',
                02-07 10:33:59.973 20763 20818 I ReactNativeJS:   _android: 
                02-07 10:33:59.973 20763 20818 I ReactNativeJS:    { _notification: [Circular],
                  02-07 10:33:59.973 20763 20818 I ReactNativeJS:      _actions: [],
                  02-07 10:33:59.973 20763 20818 I ReactNativeJS:      _people: [],
                  02-07 10:33:59.973 20763 20818 I ReactNativeJS:      _smallIcon: { icon: 'ic_launcher' },
                  02-07 10:33:59.973 20763 20818 I ReactNativeJS:      _channelId: 'com.wishbook.catalog.react.android',
                  02-07 10:33:59.973 20763 20818 I ReactNativeJS:      _color: '#000000',
                  02-07 10:33:59.973 20763 20818 I ReactNativeJS:      _priority: 1 },
                  02-07 10:33:59.973 20763 20818 I ReactNativeJS:   _ios: { _notification: [Circular], _attachments: [] } }
                  02-07 10:34:00.106 20763 20818 I ReactNativeJS: 'Notifications', { _body: 'Hey! Aapne 5 WB Reward points kamaye hai. Ab aapke account me total 10 WB Reward points hai. Aap apne agale order me discount le sakte hai',
                  02-07 10:34:00.106 20763 20818 I ReactNativeJS:   _data: { deep_link: 'http://b2b.wishbook.io/?page=myearning/rewardpoint&type=tab' },
                  02-07 10:34:00.106 20763 20818 I ReactNativeJS:   _notificationId: '0:1549515838175547%3882137cf9fd7ecd',
                  02-07 10:34:00.106 20763 20818 I ReactNativeJS:   _sound: 'default',
                  02-07 10:34:00.106 20763 20818 I ReactNativeJS:   _subtitle: undefined,
                  02-07 10:34:00.106 20763 20818 I ReactNativeJS:   _title: 'WB-Reward Received',
                  02-07 10:34:00.106 20763 20818 I ReactNativeJS:   _android: 
                  02-07 10:34:00.106 20763 20818 I ReactNativeJS:    { _notification: [Circular],
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _actions: [],
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _autoCancel: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _badgeIconType: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _bigPicture: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _bigText: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _category: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _channelId: 'com.wishbook.catalog.react.android',
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _clickAction: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _color: '#000000',
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _colorized: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _contentInfo: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _defaults: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _group: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _groupAlertBehaviour: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _groupSummary: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _largeIcon: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _lights: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _localOnly: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _number: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _ongoing: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _onlyAlertOnce: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _people: [],
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _priority: 1,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _progress: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _remoteInputHistory: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _shortcutId: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _showWhen: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _smallIcon: { icon: 'ic_launcher' },
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _sortKey: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _tag: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _ticker: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _timeoutAfter: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _usesChronometer: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _vibrate: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _visibility: undefined,
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:      _when: undefined },
                    02-07 10:34:00.106 20763 20818 I ReactNativeJS:   _ios: { _notification: [Circular], _attachments: [] } }
                    
                    
                    */
