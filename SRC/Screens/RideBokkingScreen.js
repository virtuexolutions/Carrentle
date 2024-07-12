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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Foundation from 'react-native-vector-icons/Foundation';
import {Rating} from 'react-native-ratings';
import LinearGradient from 'react-native-linear-gradient';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import Color from '../Assets/Utilities/Color';
import { useNavigation } from '@react-navigation/native';

const RideBookingScreen = () => {
  const navigation =useNavigation()
  const origin = {latitude: 37.3285792, longitude: -122.0356209};
  const destination = {latitude: 37.3320305, longitude: -122.0355326};

  return (
    <View style={styles.container}>
      {/* <Header/> */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            // navigation.toggleDrawer()
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
        <View style={styles.cont}>
          <View style={styles.profile}>
            <View style={styles.image}>
              <CustomImage
                source={require('../Assets/Images/men.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View>
              <CustomText isBold style={{fontSize: moderateScale(13, 0.2)}}>
                Car No 3
              </CustomText>
              <Rating imageSize={13} />
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: moderateScale(10, 0.2)}}>
            <LinearGradient
              colors={['#79B9F6', '#00309E']}
              style={styles.linear}>
              <Icon as={FontAwesome} name="phone" color={'white'} />
            </LinearGradient>
            <LinearGradient
              colors={['#79B9F6', '#00309E']}
              style={styles.linear}>
              <Icon as={MaterialCommunityIcons} name="chat" color={'white'} />
            </LinearGradient>
          </View>
        </View>

        <CustomText style={styles.heading}>2013 Dodge Caravan</CustomText>
        <View style={styles.row}>
          <Foundation name="marker" color="#FF8A00" size={20} />
          <CustomText>Fannie Street San Angelo, Texas</CustomText>
        </View>
        <CustomText style={styles.text}>Available seats</CustomText>
        <CustomText style={styles.seat}>02</CustomText>

        <View style={styles.rideDetails}>
          <View style={styles.car}>
            <CustomImage source={require('../Assets/Images/caricon.png')} />
            <View style={{alignItems: 'center'}}>
              <CustomText>Car No 3</CustomText>
            </View>
          </View>
          <View style={styles.dis}>
            <CustomText isBold>Distance</CustomText>
            <CustomText style={styles.time}>2.5 km</CustomText>
          </View>
          <View style={styles.dis}>
            <CustomText isBold>Time</CustomText>
            <CustomText style={styles.time}>2 Mins</CustomText>
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        <CustomButton
          onPress={() => {
            navigation.navigate('RideBookingScreen2')
          }}
          isGradient
          text={'Yes'}
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
          // isGradient
        />
      </View>
    </View>
  
  );
};

export default RideBookingScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  time: {fontSize: moderateScale(11, 0.6), color: 'grey'},
  linear: {
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (windowWidth * 0.08) / 2,
  },
  dis: {gap: moderateScale(2, 0.2), alignItems: 'center'},
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'red',
  },
  text: {
    paddingHorizontal: moderateScale(6, 0.6),
    color: Color.black,
  },
  locBox: {
    width: windowWidth * 0.85,
    marginTop: moderateScale(12, 0.2),
    zIndex: 1,
  },
  car: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10, 0.2),
  },
  seat: {
    paddingHorizontal: moderateScale(5, 0.6),
    fontSize: moderateScale(12, 0.2),
    color: '#98A5B4',
  },
  row: {
    paddingHorizontal: moderateScale(5, 0.6),
    flexDirection: 'row',
    gap: moderateScale(5, 0.2),
  },
  heading: {
    marginTop: moderateScale(12, 0.2),
    fontSize: moderateScale(20, 0.2),
    paddingHorizontal: moderateScale(5, 0.6),
  },
  btn: {
    width: windowWidth * 0.09,
    backgroundColor: 'white',
    height: windowWidth * 0.09,
    justifyContent: 'center',
    elevation: 12,
    alignItems: 'center',
    borderRadius: (windowWidth * 0.09) / 2,
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
    paddingVertical: moderateScale(20, 0.2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5, 0.2),
  },
  image: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    overflow: 'hidden',
    borderRadius: (windowWidth * 0.19) / 2,
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
  cont: {flexDirection: 'row', justifyContent: 'space-between'},
});
