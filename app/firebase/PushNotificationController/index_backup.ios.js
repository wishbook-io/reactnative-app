import React, { Component } from "react";

import { Platform ,AppState,AsyncStorage,PushNotificationIOS} from 'react-native';
import firebase from 'react-native-firebase'
import consts from "../../utils/const";

import type { Notification, NotificationOpen } from 'react-native-firebase';
import type { RemoteMessage } from 'react-native-firebase';
PushNotificationIOS.requestPermissions();

export const backgroundMessageHandler = () => {
    
}

export default class PushNotificationController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
          }
    }


componentWillMount() {
    console.log('notifications set')
    PushNotificationIOS.addEventListener('register', (token) => {
        console.log('this is the token', token);
        AsyncStorage.setItem(consts.REGISTRATION_ID, token)
      });
}


_onNotificationOpenedHandler(){

}

componentDidMount() {
        this.notificationListener = firebase.notifications().onNotification(this._onNotification);
        AppState.addEventListener('change', this._handleAppStateChange);
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            const message: RemoteMessage =notificationOpen.message
            console.log('handled',notificationOpen)
            AsyncStorage
            .getItem('Notifications')
            .then(list => {
               
                list = list === null ? [] : JSON.parse(list)
                list.push(message.data)
                return AsyncStorage.setItem('Notifications', JSON.stringify(list))
            })
    
        });



        firebase.notifications().getInitialNotification().then((notification) => {
        // Process your message as required
        
        console.log('handled2',notification)

        });




        this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {

            const localNotification = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true,
            })
            .setNotificationId(message.messageId)
            .setTitle(message.data.title)
            .setBody(message.data.message)
            .setData({
              deeplink:message.data.other
            })
            .android.setChannelId('channelId') 
            .android.setColor('#000000') 
            .android.setBigPicture(message.data.image)
            // .android.setSmallIcon("ic_stat_notification") // create this icon in Android Studio
            .android.setPriority(firebase.notifications.Android.Priority.High);
            console.log('notification created',localNotification)
            firebase.notifications()
              .displayNotification(localNotification)
              .catch(err => console.error('error',err));
            AsyncStorage
            .getItem('Notifications')
            .then(list => {
               
                list = list === null ? [] : JSON.parse(list)
                list.push(message.data)
                return AsyncStorage.setItem('Notifications', JSON.stringify(list))
            })
    
    
        });
     
}


_onNotification = (notif) => {
    console.log("_onNotification",notif);

    if (this.state.appState === "active") {
      const localNotif = new firebase.notifications.Notification()
        .setNotificationId(notif._notificationId)
        .setTitle(notif._title)
        .setBody(notif._body)
        .setData(notif._data);;
        AsyncStorage
            .getItem('Notifications')
            .then(list => {
               
                list = list === null ? [] : JSON.parse(list)
                list.push(notif.data)
                return AsyncStorage.setItem('Notifications', JSON.stringify(list))
            })
     console.log('notification in forground')
    }
  }



   

    _handleAppStateChange = (nextAppState) => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
        }
        this.setState({appState: nextAppState});
      };
    componentWillUnmount() {
    this.messageListener();
    this.notificationOpenedListener();
    AppState.removeEventListener('change', this._handleAppStateChange);



}


    // componentWillUnmount() {
    //     this.notificationListner.remove();
    //     this.refreshTokenListener.remove();
    // }

    render() {
        return null;
    }
}

//     FCM.requestPermissions();

    //     FCM.getFCMToken().then(token => {
    //         console.log("TOKEN (getFCMToken)", token);
    //     });

    //     FCM.getInitialNotification().then(notif => {
    //         console.log("INITIAL NOTIFICATION", notif)
    //     });

    //     this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
    //         console.log("Notification", notif);
    //         if (notif.local_notification) {
    //             return;
    //         }
    //         if (notif.opened_from_tray) {
    //             return;
    //         }

    //         if (Platform.OS === 'ios') {
    //             //optional
    //             //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
    //             //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
    //             //notif._notificationType is available for iOS platfrom
    //             switch (notif._notificationType) {
    //                 case NotificationType.Remote:
    //                     notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
    //                     break;
    //                 case NotificationType.NotificationResponse:
    //                     notif.finish();
    //                     break;
    //                 case NotificationType.WillPresent:
    //                     notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
    //                     break;
    //             }
    //         }
    //         this.showLocalNotification(notif);
    //     });

    //     this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
    //         console.log("TOKEN (refreshUnsubscribe)", token);
    //     });
    // showLocalNotification(notif) {
    //     FCM.presentLocalNotification({
    //         title: notif.title,
    //         body: notif.body,
    //         priority: "high",
    //         click_action: notif.click_action,
    //         show_in_foreground: true,
    //         local: true
    //     });
    // }
