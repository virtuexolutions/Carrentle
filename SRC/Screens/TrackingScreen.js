import Geolocation from '@react-native-community/geolocation';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import haversineDistance from 'haversine-distance';
import LottieView from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import Loader from '../Components/Loader';
import {customMapStyle} from '../Utillity/mapstyle';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import {Rating} from 'react-native-ratings';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../Components/CustomButton';
import BackgroundJob from 'react-native-background-actions';
import {Post} from '../Axios/AxiosInterceptorFunction';
import database from '@react-native-firebase/database';

const TrackingScreen = ({route}) => {
  const focused = useIsFocused();
  const {data} = route.params;
  console.log('🚀 ~ TrackingScreen ~ data:', data);
  const navigation = useNavigation();
  const userData = useSelector(state => state.commonReducer?.userData);
  const token = useSelector(state => state.authReducer.token);
  const user_type = useSelector(state => state.authReducer.user_type);
  console.log('🚀 ~ TrackingScreen ~ user_type:', user_type);
  const mapRef = useRef(null);
  const circleCenter = {latitude: 24.8607333, longitude: 67.001135};
  const [currentPossition, setcurrentPossition] = useState({});
  const [time, setTime] = useState(0);
  const [startRide, setStartRide] = useState(false);

  let playing = BackgroundJob.isRunning();

  useEffect(() => {
    getCurrentLocation();
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setcurrentPossition(prevLocation => ({
          ...prevLocation,
          latitude,
          longitude,
        }));
        database()
          .ref(`/locations/${data?.rider?.id}`)
          .update({
            latitude: longitude,
            longitude: latitude,
            type: 'riderTracking',
          })
          .then(() => console.log('Location updated in Firebase!'));
      },
      error => console.log('errrorrrssrrrrrrrrrrrrrddrrrrrrrrrrrrrrrrr', error),
      {enableHighAccuracy: true, distanceFilter: 1, interval: 1000},
    );

    if (mapRef.current && currentPossition) {
      mapRef.current.animateToRegion(
        {
          latitude: currentPossition.latitude,
          longitude: currentPossition.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }

    const initialTime = calculateTravelTime();

    const interval = setInterval(() => {
      setTime(prevTime => {
        return prevTime > 5 ? prevTime - 5 : 0;
      });
    }, 300000);
    return () => {
      Geolocation.clearWatch(watchId);
      clearInterval(interval);
    };
  }, [focused]);

  useEffect(() => {
    if (
      mapRef.current &&
      data?.pickup_location_lat &&
      data?.pickup_location_lng
    ) {
      mapRef.current.animateToRegion(
        {
          latitude: data.pickup_location_lat,
          longitude: data.pickup_location_lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }
  }, [data]);

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

  const rider = {
    pickup_location_lat: 41.3909433,
    pickup_location_lng: -83.6683767,
    assign: 0,
    created_at: '2024-09-16T14:53:49.000000Z',
    dob: null,
    email: 'rider@gmail.com',
    email_verified_at: '2024-09-16T14:53:49.000000Z',
    gender: null,
    id: 13,
    lat: 41.37500344681967,
    lng: -83.6502309,
    name: 'rider',
    phone: 13458793566,
    photo: '/uploads/user/profiles/',
    pm_last_four: null,
    pm_type: null,
    role: 'rider',
    status: 'active',
    stripe_id: null,
    trial_ends_at: null,
    updated_at: '2024-10-16T11:16:47.000000Z',
  };

  const origin = {
    latitude:
      user_type === 'Rider'
        ? parseFloat(data?.rider?.lat)
        : parseFloat(data?.pickup_location_lat),
    longitude:
      user_type === 'Rider'
        ? parseFloat(data?.rider?.lng)
        : parseFloat(data?.pickup_location_lng),
  };

  console.log('🚀 ~ TrackingScreen ~ origin:', origin);

  const destinations = {
    latitude:
      user_type === 'Rider'
        ? parseFloat(data?.pickup_location_lat)
        : parseFloat(data?.rider?.lat),
    longitude:
      user_type === 'Rider'
        ? parseFloat(data?.pickup_location_lng)
        : parseFloat(data?.rider?.lng),
  };
  console.log('🚀 ~ TrackingScreen ~ destinations:', destinations);

  const calculateTravelTime = () => {
    const averageSpeed = 70;
    const distance = haversineDistance(origin, destinations);
    const timeInSeconds = distance / (averageSpeed / 3.6);
    let timeInMinutes = Math.round(timeInSeconds / 60);
    if (timeInMinutes % 5 !== 0) {
      timeInMinutes = Math.ceil(timeInMinutes / 5) * 5;
    }
    setTime(timeInMinutes);
    return timeInMinutes;
  };

  // const onPressCancel = async () => {
  //   const body = {
  //     lat: currentPossition?.latitude,
  //     lng: currentPossition?.longitude,
  //     status: 'reject',
  //   };
  //   console.log(body, 'shdad');
  //   const url = `auth/rider/ride_update/${latestRide?.id}`;
  //   const response = await Post(url, body, apiHeader(token));
  //   console.log('🚀 ~ onpressAccept ~ response:', response?.data);
  //   if (response?.data?.ride_info?.status === 'accept') {
  //     Alert.alert(
  //       'Sorry',
  //       'Ride is Accepted , but We are Currently working on it',
  //     );
  //   }
  //   {
  //     console.log('RejectRide');
  //     setModalVisible(false);
  //     setHasShownModal(true);
  //   }
  // };

  // const trackLocationAndTime = async taskData => {
  //   const {delay} = taskData;
  //   await new Promise(async resolve => {
  //     while (BackgroundJob.isRunning()) {
  //       getCurrentLocation();
  //       calculateTravelTime();
  //       console.log('Current Location:', currentPossition);
  //       console.log('Remaining Time:', time);
  //       await new Promise(r => setTimeout(r, delay)); // Delay between updates
  //     }
  //     resolve();
  //   });
  // };

  // const startBackgroundTask = async () => {
  //   const options = {
  //     taskName: 'Tracking Time and Location',
  //     taskTitle: 'Tracking Your Ride',
  //     taskDesc: 'Updating location and travel time',
  //     taskIcon: {
  //       name: 'ic_launcher',
  //       type: 'mipmap',
  //     },
  //     color: '#ff00ff',
  //     parameters: {
  //       delay: 30000,
  //     },
  //   };

  //   try {
  //     await BackgroundJob.start(trackLocationAndTime, options);
  //   } catch (error) {
  //     console.log('Error starting background task:', error);
  //   }
  // };

  // const stopBackgroundTask = async () => {
  //   await BackgroundJob.stop();
  // };

  // useEffect(() => {
  //   startBackgroundTask();
  //   return () => stopBackgroundTask();
  // }, []);

  const updateLocationInFirebase = (lat, lng) => {
    setStartRide(true);
    database()
      .ref(`/locations/${data?.rider?.id}`)
      .set({
        latitude: currentPossition?.latitude,
        longitude: currentPossition?.latitude,
        type: 'riderTracking',
      })
      .then(() => console.log('Location updated in Firebase!'));
  };

  return (
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
      {Object.keys(currentPossition).length > 0 ? (
        <MapView
          customMapStyle={customMapStyle}
          initialRegion={{
            latitude: currentPossition?.latitude,
            longitude: currentPossition?.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={styles.map}>
          <Marker coordinate={currentPossition}>
            {user_type === 'Rider' ? (
              <View
                style={{
                  width: moderateScale(50, 0.6),
                  height: moderateScale(50, 0.6),
                }}>
                <CustomImage
                  style={{height: '100%', width: '100%'}}
                  source={require('../Assets/Images/car_left.png')}
                />
              </View>
            ) : (
              <View
                style={{
                  width: moderateScale(60, 0.6),
                  height: moderateScale(60, 0.6),
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
                  source={require('../Assets/animations/location_pin.json')}
                />
              </View>
            )}
          </Marker>
          <MapViewDirections
            origin={origin}
            destination={destinations}
            apikey="AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM"
            strokeWidth={5}
            strokeColor={Color.blue}
            mode="DRIVING"
            onStart={params => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`,
              );
            }}
            tappable={true}
          />
          <Marker
            coordinate={{
              latitude: destinations?.latitude,
              longitude: destinations?.longitude,
            }}>
            {user_type === 'Rider' ? (
              <View
                style={{
                  width: moderateScale(60, 0.6),
                  height: moderateScale(60, 0.6),
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
                  source={require('../Assets/animations/location_pin.json')}
                />
              </View>
            ) : (
              <View
                style={{
                  width: moderateScale(50, 0.6),
                  height: moderateScale(50, 0.6),
                }}>
                <CustomImage
                  style={{height: '100%', width: '100%'}}
                  source={require('../Assets/Images/car_left.png')}
                />
              </View>
            )}
          </Marker>
        </MapView>
      ) : (
        <Loader />
      )}
      {user_type === 'Customer' ? (
        <View style={styles.card_main_view}>
          <View style={styles.image_main_view}>
            <View style={styles.image_view}>
              <CustomImage
                source={require('../Assets/Images/dummyUser.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: windowWidth,
                }}
              />
            </View>
          </View>
          <View style={{top: moderateScale(30, 0.6)}}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(20, 0.6),
                textAlign: 'center',
              }}>
              Test User
            </CustomText>
            <Rating
              imageSize={20}
              style={{marginTop: moderateScale(10, 0.6)}}
              selectedColor="red"
              unSelectedColor="blue"
              ratingContainerStyle={{backgroundColor: 'red'}}
            />
            <View style={styles.btn_view}>
              <TouchableOpacity style={styles.btn_sub_view}>
                <Icon
                  name="call"
                  color={Color.darkBlue}
                  as={Ionicons}
                  size={moderateScale(20, 0.6)}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn_sub_view}>
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
                {time != 0 ? (
                  <View style={styles.text_view}>
                    <CustomText
                      isBold
                      style={{fontSize: moderateScale(18, 0.6)}}>
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
                ) : (
                  <CustomText
                    style={{
                      color: Color.darkGray,
                      fontSize: moderateScale(13, 0.6),
                      marginLeft: moderateScale(3, 0.6),
                    }}>
                    any Time
                  </CustomText>
                )}
              </View>
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
                    Ratings
                  </CustomText>
                </View>
              </View>
            </View>
            <CustomButton
              text={'cancel ride'}
              textColor={Color.white}
              width={windowWidth * 0.8}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              bgColor={Color.cartheme}
              borderColor={Color.white}
              borderWidth={1}
              borderRadius={moderateScale(30, 0.3)}
              isGradient
              onPress={() => updateLocationInFirebase()}
            />
          </View>
        </View>
      ) : (
        <>
          {startRide != true && (
            <View style={{position: 'absolute', bottom: 40}}>
              <CustomButton
                text={'Start Ride'}
                textColor={Color.white}
                width={windowWidth * 0.8}
                height={windowHeight * 0.06}
                marginTop={moderateScale(20, 0.3)}
                bgColor={Color.cartheme}
                borderColor={Color.white}
                borderWidth={1}
                borderRadius={moderateScale(30, 0.3)}
                isGradient
                onPress={() => updateLocationInFirebase()}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};
export default TrackingScreen;

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
    height: windowHeight * 0.45,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    borderRadius: moderateScale(40, 0.6),
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
  },
  image_main_view: {
    width: moderateScale(95, 0.6),
    height: moderateScale(100, 0, 6),
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth,
    position: 'absolute',
    top: -50,
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
    marginTop: moderateScale(20, 0.6),
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
});
