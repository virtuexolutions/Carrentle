import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { windowHeight, windowWidth } from '../Utillity/utils';
import MapViewDirections from 'react-native-maps-directions';
import { moderateScale } from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import { Divider, Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import CustomImage from '../Components/CustomImage';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import SearchLocationModal from '../Components/SearchLocationModal';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import { FONTS } from '../Constant/theme';

const BoardingPointScreen = () => {
  console.log('first');
  const navigation = useNavigation();
  const origin = { latitude: 37.3285792, longitude: -122.0356209 };
  const destination = { latitude: 37.3320305, longitude: -122.0355326 };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickupLocation, setPickUpLocation] = useState({});
  const [dropOffLocation, setDropOffLocation] = useState({});
  const [locationType, setLocationType] = useState('pickup');

  return (
    <View style={styles.container}>
      <Header
        index
        title={'Boarding Point'}
        textstyle={{ color: Color.darkGray, ...FONTS.PoppinsBold14 }}
        headerColor={['white', 'white']}
        hideUser={false}
      />
      <ImageBackground
        style={{ width: windowWidth, height: windowHeight, alignItems: 'center', paddingBottom: moderateScale(12, 0.2) }}
        source={require('../Assets/Images/map.png')}
      >
        <View style={styles.locBox}>
          <View
            style={{
              width: windowWidth * 0.90,
              backgroundColor: 'white',
              // borderWidth: 1,
              alignSelf: 'center',
              borderRadius: moderateScale(10, 0.2),
              padding: moderateScale(12, 0.2),
            }}>
            <CustomText style={{ color: Color.grey, ...FONTS.poppinsRegular10 }}>Where to go from here?</CustomText>
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
            <View
              style={{
                width: '10%',
                gap: moderateScale(6, 0.3),
                alignItems: 'center',
                marginTop: moderateScale(5, 0.2),
                // backgroundColor : 'red'
              }}>
              <Entypo
                name="dot-single"
                size={moderateScale(34, 0.2)}
                style={{
                  position: 'absolute',
                  left: moderateScale(-1, 0.2),
                  top: moderateScale(-5, 0.2),
                }}
                color={'#ff0033'}
              />
              <Entypo
                name="dots-two-vertical"
                size={moderateScale(24, 0.2)}
                style={{ position: 'absolute', top: moderateScale(19, 0.2) }}
                color={'#fcf36b'}
              />

              <Entypo
                name="dots-two-vertical"
                size={moderateScale(24, 0.2)}
                style={{ position: 'absolute', bottom: 9 }}
                color={'#fcf36b'}
              />
              <Entypo
                name="dot-single"
                size={moderateScale(34, 0.2)}
                style={{
                  position: 'absolute',
                  left: moderateScale(-1, 0.2),
                  top: moderateScale(51, 0.2),
                }}
                color={'#ff0033'}
              />
            </View>
            <View style={{ width: windowWidth * 0.7 }}>
              <TouchableOpacity
                onPress={() => {
                  setLocationType('pickup');
                  setIsModalVisible(true);
                }}
                style={{
                  flexDirection: 'row',
                  padding: moderateScale(7, 0.6),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <CustomText
                  numberOfLines={3}
                  style={{
                    width: windowWidth * 0.6,
                    color: Color.grey
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
              <Divider
                marginTop={moderateScale(4, 0.2)}
                color={Color.grey}
                width={'full'}
                borderWidth={0.1}
                borderColor={'#b0adad'}
              />
              <TouchableOpacity
                onPress={() => {
                  setLocationType('dropOff');
                  setIsModalVisible(true);
                }}
                style={{
                  marginTop: moderateScale(6, 0.2),
                  // width: windowWidth * 0.8,
                  padding: moderateScale(7, 0.2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <CustomText
                  numberOfLines={3}
                  style={{
                    width: windowWidth * 0.6,
                    color: Color.grey,
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

        {/* <MapView
        provider={PROVIDER_GOOGLE}
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

        <TouchableOpacity
          style={styles.bottomContainer}>
          {/* <CustomImage
          source={require('../Assets/Images/men.png')}
          style={{width: windowWidth * 0.12}}
          /> */}
          <View style={styles.profile}>
            <View
              style={{
                width: windowWidth * 0.16,
                height: windowWidth * 0.16,
                overflow: 'hidden',
                borderRadius: (windowWidth * 0.19) / 2,
              }}>
              <CustomImage
                resizeMode={'cover'}
                source={require('../Assets/Images/men.png')}
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <View>
              <CustomText style={{ color: '#44433F', ...FONTS.poppinsRegular11 }}>2013 Dodge Caravan</CustomText>
              <View style={{ flexDirection: 'row', gap: moderateScale(12, 0.2) }}>
                <CustomText style={{ color: '#44433F', ...FONTS.poppinsRegular11 }}>4.5 Stars </CustomText>
                <CustomText style={{ color: '#44433F', ...FONTS.poppinsRegular11 }}>ID. 11587</CustomText>
              </View>
              {/* ratings */}
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome
                  name="star"
                  color={'#fee207'}
                  size={moderateScale(17, 0.2)}
                />
                <FontAwesome
                  name="star"
                  color={'#fee207'}
                  size={moderateScale(17, 0.2)}
                />
                <FontAwesome
                  name="star"
                  color={'#fee207'}
                  size={moderateScale(17, 0.2)}
                />
                <FontAwesome
                  name="star"
                  color={'#fee207'}
                  size={moderateScale(17, 0.2)}
                />
                <FontAwesome
                  name="star-o"
                  color={'grey'}
                  size={moderateScale(17, 0.2)}
                />
              </View>
            </View>
          </View>
          <Divider
            marginTop={moderateScale(5, 0.2)}
            marginX={moderateScale(15, 0.2)}
            color={Color.grey}
            width={'80'}
            borderWidth={0.1}
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
                <CustomText style={{ color: 'grey' }}>$10.0</CustomText>
              </View>
            </View>
            <View style={{ gap: moderateScale(2, 0.2) }}>
              <CustomText isBpld>Distance</CustomText>
              <CustomText style={{ color: 'grey' }}>2.5 km</CustomText>
            </View>
            <View>
              <CustomText isBpld>Car 2</CustomText>
              <CustomText style={{ color: 'grey' }}>10 Mins</CustomText>
            </View>
          </View>
          <Divider
            marginTop={moderateScale(1, 0.2)}
            marginX={moderateScale(15, 0.2)}
            color={Color.grey}
            width={'80'}
            borderWidth={0.1}
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
                  navigation.navigate('BoardingPointDetails');
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
      </ImageBackground>
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
});
