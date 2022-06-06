import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

const notificationLocal = () => {
  console.log('present here2');
  PushNotification.localNotification({
    channelId: 'channel-id',
    title: 'My First Notification', // (optional)
    message: 'Hi! This is my first React Native App',
  });
};

const Notification = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={notificationLocal}>
        <Text style={styles.text}>Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
  },
  text: {
    color: '#fff',
  },
});
