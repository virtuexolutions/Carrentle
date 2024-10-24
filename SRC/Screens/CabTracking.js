import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {windowHeight, windowWidth} from '../Utillity/utils';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {customMapStyle} from '../Utillity/mapstyle';
import Geolocation from '@react-native-community/geolocation';
import LottieView from 'lottie-react-native';
import Loader from '../Components/Loader';
import MapViewDirections from 'react-native-maps-directions';

const CabTracking = ({navigation, route}) => {
  const data = route.params;
  const userData = useSelector(state => state.commonReducer?.userData);
  const mapRef = useRef();
  const [currentPossition, setCurrentPossition] = useState({});
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ CabTracking ~ token:', token);

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
      setCurrentPossition(position);
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  };

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

  const origin = {
    latitude: parseFloat(currentPossition?.latitude),
    longitude: parseFloat(currentPossition?.longitude),
  };

  const destinations = {
    latitude: parseFloat(data?.dropoff_location_lat),
    longitude: parseFloat(data?.dropoff_location_lng),
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
      {/* {Object.keys(currentPossition).length > 0 ? () : ()} */}
      {Object.keys(currentPossition).length > 0 ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: currentPossition?.latitude,
            longitude: currentPossition?.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          customMapStyle={customMapStyle}
          provider={PROVIDER_GOOGLE}>
          <Marker coordinate={currentPossition}>
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
                source={require('../Assets/animations/location_pin_amination.json')}
              />
            </View>
          </Marker>
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
          <Marker coordinate={currentPossition}>
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
        </MapView>
      ) : (
        <Loader />
      )}
    </View>
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
});
