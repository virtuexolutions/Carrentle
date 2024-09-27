import {
  StyleSheet,
  Animated,
  View,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import CustomText from '../Components/CustomText';
import {Get} from '../Axios/AxiosInterceptorFunction';
import AcceptRideModal from '../Components/AcceptRideModal';

const WaitingScreen = ({route}) => {
  const {data} = route.params;
  console.log('🚀 ~ WaitingScreen ~ data:', data);
  const navigation = useNavigation();
  const userData = useSelector(state => state.commonReducer?.userData);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ WaitingScreen ~ token:', token);
  const GOOGLE_MAPS_API_KEY = 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM';
  const mapRef = useRef(null);
  const circleCenter = {latitude: 24.8607333, longitude: 67.001135};
  const [loading, setLoading] = useState(false);
  const [rideData, setRideData] = useState(null);
  console.log('🚀 ~ WaitingScreen ~ rideData:', rideData);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setNativeProps({
        scrollEnabled: false,
        zoomEnabled: false,
        rotateEnabled: false,
        pitchEnabled: false,
      });
    }
    const interval = setInterval(() => {
      getRiderInfo();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getRiderInfo = async () => {
    const url = `auth/ride/${data?.ride_id}`;
    setLoading(true);
    const response = await Get(url, token);
    console.log('🚀 ~ getRiderInfo ~ response:', response?.data);
    setLoading(false);
    if (response?.data?.ride_info?.status === 'confirm') {
      setRideData(response?.data?.ride_info);
      setModalVisible(true);
    }
  };

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
      <View
        style={{
          position: 'relative',
        }}>
        <RippleEffect
          style={{
            position: 'absolute',
            top: 300,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </View>
      {rideData != null ? (
        <AcceptRideModal
          visible={modalVisible}
          setVisible={setModalVisible}
          username={rideData?.rider?.name}
          image={'https://car-rental.cstmpanel.com' + rideData?.rider?.photo}
          pickupLocation={rideData?.location_to}
          dropoffLocation={rideData?.location_from}
          distance={rideData?.distance}
          seats={rideData?.carinfo?.seats}
          CarNumber={rideData?.carinfo?.no}
          carName={rideData?.carinfo?.name}
          price={rideData?.amount + ' $'}
          onpressClose={() => navigation.navigate('HomeScreen')}
          onPressMessageBtn={() =>
            Platform.OS == 'android'
              ? ToastAndroid.show(
                  `We are Currently unavailable`,
                  ToastAndroid.SHORT,
                )
              : Alert.alert(`We are Currently unavailable`)
          }
        />
      ) : (
        <View style={styles.waiting_main_view}>
          <View style={styles.waiting_sub_view}>
            <View style={styles.animation_view}>
              <LottieView
                autoPlay
                loop
                style={styles.waiting_animation}
                source={require('../Assets/animations/waiting.json')}
              />
            </View>
            <CustomText isBold style={{fontSize: moderateScale(18, 0.6)}}>
              Wating Rider to Accept Your Ride
            </CustomText>
          </View>
        </View>
      )}
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
  waiting_main_view: {
    width: windowWidth,
    height: windowHeight * 0.25,
    position: 'absolute',
    bottom: 10,
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
