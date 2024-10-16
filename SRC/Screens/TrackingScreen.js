import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import LottieView from 'lottie-react-native';
import {moderateScale} from 'react-native-size-matters';
import Geolocation from '@react-native-community/geolocation';
import Loader from '../Components/Loader';
import MapViewDirections from 'react-native-maps-directions';
import {customMapStyle} from '../Utillity/mapstyle';
import haversineDistance from 'haversine-distance';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {baseUrl} from '../Config';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const TrackingScreen = ({route}) => {
  const {data} = route.params;
  console.log('🚀 ~ TrackingScreen ~ data:', data);
  const navigation = useNavigation();
  const userData = useSelector(state => state.commonReducer?.userData);
  const mapRef = useRef(null);
  const circleCenter = {latitude: 24.8607333, longitude: 67.001135};
  const [currentPossition, setcurrentPossition] = useState({});
  console.log('🚀 ~ TrackingScreen ~ currentPossition:', currentPossition);
  const [time, setTime] = useState(0);
  console.log('🚀 ~ TrackingScreen ~ time:', time);

  useEffect(() => {
    getCurrentLocation();
    calculateTravelTime();
  }, []);

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
    lat: 41.0391283,
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
    latitude: parseFloat(currentPossition?.latitude),
    longitude: parseFloat(currentPossition?.longitude),
  };

  const destinations = {
    latitude: parseFloat(rider?.lat),
    longitude: parseFloat(rider?.lng),
  };

  const calculateTravelTime = () => {
    const averageSpeed = 60;
    const distance = haversineDistance(origin, destinations);
    const timeInSeconds = distance / (averageSpeed / 3.6);
    const timeInMinutes = Math.round(timeInSeconds / 60);
    setTime(timeInMinutes);
    return timeInMinutes;
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
        // &&
        // data?.pickup_location_lat &&
        // data?.pickup_location_lng
        <MapView
          customMapStyle={customMapStyle}
          initialRegion={{
            latitude: currentPossition?.latitude,
            longitude: currentPossition?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0221,
          }}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={styles.map}>
          <Marker coordinate={currentPossition} title="Your Are Here Now">
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
            }}
            title="Drop-off Location"
            pinColor="green"
          />
        </MapView>
      ) : (
        <Loader />
      )}
      {time != 0 && (
        <View style={styles.card_main_view}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(20, 0.6),
              textAlign: 'center',
              width: windowWidth * 0.9,
              color: Color.darkBlue,
            }}>
            Your Cab is Here In Just
          </CustomText>
          {/* <View style={styles.header_view}>
            <View style={styles.image_view}>
              <CustomImage
                source={{uri: baseUrl + rider?.photo}}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: windowWidth,
                }}
              />
            </View>
          </View> */}
        </View>
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
    height: windowHeight * 0.3,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    borderRadius: moderateScale(40, 0.6),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: Color.white,
  },
  header_view: {},
});
