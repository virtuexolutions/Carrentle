import {StyleSheet, Animated, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MapView, {Circle, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {isValidCoordinate} from 'geolib';

const WaitingScreen = ({route}) => {
  const {data} = route.params;
  console.log('WaitingScreen', data);
  const navigation = useNavigation();
  const user = useSelector(state => state.authReducer.user);
  const GOOGLE_MAPS_API_KEY = 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM';
  const mapRef = useRef(null);
  const circleCenter = {latitude: 24.8607333, longitude: 67.001135};
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    startAnimation();
  }, [scaleValue]);

  const origin = {
    latitude:
      data?.currentLocationLatitude?.latitude ||
      Number(data?.pickupLocation?.lat),
    longitude:
      data?.currentLocationLatitude?.longitude ||
      Number(data?.pickupLocation?.lng),
  };
  const destinations = {
    latitude: data?.dropOffLocation?.lat || null,
    longitude: data?.dropOffLocation?.lng || null,
  };
  return (
    <View style={styles.container}>
      <Header
        index
        title={'Hello'}
        textstyle={{color: Color.darkGray}}
        headerColor={['white', 'white']}
        hideUser={true}
        navigation={navigation}
        showBack
      />
      <MapView
        initialRegion={{
          latitude: data?.currentLocationLatitude?.latitude,
          longitude: data?.currentLocationLatitude?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{scale: scaleValue}],
            },
          ]}
        />
        {/* Inner circle or car icon (You can add an actual car icon here) */}
        <View style={styles.innerCircle}>
          <View style={styles.icon} />
        </View>
        <Marker
          coordinate={data?.currentLocationLatitude}
          title="Your Are Here Now"
        />
        <Circle
          center={circleCenter}
          radius={15000}
          strokeWidth={2}
          strokeColor={'red'}
          fillColor={'rgba(51, 170, 51, .2)'}
          zIndex={1}
        />

        {/* {Object.keys(data?.pickupLocation).length > 0 &&
        Object.keys(data?.dropOffLocation).length > 0 ? (
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
        ) : null}
        {Object.keys(data?.dropOffLocation).length > 0 &&
          isValidCoordinate(data?.dropOffLocation) && (
            <Marker
              coordinate={{
                latitude: data?.dropOffLocation?.lat,
                longitude: data?.dropOffLocation?.lng,
              }}
              title="Drop-off Location"
              pinColor="green"
            />
          )} */}
      </MapView>
    </View>
  );
};

export default WaitingScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: windowHeight,
    width: windowWidth,
    // justifyContent: 'flex-end',
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
});
