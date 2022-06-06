import React from 'react';
import {Alert, Platform} from 'react-native';
import Settings from './src/screens/Settings';
import ManageVehicalScreen from './src/screens/ManageVehicalScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import WebViewScreen from './src/screens/WebViewScreen';
import SplashScreen from 'react-native-splash-screen';
import PdfViewScreen from './src/screens/PdfViewScreen';
import MapViewScreen from './src/screens/MapViewScreen';
import PlaceHolderScreen from './src/screens/PlaceHolderScreen';
import LiquideGuageScreen from './src/screens/LiquideGuageScreen';
import store, {persistor} from './src/react_redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {VehicleContextProvider} from './src/utils/vehicleContext';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Stack = createNativeStackNavigator();

const createChannel = () => {
  PushNotification.createChannel({
    channelId: 'channel-id',
    channelName: 'My channel',
  });
};

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
    createChannel();
  }, []);

  const onLocalNotification = notification => {
    const isClicked = notification.getData().userInteraction === 1;
    Alert.alert(
      'Local Notification Received',
      `Alert title:  ${notification.getTitle()},
      Alert subtitle:  ${notification.getSubtitle()},
      Alert message:  ${notification.getMessage()},
      Badge: ${notification.getBadgeCount()},
      Sound: ${notification.getSound()},
      Thread Id:  ${notification.getThreadID()},
      Action Id:  ${notification.getActionIdentifier()},
      User Text:  ${notification.getUserText()},
      Notification is clicked: ${String(isClicked)}.`,
      [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ],
    );
  };
  //
  const showPermissions = () => {
    PushNotificationIOS.checkPermissions(permissions => {});
  };

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      showPermissions();
      PushNotificationIOS?.addEventListener('notification', () => {});
      PushNotificationIOS?.addEventListener(
        'localNotification',
        onLocalNotification,
      );

      PushNotificationIOS?.requestPermissions({
        alert: true,
        badge: true,
        sound: true,
        critical: true,
      }).then(
        data => {
          console.log('PushNotificationIOS.requestPermissions', data);
        },
        data => {
          console.log('PushNotificationIOS.requestPermissions failed', data);
        },
      );
    }

    return () => {
      if (Platform.OS === 'ios') {
        PushNotificationIOS?.removeEventListener('notification');
        PushNotificationIOS?.removeEventListener('localNotification');
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <VehicleContextProvider>
            <Stack.Navigator
              initialRouteName="FirebaseRealTime"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="homeScreen" component={HomeScreen} />
              <Stack.Screen name="settings" component={Settings} />
              <Stack.Screen
                name="manageVehicalScreen"
                component={ManageVehicalScreen}
              />
              <Stack.Screen
                name="webViewScreen"
                options={{animation: 'none'}}
                component={WebViewScreen}
              />
              <Stack.Screen name="pdfViewerScreen" component={PdfViewScreen} />
              <Stack.Screen name="mapViewScreen" component={MapViewScreen} />
              <Stack.Screen
                name="placeHolderScreen"
                component={PlaceHolderScreen}
              />
              <Stack.Screen
                options={{animation: 'none'}}
                name="liquideGuageScreen"
                component={LiquideGuageScreen}
              />
            </Stack.Navigator>
          </VehicleContextProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
