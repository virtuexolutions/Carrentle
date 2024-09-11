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
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {getDistance, isValidCoordinate} from 'geolib';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import Color from '../Assets/Utilities/Color';
import BookingCard from '../Components/BookingCard';
import CustomButton from '../Components/CustomButton';
import Loader from '../Components/Loader';
import SearchLocationModal from '../Components/SearchLocationModal';
import Header from '../Components/Header';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';

const BoardingPointScreen = ({navigation}) => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM';

  const mapRef = useRef(null);

  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
  console.log(user, 'sdaskdjahskd');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickupLocation, setPickUpLocation] = useState({});
  const [dropOffLocation, setDropOffLocation] = useState({});
  const [locationType, setLocationType] = useState('pickup');
  const [isYourLocation, setIsyourLocation] = useState(null);
  const circleCenter = {latitude: 24.8607333, longitude: 67.001135};
  const circleRadius = 15000;
  const [currentPossition, setcurrentPossition] = useState({});
  const [distance, setDistance] = useState(0);

  const origin = {
    latitude: isYourLocation
      ? currentPossition?.latitude
      : Number(pickupLocation?.lat),
    longitude: isYourLocation
      ? currentPossition?.latitude
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
  }, [dropOffLocation]);

  useEffect(() => {
    getCurrentLocation();
    if (dropOffLocation && pickupLocation) {
      const checkDistanceBetween = getDistance(pickupLocation, dropOffLocation);
      let km = Math.round(checkDistanceBetween / 100) / 10;
      console.log('distanceeeeeeee', km);
      setDistance(km);
    }
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setPickUpLocation(prevLocation => ({
          ...prevLocation,
          latitude,
          longitude,
        }));
      },
      error => console.log(error),
      {enableHighAccuracy: true, distanceFilter: 10, interval: 1000},
    );
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  console.log(distance, 'distanceeee');

  useEffect(() => {
    if (!origin || !destinations) return;
    mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
    });
    console.log('asdahsdgjsgj');
  }, [origin, destinations]);

  useEffect(() => {
    if (!origin || !destinations) return;
    // const getTravelTime = async () => {
    //   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destinations}&key=${GOOGLE_MAPS_API_KEY}`;
    //   const response = await fetch(url);
    //   console.log(response, 'sdhahsdjagdjagdagsdgas');
    // };
    const getTravelTime = async () => {
      try {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.latitude},${origin.longitude}&destinations=${destinations.latitude},${destinations.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data, 'API Response');

        if (data.status === 'OK') {
          const distanceMatrix = data.rows[0].elements[0];
          const travelTime = distanceMatrix.duration.text; // e.g., "1 hour 20 mins"
          console.log(`Travel time: ${travelTime}`);
          return travelTime;
        } else {
          console.error('Error fetching travel time:', data.status);
          return null;
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getTravelTime();
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

  const onPressProceed = async () => {
    Platform.OS == 'android'
      ? ToastAndroid.show(`Ride Request is Send`, ToastAndroid.SHORT)
      : Alert.alert(`Ride Request is Send`);
    // const data = {
    //   location_from: '1352 Ripple Street',
    //   locarion_to: ' 127 Limer Street',
    //   pickup_location_lat: 49.65766,
    //   pickup_location_lng: -150.40136,
    //   dropoff_location_lat: 10.48439,
    //   dropoff_location_lng: 103.08545,
    //   distance: 20
    // };
    // console.log(data, 'dataaaaaaaa');
    // let url = 'auth/book-ride'
    // const response = await Post(url, data, apiHeader(token))
    // return console.log('======......', response?.data)
    // if (response != undefined) {
    //   console.log(response?.data, ' =====================>response')
    // }
  };

  const isValidCoordinate = coordinate => {
    return (
      coordinate && !isNaN(coordinate.latitude) && !isNaN(coordinate.longitude)
    );
  };

  console.log(origin, 'origin', destinations, 'destinations');

  return (
    <View style={styles.container}>
      <Header
        index
        title={'Boarding Point'}
        textstyle={{color: Color.darkGray}}
        headerColor={['white', 'white']}
        hideUser={false}
        navigation={navigation}
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
            // coordinates={origin}
            center={circleCenter}
            radius={15000}
            // holes={destination} // Radius in meters
            strokeWidth={2}
            strokeColor={'red'}
            // fillColor={'#c9c9e'}
            zIndex={1}
          />

          {/* {Object.keys(pickupLocation).length > 0 &&
            isValidCoordinate(pickupLocation) && (
              <Marker
                coordinate={{
                  latitude: isYourLocation
                    ? pickupLocation?.latitude
                    : pickupLocation?.lat,
                  longitude: isYourLocation
                    ? pickupLocation?.longitude
                    : pickupLocation?.lng,
                }}
                title={isYourLocation ? 'Your Location' : 'Pickup Location'}
                pinColor="blue"
              />
            )} */}
          <Marker coordinate={currentPossition} title="Your Are Here Now" />
          {/* {Object.keys(pickupLocation).length > 0 &&
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
          ) : null} */}
          {/* {Object.keys(dropOffLocation).length > 0 &&
            isValidCoordinate(dropOffLocation) && (
              <Marker
                coordinate={{
                  latitude: dropOffLocation?.lat,
                  longitude: dropOffLocation?.lng,
                }}
                title="Drop-off Location"
                pinColor="green"
              />
            )} */}
        </MapView>
      ) : (
        <Loader />
      )}
      {/* {currentPossition ?
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: currentPossition.latitude,
            longitude: currentPossition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Circle
            // coordinates={origin}
            center={circleCenter}
            radius={1500}
            // holes={destination} // Radius in meters
            strokeWidth={2}
            strokeColor={'red'}
            fillColor={'#c9c9e0'}
            zIndex={1}
          />
          {Object.keys(pickupLocation).length > 0 &&
            <Marker
              coordinate={{ latitude: pickupLocation?.lat, longitude: pickupLocation?.lng }}
              title="Pickup Location"
              pinColor="blue"
            />
          }
          {Object.keys(dropOffLocation).length > 0 &&
            <Marker
              coordinate={{ latitude: dropOffLocation?.lat, longitude: dropOffLocation?.lng }}
              title="Drop-off Location"
              pinColor="green"
            />
          }

          {destination && (
            <MapViewDirections
              origin={currentPossition}
              destination={destination}
              apikey={"AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc"}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          )}
        </MapView>
        :
        <CustomText >hello</CustomText>
      } */}

      {/* {
        locations.map((loc, index) => {
          return getDistance(circleCenter, loc) < circleRadius && <Marker
          key={index}
          coordinate={loc}
          style={{width: 15, height: 10,}}
          // pinColor={'green'} 
          />
        })
      } */}
      {/* <Marker coordinate={destination} />

      {/* <TouchableOpacity style={styles.bottomContainer}>
         
          <View style={styles.profile}>
            <View
              style={{
                width: windowWidth * 0.19,
                height: windowWidth * 0.19,
                overflow: 'hidden',
                borderRadius: (windowWidth * 0.19) / 2,
              }}>
              <CustomImage
                source={require('../Assets/Images/men.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View>
              <CustomText>2013 Dodge Caravan</CustomText>
              <View style={{flexDirection: 'row', gap: moderateScale(12, 0.2)}}>
                <CustomText>4.5 Stars </CustomText>
                <CustomText>ID. 11587</CustomText>
              </View>
           
              <View style={{flexDirection: 'row'}}>
                <Rating startingValue={4.5} ratingCount={5} imageSize={moderateScale(15, 0.2)} />
              </View>
            </View>
          </View>
          <Divider
            marginTop={moderateScale(5, 0.2)}
            marginX={moderateScale(15, 0.2)}
            color={'black'}
            width={'72'}
            borderWidth={0.2}
            borderColor={'#b0adad'}
          />
          <View style={styles.rideDetails}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: moderateScale(10, 0.2),
              }}>
              <Icon
                as={Ionicons}
                name="car-sport"
                color={'black'}
                size={moderateScale(22, 0.2)}
              />
              <View>
                <CustomText isBpld>Car 2</CustomText>
                <CustomText style={{color: 'grey'}}>$10.0</CustomText>
              </View>
            </View>
            <View style={{gap: moderateScale(2, 0.2)}}>
              <CustomText isBpld>Distance</CustomText>
              <CustomText style={{color: 'grey'}}>2.5 km</CustomText>
            </View>
            <View>
              <CustomText isBpld>Car 2</CustomText>
              <CustomText style={{color: 'grey'}}>10 Mins</CustomText>
            </View>
          </View>
          <Divider
            marginTop={moderateScale(1, 0.2)}
            marginX={moderateScale(15, 0.2)}
            color={'black'}
            width={'72'}
            borderWidth={0.2}
            borderColor={'#b0adad'}
          />
          <View style={styles.actions}>
            <TouchableOpacity>
              <Icon
                as={Ionicons}
                name="chatbubble-outline"
                size={moderateScale(24, 0.2)}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon as={Feather} name="phone" size={moderateScale(24, 0.2)} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity> */}
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
              username={'Testing User'}
              isSentRequest={true}
              pickupLocation={
                isYourLocation ? 'Your Location' : pickupLocation?.name
              }
              dropoffLocation={dropOffLocation?.name}
              time={'20 mints'}
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
