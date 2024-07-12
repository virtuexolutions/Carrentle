import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {windowHeight, windowWidth} from '../Utillity/utils';
import MapViewDirections from 'react-native-maps-directions';
import {moderateScale} from 'react-native-size-matters';
import {Divider, Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';

const RideAcceptance = () => {
  const navigation = useNavigation()
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
        <View style={styles.image}>
          <CustomImage
            source={require('../Assets/Images/Group13.png')}
            style={{width: windowHeight * 0.04, height: windowHeight * 0.04}}
          />
        </View>
      </View>
      
      <ImageBackground 
      source={require('../Assets/Images/map.png')}
      style={{width:windowWidth,  height: windowHeight * 0.89, }
    }>

      {/* 
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
      */}

      <View style={styles.bottomContainer}>
        <TextInputWithTitle
          iconName={'marker'}
          foundation={true}
          iconColor={'#FF8A00'}
          titleText={'Password'}
          placeholder={'Fannie Street San Angelo, Texas'}
          setText={() => {}}
          value={'Fannie Street San Angelo, Texas'}
          viewHeight={0.065}
          viewWidth={0.77}
          inputWidth={0.55}
          border={2}
          borderRadius={moderateScale(25, 0.3)}
          borderColor={'#000'}
          backgroundColor={'#ffffff'}
          marginTop={moderateScale(10, 0.3)}
          color={'878786'}
          placeholderColor={'#878786'}
          // elevation
        />

        <TextInputWithTitle
          iconName={'marker'}
          foundation={true}
          iconColor={'#72AFED'}
          elevation
          titleText={'Password'}
          placeholder={'Drop on'}
          setText={() => {}}
          value={''}
          viewHeight={0.06}
          viewWidth={0.77}
          inputWidth={0.55}
          border={2}
          borderRadius={moderateScale(25, 0.3)}
          borderColor={'#000'}
          backgroundColor={'#ffffff'}
          marginTop={moderateScale(10, 0.3)}
          color={Color.black}
          placeholderColor={'#878786'}
        />
      </View>
      <View style={styles.actions}>
        <CustomButton
          onPress={() => {
            navigation.navigate('RideBookingScreen')
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
        />
      </View>
      </ImageBackground>

    </View>
     );
};

export default RideAcceptance;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'red',
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
  locBox: {
    width: windowWidth * 0.85,
    marginTop: moderateScale(12, 0.2),
    zIndex: 1,
  },
  bottomContainer: {
    width: windowWidth * 0.85,
    backgroundColor: '#F8F8F8',
    borderRadius: moderateScale(24, 0.3),
    position: 'absolute',
    borderColor: '#29478A',
    borderWidth: moderateScale(1, 0.2),
    bottom: moderateScale(100, 0.2),
    paddingVertical: moderateScale(20, 0.2),
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
    alignItems: 'center',
    gap: moderateScale(5, 0.2),
  },
  rideDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(2, 0.2),
    paddingHorizontal: moderateScale(22, 0.2),
  },
  actions: {
    position: 'absolute',
    bottom: 40,
  },
  image: {
    width: windowHeight * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    height: windowHeight * 0.045,
    backgroundColor: '#dedbdbc8',
    borderRadius: (windowHeight * 0.045) / 2,
  },
});
