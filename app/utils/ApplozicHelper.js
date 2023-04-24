import React from 'react';
import { NativeModules } from 'react-native'

import  consts from 'app/utils/const';
import { isDev } from 'app/utils/debugVars'
import { isIos} from 'app/utils/PlatformHelper'
import LocalStorage from 'app/db/LocalStorage';

const ApplozicChat = NativeModules.ApplozicChat;

export const initialize = async (userId, displayName) => {
    let { response, error } = login(userId, displayName)
    if(error) {
        console.log("[ApplozicHelper:initialize] error", error)
        return false;
    }
    if(!isIos) {
      await updateToken();  
    }
    
    return true;
}

export const willAplozicHandleIt = async (data) => {
    if(isIos) {
      return false;
    }
    const processNotificationIfRequiredTask = (resolve, reject) => {
        ApplozicChat.processNotificationIfRequired(data, (error, response) => {
            resolve(response)
        })
    }
    return new Promise((resolve, reject) => processNotificationIfRequiredTask(resolve, reject))
}

export const updateToken = async () => {
  const registrationId = await LocalStorage.getItem(consts.FCMTOKEN)
  console.log("registationId", registrationId)
  ApplozicChat.updateToken(registrationId)
}

export const openChat = () => {
  ApplozicChat.openChat()
}

export const openChatWithUser = async ({my, theirs}) => {
  if(my) {
    // make sure the user is logged in first
    const {error, response} = await login(my)
    if(error) {
      console.log("[openChatWithUser] error while logging in")
      return;
    }
  }
  ApplozicChat.openChatWithUser(theirs)
}

export const login = async (userId, displayName=userId) => {
//   const registrationId = await LocalStorage.getItem(consts.FCMTOKEN)
  const loginTask = (resolve, reject) =>
  ApplozicChat.login({
    userId: userId,
    displayName,
    password: 'null',
    applicationId: '1a79888ef6d0fa76c522ea56a251b4fb9',
    // registrationId: registrationId,
    // 'authenticationTypeId' : 1,
    // 'deviceApnsType' : 0, //isDev? 0 : 1,
  }, (error, response) => {
    if(error) {
      console.log("[ApplozicHelper] Auth failed", error, response)
      // reject(error)
    } else {
      console.log("auth success", response)
      // ApplozicChat.openChatWithUser('919537705252')
      // resolve(response)
    }
    resolve({error, response})
  })
  return new Promise((resolve, reject) => {
    loginTask(resolve, reject)
  })
}

export const isLoggedIn = () => {
  const isLoggedInTask = (resolve, reject) => {
    // ApplozicChat.isUserLogIn((error, response) => {
    //   if(error) {
    //     console.log("[ApplozicHelper] isLoggedIn error:", error)
    //     reject(error);
    //   } else {
    //     console.log("[ApplozicHelper] isLoggedIn response", response)
    //     resolve(response)
    //   }
    // })

    ApplozicChat.isUserLogIn((result) => {
      console.log("[ApplozicHelper] isUserLogIn result", result)      
      resolve(result)
    })
  }

  return new Promise((resolve, reject) => {
    isLoggedInTask(resolve, reject)
  })
}

export const loginIfRequired = async () => {
  const alreadyLoggedIn = await isLoggedIn()
  if(alreadyLoggedIn) {
    return;
  }
  
}

export const logout = () => {
  const logoutTask = (resolve, reject) => {
    ApplozicChat.logoutUser((error, response) => {
      console.log("[ApplozicHelper] logout", {error, response} )
      resolve(response)
    })
  }
  return new Promise((resolve, reject) => {
    logoutTask(resolve, reject)
  })
}

// {"userId":user.username, "deviceType":"1", "applicationId":settings.APPLOZIC_APPID}




/*
package com.applozic;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.text.TextUtils;
import android.util.Log;

import com.applozic.mobicomkit.Applozic;
import com.applozic.mobicomkit.ApplozicClient;
import com.applozic.mobicomkit.uiwidgets.ApplozicSetting;
import com.applozic.mobicomkit.api.account.register.RegistrationResponse;
import com.applozic.mobicomkit.api.account.register.RegisterUserClientService;
import com.applozic.mobicomkit.api.account.user.MobiComUserPreference;
import com.applozic.mobicomkit.api.account.user.User;
import com.applozic.mobicomkit.api.account.user.UserClientService;
import com.applozic.mobicomkit.api.account.user.UserLoginTask;
import com.applozic.mobicomkit.api.account.user.PushNotificationTask;
import com.applozic.mobicomkit.api.conversation.database.MessageDatabaseService;
import com.applozic.mobicomkit.api.people.ChannelInfo;
import com.applozic.mobicomkit.channel.service.ChannelService;
import com.applozic.mobicomkit.uiwidgets.async.AlGroupInformationAsyncTask;
import com.applozic.mobicomkit.uiwidgets.async.ApplozicChannelAddMemberTask;
import com.applozic.mobicomkit.uiwidgets.conversation.ConversationUIService;
import com.applozic.mobicomkit.uiwidgets.conversation.activity.ConversationActivity;
import com.applozic.mobicommons.file.FileUtils;
import com.applozic.mobicommons.json.GsonUtils;
import com.applozic.mobicommons.people.channel.Channel;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.applozic.mobicomkit.feed.AlResponse;
import com.applozic.mobicomkit.uiwidgets.async.ApplozicChannelRemoveMemberTask;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;


public class ApplozicChatModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    final String TAG = "ApplozicChatModule";

    public ApplozicChatModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "ApplozicChat";
    }

    @ReactMethod
    public void updateToken(String token) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            Log.i("open updateToken  ", "Activity doesn't exist");
            return;
        }

        Log.i(TAG, "Found Registration Id:" + token);
        if (MobiComUserPreference.getInstance(currentActivity).isRegistered()) {
            Log.i(TAG, "user registered:");
            try {
                RegistrationResponse registrationResponse = new RegisterUserClientService(currentActivity).updatePushNotificationId(token);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            Log.i(TAG, "user not registered:");

        }
    }

    @ReactMethod
    public void login(final ReadableMap config, final Callback callback) {
        final Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            callback.invoke("Activity doesn't exist", null);
            return;
        }

        UserLoginTask.TaskListener listener = new UserLoginTask.TaskListener() {
            @Override
            public void onSuccess(RegistrationResponse registrationResponse, Context context) {
                //After successful registration with Applozic server the callback will come here
                if (MobiComUserPreference.getInstance(currentActivity).isRegistered()) {
                    String json = GsonUtils.getJsonFromObject(registrationResponse, RegistrationResponse.class);
                    callback.invoke(null, json);

                    PushNotificationTask pushNotificationTask = null;

                    PushNotificationTask.TaskListener listener = new PushNotificationTask.TaskListener() {
                        public void onSuccess(RegistrationResponse registrationResponse) {

                        }

                        @Override
                        public void onFailure(RegistrationResponse registrationResponse, Exception exception) {
                        }
                    };
                    String registrationId = Applozic.getInstance(context).getDeviceRegistrationId();
                    pushNotificationTask = new PushNotificationTask(registrationId, listener, currentActivity);
                    pushNotificationTask.execute((Void) null);
                } else {
                    String json = GsonUtils.getJsonFromObject(registrationResponse, RegistrationResponse.class);
                    callback.invoke(json, null);

                }

            }

            @Override
            public void onFailure(RegistrationResponse registrationResponse, Exception exception) {
                //If any failure in registration the callback  will come here
                callback.invoke(exception != null ? exception.toString() : "error", registrationResponse != null ? GsonUtils.getJsonFromObject(registrationResponse, RegistrationResponse.class) : "Unknown error occurred");

            }
        };

        User user = (User) GsonUtils.getObjectFromJson(GsonUtils.getJsonFromObject(config.toHashMap(), HashMap.class), User.class);
        new UserLoginTask(user, listener, currentActivity).execute((Void) null);
    }

    @ReactMethod
    public void openChat() {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            Log.i("OpenChat Error ", "Activity doesn't exist");
            return;
        }

        Intent intent = new Intent(currentActivity, ConversationActivity.class);
        currentActivity.startActivity(intent);
    }

    @ReactMethod
    public void openChatWithUser(String userId) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            Log.i("open ChatWithUser  ", "Activity doesn't exist");
            return;
        }

        Intent intent = new Intent(currentActivity, ConversationActivity.class);

        if (userId != null) {

            intent.putExtra(ConversationUIService.USER_ID, userId);
            intent.putExtra(ConversationUIService.TAKE_ORDER, true);

        }
        currentActivity.startActivity(intent);
    }

    @ReactMethod
    public void openChatWithGroup(Integer groupId, final Callback callback) {

        Activity currentActivity = getCurrentActivity();
        Intent intent = new Intent(currentActivity, ConversationActivity.class);

        if (groupId != null) {

            ChannelService channelService = ChannelService.getInstance(currentActivity);
            Channel channel = channelService.getChannel(groupId);

            if (channel == null) {
                callback.invoke("Channel dose not exist", null);
                return;
            }
            intent.putExtra(ConversationUIService.GROUP_ID, channel.getKey());
            intent.putExtra(ConversationUIService.TAKE_ORDER, true);
            currentActivity.startActivity(intent);
            callback.invoke(null, "success");

        } else {
            callback.invoke("unable to launch group chat, check your groupId/ClientGroupId", "success");
        }

    }

    @ReactMethod
    public void openChatWithClientGroupId(String clientGroupId, final Callback callback) {

        Activity currentActivity = getCurrentActivity();
        Intent intent = new Intent(currentActivity, ConversationActivity.class);

        if (TextUtils.isEmpty(clientGroupId)) {

            callback.invoke("unable to launch group chat, check your groupId/ClientGroupId", "success");
        } else {

            ChannelService channelService = ChannelService.getInstance(currentActivity);
            Channel channel = channelService.getChannelByClientGroupId(clientGroupId);

            if (channel == null) {
                callback.invoke("Channel dose not exist", null);
                return;
            }
            intent.putExtra(ConversationUIService.GROUP_ID, channel.getKey());
            intent.putExtra(ConversationUIService.TAKE_ORDER, true);
            currentActivity.startActivity(intent);
            callback.invoke(null, "success");

        }

    }

    @ReactMethod
    public void logoutUser(final Callback callback) {

        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            callback.invoke("Activity doesn't exist");
            return;
        }

        new UserClientService(currentActivity).logout();
        callback.invoke(null, "success");
    }

    //============================================ Group Method ==============================================

    @ReactMethod
    public void createGroup(final ReadableMap config, final Callback callback) {

        final Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {

            callback.invoke("Activity doesn't exist", null);
            return;

        }

        if (TextUtils.isEmpty(config.getString("groupName"))) {

            callback.invoke("Group name must be passed", null);
            return;
        }

        List<String> channelMembersList = (List<String>) (Object) (config.getArray("groupMemberList").toArrayList());

        final ChannelInfo channelInfo = new ChannelInfo(config.getString("groupName"), channelMembersList);

        if (!TextUtils.isEmpty(config.getString("clientGroupId"))) {
            channelInfo.setClientGroupId(config.getString("clientGroupId"));
        }
        if (config.hasKey("type")) {
            channelInfo.setType(config.getInt("type")); //group type
        } else {
            channelInfo.setType(Channel.GroupType.PUBLIC.getValue().intValue()); //group type
        }
        channelInfo.setImageUrl(config.getString("imageUrl")); //pass group image link URL
        Map<String, String> metadata = (HashMap<String, String>) (Object) (config.getMap("metadata").toHashMap());
        channelInfo.setMetadata(metadata);

        new Thread(new Runnable() {
            @Override
            public void run() {

                AlResponse alResponse = ChannelService.getInstance(currentActivity).createChannel(channelInfo);
                Channel channel = null;
                if (alResponse.isSuccess()) {
                    channel = (Channel) alResponse.getResponse();
                }
                if (channel != null && channel.getKey() != null) {
                    callback.invoke(null, channel.getKey());
                } else {
                    if (alResponse.getResponse() != null) {
                        callback.invoke(GsonUtils.getJsonFromObject(alResponse.getResponse(), List.class), null);
                    } else if (alResponse.getException() != null) {
                        callback.invoke(alResponse.getException().getMessage(), null);
                    }
                }
            }
        }).start();
    }

    @ReactMethod
    public void addMemberToGroup(final ReadableMap config, final Callback callback) {

        final Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {

            callback.invoke("Activity doesn't exist", null);
            return;

        }

        Integer channelKey = null;
        String userId = config.getString("userId");

        if (!TextUtils.isEmpty(config.getString("clientGroupId"))) {
            Channel channel = ChannelService.getInstance(currentActivity).getChannelByClientGroupId(config.getString("clientGroupId"));
            channelKey = channel != null ? channel.getKey() : null;

        } else if (!TextUtils.isEmpty(config.getString("groupId"))) {
            channelKey = Integer.parseInt(config.getString("groupId"));
        }

        if (channelKey == null) {
            callback.invoke("groupId/clientGroupId not passed", null);
            return;
        }

        ApplozicChannelAddMemberTask.ChannelAddMemberListener channelAddMemberListener = new ApplozicChannelAddMemberTask.ChannelAddMemberListener() {
            @Override
            public void onSuccess(String response, Context context) {
                //Response will be "success" if user is added successfully
                Log.i("ApplozicChannelMember", "Add Response:" + response);
                callback.invoke(null, response);
            }

            @Override
            public void onFailure(String response, Exception e, Context context) {
                callback.invoke(response, null);

            }
        };

        ApplozicChannelAddMemberTask applozicChannelAddMemberTask = new ApplozicChannelAddMemberTask(currentActivity, channelKey, userId, channelAddMemberListener);//pass channel key and userId whom you want to add to channel
        applozicChannelAddMemberTask.execute((Void) null);
    }

    @ReactMethod
    public void removeUserFromGroup(final ReadableMap config, final Callback callback) {

        final Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {

            callback.invoke("Activity doesn't exist", null);
            return;

        }

        Integer channelKey = null;
        String userId = config.getString("userId");

        if (!TextUtils.isEmpty(config.getString("clientGroupId"))) {
            Channel channel = ChannelService.getInstance(currentActivity).getChannelByClientGroupId(config.getString("clientGroupId"));
            channelKey = channel != null ? channel.getKey() : null;

        } else if (!TextUtils.isEmpty(config.getString("groupId"))) {
            channelKey = Integer.parseInt(config.getString("groupId"));
        }

        if (channelKey == null) {
            callback.invoke("groupId/clientGroupId not passed", null);
            return;
        }

        ApplozicChannelRemoveMemberTask.ChannelRemoveMemberListener channelRemoveMemberListener = new ApplozicChannelRemoveMemberTask.ChannelRemoveMemberListener() {
            @Override
            public void onSuccess(String response, Context context) {
                callback.invoke(null, response);
                //Response will be "success" if user is removed successfully
                Log.i("ApplozicChannel", "remove member response:" + response);
            }

            @Override
            public void onFailure(String response, Exception e, Context context) {
                callback.invoke(response, null);

            }
        };

        ApplozicChannelRemoveMemberTask applozicChannelRemoveMemberTask = new ApplozicChannelRemoveMemberTask(currentActivity, channelKey, userId, channelRemoveMemberListener);//pass channelKey and userId whom you want to remove from channel
        applozicChannelRemoveMemberTask.execute((Void) null);
    }
    //======================================================================================================

    @ReactMethod
    public void getUnreadCountForUser(String userId, final Callback callback) {

        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            callback.invoke("Activity doesn't exist", null);
            return;
        }

        int contactUnreadCount = new MessageDatabaseService(getCurrentActivity()).getUnreadMessageCountForContact(userId);
        callback.invoke(null, contactUnreadCount);

    }

    @ReactMethod
    public void getUnreadCountForChannel(ReadableMap config, final Callback callback) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            callback.invoke("Activity doesn't exist", null);
            return;
        }

        AlGroupInformationAsyncTask.GroupMemberListener listener = new AlGroupInformationAsyncTask.GroupMemberListener() {
            @Override
            public void onSuccess(Channel channel, Context context) {
                if (channel == null) {
                    callback.invoke("Channel dose not exist", null);
                } else {
                    callback.invoke(null, new MessageDatabaseService(context).getUnreadMessageCountForChannel(channel.getKey()));
                }
            }

            @Override
            public void onFailure(Channel channel, Exception e, Context context) {
                callback.invoke("Some error occurred : " + (e != null ? e.getMessage() : ""));
            }
        };

        if (config != null && config.hasKey("clientGroupId")) {
            new AlGroupInformationAsyncTask(currentActivity, config.getString("clientGroupId"), listener).execute();
        } else if (config != null && config.hasKey("groupId")) {
            new AlGroupInformationAsyncTask(currentActivity, config.getInt("groupId"), listener).execute();
        } else {
            callback.invoke("Invalid data sent");
        }
    }

    @ReactMethod
    public void setContactsGroupNameList(ReadableMap config) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            return;
        }
        List<String> contactGroupIdList = Arrays.asList((String[]) GsonUtils.getObjectFromJson(config.getString("contactGroupNameList"), String[].class));
        Set<String> contactGroupIdsSet = new HashSet<String>(contactGroupIdList);
        MobiComUserPreference.getInstance(currentActivity).setIsContactGroupNameList(true);
        MobiComUserPreference.getInstance(currentActivity).setContactGroupIdList(contactGroupIdsSet);
    }

    @ReactMethod
    public void totalUnreadCount(final Callback callback) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            callback.invoke("Activity doesn't exist", null);
            return;
        }

        int totalUnreadCount = new MessageDatabaseService(currentActivity).getTotalUnreadCount();
        callback.invoke(null, totalUnreadCount);

    }

    @ReactMethod
    public void isUserLogIn(final Callback successCallback) {
        Activity currentActivity = getCurrentActivity();
        MobiComUserPreference mobiComUserPreference = MobiComUserPreference.getInstance(currentActivity);
        successCallback.invoke(mobiComUserPreference.isLoggedIn());
    }

    @ReactMethod
    public void hideCreateGroupIcon(boolean hide) {
        Activity currentActivity = getCurrentActivity();

        if (hide) {
            ApplozicSetting.getInstance(currentActivity).hideStartNewGroupButton();
        } else {
            ApplozicSetting.getInstance(currentActivity).showStartNewGroupButton();
        }
    }

    @ReactMethod
    public void showOnlyMyContacts(boolean showOnlyMyContacts) {
        Activity currentActivity = getCurrentActivity();

        if (showOnlyMyContacts) {
            ApplozicClient.getInstance(currentActivity).enableShowMyContacts();
        } else {
            ApplozicClient.getInstance(currentActivity).disableShowMyContacts();
        }
    }

    @ReactMethod
    public void hideChatListOnNotification() {
        Activity currentActivity = getCurrentActivity();
        ApplozicClient.getInstance(currentActivity).hideChatListOnNotification();
    }

    @ReactMethod
    public void hideGroupSubtitle() {

    }

    @ReactMethod
    public void setAttachmentType(ReadableMap config) {
        Activity currentActivity = getCurrentActivity();
        Map<FileUtils.GalleryFilterOptions, Boolean> options = new HashMap<>();

        if (config.hasKey("allFiles")) {
            options.put(FileUtils.GalleryFilterOptions.ALL_FILES, config.getBoolean("allFiles"));
        }

        if (config.hasKey("imageVideo")) {
            options.put(FileUtils.GalleryFilterOptions.IMAGE_VIDEO, config.getBoolean("imageVideo"));
        }

        if (config.hasKey("image")) {
            options.put(FileUtils.GalleryFilterOptions.IMAGE_ONLY, config.getBoolean("image"));
        }

        if (config.hasKey("audio")) {
            options.put(FileUtils.GalleryFilterOptions.AUDIO_ONLY, config.getBoolean("audio"));
        }

        if (config.hasKey("video")) {
            options.put(FileUtils.GalleryFilterOptions.VIDEO_ONLY, config.getBoolean("video"));
        }

        ApplozicSetting.getInstance(currentActivity).setGalleryFilterOptions(options);
    }

    @Override
    public void onActivityResult(Activity activity, final int requestCode, final int resultCode, final Intent intent) {
    }

    @Override
    public void onNewIntent(Intent intent) {
    }

}
*/
