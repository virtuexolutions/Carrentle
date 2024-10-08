import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MapView, {Circle, Marker} from 'react-native-maps';
import LottieView from 'lottie-react-native';
import {moderateScale} from 'react-native-size-matters';
import Geolocation from '@react-native-community/geolocation';
import Loader from '../Components/Loader';
import MapViewDirections from 'react-native-maps-directions';
import {isValidCoordinate} from 'geolib';
import {customMapStyle} from '../Utillity/mapstyle';

const TrackingScreen = ({route}) => {
  const {data} = route.params;
  console.log('🚀 ~ TrackingScreen ~ data:', data);
  const navigation = useNavigation();
  const userData = useSelector(state => state.commonReducer?.userData);
  const mapRef = useRef(null);
  const circleCenter = {latitude: 24.8607333, longitude: 67.001135};
  const [currentPossition, setcurrentPossition] = useState({});
  console.log('🚀 ~ TrackingScreen ~ currentPossition:', currentPossition);

  useEffect(() => {
    getCurrentLocation();
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

  const origin = {
    latitude: parseFloat(currentPossition?.latitude),
    longitude: parseFloat(currentPossition?.longitude),
  };

  const destinations = {
    latitude: parseFloat(data?.dropoff_location_lat),
    longitude: parseFloat(data?.dropoff_location_lng),
  };

  console.log('🚀 ~ TrackingScreen ~ destinations:', destinations);

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
      {Object.keys(currentPossition).length > 0 &&
      data?.pickup_location_lat &&
      data?.pickup_location_lng ? (
        <MapView
          customMapStyle={customMapStyle}
          initialRegion={{
            latitude: currentPossition?.latitude,
            longitude: currentPossition?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
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
});
