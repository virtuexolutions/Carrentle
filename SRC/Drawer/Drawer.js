import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SetUserRole, setUserLogoutAuth} from '../Store/slices/auth';
import {setUserLogOut} from '../Store/slices/common';
import navigationService from '../navigationService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Drawer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  // console.log('🚀 ~ file: Drawer.js:19 ~ Drawer ~ token:', token);

  const role = useSelector(state => state.authReducer.role);
  // console.log('🚀 ~ file: Drawer.js:29 ~ Drawer ~ role:', role);

  const adminData = [
    {
      name: 'Home',
      iconName: 'home',
      iconType: Entypo,
      onPress: () => {
        // navigation.navigate('HomeScreen');
      },
    },
    {
      name: 'my journey ',
      iconName: 'home',
      iconType: Entypo,
      onPress: () => {
        // navigation.navigate('HomeScreen');
      },
    },
    {
      name: 'Book a ride ',
      iconName: 'home',
      iconType: Entypo,
      onPress: () => {
        // navigation.navigate('HomeScreen');
      },
    },
    {
      name: 'my wallet ',
      iconName: 'home',
      iconType: Entypo,
      onPress: () => {
        // navigation.navigate('HomeScreen');
      },
    },
    {
      name: 'campaigns ',
      iconName: 'home',
      iconType: Entypo,
      onPress: () => {
        // navigation.navigate('HomeScreen');
      },
    },
    {
      name: 'help',
      iconName: 'lock',
      iconType: Entypo,
      onPress: () => {
        // navigation.navigate('ChangePassword');
      },
    },
    {
      name: 'terms & policies',
      iconName: 'home',
      iconType: Entypo,
      onPress: () => {
        // navigation.navigate('HomeScreen');
      },
    },

    {
      name: 'Log out',
      iconName: 'logout',
      iconType: MaterialCommunityIcons,
      onPress: () => {
        dispatch(setUserLogoutAuth());
        dispatch(setUserLogOut());
        dispatch(SetUserRole(''));
      },
    },
  ];

 
  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <LinearGradient
        style={{
          // width: windowWidth *0.6,
          height: windowHeight,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#ffffff', '#ffffff']}>
        <View
          style={{
            height: windowHeight * 0.2,
            width: '100%',
            backgroundColor: '#D2E4E4',
          }}>
          {token == null ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: 'black',
                height: windowHeight * 0.2,
              }}>
              <View style={styles.Profile}>
                <CustomImage
                  resizeMode={'cover'}
                  source={require('../Assets/Images/men.png')}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(20, 0.6),
                  marginLeft: moderateScale(10, 0.3),
                  // backgroundColor: 'purple',
                  // top: 50,
                }}
                isBold
                onPress={() => {
                  navigationService.navigate('LoginScreen');
                }}>
                {`Login/Signup`}
              </CustomText>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                marginTop: moderateScale(20, 0.3),
                alignItems: 'center',
                marginLeft: moderateScale(10, 0.3),
              }}>
              <View style={styles.Profile}>
                <CustomImage
                  resizeMode={'cover'}
                  source={require('../Assets/Images/logo.png')}
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <View style={{marginLeft: moderateScale(10, 0.3)}}>
                <CustomText
                  style={{fontSize: moderateScale(16, 0.6), color: Color.black}}
                  isBold>
                  {userData?.name}
                </CustomText>

                <CustomText
                  style={{
                    width: windowWidth * 0.4,
                    fontSize: moderateScale(11, 0.6),
                    color: Color.black,
                  }}>
                  {userData?.email}
                </CustomText>
              </View>
            </View>
          )}
        </View>
        <View
          style={{
            marginLeft: moderateScale(10, 0.3),
            marginTop: moderateScale(10, 0.3),
          }}>
          {adminData.map((item, index) => (
            <>
              <TouchableOpacity
                onPress={item?.onPress}
                style={{
                  width: windowWidth * 0.5,
                  // borderBottomWidth: 0.5,
                  borderColor: Color.black,
                  margin: moderateScale(15, 0.3),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name={item?.iconName}
                  as={item?.iconType}
                  size={moderateScale(20, 0.3)}
                  color={Color.black}
                  onPress={item?.onPress}
                />
                <CustomText
                  style={{
                    fontSize: moderateScale(14, 0.6),
                    color: Color.black,
                    marginLeft: moderateScale(10, 0.3),
                  }}>
                  {item.name}
                </CustomText>
              </TouchableOpacity>
            </>
          ))}
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: windowWidth * 0.14,
            height: windowWidth * 0.14,
            borderRadius: (windowWidth * 0.14) / 1,
            backgroundColor: Color.white,
            position: 'absolute',
            bottom: 40,
            left: 20,
            elevation: 10,
          }}>
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            name="chevron-left"
            as={Feather}
            size={moderateScale(25)}
            color={Color.black}
          />
        </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  Profile: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: (windowWidth * 0.2) / 1,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
  },
});
