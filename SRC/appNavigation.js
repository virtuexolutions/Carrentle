import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import navigationService from './navigationService';
import LoginScreen from './Screens/LoginScreen';
import Signup from './Screens/Signup';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import Geolocation from '@react-native-community/geolocation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Icon} from 'native-base';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from './Assets/Utilities/Color';
import {Get, Post} from './Axios/AxiosInterceptorFunction';
import AcceptRideModal from './Components/AcceptRideModal';
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
import {apiHeader, windowHeight} from './Utillity/utils';

const AppNavigator = () => {
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const role = useSelector(state => state.authReducer.role);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  const {user_type} = useSelector(state => state.authReducer);
  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

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
          screenOptions={{headerShown: false}}>
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
            options={{unmountOnBlur: false}}
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
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // backgroundColor:'pink',
          // backgroundColor: Color.red,
          // borderTopLeftRadius:15,
          // borderTopRightRadius:15,
          // paddingVertical:5
        },
        tabBarIcon: ({focused}) => {
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
          <View style={{flex: 1}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={Color.tabBarGradient}
              style={{height: windowHeight * 0.1}}
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
  const {user_type} = useSelector(state => state.authReducer);
  const firstScreen = user_type === 'Rider' ? 'DashBoard' : 'HomeScreen';
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ MyDrawer ~ token:', token);
  const [modalvisible, setModalVisible] = useState(false);
  const [latestRide, setlatestRide] = useState(null);
  console.log('🚀 ~ MyDrawer ~ latestRide:', latestRide);
  const [data, setData] = useState(null);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [currentPossition, setcurrentPossition] = useState({});
  const pusher = Pusher.getInstance();
  let myChannel = null;
  const userData = useSelector(state => state.commonReducer?.userData);
  console.log('🚀 ~ MyDrawer ~ userData:', userData?.id);

  const [status, setstatus] = useState('');

  // useEffect(() => {
  //   if (user_type === 'Rider') {
  //     console.log('pusher chl rha h');
  //     async function connectPusher() {
  //       try {
  //         await pusher.init({
  //           apiKey: '2cbabf5fca8e6316ecfe',
  //           cluster: 'ap2',
  //         });
  //         myChannel = await pusher.subscribe({
  //           channelName: `rider-channel-${userData?.id}`,
  //           onSubscriptionSucceeded: channelName => {
  //             console.log(
  //               `Subscribed to ${JSON.stringify(channelName, null, 2)}`,
  //             );
  //           },
  //           onEvent: event => {
  //             console.log('on event me a rha ha');
  //             console.log('Got channel event:', event.data);
  //             const dataString = JSON.parse(event.data);
  //             if (event.data) {
  //               setlatestRide(dataString?.ride_info);
  //               setModalVisible(true);
  //             }
  //             console.log('🚀 ~ connectPusher ~ dataString:', dataString);
  //           },
  //         });
  //         await pusher.connect();
  //         console.log('hello from pusher');
  //       } catch (e) {
  //         console.log(`ERROR: ${e}`);
  //       }
  //     }
  //     connectPusher();
  //     return async () => {
  //       await pusher.unsubscribe({
  //         channelName: `rider-channel-${userData?.id}`,
  //       });
  //     };
  //   }
  // }, []);

  // useEffect(() => {
  //   if (user_type === 'Rider') {
  //     const interval = setInterval(() => {
  //       if (!hasShownModal) {
  //         getRideHistory();
  //       }
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }
  // }, [hasShownModal]);
  useEffect(() => {
    if (user_type === 'Rider') {
      console.log('Pusher initializing...');
      async function connectPusher() {
        try {
          console.log('trryyyy me aya ha');
          await pusher.init({
            apiKey: '2cbabf5fca8e6316ecfe',
            cluster: 'ap2',
          });
          const channelName = `rider-channel-${userData?.id}`;
          myChannel = await pusher.subscribe({
            channelName,
            onSubscriptionSucceeded: () => {
              console.log(`Subscribed to ${channelName}`);
            },
            onEvent: event => {
              console.log('on event me aya ha');
              console.log('Received event:', event.data);
              try {
                const dataString = JSON.parse(event.data);
                if (dataString) {
                  setlatestRide(dataString?.ride_info);
                  setModalVisible(true);
                }
              } catch (error) {
                console.error('Error parsing event data:', error);
              }
            },
          });

          await pusher.connect();
        } catch (error) {
          console.error('Pusher connection error:', error);
        }
      }
      connectPusher();

      return async () => {
        if (myChannel) {
          try {
            await pusher.unsubscribe({
              channelName: `rider-channel-${userData?.id}`,
            });
          } catch (error) {
            console.error('Error during unsubscription:', error);
          }
        }
      };
    }
  }, []);

  // const getRideHistory = async type => {
  //   const url = `auth/rider/assign-ride`;
  //   const response = await Get(url, token);
  //   console.log('🚀 ~ getRideHistory ~ response:', response?.data);
  //   // if (response?.data?.ride_info != null) {
  //   //   setlatestRide(response?.data?.ride_info);
  //   //   if (hasShownModal != true) {
  //   //     setModalVisible(true);
  //   //     setHasShownModal(true);
  //   //   }
  //   // }
  // };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve(coords);
          },
          error => {
            reject(new Error(error.message));
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      });
      setcurrentPossition(position);
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  };

  const onpressAccept = async currentStatus => {
    const body = {
      lat: currentPossition?.latitude,
      lng: currentPossition?.longitude,
      status: currentStatus,
    };
    const url = `auth/rider/ride_update/${latestRide?.id}`;
    const response = await Post(url, body, apiHeader(token));
    console.log('🚀 ~ onpressAccept ~ response:', response?.data);
    if (response?.data?.ride_info?.status === 'accept') {
      setHasShownModal(true);
      setModalVisible(false);
      setData(response?.data?.ride_info);
      navigationService.navigate('TrackingScreen', {
        data: latestRide,
        rider_data: response?.data?.ride_info?.rider,
        ride_id: response?.data?.ride_info?.id,
      });
    } else {
      setHasShownModal(false);
    }
    {
      console.log('RejectRide');
      setModalVisible(false);
      setHasShownModal(true);
    }
  };

  return (
    <>
      <DrawerNavigation.Navigator
        drawerContent={props => <Drawer {...props} />}
        initialRouteName={firstScreen}
        screenOptions={{
          headerShown: false,
          drawerStyle: {width: '80%'},
        }}>
        <DrawerNavigation.Screen name="DashBoard" component={DashBoard} />
        <DrawerNavigation.Screen name="HomeScreen" component={HomeScreen} />
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
      {modalvisible && (
        <AcceptRideModal
          username={latestRide?.user?.name}
          image={'https://car-rental.cstmpanel.com' + latestRide?.user?.photo}
          pickupLocation={latestRide?.location_to}
          dropoffLocation={latestRide?.location_from}
          distance={latestRide?.distance}
          seats={latestRide?.carinfo?.seats}
          CarNumber={latestRide?.carinfo?.no}
          carName={latestRide?.carinfo?.name}
          price={latestRide?.amount + ' $'}
          visible={modalvisible}
          isRider={true}
          onpressClose={() => setModalVisible(false)}
          onpressSeeLocation={() => {
            navigationService.navigate('WaitingScreen', {
              data: latestRide,
              type: 'fromRequest',
            });
          }}
          location={currentPossition}
          rider_id={latestRide?.id}
          onpressAccept={() => onpressAccept()}
          status={status}
          setstatus={setstatus}
          AcceptRide={() => {
            onpressAccept('accept');
          }}
          RejectRide={() => {
            onpressAccept('reject');
          }}
          // AcceptRide={() => {
          //   console.log('AcceptRide');
          //   setHasShownModal(true);
          //   navigationService.navigate('WaitingScreen', {
          //     data: null,
          //     type: 'fromRequest',
          //   });
          // }}
          // RejectRide={() => {
          //   console.log('RejectRide');

          //   setModalVisible(false);
          //   setHasShownModal(true);
          // }}
        />
      )}
    </>
  );
};

export default AppNavigator;
