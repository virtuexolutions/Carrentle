import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {windowHeight, windowWidth} from '../Utillity/utils';
import MapViewDirections from 'react-native-maps-directions';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import {Divider, Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import CustomImage from '../Components/CustomImage';
import Header from '../Components/Header';

const BoardingPointScreen = () => {
  console.log('first');
  const origin = {latitude: 37.3285792, longitude: -122.0356209};
  const destination = {latitude: 37.3320305, longitude: -122.0355326};

  return (
  
    <View style={styles.container}>
      {/* <Header/> */}
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

            flexDirection: 'row',
            // marginTop: moderateScale(4, 0.2),
            backgroundColor: '#f3f3f3f8',
            // borderWidth:1,
            borderRadius: moderateScale(10, 0.2),
            padding: moderateScale(12, 0.2),
          }}>
          <View style={{width: '10%', gap: moderateScale(6,0.3), alignItems:'center', marginTop: moderateScale(5,0.2) }}>
          <Entypo name='dot-single'
              size={moderateScale(34,0.2)}
              style={{position: 'absolute', 
              left: moderateScale(-1,0.2),
              top: moderateScale(-5,0.2)}}
              color={'#ff0033'}
          />
              <Entypo name='dots-two-vertical' 
              size={moderateScale(24,0.2)}
              style={{position: 'absolute', top:moderateScale(19,0.2)}}

              color={'#fcf36b'}/>
  
              <Entypo name='dots-two-vertical' 
              size={moderateScale(24,0.2)}
              style={{position: 'absolute', bottom: 9}}
              color={'#fcf36b'}/>
              <Entypo name='dot-single'
              size={moderateScale(34,0.2)}
              style={{position: 'absolute', 
              left: moderateScale(-1,0.2),
              top: moderateScale(51,0.2)}}
              color={'#ff0033'}
          />
         
          </View>
          <View style={{width: '90%', borderColor: 'red'}}>
            <View
              style={{
                flexDirection: 'row',
                // width: windowWidth * 0.8,
                padding:moderateScale(7,0.2),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CustomText>Pick Location</CustomText>
              <Icon as={AntDesign} name="plus" />
            </View>
            <Divider marginTop={moderateScale(4,0.2)}  color={'black'} width={'full'} borderWidth={0.2} borderColor={'#b0adad'} />
            <View
              style={{
                marginTop: moderateScale(6, 0.2),
                // width: windowWidth * 0.8,
                padding:moderateScale(7,0.2),

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
          {/* <CustomImage
          source={require('../Assets/Images/men.png')}
          style={{width: windowWidth * 0.12}}
          /> */}
          <View style={styles.profile}>
            <View style={{width: windowWidth * 0.19, height:windowWidth * 0.19, overflow: 'hidden', borderRadius: (windowWidth * 0.19)/2}}>
              <CustomImage source={require('../Assets/Images/men.png') } style={{width: "100%", height:'100%'}}/>
            </View>
            <View>
              <CustomText>2013 Dodge Caravan</CustomText>
              <View style={{flexDirection:'row', gap: moderateScale(12,0.2)}}>
              <CustomText>4.5 Stars  </CustomText>
              <CustomText>ID. 11587</CustomText>

              </View>
              {/* ratings */}
              <View style={{flexDirection:'row', }}>
                <FontAwesome name='star' color={'#fee207'} size={moderateScale(17,0.2)}/>
                <FontAwesome name='star' color={'#fee207'} size={moderateScale(17,0.2)}/>
                <FontAwesome name='star' color={'#fee207'} size={moderateScale(17,0.2)}/>
                <FontAwesome name='star' color={'#fee207'} size={moderateScale(17,0.2)}/>
                <FontAwesome name='star-o' color={'grey'} size={moderateScale(17,0.2)}/>
              </View>
            </View>
          </View>
          <Divider marginTop={moderateScale(5,0.2)}
          marginX={moderateScale(15,0.2)}
          color={'black'} width={'72'} borderWidth={0.2} borderColor={'#b0adad'} />
          <View style={styles.rideDetails}>
            <View style={{flexDirection:'row', alignItems:'center',gap: moderateScale(10,0.2)}}>
              <Icon as={Ionicons} name='car-sport' color={'black'} size={moderateScale(22,0.2)}/>
              <View>
                <CustomText isBpld>Car 2</CustomText>
                <CustomText style={{color:'grey'}}>$10.0</CustomText>
              </View>
            </View>
            <View style={{gap: moderateScale(2,0.2)}}>
            
                <CustomText isBpld>Distance</CustomText>
                <CustomText style={{color:'grey'}}>2.5 km</CustomText>
            
            </View>
            <View>
         
                <CustomText isBpld>Car 2</CustomText>
                <CustomText style={{color:'grey'}}>10 Mins</CustomText>
            </View>

          </View>
          <Divider marginTop={moderateScale(1,0.2)}
          marginX={moderateScale(15,0.2)}
          color={'black'} width={'72'} borderWidth={0.2} borderColor={'#b0adad'} />
          <View style={styles.actions}>
            <TouchableOpacity>
              <Icon as={Ionicons} name='chatbubble-outline' size={moderateScale(24,0.2)}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon as={Feather} name='phone' size={moderateScale(24,0.2)}/>
            </TouchableOpacity>
          </View>
        </View>
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
    width: windowWidth * 0.9,
    zIndex:1,
    backgroundColor:'white',
    borderRadius: moderateScale(14,0.3),
    position:'absolute',
    bottom:moderateScale(87,0.2),
    paddingVertical:moderateScale(10,0.2),
    paddingHorizontal:moderateScale(10,0.2)
    // padding:moderateScale(20,0.2)
  },
  profile:{
    flexDirection:'row',
    alignItems:'flex-end',
    gap:moderateScale(20,0.2)
  }, 
  rideDetails:{
    flexDirection:'row',
  
    justifyContent:'space-between',
    paddingVertical: moderateScale(2,0.2),
    paddingHorizontal:moderateScale(22,0.2)
  },
  actions:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal: moderateScale(20,0.2),
    paddingVertical: moderateScale(7,0.2),
  }
});
