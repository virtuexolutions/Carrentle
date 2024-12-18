import React, {useEffect, useState} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useDispatch} from 'react-redux';
import {NativeBaseProvider, View} from 'native-base';
import {store, persistor} from './SRC/Store/index';
import {
  requestCameraPermission,
  requestLocationPermission,
  requestWritePermission,
  windowHeight,
  windowWidth,
} from './SRC/Utillity/utils';
import SplashScreen from './SRC/Screens/SplashScreen';
import AppNavigator from './SRC/appNavigation';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import CustomText from './SRC/Components/CustomText';
import Color from './SRC/Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from './SRC/Components/CustomImage';
import {TouchableOpacity} from 'react-native';
import {getDefaultMiddleware} from '@reduxjs/toolkit';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  PushNotification.localNotification({
    title: remoteMessage?.data?.title || 'New Message',
    message: remoteMessage?.data?.body || 'You have recieved a new message',
    data: remoteMessage?.data,
  });
});

const App = () => {
  const [notification, setNotification] = useState();
  const [notificationModal, setNotificationModal] = useState(false);
  console.reportErrorsAsExceptions = false;

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };
  const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
  });

  useEffect(() => {
    requestUserPermission();
  });

  const [publishableKey, setPublishableKey] = useState('');
  const fetchPublishableKey = async () => {
    const key = await fetchKey();
    setPublishableKey(key);
  };

  console.reportErrorsAsExceptions = false;

  // const ConnectPusher = async () => {
  //   const pusher = await getPusherInstance();
  //   await pusher.connect();
  // };

  // useEffect(() => {
  //   // ConnectPusher();
  //   requestUserPermission();
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     setNotificationModal(true);
  //     setNotification({
  //       title: remoteMessage.notification.title,
  //       body: remoteMessage.notification.body,
  //     });
  //     const timer = setTimeout(() => {
  //       setNotificationModal(false);
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   });
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage && remoteMessage.data?.screen) {
  //         navigation.navigate(remoteMessage.data.screen, {
  //           messageData: remoteMessage.data,
  //         });
  //       }
  //     });
  //   console.log('Running Firebase Notification ==> ');
  // }, []);

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider>
            <MainContainer />
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
      {notificationModal === true && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setNotificationModal(false)}
          style={{
            width: windowWidth * 0.9,
            height: windowHeight * 0.1,
            position: 'absolute',
            top: 10,
            backgroundColor: Color.white,
            alignSelf: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: moderateScale(15, 0.6),
            paddingVertical: moderateScale(15, 0.6),
            borderRadius: moderateScale(15, 0.6),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: moderateScale(45, 0.6),
              height: moderateScale(45, 0.6),
              borderRadius: windowWidth,
            }}>
            <CustomImage
              source={require('./SRC/Assets/Images/logo.png')}
              style={{width: '120%', height: '100%'}}
              resizeMode={'contain'}
            />
          </View>
          <View
            style={{
              paddingHorizontal: moderateScale(20, 0.6),
              width: '90%',
            }}>
            {notification?.title != undefined && (
              <CustomText style={{fontSize: moderateScale(12, 0.6)}} isBold>
                {notification?.title}
              </CustomText>
            )}
            <CustomText
              numberOfLines={1}
              style={{fontSize: moderateScale(11, 0.6), color: Color.grey}}>
              {notification?.body}
            </CustomText>
          </View>
        </TouchableOpacity>
      )}
    </NativeBaseProvider>
  );
};

const MainContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function GetPermission() {
      await requestCameraPermission();
      await requestWritePermission();
      await requestLocationPermission();
    }
    GetPermission();
  }, []);

  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }
  return <AppNavigator />;
};

const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(5000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};
export default App;
