import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Circle, Marker, PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import {windowHeight, windowWidth} from '../Utillity/utils';
import MapViewDirections from 'react-native-maps-directions';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import {Divider, Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import CustomImage from '../Components/CustomImage';
import Header from '../Components/Header';
// import {useNavigation} from '@react-navigation/native';
import SearchLocationModal from '../Components/SearchLocationModal';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import {Rating} from 'react-native-ratings';
import { getDistance } from 'geolib';
import Geolocation, { getCurrentPosition }  from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

const BoardingPointScreen = () => {
  console.log('first');
  // const navigation = useNavigation();
  const origin = {latitude: 37.3285792, longitude: -122.0356209};
  const destination = {latitude: 37.3320305, longitude: -122.0355326};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickupLocation, setPickUpLocation] = useState({});
  const [dropOffLocation, setDropOffLocation] = useState({});
  const [locationType, setLocationType] = useState('pickup');
  const [markerPosition, setMarkerPosition] = useState({ latitude: 37.78840,
    longitude: -122.4300,})
  const circleCenter = {  latitude: 37.78825, longitude: -122.4324 };
  const circleRadius = 1400; 
  useEffect(() => {
    // Function to check if marker is inside the circle
    const checkIfMarkerInsideCircle = () => {
      const distance = getDistance(circleCenter, markerPosition);
      console.log("🚀 ~ checkIfMarkerInsideCircle ~ distance:", distance)
      if (distance > circleRadius) {
        Alert.alert('Warning', 'Marker is outside the defined area!');
      }
      
    };
    checkIfMarkerInsideCircle();
  }, [markerPosition]);

// const getCurrentPositon= () =>{
//   Geolocation.getCurrentPosition(
//     (position) => {
//       console.log("🚀 ~ getCurrentPositon ~ position:", position)
//       // console.log(position);
//     },
//     (error) => {
//       // See error code charts below.
//       console.log(error.code, error.message);
//     },
//     { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
// );
// //  console.log("🚀 ~ getCurrentPositon ~ position:", position.coords);
// }

const getCurrentPositon = async () =>{
  try {
    // Return a Promise that wraps the callback-based API
    const position = await new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            // heading: position?.coords?.heading,
          };
          resolve(coords);
        },
        (error) => {
          reject(new Error(error.message));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });
    console.log("🚀 ~ position ~ position :", position )

    // Return the position obtained from the Promise
    // return position;
  } catch (error) {
    console.error('Error getting location:', error);
    throw error;
  }
}




  const locations= [
    {
      latitude: 37.75950,
      longitude: -122.4310
    },
    {
      latitude: 37.7890,
      longitude: -122.4200
    },
    {
      latitude: 37.77770,
      longitude: -122.4400
    },
    {
      latitude: 37.7770,
      longitude: -122.4300
    },
    {
      latitude: 37.78750,
      longitude: -122.4430
    },
    {
      latitude: 37.76840,
      longitude: -122.4400
    },
  ]

  return (
    <View style={styles.container}>
      {/* <Header
        index
        title={'Boarding Point'}
        headerColor={['white', 'white']}
        hideUser={false}
      /> */}
      {/* <ImageBackground
        style={{
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
          paddingBottom: moderateScale(12, 0.2),
        }}
        source={require('../Assets/Images/map.png')}> */}
        <View style={styles.locBox}>
          <View
            style={{
              width: windowWidth * 0.85,
              backgroundColor: 'white',
              // borderWidth: 1,

              borderRadius: moderateScale(10, 0.2),
              padding: moderateScale(12, 0.2),
            }}>
            <CustomText>Where to go from here?</CustomText>
          </View>

          <View
            style={{
              width: windowWidth * 0.85,

              gap: moderateScale(-7,0.1),
              // flexDirection: 'row',
              // marginTop: moderateScale(4, 0.2),
              backgroundColor: '#f3f3f3f8',
              // borderWidth:1,
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
                    ? pickupLocation?.name
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

        <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
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
        <Marker coordinate={markerPosition} 
        draggable={true}
        onDragEnd={ (e) => {

          setMarkerPosition(e.nativeEvent.coordinate);
        }}
        style={{width: 15, height: 10}} />
      {
        locations.map((loc, index) => {
          return getDistance(circleCenter, loc) < circleRadius && <Marker
          key={index}
          coordinate={loc}
          style={{width: 15, height: 10,}}
          // pinColor={'green'} 
          />
        })
      }

        {/* <MapViewDirections
          origin={origin}
          destination={destination}
          strokeColor="blue"
          strokeWidth={10}
          apikey="AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc"
        /> */}
        {/* <Marker coordinate={destination} /> */}
      </MapView>

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
        <TouchableOpacity style={{
        backgroundColor:'white',
        borderRadius:moderateScale(8,0.2),
        padding:moderateScale(6,0.2),
        borderWidth:1,
        borderColor:'#0000006c',
        position:'absolute',
        zIndex:1,
        bottom: moderateScale(50,0.2),
        right: moderateScale(20,0.2),
        }}
        onPress={()=>{
          getCurrentPositon();
        }}
        >
          <Icon
          as={MaterialIcons}
          name='my-location'
          size={moderateScale(24,0.2)}
        style={{color:'blue'}}
          />
        </TouchableOpacity>
        {Object.keys(pickupLocation).length > 0 &&
          Object.keys(dropOffLocation).length > 0 && (
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                // bottom: 50, old
                bottom: 110,
                zIndex: 1,
              }}>
              <CustomButton
                text={'Proceed'}
                textColor={Color.white}
                width={windowWidth * 0.8}
                height={windowHeight * 0.06}
                marginTop={moderateScale(20, 0.3)}
                onPress={() => {
                  // navigation.navigate('BoardingPointDetails');
                }}
                bgColor={Color.cartheme}
                borderColor={Color.white}
                borderWidth={1}
                borderRadius={moderateScale(30, 0.3)}
                isGradient
              />
            </View>
          )}
        <SearchLocationModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setPickupLocation={setPickUpLocation}
          setdropOffLocation={setDropOffLocation}
          locationType={locationType}
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
    // height: windowHeight * 0.4,
    // borderRadius:moderateScale(12,0.2),
    marginTop: moderateScale(12, 0.2),
    // position:'absolute',

    zIndex: 1,
    // backgroundColor:'red'
  },
  bottomContainer: {
    width: windowWidth * 0.9,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: moderateScale(14, 0.3),
    position: 'absolute',
    // bottom: moderateScale(97, 0.2),
    bottom: moderateScale(147, 0.2),
    paddingVertical: moderateScale(10, 0.2),
    paddingHorizontal: moderateScale(10, 0.2),
    // padding:moderateScale(20,0.2)
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
});
