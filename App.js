import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform,StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as Device from 'expo-device';
import {
  schedulePushNotification,
  registerForPushNotificationsAsync,
  addNotificationListeners,
  removeNotificationListeners,
} from './notificationService';

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [name,setName] = useState(null);
  const [email,setEmail] = useState(null);



  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    const { notificationListener, responseListener } = addNotificationListeners(
      notification => setNotification(notification),
      response => console.log(response)
    );

    notificationListener.current = notificationListener;
    responseListener.current = responseListener;

    return () => {
      removeNotificationListeners(notificationListener.current, responseListener.current);
    };
  }, []);



  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TextInput onChangeText={(text)=>setName(text)} placeholder="Enter username" style={{ height:40,width:'70%',borderWidth:0.5,borderColor:'black',borderRadius:12,paddingHorizontal:12, }}/>


      <TextInput onChangeText={(text)=>setEmail(text)} placeholder="Enter Email" style={{ height:40,width:'70%',borderWidth:0.5,borderColor:'black',borderRadius:12,paddingHorizontal:12,marginTop:15,marginBottom:20, }}/>
      <TouchableOpacity
      style={styles.button}
        onPress={async () => {
          await schedulePushNotification({name,email});
        }}
      >
        <Text style={{ color:'white',fontWeight:'bold' }}>Push Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    height:40,
    width:'40%',
    backgroundColor:'black',
    borderRadius:12,
    justifyContent:'center',
    alignItems:'center'
  }
});
