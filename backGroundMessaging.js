import firebase from 'react-native-firebase';
import {AsyncStorage} from 'react-native';
import type { RemoteMessage } from 'react-native-firebase';

export default async (message: RemoteMessage) => {
    console.log(" Background RemoteMessage", message);

    // const newNotification = new firebase.notifications.Notification()
    //     .android.setSmallIcon(message.data.icon)
    //     .android.setChannelId(message.data.channel_id)
    //     .setNotificationId(message.messageId)
    //     .setTitle(message.data.title)
    //     .setBody(message.data.body)
    //     .setData({
    //         key1: 'value1',
    //         key2: 'value2',
    //     });
    // firebase.notifications().displayNotification(newNotification);



 const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        })
        .setNotificationId(message.messageId)
        .setTitle(message.data.title)
        .setBody(message.data.message)
        .android.setChannelId('channelId') // e.g. the id you chose above
        .android.setColor('#000000') // you can set a color here
        .android.setBigPicture(message.data.image)
        // .android.setSmallIcon("ic_stat_notification") // create this icon in Android Studio
        .android.setPriority(firebase.notifications.Android.Priority.High);
        // localNotification.android.setChannelId(message.ttl);
        console.log('notification created',localNotification)
        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error('error',err));
                console.log('Message',message)
             .catch(err => console.error('error',err));
        AsyncStorage
        .getItem('Notifications')
        .then(list => {
            console.log('list',list)
            list = list === null ? [] : JSON.parse(list)
            list.push(message.data)
            return AsyncStorage.setItem('Notifications', JSON.stringify(list))
        })

    return Promise.resolve();
}