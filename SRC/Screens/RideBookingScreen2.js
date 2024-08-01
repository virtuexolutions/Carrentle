import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {windowHeight, windowWidth} from '../Utillity/utils';
import MapViewDirections from 'react-native-maps-directions';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import {Divider, Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Rating} from 'react-native-ratings';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const RideBookingScreen2 = () => {
  const origin = {latitude: 37.3285792, longitude: -122.0356209};
  const destination = {latitude: 37.3320305, longitude: -122.0355326};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
          }}>
          <Icon as={Ionicons} name="menu" size={moderateScale(20, 0.2)} />
        </TouchableOpacity>
        <View style={styles.logo}>
          <CustomImage
            source={require('../Assets/Images/Group13.png')}
            style={{width: windowHeight * 0.04, height: windowHeight * 0.04}}
          />
        </View>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.3318456,
          longitude: -122.0296002,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker coordinate={origin} style={{width: 15, height: 10}} />
        <MapViewDirections
          origin={origin}
          destination={destination}
          strokeColor="blue"
          strokeWidth={10}
          apikey="AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc"
        />
        <Marker coordinate={destination} />
      </MapView>
      <View style={styles.bottomContainer}>
        <View style={styles.row}>
          <View style={styles.profile}>
            <View style={styles.image}>
              <CustomImage
                source={require('../Assets/Images/user2.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View
              style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
              <CustomText style={{fontSize: moderateScale(12, 0.2)}}>
                Theodora J. Gardner
              </CustomText>
              <View style={styles.rating}>
                <Rating imageSize={14} />
                <CustomText style={styles.count}>(4.2)</CustomText>
              </View>
            </View>
          </View>
          <View style={styles.row1}>
            <LinearGradient colors={['#79B9F6', '#00309E']} style={styles.btn2}>
              <Icon as={FontAwesome} name="phone" color={'white'} />
            </LinearGradient>
            <LinearGradient colors={['#79B9F6', '#00309E']} style={styles.btn2}>
              <Icon as={Fontisto} name="whatsapp" color={'white'} />
            </LinearGradient>
          </View>
        </View>
        <View style={styles.LocationView}>
          <View style={styles.marker}>
            <Icon
            as={Fontisto}
              name="map-marker-alt"
              size={moderateScale(17, 0.2)}
              color="#FF8A00"
              style={{ textAlign:'center'}}

            />
            <CustomText style={styles.dot}>- - - - -</CustomText>
            <Icon
            as={Fontisto}
              name="map-marker-alt"
              size={moderateScale(17, 0.2)}
              color="#72AFED"
              style={{marginTop: moderateScale(12, 0.2), textAlign:'center'}}
            />
          </View>
          <View style={styles.box}>
            <CustomText style={styles.text}>
              fannie street san angelo, texas{' '}
            </CustomText>

            <CustomText
              style={[
                styles.text,
                {
                  paddingHorizontal: moderateScale(5, 0.6),
                },
              ]}>
              navile street salem colorado
            </CustomText>
          </View>
        </View>
        {/* ride details i.e. time , distance .... */}
        <View style={styles.rideDetails}>
          <View style={styles.row2}>
            <CustomImage source={require('../Assets/Images/caricon.png')} />
            <View style={{alignItems: 'center'}}>
              <CustomText isBold>Car 2</CustomText>
              <CustomText style={styles.time}>$10.0</CustomText>
            </View>
          </View>
          <View style={{gap: moderateScale(2, 0.2), alignItems: 'center'}}>
            <CustomText isBold>Distance</CustomText>
            <CustomText style={styles.time}>2.5 km</CustomText>
          </View>
          <View style={{gap: moderateScale(2, 0.2), alignItems: 'center'}}>
            <CustomText isBold>Time</CustomText>
            <CustomText style={styles.time}>2 Mins</CustomText>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <CustomButton
          onPress={() => {
            navigation.navigate('BoardingPointScreen')
          }}
          isGradient
          text={'Book Now'}
          fontSize={moderateScale(14, 0.3)}
          textColor={Color.white}
          borderWidth={2}
          borderColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.9}
          height={windowHeight * 0.07}
          marginTop={moderateScale(30, 0.3)}
          bgColor={['#79B9F6', '#00309E']}
          isBold
        />
      </View>
    </View>
  );
};

export default RideBookingScreen2;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  row1: {flexDirection: 'row', gap: moderateScale(10, 0.2)},
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10, 0.2),
  },
  time:{ fontSize :moderateScale(12,.6) ,color: 'grey'},
  btn2: {
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (windowWidth * 0.08) / 2,
  },
  box: {
    paddingHorizontal: moderateScale(8, 0.6),
    justifyContent: 'space-between',
  },
  text:{
fontSize :moderateScale(13,.6)
  },
  dot: {
    width: windowWidth * 0.1,
    marginTop: moderateScale(11, 0.2),
    textAlign: 'center',
    marginLeft: moderateScale(2, 0.2),
    transform: [{rotate: '90deg'}],
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(12, 0.2),
  },
  logo: {
    width: windowHeight * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    height: windowHeight * 0.045,
    backgroundColor: '#dedbdbc8',
    borderRadius: (windowHeight * 0.045) / 2,
  },
  count: {fontSize: moderateScale(11, 0.2), color: '#98A5B4'},
  image: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    overflow: 'hidden',
    borderRadius: (windowWidth * 0.19) / 2,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  btn: {
    width: windowWidth * 0.09,
    backgroundColor: 'white',
    height: windowWidth * 0.09,
    justifyContent: 'center',
    elevation: 12,
    alignItems: 'center',
    borderRadius: (windowWidth * 0.09) / 2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'red',
  },
  locBox: {
    width: windowWidth * 0.85,
    marginTop: moderateScale(12, 0.2),
    zIndex: 1,
  },
  bottomContainer: {
    width: windowWidth * 0.94,
    backgroundColor: '#F8F8F8',
    borderRadius: moderateScale(24, 0.3),
    position: 'absolute',
    borderColor: '#29478A',
    borderWidth: moderateScale(1, 0.2),
    bottom: moderateScale(100, 0.2),
    paddingVertical: moderateScale(17, 0.2),
    paddingHorizontal: moderateScale(10, 0.2),
  },

  header: {
    zIndex: 1,
    position: 'absolute',
    top: 1,
    width: windowWidth,
    paddingHorizontal: moderateScale(12, 0.3),
    paddingVertical: moderateScale(12, 0.2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5, 0.2),
  },
  rideDetails: {
    flexDirection: 'row',
    marginTop: moderateScale(11, 0.2),
    justifyContent: 'space-between',
    paddingVertical: moderateScale(2, 0.2),
    paddingHorizontal: moderateScale(22, 0.2),
  },
  actions: {
    position: 'absolute',
    bottom: 40,
  },
  LocationView: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
  },
  marker: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.06,
    alignItems: 'center',
    
  },
});
