// notificationService.js
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function schedulePushNotification({name,email}) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Account created for 📬"+name,
      body: 'Email Account:'+email,
      data: { data: 'We are glad you just joined out team.Hope to work with you.Welcome.' },
    },
    trigger: { seconds: 2 },
  });
}

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    console.log(token);
  } else {
    alert('Must use a physical device for Push Notifications');
  }

  return token;
}

export function addNotificationListeners(notificationListener, responseListener) {
  return {
    notificationListener: Notifications.addNotificationReceivedListener(notificationListener),
    responseListener: Notifications.addNotificationResponseReceivedListener(responseListener),
  };
}

export function removeNotificationListeners(notificationListener, responseListener) {
  Notifications.removeNotificationSubscription(notificationListener);
  Notifications.removeNotificationSubscription(responseListener);
}
