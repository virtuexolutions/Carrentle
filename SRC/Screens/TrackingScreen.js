import Geolocation from '@react-native-community/geolocation';
import { Link, useIsFocused, useNavigation } from '@react-navigation/native';
import haversineDistance from 'haversine-distance';
import LottieView from 'lottie-react-native';
import { Icon } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  AppState,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import BackgroundService from 'react-native-background-actions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Rating } from 'react-native-ratings';
import { moderateScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import Loader from '../Components/Loader';
import { baseUrl } from '../Config';
import navigationService from '../navigationService';
import { setRideStart } from '../Store/slices/common';
import { setUserEventData } from '../Store/slices/socket';
import { customMapStyle } from '../Utillity/mapstyle';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

const TrackingScreen = ({ route }) => {
  const focused = useIsFocused();
  const {data, rider_data, description, ride_id} = route.params;
  console.log('🚀 ~ TrackingScreen ~ data:', data);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentPossitionRef = useRef(currentPossition);
  const timeRef = useRef(time);
  const mapRef = useRef(null);
  const userData = useSelector(state => state.commonReducer?.userData);
  const token = useSelector(state => state.authReducer.token);
  const user_type = useSelector(state => state.authReducer.user_type);
  const [currentPossition, setCurrentPossition] = useState({});
  console.log('🚀 ~ TrackingScreen ~ currentPossition:', currentPossition);
  const [time, setTime] = useState(15);
  const [startRide, setStartRide] = useState(false);
  const [RiderRideComplete, setRiderRideComplete] = useState(false);
  const [showCancelRide, setshowCancelRide] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(true);
  const [startNavigation, setStartNavigation] = useState(false);
  const [startWaiting, setStartWaiting] = useState(false);
  const userEventData = useSelector(state => state.socketReducer.userEventData);
  const currentRideId = useSelector(state => state.commonReducer.currentRideId);
  console.log('🚀 ~ DashBoard ~ currentRideId:', currentRideId);

  const latitude = parseFloat(currentPossition?.latitude) || 0;
  const longitude = parseFloat(currentPossition?.longitude) || 0;

  const [isRiderHere, setIsRiderHere] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [cancelride, setcancelRide] = useState(false);
  const [origin, setOrigin] = useState({
    latitude: latitude,
    longitude: longitude,
  });
  const channelRef = useRef(null);
  const [destinations, setDestination] = useState({
    latitude: parseFloat(data?.pickup_location_lat),
    longitude: parseFloat(data?.pickup_location_lng),
  });
  console.log('🚀 ~ TrackingScreen ~ destinations:', destinations);
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
    currentPossitionRef.current = currentPossition;
  }, [currentPossition]);

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  setTimeout(() => {
    setshowCancelRide(false);
  }, 5 * 60 * 1000);

  const updateStatus = async status => {
    const body = {
      lat: currentPossition?.latitude,
      lng: currentPossition?.longitude,
      status: status,
    };
    const url = `auth/rider/ride_update/${data?.id}`;
    console.log('bodyyyyyyyy', body, url);
    const response = await Post(url, body, apiHeader(token));
    console.log('🚀 ~ updateStatus ~ response:', response);
  };

  useEffect(() => {
    getCurrentLocation();
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentPossition(prevLocation => ({
          ...prevLocation,
          latitude,
          longitude,
        }));
        const isLocationClose = (lat1, lon1, lat2, lon2, threshold = 0.0001) =>
          Math.abs(lat1 - lat2) < threshold &&
          Math.abs(lon1 - lon2) < threshold;
        if (
          isLocationClose(
            latitude,
            origin.latitude,
            longitude,
            origin.longitude,
          )
        ) {
          setIsRiderHere(true);
        }
      },
      error => console.log('Error getting location:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 1000,
      },
    );

    const initialTime = calculateTravelTime();

    const interval = setInterval(() => {
      {
        startRide === true &&
          setTime(prevTime => {
            return prevTime > 5 ? prevTime - 5 : 0;
          });
      }
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
      setCurrentPossition(position);
      const latitude = data?.pickup_location_lat
      const longitude = data?.pickup_location_lng
      const isLocationClose = (lat1, lon1, lat2, lon2, threshold = 0.0001) =>
        Math.abs(lat1 - lat2) < threshold &&
        Math.abs(lon1 - lon2) < threshold;
      console.log("🚀 ~ getCurrentLocation ~ isLocationClose:", isLocationClose(
        latitude,
        origin.latitude,
        position?.longitude,
        longitude,
      ))
      console.log("🚀 ~ getCurrentLocation ~ latitude:", latitude, longitude)
      console.log("🚀 ~ getCurrentLocation ~ origin.latitude:", origin.latitude, origin.longitude)

      if (
        isLocationClose(
          latitude,
          origin.latitude,
          longitude,
          origin.longitude,
        )
      ) {
        setIsRiderHere(true);
      }
      return position;
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  };

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

  const handleStartRide = () => {
    setRideStart(true);
    setStartRide(false);
    setRiderRideComplete(false);
    setDestination({
      latitude: parseFloat(data?.dropoff_location_lat),
      longitude: parseFloat(data?.dropoff_location_lng),
    });
  };

  useEffect(() => {
    setStartTime(new Date());
    dispatch(setUserEventData({}));
  }, []);

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
            onPress: navigationService.navigate('CencalTexi', { id: data?.id }),
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
            onPress: navigationService.navigate('CencalTexi', { id: data?.id }),
            style: 'Ok',
          },
        ],
      );
    }
  };

  const onPressStartNavigation = async () => {
    updateStatus('OnGoing');
    setStartNavigation(true);
    const pickup = {
      latitude: parseFloat(data?.pickup_location_lat),
      longitude: parseFloat(data?.pickup_location_lng),
    };
    const dropoff = {
      latitude: parseFloat(data?.dropoff_location_lat),
      longitude: parseFloat(data?.dropoff_location_lng),
    };
    // const url = `https://www.google.com/maps/dir/?api=1&origin=${pickup?.latitude},${pickup?.longitude}&destination=${dropoff?.latitude},${dropoff?.longitude}&travelmode=driving`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${pickup?.latitude},${pickup?.longitude}&destination=${dropoff?.latitude},${dropoff?.longitude}&travelmode=driving&waypoints=24.8138,67.0325|24.7471,67.9235`
    // Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };
  const onPressEndRide = () => {
    updateStatus('Completed');
  };

  return (
    <>
      <View style={styles.container}>
        <Header
          index
          title={'Hello  ' + userData?.name}
          textstyle={{ color: Color.black, fontSize: moderateScale(22, 0.6) }}
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
              latitude: parseFloat(currentPossition?.latitude) || 0,
              longitude: parseFloat(currentPossition?.longitude) || 0,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0521,
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
            {description?.stop && (
              <>
                {description?.stop.map((stop, index) => (
                  <Marker
                    key={index}
                    coordinate={{ latitude: stop.lat, longitude: stop.lng }}
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
                      style={{ width: '100%', height: '100%' }}
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
              height:
                startRide != true ? windowHeight * 0.42 : windowHeight * 0.35,
            },
          ]}>
          {/* <View style={styles.image_view}>
            <CustomImage
              source={
                {
                  uri: baseUrl + rider_data?.photo,
                } || require('../Assets/Images/no_user_image.png')
              }
              style={{
                width: '100%',
                height: '100%',
                borderRadius: windowWidth,
              }}
            />
          </View> */}
          <View style={{top: moderateScale(-1, 0.6)}}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(20, 0.6),
                textAlign: 'center',
              }}>
              {data?.user?.name}
            </CustomText>
            {user_type === 'Customer' && (
              <Rating
                ratingCount={description?.rider?.rating}
                imageSize={20}
                style={{ marginTop: moderateScale(10, 0.6) }}
                selectedColor="red"
                unSelectedColor="blue"
                ratingContainerStyle={{ backgroundColor: 'red' }}
                isDisabled={true}
              />
            )}
            <View style={[styles.btn_view]}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${rider_data?.phone}`);
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
            <View style={styles.text_view2}>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="map-pin" as={Feather} color={Color.orange} />
                  <CustomText
                    isBold={true}
                    style={{
                      fontSize: 13,
                      paddingHorizontal: moderateScale(5, 0.6),
                    }}>
                    pickupLocatoion
                  </CustomText>
                  <CustomText
                    isBold
                    style={[
                      styles.text1,
                      {
                        position: 'absolute',
                        color: 'black',
                        paddingVertical: moderateScale(10, 0.6),
                        top: 11,
                        // marginLeft: moderateScale(-3, 0.6),
                        transform: [{ rotate: '-90deg' }],
                      },
                    ]}>
                    - - -
                  </CustomText>
                </View>
                <CustomText
                  numberOfLines={1}
                  style={{
                    fontSize: 10,
                    width: windowWidth * 0.4,
                    marginLeft: moderateScale(18, 0.6),
                  }}>
                  {data?.location_from}
                </CustomText>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: moderateScale(7, 0.6),
                  }}>
                  <Icon name="map-pin" as={Feather} color={Color.cartheme} />
                  <CustomText
                    isBold={true}
                    style={{
                      fontSize: 13,
                      paddingHorizontal: moderateScale(5, 0.6),
                    }}>
                    drop off location
                  </CustomText>
                </View>
                <CustomText
                  numberOfLines={1}
                  style={{
                    fontSize: 10,
                    width: windowWidth * 0.4,
                    marginLeft: moderateScale(18, 0.6),
                  }}>
                  {data?.location_to}
                </CustomText>
              </View>
            </View>
            {startRide != true && (
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
            )}
            {startRide != true ? (
              <View>
                <CustomButton
                  textColor={Color.white}
                  text={'Start Navigate to pickup'}
                  width={windowWidth * 0.8}
                  height={windowHeight * 0.06}
                  bgColor={Color.cartheme}
                  borderColor={Color.white}
                  borderWidth={1}
                  marginTop={moderateScale(6, 0.6)}
                  borderRadius={moderateScale(30, 0.3)}
                  isGradient
                  onPress={() => {
                    const url = `https://www.google.com/maps/dir/?api=1&origin=${currentPossition?.latitude},${currentPossition?.longitude}&destination=${destinations?.latitude},${destinations?.longitude}&travelmode=driving`;
                    Linking.openURL(url).catch(err =>
                      console.error('An error occurred', err),
                    );
                    setStartRide(true);
                    updateStatus('OnTheWay');
                  }}
                />
              </View>
            ) : (
              <View>
                {startWaiting != true ? (
                  <CustomButton
                    textColor={Color.white}
                    text={'Start Waiting'}
                    width={windowWidth * 0.8}
                    height={windowHeight * 0.06}
                    bgColor={Color.cartheme}
                    borderColor={Color.white}
                    borderWidth={1}
                    marginTop={moderateScale(6, 0.6)}
                    borderRadius={moderateScale(30, 0.3)}
                    isGradient
                    onPress={() => {
                      setStartWaiting(true);
                      updateStatus('Arrived');
                    }}
                  />
                ) : (
                  <>
                    {startNavigation != true ? (
                      <CustomButton
                        textColor={Color.white}
                        text={'Start Ride'}
                        width={windowWidth * 0.8}
                        height={windowHeight * 0.06}
                        bgColor={Color.cartheme}
                        borderColor={Color.white}
                        borderWidth={1}
                        marginTop={moderateScale(6, 0.6)}
                        borderRadius={moderateScale(30, 0.3)}
                        isGradient
                        onPress={() => {
                          onPressStartNavigation();
                        }}
                      />
                    ) : (
                      <CustomButton
                        textColor={Color.white}
                        text={'End Ride'}
                        width={windowWidth * 0.8}
                        height={windowHeight * 0.06}
                        bgColor={Color.cartheme}
                        borderColor={Color.white}
                        borderWidth={1}
                        marginTop={moderateScale(12, 0.6)}
                        borderRadius={moderateScale(30, 0.3)}
                        isGradient
                        onPress={() => {
                          onPressEndRide();
                        }}
                      />
                    )}
                  </>
                )}
              </View>
            )}
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
                textAlign: 'center',
                padding: moderateScale(12, 0.6),
                fontSize: moderateScale(15, 0.6),
              }}>
              Please Wait for the user untill they arrived to cab
            </CustomText>
            <CustomButton
              text={'Start Ride'}
              textColor={Color.white}
              borderWidth={2}
              borderColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.6}
              height={windowHeight * 0.05}
              marginTop={moderateScale(10, 0.3)}
              bgColor={Color.cartheme}
              isBold
              isGradient
              textTransform={'capitalize'}
              onPress={() => {
                const url = `https://www.google.com/maps/dir/?api=1&origin=${origin?.latitude},${origin?.longitude}&destination=${origin?.latitude},${origin?.longitude}&travelmode=driving`;
                Linking.openURL(url).catch(err =>
                  console.error('An error occurred', err),
                );
              }}
            />
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
                style={{ width: '100%', height: '100%' }}
                source={require('../Assets/Images/sad_face.png')}
              />
            </View>
            <CustomText
              isBold
              style={{ fontSize: moderateScale(18, 0.6), textAlign: 'center' }}>
              {user_type === 'Rider' ? 'User ' : 'Rider ' + 'Cancel the Rider'}
            </CustomText>
            <CustomText
              isBold
              style={{ fontSize: moderateScale(15, 0.6), textAlign: 'center' }}>
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
