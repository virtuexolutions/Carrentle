import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import haversineDistance from 'haversine-distance';
import LottieView from 'lottie-react-native';
import {Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  AppState,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import BackgroundService from 'react-native-background-actions';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {setRideStart} from '../Store/slices/common';
import {baseUrl} from '../Config';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Loader from '../Components/Loader';
import {customMapStyle} from '../Utillity/mapstyle';
import navigationService from '../navigationService';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {getPusherInstance} from '../Store/pusherService';
import {setUserEventData} from '../Store/slices/socket';

const CabTracking = ({route}) => {
  const focused = useIsFocused();
  const {data, ride_id} = route.params;
  console.log('🚀 ~ CabTracking ~ data:', JSON.stringify(data, null, 2));
  // const data = {
  //   amount: 58,
  //   carId: 1,
  //   carInfo: {
  //     createdAt: '2024-09-10T11:13:09.000000Z',
  //     id: 1,
  //     image: '/storage/photos/shares/images.jfif',
  //     model: 22,
  //     name: 'Suzuki',
  //     number: 'khi7854',
  //     price: 13,
  //     seats: 4,
  //     status: 'active',
  //     updatedAt: '2024-09-10T11:21:31.000000Z',
  //   },
  //   createdAt: '2024-12-18T13:32:21.000000Z',
  //   date: null,
  //   distance: '40',
  //   dropoff_location_lat: 41.0391283,
  //   dropoff_location_lng: -83.6502309,
  //   id: 675,
  //   locationFrom: '97XX+WG Bowling Green, OH, USA',
  //   locationTo: 'Findlay, OH, USA',
  //   pickup_location_lat: 41.399865,
  //   pickup_location_lng: -83.7011683,
  //   rider: {
  //     assign: 0,
  //     createdAt: '2024-09-16T14:53:49.000000Z',
  //     deviceToken:
  //       'dlb-U6pZQB-Mzj27cewfG4:APA91bER0L7NoFOQ0aPfTXm9M8nzeG0sAmvJ3FHypUX_ziFUNesLGaK44Voxh1AZYO4pXDqxeu-nwYTVmzI_yze4Qlw7aAJw5T6OqXG-gLuitBPCWaqc6jY',
  //     dob: null,
  //     email: 'rider@gmail.com',
  //     emailVerifiedAt: '2024-09-16T14:53:49.000000Z',
  //     gender: null,
  //     id: 13,
  //     lat: '41.390491666667',
  //     lng: '-83.665243333333',
  //     name: 'rider',
  //     phone: '13458793566',
  //     photo: '/uploads/user/profiles/',
  //     role: 'rider',
  //     status: 'active',
  //     updatedAt: '2024-12-18T11:44:30.000000Z',
  //   },
  //   status: 'accept',
  //   stop: null,
  //   time: null,
  //   updatedAt: '2024-12-18T13:33:00.000000Z',
  //   user: {
  //     assign: 0,
  //     createdAt: '2024-08-30T09:59:05.000000Z',
  //     deviceToken:
  //       'ejaFKtm4Rr6D6kOyaUmn_U:APA91bGsq-92mrAIBgDE7jzI3pqR6aKQHR4QZ3AWywnE_IvsA6CiEOY48T00jNaMkDQ_FIoaKeJdGl2Y8Y_rkjfqOo7TqKAPNhm8WTb_xfc1szrMbvFX5Tw',
  //     dob: null,
  //     email: 'user@gmail.com',
  //     emailVerifiedAt: '2024-08-30T09:59:05.000000Z',
  //     gender: null,
  //     id: 4,
  //     name: 'newuser',
  //     phone: '1234567899',
  //     photo: '/uploads/user/profiles/',
  //     role: 'customer',
  //     status: 'active',
  //     updatedAt: '2024-12-18T11:44:02.000000Z',
  //   },
  //   userId: 4,
  // };

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentPossitionRef = useRef(currentPossition);
  const timeRef = useRef(time);
  const mapRef = useRef(null);
  const userData = useSelector(state => state.commonReducer?.userData);
  const token = useSelector(state => state.authReducer.token);
  const user_type = useSelector(state => state.authReducer.user_type);
  const [currentPossition, setCurrentPossition] = useState({});
  const [time, setTime] = useState(0);
  console.log('🚀 ~ CabTracking ~ time:', time);
  const [startRide, setStartRide] = useState(false);
  const [RiderRideComplete, setRiderRideComplete] = useState(false);
  const [showCancelRide, setshowCancelRide] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(true);
  const userEventData = useSelector(state => state.socketReducer.userEventData);
  const pusher = Pusher.getInstance();
  const [isRiderHere, setIsRiderHere] = useState(false);
  const latitude = parseFloat(data?.rider?.lat) || 0;
  const longitude = parseFloat(data?.pickup_location_lat) || 0;
  const [currentState, setCurrentState] = useState('active');
  const [startTime, setStartTime] = useState(null);
  const [cancelride, setcancelRide] = useState(false);
  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  });
  console.log('🚀 ~ CabTracking ~ origin:', origin);
  const [destinations, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    setOrigin({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
    setDestination({
      latitude: parseFloat(data?.pickup_location_lat),
      longitude: parseFloat(data?.pickup_location_lng),
    });
  }, []);

  useEffect(() => {
    calculateTravelTime();
  }, [origin, destinations]);

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  useEffect(() => {
    dispatch(setUserEventData({}));
    async function connectPusher() {
      try {
        await pusher.init({
          apiKey: '2cbabf5fca8e6316ecfe',
          cluster: 'ap2',
        });
        const channelName = `tracking-${data?.id}`;
        console.log(`Subscribing to channel: ${channelName}`);
        await pusher.connect();
        myChannel = await pusher.subscribe({
          channelName,
          onSubscriptionSucceeded: () => {
            console.log('Successfully subscribed to:', channelName);
          },
          onSubscriptionError: error => {
            console.error('Subscription error:', error);
          },
          onEvent: event => {
            console.log('Event received:', event.data);
            const datastring = JSON.parse(event.data?.message);
            const latitude = datastring?.data?.lat;
            const longitude = datastring?.data?.lng;
            setOrigin({
              latitude: latitude,
              longitude: longitude,
            });
            const isLocationClose = (
              lat1,
              lon1,
              lat2,
              lon2,
              threshold = 0.0001,
            ) =>
              Math.abs(lat1 - lat2) < threshold &&
              Math.abs(lon1 - lon2) < threshold;
            if (
              isLocationClose === false &&
              isLocationClose(
                latitude,
                destinations.latitude,
                longitude,
                destinations.longitude,
              )
            ) {
              setIsRiderHere(true);
            }
          },
        });
        console.log('====================>', pusher.connectionState);
        console.log('Subscription complete for channel:', channelName);
      } catch (error) {
        console.error('Error during Pusher connection:', error);
      }
    }
    if (pusher.connectionState == 'DISCONNECTED') {
      connectPusher();
    }
  }, [focused]);

  setTimeout(() => {
    setshowCancelRide(false);
  }, 5 * 60 * 1000);

  useEffect(() => {
    mapRef.current.animateToRegion(
      {
        latitude: origin?.latitude,
        longitude: origin?.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000,
    );
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
      setCurrentPossition(position);
      return position;
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  };

  const calculateTravelTime = () => {
    const averageSpeed = 60;
    const distance = haversineDistance(origin, destinations);
    const timeInSeconds = distance / (averageSpeed / 3.6);
    let timeInMinutes = Math.round(timeInSeconds / 60);
    console.log('🚀 ~ calculateTravelTime ~ timeInMinutes:', timeInMinutes);
    if (timeInMinutes % 5 !== 0) {
      timeInMinutes = Math.ceil(timeInMinutes / 5) * 5;
    }
    setTime(timeInMinutes);
    return timeInMinutes;
  };

  const trackLocationAndTime = async taskData => {
    const {delay} = taskData;
    while (BackgroundService.isRunning()) {
      try {
        const currentLocation = await getCurrentLocation();
        const travelTime = calculateTravelTime();
        setTime(travelTime);
        // watchPosition();
      } catch (error) {
        console.error('Error in tracking task:', error);
      }
      await new Promise(r => setTimeout(r, delay));
    }
  };

  const _handleAppStateChange = nextAppState => {
    if (
      currentState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
    }
    setCurrentState(nextAppState);
  };

  const options = {
    taskName: 'Tracking Time and Location',
    taskTitle: 'Tracking Your Ride',
    taskDesc: 'Updating location and travel time',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'myapp://CabTracking',
    parameters: {
      delay: 30000,
    },
  };

  BackgroundService.on('expiration', () => {
    console.log('IOS : i am being closed ');
  });

  let playing = BackgroundService.isRunning();

  const sleep = time =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  BackgroundService.on('expiration', () => {
    console.log('IOS : i am being closed ');
  });

  const toggleBackground = async () => {
    if (!playing) {
      try {
        await BackgroundService.start(trackLocationAndTime, options);
        playing = true;
      } catch (error) {
        console.log(error);
      }
    } else {
      await BackgroundService.stop();
      playing = false;
    }
  };

  useEffect(() => {
    if (currentState == 'background') {
      toggleBackground();
    }
  }, [currentState]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    setStartTime(new Date());
    dispatch(setUserEventData({}));
  }, []);

  useEffect(() => {
    const reigion = {
      latitude: origin?.latitude,
      longitude: origin?.longitude,
      latitudeDelta: 0.0522,
      longitudeDelta: 0.0521,
    };
    mapRef.current?.animateToRegion(reigion, 1000);
  }, [origin]);

  const CancelRide = async () => {
    const currentTime = new Date();
    const elapsedMinutes = (currentTime - startTime) / 60000;
    if (elapsedMinutes <= 5) {
      Alert.alert(
        'Ride Cancelled',
        'You cancelled the ride within 5 minutes. No charges applied.',
        [
          {
            text: 'Ok',
            onPress: navigationService.navigate('CencalTexi', {id: data?.id}),
            style: 'Ok',
          },
        ],
        // () => navigationService.navigate('CenCalTaxi', {id: data?.id}),
      );
    } else {
      const cancellationFee = data?.carinfo?.price * 0.1;
      Alert.alert(
        'Ride Cancelled',
        `You cancelled the ride after 5 minutes. A fee of $${cancellationFee.toFixed(
          2,
        )} will be charged.`,
        [
          {
            text: 'Ok',
            onPress: navigationService.navigate('CencalTexi', {id: data?.id}),
            style: 'Ok',
          },
        ],
      );
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Header
          index
          title={'Hello  ' + userData?.name}
          textstyle={{color: Color.black, fontSize: moderateScale(22, 0.6)}}
          headerColor={['white', 'white']}
          hideUser={true}
          navigation={navigation}
          showBack
          username={userData?.name}
        />
        {Object.keys(data).length > 0 ? (
          <MapView
            customMapStyle={customMapStyle}
            initialRegion={{
              latitude: parseFloat(data?.rider?.lat),
              longitude: parseFloat(data?.rider?.lng),
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            style={styles.map}>
            {!isNaN(origin?.latitude) && !isNaN(origin?.longitude) && (
              <Marker coordinate={origin}>
                <View
                  style={{
                    width: moderateScale(60, 0.6),
                    height: moderateScale(60, 0.6),
                  }}>
                  <CustomImage
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={require('../Assets/Images/car_icon.png')}
                  />
                </View>
              </Marker>
            )}
            {data?.stop && (
              <>
                {data?.stop.map((stop, index) => (
                  <Marker
                    key={index}
                    coordinate={{latitude: stop.lat, longitude: stop.lng}}
                    title={`Stop ${index + 1}`}
                    description={
                      stop.name ||
                      `Stop at latitude: ${stop.lat}, longitude: ${stop.lng}`
                    }
                    pinColor="blue"
                  />
                ))}
              </>
            )}
            <MapViewDirections
              origin={origin}
              destination={destinations}
              apikey="AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM"
              strokeWidth={6}
              strokeColor={Color.blue}
              mode="DRIVING"
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              tappable={true}
            />
            {!isNaN(destinations?.latitude) &&
              !isNaN(destinations?.longitude) && (
                <Marker coordinate={destinations}>
                  <View
                    style={{
                      width: moderateScale(50, 0.6),
                      height: moderateScale(50, 0.6),
                    }}>
                    <CustomImage
                      style={{width: '100%', height: '100%'}}
                      source={require('../Assets/Images/destination_icon.png')}
                    />
                  </View>
                </Marker>
              )}
          </MapView>
        ) : (
          <Loader />
        )}
        <View
          style={[
            styles.card_main_view,
            {
              height: windowHeight * 0.37,
            },
          ]}>
          <View style={styles.image_view}>
            <CustomImage
              source={
                {
                  uri: baseUrl + data?.rider?.photo,
                } || require('../Assets/Images/no_user_image.png')
              }
              style={{
                width: '100%',
                height: '100%',
                borderRadius: windowWidth,
              }}
            />
          </View>
          <View style={{top: moderateScale(-1, 0.6)}}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(20, 0.6),
                textAlign: 'center',
              }}>
              {data?.rider?.name || 'Test User'}
            </CustomText>
            <Rating
              ratingCount={data?.rider?.rating}
              imageSize={20}
              style={{marginTop: moderateScale(10, 0.6)}}
              selectedColor="red"
              unSelectedColor="blue"
              ratingContainerStyle={{backgroundColor: 'red'}}
            />
            <View style={[styles.btn_view]}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${data?.rider?.phone}`);
                }}
                style={styles.btn_sub_view}>
                <Icon
                  name="call"
                  color={Color.darkBlue}
                  as={Ionicons}
                  size={moderateScale(20, 0.6)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn_sub_view}
                onPress={() =>
                  navigation.navigate('MessagesScreen', {
                    rider_id: data?.id,
                    data: data,
                  })
                }>
                <Icon
                  name="message"
                  color={Color.darkBlue}
                  as={MaterialIcons}
                  size={moderateScale(20, 0.6)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rating_box_view}>
              <View style={styles.rating_box_inner_view}>
                <Icon
                  name="star"
                  color={Color.darkBlue}
                  as={Ionicons}
                  size={moderateScale(15, 0.6)}
                />
                <View style={styles.text_view}>
                  <CustomText isBold style={{fontSize: moderateScale(18, 0.6)}}>
                    4.7
                  </CustomText>
                  <CustomText
                    style={{
                      color: Color.darkGray,
                      fontSize: moderateScale(13, 0.6),
                      marginLeft: moderateScale(3, 0.6),
                    }}>
                    Stars
                  </CustomText>
                </View>
              </View>
              <View style={styles.rating_box_inner_view}>
                <Icon
                  name="clock"
                  color={Color.darkBlue}
                  as={Entypo}
                  size={moderateScale(15, 0.6)}
                />
                <View style={styles.text_view}>
                  <CustomText isBold style={{fontSize: moderateScale(18, 0.6)}}>
                    {time}
                  </CustomText>
                  <CustomText
                    style={{
                      color: Color.darkGray,
                      fontSize: moderateScale(13, 0.6),
                      marginLeft: moderateScale(3, 0.6),
                    }}>
                    Mins
                  </CustomText>
                </View>
                {/* {time > 0 ? (
                  ) : (
                    <CustomText
                      isBold
                      style={{
                        color: Color.darkGray,
                        fontSize: moderateScale(13, 0.6),
                        // marginLeft: moderateScale(3, 0.6),
                        marginTop: moderateScale(5, 0.6),
                      }}>
                      any Time
                    </CustomText>
                  )} */}
              </View>
              <View style={styles.rating_box_inner_view}>
                <Icon
                  name="currency-usd"
                  color={Color.darkBlue}
                  as={MaterialCommunityIcons}
                  size={moderateScale(15, 0.6)}
                />
                <View style={styles.text_view}>
                  <CustomText isBold style={{fontSize: moderateScale(18, 0.6)}}>
                    {data?.carinfo?.price}
                  </CustomText>
                  <CustomText
                    style={{
                      color: Color.darkGray,
                      fontSize: moderateScale(13, 0.6),
                      marginLeft: moderateScale(3, 0.6),
                    }}>
                    $
                  </CustomText>
                </View>
              </View>
            </View>
            <CustomButton
              text={'cancel ride'}
              textColor={Color.white}
              width={windowWidth * 0.8}
              height={windowHeight * 0.06}
              marginTop={moderateScale(10, 0.3)}
              bgColor={Color.cartheme}
              borderColor={Color.white}
              borderWidth={1}
              borderRadius={moderateScale(30, 0.3)}
              isGradient
              onPress={() => CancelRide()}
            />
          </View>
        </View>
      </View>
      <Modal
        swipeDirection="up"
        transparent
        visible={isRiderHere}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: windowHeight,
            width: windowWidth,
            backgroundColor: 'rgba(0,0,0,0.6)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: windowHeight * 0.3,
              width: windowWidth * 0.9,
              marginBottom: moderateScale(20, 0.6),
              backgroundColor: Color.white,
              borderRadius: moderateScale(20, 0.6),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: windowWidth * 0.7,
                height: windowWidth * 0.45,
              }}>
              <LottieView
                autoPlay
                loop
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
                source={require('../Assets/animations/cab_arrived_animation.json')}
              />
            </View>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(18, 0.6),
              }}>
              Your cab is on your location
            </CustomText>
          </View>
        </View>
      </Modal>
      <Modal
        swipeDirection="up"
        transparent
        visible={cancelride}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: windowHeight,
            width: windowWidth,
            backgroundColor: 'rgba(0,0,0,0.6)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.35,
              backgroundColor: Color.white,
              borderRadius: moderateScale(20, 0.6),
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: moderateScale(12, 0.6),
            }}>
            <View
              style={{
                height: windowHeight * 0.12,
                width: windowWidth * 0.3,
                marginBottom: moderateScale(20, 0.6),
              }}>
              <CustomImage
                style={{width: '100%', height: '100%'}}
                source={require('../Assets/Images/sad_face.png')}
              />
            </View>
            <CustomText
              isBold
              style={{fontSize: moderateScale(18, 0.6), textAlign: 'center'}}>
              {'Rider ' + 'Cancel the Rider'}
            </CustomText>
            <CustomText
              isBold
              style={{fontSize: moderateScale(15, 0.6), textAlign: 'center'}}>
              we're so sad about your cancellation
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                textAlign: 'center',
                color: Color.grey,
              }}>
              we will continue to improve our services & satisfy on the next
              trip
            </CustomText>
            <CustomButton
              text={'go back to Home'}
              textColor={Color.white}
              width={windowWidth * 0.6}
              height={windowHeight * 0.05}
              bgColor={Color.cartheme}
              borderColor={Color.white}
              borderWidth={1}
              marginTop={moderateScale(20, 0.6)}
              borderRadius={moderateScale(30, 0.3)}
              isGradient
              onPress={() => navigationService.navigate('MyDrawer')}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
export default CabTracking;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 150, 136, 0.3)',
    position: 'absolute',
  },
  innerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  rippleContainer: {
    position: 'absolute',
    top: windowHeight / 2 - 150,
    left: windowWidth / 2 - 150,
    zIndex: 2,
    backgroundColor: 'red',
  },
  waiting_main_view: {
    width: windowWidth,
    height: windowHeight * 0.22,
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  waiting_sub_view: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    alignSelf: 'center',
    borderRadius: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(20, 0.7),
    paddingVertical: moderateScale(10, 0.6),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  animation_view: {
    width: moderateScale(100, 0.6),
    height: moderateScale(100, 0.6),
    marginTop: moderateScale(15, 0.6),
  },
  waiting_animation: {
    height: '100%',
    width: '1000%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  card_main_view: {
    width: windowWidth,
    height: windowHeight * 0.5,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    borderTopLeftRadius: moderateScale(40, 0.6),
    borderTopRightRadius: moderateScale(40, 0.6),
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Color.white,
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(20, 0.6),
  },
  image_view: {
    width: moderateScale(80, 0.6),
    height: moderateScale(90, 0, 6),
    borderRadius: windowWidth,
    shadowColor: Color.blue,
    shadowOffset: {
      width: 5,
      height: 6,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: Color.white,
    top: -70,
    position: 'absolute',
  },
  image_main_view: {
    width: moderateScale(95, 0.6),
    height: moderateScale(100, 0, 6),
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth,
  },
  btn_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.25,
    alignSelf: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  btn_sub_view: {
    width: moderateScale(40, 0.6),
    height: moderateScale(40, 0.6),
    backgroundColor: Color.lightBlue,
    borderRadius: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating_box_view: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
    backgroundColor: Color.lightGrey,
    marginTop: moderateScale(10, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: moderateScale(12, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: moderateScale(20, 0.6),
  },
  rating_box_inner_view: {
    width: windowWidth * 0.25,
    height: moderateScale(70, 0),
    justifyContent: 'flex-start',
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(7, 0.6),
  },
  text_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_view2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.7,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  text1: {
    fontSize: moderateScale(9, 0.6),
  },
});
