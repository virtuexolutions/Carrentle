import {getDistance, isValidCoordinate} from 'geolib';
import {Divider, Icon} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import BookingCard from '../Components/BookingCard';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import Loader from '../Components/Loader';
import ResultModal from '../Components/ResultModal';
import SearchLocationModal from '../Components/SearchLocationModal';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {baseUrl} from '../Config';
import MapViewDirections from 'react-native-maps-directions';

const BoardingPointScreen = ({navigation, route}) => {
  const {carData} = route.params;
  const GOOGLE_MAPS_API_KEY = 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM';
  const mapRef = useRef(null);

  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickupLocation, setPickUpLocation] = useState({});
  const [dropOffLocation, setDropOffLocation] = useState({});
  const [locationType, setLocationType] = useState('pickup');
  const [isYourLocation, setIsyourLocation] = useState(null);
  const circleCenter = {latitude: 24.8607333, longitude: 67.001135};
  const circleRadius = 15000;
  const [currentPossition, setcurrentPossition] = useState({});
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [fare, setFare] = useState(0);
  const [resultModalVisible, setResultModalVisible] = useState(false);

  const [loading, setLoading] = useState(0);
  const [address, setAddress] = useState('');

  const fareStructure = {
    1: {baseFare: 10, additionalFarePerMile: 1},
    2: {
      baseFare: 10,
      additionalFarePerMile: 2,
      minDistance: 10,
      maxDistance: 75,
    },
    3: {
      baseFare: 10,
      additionalFarePerMile: 1.75,
      minDistance: 76,
      maxDistance: 150,
    },
    4: {baseFare: 10, additionalFarePerMile: 1.5, minDistance: 151},
  };

  const calculateFare = distance => {
    let fare = 0;
    let fareType;
    let calfare;

    Object.keys(fareStructure).forEach(key => {
      const fareTypeObj = fareStructure[key];
      if (
        (!fareTypeObj.minDistance || distance >= fareTypeObj.minDistance) &&
        (!fareTypeObj.maxDistance || distance <= fareTypeObj.maxDistance)
      ) {
        fareType = fareTypeObj;
      }
    });

    if (fareType) {
      fare =
        fareType.baseFare + (distance - 1) * fareType.additionalFarePerMile;
      calfare = fare.toFixed(0);
    }
    return calfare;
  };

  const origin = {
    latitude: isYourLocation
      ? currentPossition?.latitude
      : Number(pickupLocation?.lat),
    longitude: isYourLocation
      ? currentPossition?.longitude
      : Number(pickupLocation?.lng),
  };
  const destinations = {
    latitude: dropOffLocation?.lat || null,
    longitude: dropOffLocation?.lng || null,
  };

  useEffect(() => {
    const checkIfMarkerInsideCircle = () => {
      const dropoffdistance = getDistance(circleCenter, dropOffLocation);
      const pickupDistance = getDistance(circleCenter, pickupLocation);
      if (dropoffdistance > circleRadius) {
        Alert.alert('Warning', ' Your DropOff Location is outside the region');
      } else if (pickupDistance > circleCenter) {
        Alert.alert('Warning', ' Your PickUp Location is outside the region');
      }
    };
    checkIfMarkerInsideCircle();

    if (dropOffLocation && pickupLocation) {
      const checkDistanceBetween = getDistance(pickupLocation, dropOffLocation);
      let km = Math.round(checkDistanceBetween / 1000);

      const distanceInMiles = km / 1.60934;
      const calculatedFare = calculateFare(distanceInMiles);
      setFare(calculatedFare);
      setDistance(km);
      const getTravelTime = async () => {
        try {
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destinations.latitude},${destinations.longitude}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data.status === 'OK') {
            const distanceMatrix = data.rows[0].elements[0];
            const travelTime = distanceMatrix.duration.text;
            console.log(travelTime, 'travelTime');
            return setTime(travelTime);
          } else {
            console.error('Error fetching travel time:', data.status);
            return null;
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getTravelTime();
    }
  }, [dropOffLocation]);

  useEffect(() => {
    getCurrentLocation();
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setPickUpLocation(prevLocation => ({
          ...prevLocation,
          latitude,
          longitude,
        }));
      },
      error => console.log('errrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', error),
      {enableHighAccuracy: true, distanceFilter: 10, interval: 1000},
    );
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (!origin || !destinations) return;
    mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
    });
  }, [origin, destinations]);

  useEffect(() => {
    if (!origin || !destinations) return;
  }, [origin, destinations, GOOGLE_MAPS_API_KEY]);

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
            getAddressFromCoordinates(
              position.coords.latitude,
              position.coords.longitude,
            );
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
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        const givenaddress = data.results[0].formatted_address;
        setAddress(givenaddress);
      } else {
        console.log('No address found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentPossition) {
      getAddressFromCoordinates(
        currentPossition.latitude,
        currentPossition.longitude,
      );
    }
  }, []);

  const onPressProceed = async () => {
    const formData = new FormData();
    const data = {
      location_from: pickupLocation?.name || address,
      location_to: dropOffLocation?.name,
      pickup_location_lat: pickupLocation?.lat || currentPossition?.latitude,
      pickup_location_lng: pickupLocation?.lat || currentPossition?.longitude,
      dropoff_location_lat: dropOffLocation?.lat,
      dropoff_location_lng: dropOffLocation?.lng,
      distance: distance,
      amount: fare,
      car_id: carData?.id,
    };
    for (let key in data) {
      if (data[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(` ${key} field is empty`, ToastAndroid.SHORT)
          : Alert.alert(` ${key} field is empty`);
      }
      // formData.append(key, data[key]);
    }
    const paramsData = {
      currentLocationLatitude: currentPossition,
      pickupLocation: pickupLocation,
      dropOffLocation: dropOffLocation,
    };
    setLoading(true);
    const url = 'auth/bookride';
    const response = await Post(url, data, apiHeader(token));
    console.log('======......', response?.data);
    if (response != undefined) {
      setLoading(false);
      navigation.navigate('WaitingScreen', {data: paramsData});
    }
  };

  return (
    <View style={styles.container}>
      <Header
        index
        title={'Boarding Point'}
        textstyle={{color: Color.darkGray}}
        headerColor={['white', 'white']}
        hideUser={false}
        navigation={navigation}
        showBack
      />
      <View style={styles.locBox}>
        <View
          style={{
            width: windowWidth * 0.85,
            backgroundColor: 'white',
            borderRadius: moderateScale(10, 0.2),
            padding: moderateScale(12, 0.2),
          }}>
          <CustomText>Where to go from here?</CustomText>
        </View>
        <View
          style={{
            width: windowWidth * 0.85,
            gap: moderateScale(-7, 0.1),
            backgroundColor: '#f3f3f3f8',
            borderRadius: moderateScale(10, 0.2),
            padding: moderateScale(12, 0.2),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              as={Entypo}
              name="dot-single"
              size={moderateScale(34, 0.2)}
              style={{
                color: '#ff0033',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setLocationType('pickup');
                setIsModalVisible(true);
              }}
              style={styles.locationPickerBtn}>
              <CustomText
                numberOfLines={3}
                style={{
                  width: windowWidth * 0.6,
                  // backgroundColor : 'red'
                }}>
                {Object.keys(pickupLocation).length > 0
                  ? pickupLocation?.name || 'Your Live Location'
                  : 'Pick Location'}
              </CustomText>
              <Icon
                as={AntDesign}
                name={
                  Object.keys(pickupLocation).length == 0 ? 'plus' : 'close'
                }
              />
            </TouchableOpacity>
          </View>
          <View style={styles.dotView}>
            <View style={{gap: -5}}>
              <Icon
                as={Entypo}
                name="dots-two-vertical"
                size={moderateScale(24, 0.2)}
                style={{color: '#fcf36b'}}
                // color={}
              />
              <Icon
                as={Entypo}
                name="dots-two-vertical"
                size={moderateScale(24, 0.2)}
                style={{color: '#fcf36b'}}
                // color={}
              />
            </View>
            <Divider
              color={'black'}
              width={'2xs'}
              borderWidth={0.2}
              marginLeft={2}
              borderColor={'#b0adad'}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              as={Entypo}
              name="dot-single"
              size={moderateScale(34, 0.2)}
              style={{
                color: '#ff0033',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setLocationType('dropOff');
                setIsModalVisible(true);
              }}
              style={styles.locationPickerBtn}>
              <CustomText
                numberOfLines={3}
                style={{
                  width: windowWidth * 0.6,
                  // backgroundColor : 'red'
                }}>
                {Object.keys(dropOffLocation).length > 0
                  ? dropOffLocation?.name
                  : 'Drop Location'}{' '}
              </CustomText>
              <Icon
                as={AntDesign}
                name={
                  Object.keys(dropOffLocation).length == 0 ? 'plus' : 'close'
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {Object.keys(currentPossition).length > 0 ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: currentPossition.latitude || 0,
            longitude: currentPossition.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={mapRef}>
          <Circle
            center={circleCenter}
            radius={15000}
            strokeWidth={2}
            strokeColor={'red'}
            fillColor={'rgba(51, 170, 51, .2)'}
            zIndex={1}
          />
          <Marker coordinate={currentPossition} title="Your Are Here Now" />
          {Object.keys(pickupLocation).length > 0 &&
          Object.keys(dropOffLocation).length > 0 ? (
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
          {Object.keys(dropOffLocation).length > 0 &&
            isValidCoordinate(dropOffLocation) && (
              <Marker
                coordinate={{
                  latitude: dropOffLocation?.lat,
                  longitude: dropOffLocation?.lng,
                }}
                title="Drop-off Location"
                pinColor="green"
              />
            )}
        </MapView>
      ) : (
        <Loader />
      )}
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          borderRadius: moderateScale(8, 0.2),
          padding: moderateScale(6, 0.2),
          borderWidth: 1,
          borderColor: '#0000006c',
          position: 'absolute',
          zIndex: 1,
          bottom: moderateScale(50, 0.2),
          right: moderateScale(20, 0.2),
        }}
        onPress={() => {
          getCurrentLocation();
        }}>
        <Icon
          as={MaterialIcons}
          name="my-location"
          size={moderateScale(24, 0.2)}
          style={{color: 'blue'}}
        />
      </TouchableOpacity>
      {Object.keys(pickupLocation).length > 0 &&
        Object.keys(dropOffLocation).length > 0 && (
          <>
            <BookingCard
              distance={distance}
              username={carData?.name}
              isSentRequest={true}
              pickupLocation={isYourLocation ? address : pickupLocation?.name}
              dropoffLocation={dropOffLocation?.name}
              time={time}
              image={baseUrl + carData?.image}
              item={userData}
              price={'$ ' + fare}
            />
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                // bottom: 50, old
                bottom: 70,
                zIndex: 1,
              }}>
              <CustomButton
                text={'Proceed'}
                textColor={Color.white}
                width={windowWidth * 0.8}
                height={windowHeight * 0.06}
                marginTop={moderateScale(20, 0.3)}
                onPress={() => {
                  onPressProceed();
                }}
                bgColor={Color.cartheme}
                borderColor={Color.white}
                borderWidth={1}
                borderRadius={moderateScale(30, 0.3)}
                isGradient
                loader={loading}
              />
            </View>
          </>
        )}
      <SearchLocationModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setPickupLocation={setPickUpLocation}
        setdropOffLocation={setDropOffLocation}
        locationType={locationType}
        onPressCurrentLocation={() => {
          setIsyourLocation(true);
          setIsModalVisible(false);
          setPickUpLocation(currentPossition);
        }}
      />
      <ResultModal
        isVisible={resultModalVisible}
        setIsVisible={setResultModalVisible}
      />
      {/* </ImageBackground> */}
    </View>
  );
};

export default BoardingPointScreen;

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
    // backgroundColor: 'red',
  },
  locBox: {
    width: windowWidth * 0.85,
    marginTop: moderateScale(12, 0.2),

    zIndex: 1,
  },
  bottomContainer: {
    width: windowWidth * 0.9,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: moderateScale(14, 0.3),
    position: 'absolute',
    bottom: moderateScale(147, 0.2),
    paddingVertical: moderateScale(10, 0.2),
    paddingHorizontal: moderateScale(10, 0.2),
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: moderateScale(20, 0.2),
  },
  rideDetails: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    paddingVertical: moderateScale(2, 0.2),
    paddingHorizontal: moderateScale(22, 0.2),
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.2),
    paddingVertical: moderateScale(7, 0.2),
  },
  dotView: {
    flexDirection: 'row',
    gap: moderateScale(1, 0.2),
    alignItems: 'center',
    paddingLeft: moderateScale(5, 0.2),
  },
  locationPickerBtn: {
    // marginTop: moderateScale(6, 0.2),
    // width: windowWidth * 0.8,
    padding: moderateScale(7, 0.2),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userImage: {
    overflow: 'hidden',
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.06) / 2,
  },
});
