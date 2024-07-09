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
import Feather from 'react-native-vector-icons/Feather';
import CustomImage from '../Components/CustomImage';
import CustomButton from '../Components/CustomButton';

const BoardingPointDetails = () => {
    const origin = {latitude: 37.3285792, longitude: -122.0356209};
    const destination = {latitude: 37.3320305, longitude: -122.0355326};
  return (
    <View style={styles.container}>
    {/* <Header/> */}

      
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: 37.3318456,
        longitude: -122.0296002,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}>
      <Marker coordinate={origin} 
      
      style={{width:15, height:10}}
      />
      {/* // icon={require('../Assets/Images/Marker.png')}/> */}
      {/* // image={require('../Assets/Images/Marker.png')}/> */}
      <MapViewDirections
        origin={origin}
        destination={destination}
        strokeColor="blue"
        strokeWidth={10}
        apikey="AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc"
      />
      <Marker coordinate={destination} 
      />
    </MapView>
    <View style={styles.bottomContainer}>
        <CustomText isBold style={{fontSize: moderateScale(21,0.2), color: "#636363"}}>You will arrive at 11 : 05</CustomText>
        <CustomText>12 min - 6 miles</CustomText>
        {/* <CustomImage
        source={require('../Assets/Images/men.png')}
        style={{width: windowWidth * 0.12}}
        /> */}
        <View style={styles.profile}>
          <View style={{width: windowWidth * 0.19, height:windowWidth * 0.19, overflow: 'hidden', borderRadius: (windowWidth * 0.19)/2}}>
            <CustomImage source={require('../Assets/Images/men.png') } style={{width: "100%", height:'100%'}}/>
          </View>
            <CustomText>Theodora j. GArdner </CustomText>
            <CustomText>2013 Dodge Caravan</CustomText>
            <CustomText isBold style={{color:'red'}}>$ 10.00</CustomText>
          <View>
            
            
          </View>
        </View>
         
        <View style={styles.actions}>
        <CustomButton
          onPress={() => {
            // navigation.navigate('HomeScreen')
          }}
          isGradient
          text={'Add Card'}
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
        <CustomButton
          onPress={() => {
            // navigation.navigate('HomeScreen')
          }}
        //   isGradient
          text={'QR Scan'}
          fontSize={moderateScale(14, 0.3)}
          textColor={"#F8A700"}
          borderWidth={1}
          borderColor={'#ffffffba'}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.9}
          height={windowHeight * 0.07}
          marginTop={moderateScale(20, 0.3)}
          bgColor={'white'}
          isBold
          // isGradient
        />
        </View>
      </View>
  </View>
    // <View>
    //   <Text>BoardingPointDetails</Text>
    // </View>
  )
}

export default BoardingPointDetails

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
      // height: windowHeight * 0.4,
      // borderRadius:moderateScale(12,0.2),
      marginTop: moderateScale(12,0.2),
      // position:'absolute',
  
      zIndex: 1,
      // backgroundColor:'red'
    },
    bottomContainer:{
      width: windowWidth,
    // height: windowHeight * 0.5,

      zIndex:1,
      backgroundColor:'#F8F8F8',
      borderRadius: moderateScale(24,0.3),
      position:'absolute',
      bottom:moderateScale(0,0.2),
      paddingVertical:moderateScale(40,0.2),
      paddingHorizontal:moderateScale(10,0.2)
      // padding:moderateScale(20,0.2)
    },
    profile:{
    //   flexDirection:'row',
      alignItems:'center',
      gap:moderateScale(5,0.2)
    }, 
    rideDetails:{
      flexDirection:'row',
    
      justifyContent:'space-between',
      paddingVertical: moderateScale(2,0.2),
      paddingHorizontal:moderateScale(22,0.2)
    },
    actions:{
      flexDirection:'column',
      justifyContent:'space-between',
      paddingHorizontal: moderateScale(20,0.2),
      paddingVertical: moderateScale(7,0.2),
    }
  });