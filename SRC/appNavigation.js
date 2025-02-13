import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import navigationService from './navigationService';
import LoginScreen from './Screens/LoginScreen';
import Signup from './Screens/Signup';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'native-base';
import { AppState, PermissionsAndroid, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from './Assets/Utilities/Color';
import Drawer from './Drawer/Drawer';
import BoardingPointDetails from './Screens/BoardingPointDetails';
import BoardingPointScreen from './Screens/BoardingPointScreen';
import BoardingPointSearchScreen from './Screens/BoardingPointSearchScreen';
import BookingRequest from './Screens/BookingRequest';
import CabTracking from './Screens/CabTracking';
import CencalTexi from './Screens/CancelTaxi';
import DashBoard from './Screens/Dashboard';
import EditProfile from './Screens/EditProfile';
import Help from './Screens/Help';
import HomeScreen from './Screens/HomeScreen';
import MessagesScreen from './Screens/MessagesScreen';
import MyJourneys from './Screens/MyJourneys';
import MyTrips from './Screens/MyTrips';
import MyWallet from './Screens/MyWallet';
import Notifications from './Screens/Notifications';
import PaymentHistory from './Screens/PaymentHistory';
import PaymentScreen from './Screens/PaymentScreen';
import PrivacyPolicy from './Screens/PrivacyPolicy';
import Profile from './Screens/Profile';
import ResetPassword from './Screens/ResetPassword';
import RideAcceptance from './Screens/RideAcceptance';
import RideBookingScreen from './Screens/RideBokkingScreen';
import RideBookingScreen2 from './Screens/RideBookingScreen2';
import Settings from './Screens/Settings';
import Start from './Screens/Start';
import TaxiAvailability from './Screens/TaxiAvailability';
import TermsAndConditions from './Screens/TermsAndConditions';
import TrackingScreen from './Screens/TrackingScreen';
import VerifyEmail from './Screens/VerifyEmail';
import VerifyNumber from './Screens/VerifyNumber';
import WaitingScreen from './Screens/WaitingScreen';
import WalkThroughScreen from './Screens/WalkthroughScreen';
import { windowHeight } from './Utillity/utils';
import BackgroundService from 'react-native-background-actions';
import Geolocation from '@react-native-community/geolocation';
import { setAppIsInBackground, setCurrentLocation } from './Store/slices/common';

const AppNavigator = () => {
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const role = useSelector(state => state.authReducer.role);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  const { user_type } = useSelector(state => state.authReducer);
  const appIsInBackground = useSelector(state => state.commonReducer.appIsInBackground);
  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();
  const [currentState, setCurrentState] = useState('active');
  const [publishableKey, setPublishableKey] = useState('');
  const [currentPosition, setCurrentPosition] = useState(null);
  console.log("🚀 ~ AppNavigator ~ currentPosition:", currentPosition)
  console.log("🚀 ~ AppNavigator ~ appIsInBackground:", appIsInBackground)
  const dispatch = useDispatch();

  const _handleAppStateChange = async nextAppState => {
    console.log("🚀 ~ App ~ nextAppState:", nextAppState)
    if (nextAppState === 'active') {
      dispatch(setAppIsInBackground(false))
    } else if (nextAppState.match(/inactive|background/)) {
      setCurrentState(nextAppState);
      dispatch(setAppIsInBackground(true))
    }
    else {
      console.log('elseeee me ha')
      setCurrentState(nextAppState);
      dispatch(setAppIsInBackground(true))
    }
  }



  useEffect(() => {
    const subscription = AppState.addEventListener('change', _handleAppStateChange)
    return () => {
      subscription.remove()
    }
  }, [])

  const options = {
    taskName: 'Tracking Time and Location',
    taskTitle: 'Tracking Your Ride',
    taskDesc: 'Updating location and travel time',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'myapp://TrackingScreen',
    parameters: {
      delay: 30000,
    },
  };

  // const requestPermissions = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.requestMultiple([
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
  //     ]);
  //     return granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === 'granted' &&
  //       granted[PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION] === 'granted';
  //   } catch (err) {
  //     console.warn(err);
  //     return false;
  //   }
  // };

  const tracklocation = async ({ latitude, longitude }) => {
    const url = `auth/rider/update_location/${ride_id}`;
    const body = {
      lat: latitude,
      lng: longitude,
    };
    const response = await Post(url, body, apiHeader(token));
    return console.log('🚀 ~ tracklocation ~ response:', response?.data);
  };


  const startLocationTracking = async () => {
    console.log('funcationn me ha')
    // let permissionResult = await requestPermissions()
    // console.log("🚀 ~ startLocationTracking ~ permissionResult:", permissionResult)
    watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log("🚀 ~ startLocationTracking ~ latitude:", latitude, longitude)
        setCurrentPosition(prevLocation => ({
          ...prevLocation,
          latitude,
          longitude,
        }));
        tracklocation({ latitude, longitude })
      },
      error => console.log('Error getting location:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 1000,
        timeout: 30000,
        maximumAge: 10000,
        interval: 20000,
      }
    );
    return new Promise(resolve => { })
  };

  const toggleBackground = async () => {
    if (!BackgroundService.isRunning()) {
      try {
        await BackgroundService.start(startLocationTracking, options);
      } catch (error) {
        console.log(error);
      }
    } else {
      await BackgroundService.stop();
      console.log('✅ background Actions has been stopped.');
    }
  };

  useEffect(() => {
    if (user_type === 'Rider') {

      if (appIsInBackground) {
        console.log("BG ACTIONS Should be run......", appIsInBackground);
        toggleBackground()
      } else {
        console.log('background stop')
        BackgroundService.stop()
      }
    }
  }, [appIsInBackground, user_type === 'Rider'])


  let watchId = null;

  const AppNavigatorContainer = () => {
    const firstScreen =
      walkThrough == false
        ? 'WalkThroughScreen'
        : token == null
          ? 'Start'
          : 'MyDrawer';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{ headerShown: false }}>
          <RootNav.Screen name="MyDrawer" component={MyDrawer} />
          <RootNav.Screen
            name="WalkThroughScreen"
            component={WalkThroughScreen}
          />
          <RootNav.Screen name="Start" component={Start} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          {/* <RootNav.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
          /> */}
          <RootNav.Screen name="Profile" component={Profile} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="PaymentScreen" component={PaymentScreen} />
          <RootNav.Screen name="MessagesScreen" component={MessagesScreen} />
          <RootNav.Screen name="PaymentHistory" component={PaymentHistory} />
          <RootNav.Screen name="VerifyEmail" component={VerifyEmail} />
          <RootNav.Screen
            name="BoardingPointScreen"
            component={BoardingPointScreen}
          />
          <RootNav.Screen
            name="RideBookingScreen2"
            component={RideBookingScreen2}
          />
          <RootNav.Screen
            name="RideBookingScreen"
            component={RideBookingScreen}
          />
          <RootNav.Screen
            name="BoardingPointSearchScreen"
            component={BoardingPointSearchScreen}
          />
          <RootNav.Screen name="RideAcceptance" component={RideAcceptance} />
          <RootNav.Screen
            name="BoardingPointDetails"
            component={BoardingPointDetails}
          />
          <RootNav.Screen
            name="TaxiAvailability"
            component={TaxiAvailability}
          />
          <RootNav.Screen name="EditProfile" component={EditProfile} />
          <RootNav.Screen name="MyTrips" component={MyTrips} />
          <RootNav.Screen name="BookingRequest" component={BookingRequest} />
          <RootNav.Screen name="CencalTexi" component={CencalTexi} />
          <RootNav.Screen name="Notifications" component={Notifications} />
          <RootNav.Screen name="WaitingScreen" component={WaitingScreen} />
          <RootNav.Screen
            name="TrackingScreen"
            component={TrackingScreen}
            options={{ unmountOnBlur: false }}
          />
          <RootNav.Screen name="CabTracking" component={CabTracking} />
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const TabNavigation = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      // tabBar={(props) => {
      //   return (
      //     <LinearGradient
      //       colors={['red', 'blue']}

      //       start={[1, 0]}
      //       end={[0, 0]}
      //     >
      //       <BottomTabBar
      //         {...props}
      //         style={{ backgroundColor: 'transparent' }}
      //       />
      //     </LinearGradient>
      //   );
      // }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // backgroundColor:'pink',
          // backgroundColor: Color.red,
          // borderTopLeftRadius:15,
          // borderTopRightRadius:15,
          // paddingVertical:5
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let color = Color.theme2;
          let size = moderateScale(20, 0.3);
          let type = Ionicons;
          // if (route.name === 'HomeScreen') {
          //   iconName = focused ? 'home' : 'home-outline';
          //   color = focused ? Color.theme2 : Color.white;
          //   size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          // } else
          if (route.name === 'Donation') {
            iconName = focused ? 'donate' : 'donate';
            type = FontAwesome5;
            color = focused ? Color.theme2 : Color.white;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'StoreScreen') {
            iconName = focused ? 'cart' : 'cart';
            color = focused ? Color.theme2 : Color.white;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route?.name == 'Campaigns') {
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else {
            iconName = focused ? 'settings-sharp' : 'settings-outline';
            color = focused ? Color.theme2 : Color.white;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          }
          return route.name == 'Campaigns' ? (
            <View
              style={{
                borderWidth: 5,
                borderColor: Color.lightGrey,
                height: moderateScale(60, 0.3),
                width: moderateScale(60, 0.3),
                borderRadius: moderateScale(30, 0.3),
                backgroundColor: Color.theme2,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: moderateScale(-30, 0.3),
              }}>
              <Icon
                name={'search'}
                as={Feather}
                color={Color.white}
                size={size}
              />
            </View>
          ) : (
            <Icon name={iconName} as={type} color={color} size={size} />
          );
        },
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <View style={{ flex: 1 }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={Color.tabBarGradient}
              style={{ height: windowHeight * 0.1 }}
            />
          </View>
        ),
      })}>
      {/* <Tabs.Screen name={'HomeScreen'} component={HomeScreen} /> */}
      {/* <Tabs.Screen name={'Donation'} component={Donation} />
      <Tabs.Screen name={'Campaigns'} component={Campaigns} />
      {/* <Tabs.Screen name={'BibleCategories'} component={BibleCategories} /> */}
      {/* <Tabs.Screen name={'StoreScreen'} component={StoreScreen} /> */}
      <Tabs.Screen name={'Settings'} component={Settings} />
    </Tabs.Navigator>
  );
};

export const MyDrawer = () => {
  const DrawerNavigation = createDrawerNavigator();
  const { user_type } = useSelector(state => state.authReducer);
  console.log("🚀 ~ MyDrawer ~ user_type:", user_type)
  const firstScreen = user_type === 'Rider' ? 'DashBoard' : 'HomeScreen';

  return (
    <>
      <DrawerNavigation.Navigator
        drawerContent={props => <Drawer {...props} />}
        initialRouteName={firstScreen}
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: '80%' },
        }}>
        <DrawerNavigation.Screen
          name={user_type === 'Rider' ? 'DashBoard' : 'HomeScreen'}
          component={user_type === 'Rider' ? DashBoard : HomeScreen}
        />
        <DrawerNavigation.Screen
          name="PaymentHistory"
          component={PaymentHistory}
        />
        <DrawerNavigation.Screen
          name="PaymentScreen"
          component={PaymentScreen}
        />

        <DrawerNavigation.Screen
          name="BoardingPointSearchScreen"
          component={BoardingPointSearchScreen}
        />
        <DrawerNavigation.Screen
          name="BoardingPointScreen"
          component={BoardingPointScreen}
        />
        <DrawerNavigation.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
        />
        <DrawerNavigation.Screen name="Help" component={Help} />
        <DrawerNavigation.Screen name="MyWallet" component={MyWallet} />
        <DrawerNavigation.Screen name="MyJourneys" component={MyJourneys} />
      </DrawerNavigation.Navigator>
    </>
  );
};

export default AppNavigator;
