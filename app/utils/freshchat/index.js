import {
  Freshchat,
  FreshchatConfig,
  FaqOptions,
  ConversationOptions,
  FreshchatUser,
  FreshchatMessage,
  FreshchatNotificationConfig
} from 'react-native-freshchat-sdk';

export const init = () => {
  const freshchatConfig = new FreshchatConfig('12fdcb5b-dd2d-4d96-b5a1-a623e5c7633e', 'e770aac6-9f93-42b6-9495-9904f1a2a3a4');
  Freshchat.init(freshchatConfig)
}

export const showConversations = () => {
  Freshchat.showConversations();
}

export const showFAQs = () => {
  Freshchat.showFAQs();
}

export const chatWbSupport = () => {
  let conversationOptions = new ConversationOptions();
  conversationOptions.tags = ["Wishbook Support"];
  // conversationOptions.filteredViewTitle = "Premium Support";
  Freshchat.showConversations(conversationOptions);
}