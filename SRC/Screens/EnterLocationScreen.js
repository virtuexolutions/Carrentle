import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {windowHeight, windowWidth} from '../Utillity/utils';
import MapViewDirections from 'react-native-maps-directions';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import {Divider, Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const EnterLocationScreen = () => {
  console.log('first');
  const origin = {latitude: 37.3318456, longitude: -122.0296002};
  const destination = {latitude: 37.771707, longitude: -122.4053769};

  return (
    //   <View
    //   style={{
    //     width: windowWidth ,
    //     height:windowHeight * 0.95
    //   }}
    //   >

    //   <MapView
    //   provider={PROVIDER_GOOGLE}
    //   style={StyleSheet.absoluteFill}
    //   showsCompass={true}
    //   showsBuildings={true}
    //   initialRegion={{
    //     latitude:24.8938496,
    //     longitude: 67.0826496,
    //     latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    //   }}
    // >
    // <Marker
    // coordinate={{latitude:24.8938496,
    //   longitude: 67.0826496,}}
    // />
    //   {/* <MapViewDirections
    //   origin={origin}
    //   destination={destination}
    //   apikey='AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc'
    //   /> */}
    // </MapView>
    // </View>

    <View style={styles.container}>
      <View style={styles.locBox}>
        <View
          style={{
            width: windowWidth * 0.85,
            backgroundColor: 'white',
            borderRadius: moderateScale(6, 0.2),
            padding: moderateScale(12, 0.2),
          }}>
          <CustomText>Where to go from here?</CustomText>
        </View>
        <View
          style={{
            width: windowWidth * 0.85,
            flexDirection: 'row',
            marginTop: moderateScale(4, 0.2),
            backgroundColor: '#fffafaec',
            borderRadius: moderateScale(7, 0.2),
            padding: moderateScale(12, 0.2),
          }}>
          <View style={{width: '10%', gap: moderateScale(6,0.3), alignItems:'center', marginTop: moderateScale(5,0.2) }}>
            <View
              style={{
                width: moderateScale(12, 0.2),
                height: moderateScale(12, 0.2),
                borderRadius: moderateScale(12, 0.2)/2,
                backgroundColor: 'red',
              }}></View>
            <View
              style={{
                width: moderateScale(6, 0.2),
                height: moderateScale(6, 0.2),
                borderRadius: moderateScale(6, 0.2)/2,
                backgroundColor: 'yellow',
              }}></View>
            <View
              style={{
                width: moderateScale(6, 0.2),
                height: moderateScale(6, 0.2),
                borderRadius: moderateScale(6, 0.2)/2,
                backgroundColor: 'yellow',
              }}></View>
            <View
              style={{
                width: moderateScale(6, 0.2),
                height: moderateScale(6, 0.2),
                borderRadius: moderateScale(6, 0.2)/2,
                backgroundColor: 'yellow',
              }}></View>
            <View
              style={{
                width: moderateScale(6, 0.2),
                height: moderateScale(6, 0.2),
                borderRadius: moderateScale(6, 0.2)/2,
                backgroundColor: 'yellow',
              }}></View>
            <View
              style={{
                width: moderateScale(12, 0.2),
                height: moderateScale(12, 0.2),
                borderRadius: moderateScale(12, 0.2)/2,
                backgroundColor: 'red',
              }}></View>
          </View>
          <View style={{width: '90%', borderColor: 'red'}}>
            <View
              style={{
                flexDirection: 'row',
                // width: windowWidth * 0.8,

                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CustomText>Pick Location</CustomText>
              <Icon as={AntDesign} name="plus" />
            </View>
            <Divider  color={'black'} width={'full'} borderWidth={0.2} borderColor={'#b0adad'} />
            <View
              style={{
                marginTop: moderateScale(22, 0.2),
                // width: windowWidth * 0.8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                
              }}>
              <CustomText>Drop Location</CustomText>
              <Icon as={Entypo} name="cross" />
            </View>
          </View>
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
        <Marker coordinate={origin} />
        <MapViewDirections
          origin={origin}
          destination={destination}
          strokeColor="blue"
          strokeWidth={10}
          apikey="AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc"
        />
        <Marker coordinate={destination} />
      </MapView>
    </View>
  );
};

export default EnterLocationScreen;

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
    backgroundColor: 'red',
  },
  locBox: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.4,
    // borderRadius:moderateScale(12,0.2),

    // position:'absolute',

    zIndex: 1,
    // backgroundColor:'red'
  },
});
