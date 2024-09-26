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
import LottieView from 'lottie-react-native';
import RippleEffect from '../Components/RippleEffect';
import {position} from 'native-base/lib/typescript/theme/styled-system';
import {moderateScale} from 'react-native-size-matters';

const WaitingScreen = ({route}) => {
  const {data} = route.params;
  console.log('WaitingScreen', data);
  const navigation = useNavigation();
  const userData = useSelector(state => state.commonReducer?.userData);
  console.log('🚀 ~ WaitingScreen ~ userData:', userData);
  const GOOGLE_MAPS_API_KEY = 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM';
  const mapRef = useRef(null);
  const circleCenter = {latitude: 24.8607333, longitude: 67.001135};

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setNativeProps({
        scrollEnabled: false,
        zoomEnabled: false,
        rotateEnabled: false,
        pitchEnabled: false,
      });
    }
  }, []);

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
        title={'Hello  ' + userData?.name}
        textstyle={{color: Color.black, fontSize: moderateScale(22, 0.6)}}
        headerColor={['white', 'white']}
        hideUser={true}
        navigation={navigation}
        showBack
        username={userData?.name}
      />
      <MapView
        initialRegion={{
          latitude: data?.currentLocationLatitude?.latitude,
          longitude: data?.currentLocationLatitude?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        style={styles.map}>
        <Marker title="You are Here" coordinate={origin} />
        <Circle
          center={circleCenter}
          radius={15000}
          strokeWidth={2}
          strokeColor={'red'}
          fillColor={'rgba(51, 170, 51, .2)'}
          zIndex={1}
        />
      </MapView>
      <RippleEffect style={{top: -40}} />
      <View
        style={{
          backgroundColor: Color.white,
          width: windowWidth * 0.9,
          height: windowHeight * 0.25,
          marginBottom: moderateScale(20, 0.6),
          borderRadius: moderateScale(20, 0.6),
        }}>
        <View
          style={{
            width: moderateScale(100, 0.6),
            height: moderateScale(100, 0.6),
          }}>
          <LottieView
            autoPlay
            loop
            style={{
              height: '100%',
              width: '1000%',
              alignItems: 'center',
              alignSelf: 'center',
            }}
            source={require('../Assets/animations/not_found.json')}
          />
        </View>
      </View>
    </View>
  );
};

export default WaitingScreen;

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
});
