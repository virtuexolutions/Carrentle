import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {windowHeight, windowWidth} from '../Utillity/utils';
import MapViewDirections from 'react-native-maps-directions';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import { useNavigation } from '@react-navigation/native';
import { FONTS } from '../Constant/theme';

const BoardingPointDetails = () => {
  const navigation =useNavigation()
  const origin = {latitude: 37.3285792, longitude: -122.0356209};
  const destination = {latitude: 37.3320305, longitude: -122.0355326};


  return (
    <View style={styles.container}>
      {/* <MapView
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
      </MapView> */}
      <ImageBackground 
      style={{width: windowWidth, height: windowHeight}}
      source={require('../Assets/Images/map.png')}>
      <View style={styles.bottomContainer}>
        <View style={styles.cont}>
          <CustomText
            isBold
            style={{fontSize: moderateScale(23, 0.2), color: '#636363'}}>
            You will arrive at 11 : 05
          </CustomText>
          <CustomText isBold style={styles.text}>
            12 min - 6 miles
          </CustomText>
        </View>
        <View style={styles.profile}>
          <View style={styles.image}>
            <CustomImage
              source={require('../Assets/Images/men.png')}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(16, 0.6),
              paddingTop: moderateScale(10, 0.6),
            }}>
            Theodora j. GArdner{' '}
          </CustomText>
          <CustomText
            style={{
              color: Color.mediumGray,
            }}>
            2013 Dodge Caravan
          </CustomText>
          <CustomText isBold style={styles.$}>
            $ 10.00
          </CustomText>
          <View></View>
        </View>

        <View style={styles.actions}>
          <CustomButton
            onPress={() => {
              navigation.navigate('PaymentScreen')
            }}
            isGradient
            text={'Add Card'}
            fontSize={moderateScale(14, 0.3)}
            textColor={Color.white}
            borderWidth={2}
            borderColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.9}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            bgColor={['#79B9F6', '#00309E']}
            isBold
          />
          <CustomButton
            onPress={() => {}}
            text={'QR Scan'}
            fontSize={moderateScale(14, 0.3)}
            textColor={'#F8A700'}
            borderWidth={1}
            borderColor={'#ffffffba'}
            borderRadius={moderateScale(30, 0.3)}
            width={windowWidth * 0.9}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            bgColor={'white'}
            isBold
            elevation
          />
        </View>
      </View>
      </ImageBackground>

    </View>
  );
};

export default BoardingPointDetails;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: windowHeight,
    width: windowWidth,
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
    width: windowWidth,
    zIndex: 1,

    backgroundColor: '#F8F8F8',
    borderRadius: moderateScale(40, 0.3),
    position: 'absolute',
    bottom: moderateScale(0, 0.2),
    paddingVertical: moderateScale(40, 0.2),
    paddingHorizontal: moderateScale(10, 0.2),
  },
  profile: {
    alignItems: 'center',
    gap: moderateScale(2, 0.6),
  },
  rideDetails: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    paddingVertical: moderateScale(2, 0.2),
    paddingHorizontal: moderateScale(22, 0.2),
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.2),
    paddingVertical: moderateScale(7, 0.2),
  },
  image: {
    width: windowWidth * 0.19,
    height: windowWidth * 0.19,
    overflow: 'hidden',
    borderRadius: (windowWidth * 0.19) / 2,
  },
  cont: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: moderateScale(10, 0.3),
    borderColor: Color.lightGrey,
    paddingHorizontal: moderateScale(10, 0.6),
  },
  text: {
    paddingBottom: moderateScale(10, 0.6),
    color: Color.mediumGray,
    fontSize: moderateScale(13, 0.6),
  },
  $: {
    // fontSize: moderateScale(16, 0.6),
    ...FONTS.PoppinsBold16,
    color: 'red',
  },
});
