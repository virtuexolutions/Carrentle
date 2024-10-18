import {View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomImage from '../Components/CustomImage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
// import {SetUserRole, setUserLogoutAuth} from '../Store/slices/auth';
// import {setUserLogOut} from '../Store/slices/common';

const Settings = () => {
  const userData = useSelector(state => state.commonReducer.userData);
  const dispatch = useDispatch();
  const options = [
    {
      id: 1,
      name: 'Profile',
      next: '>',
      onPress: () => {
        navigationService.navigate('Profile');
      },
    },
    {
      id: 2,
      name: 'Privacy Policy',
      next: '>',
      onPress: () => {
        navigationService.navigate('PrivacyPolicy');
      },
    },
    {
      id: 3,
      name: 'Donation History',
      next: '>',
      onPress: () => {
        navigationService.navigate('DonationHistory');
      },
    },
    {
      id: 4,
      name: 'Terms & Condition',
      next: '>',
      onPress: () => {
        navigationService.navigate('TermsAndConditions');
      },
    },
    // {
    //   id: 7,
    //   name: 'Account',
    //   next: '>',
    //   onPress: () => {
    //     navigationService.navigate('MyAccounts');
    //   },
    // },
    {
      id: 8,
      name: 'Help & support',
      next: '>',
      onPress: () => {
        navigationService.navigate('HelpAndSupport');
      },
    },
    {
      id: 9,
      name: 'Change Password',
      next: '>',
      onPress: () => {
        navigationService.navigate('ChangePasswordScreen');
      },
    },
    {
      id: 10,
      name: 'Logout',
      next: '>',
      onPress: () => {
        // dispatch(setUserLogOut());
        // dispatch(setUserLogoutAuth());
        // dispatch(setUserLogOut());
        // dispatch(SetUserRole(''));
        console.log('logout=======>')
        // navigationService.navigate('LoginScreen')
      },
    },
  ];
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.mainScreen}
      source={require('../Assets/Images/customerservice.png')}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <CustomImage
            resizeMode="contain"
            source={require('../Assets/Images/dummyUser1.png')}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'blue',
            }}
          />
        </View>
        <View style={styles.userInfo}>
          <CustomText style={styles.txt5}>DONNA W. WADE</CustomText>
          <CustomText style={styles.txt6}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed magna
            dolor, efficitur pulvinar placerat sed, auctor vestibulum elit.
          </CustomText>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((item, index) => (
          <TouchableOpacity
          onPress={item?.onPress}
            key={index}
            style={[styles.option, item.name === 'Logout' && styles.logout]}>
            <CustomText style={{color: '#FFFF'}}>{item.name}</CustomText>
            {item.name === 'Logout' ? (
              <Icon
                as={Ionicons}
                name="exit-outline"
                size={5}
                color={'#FFFF'}
              />
            ) : (
              <CustomText style={{color: '#FFFF'}}>{item.next}</CustomText>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
};

export default Settings;

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
  },
  imageContainer: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderColor: 'red',
    borderRadius: (windowWidth * 0.3) / 2,
    borderWidth: 2,
    overflow: 'hidden',
  },
  image: {
    // borderRadius:100,
    width: '100%',
    height: 200,
  },
  header: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 12,
  },
  userInfo: {
    marginRight: 24,
  },
  txt5: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFF',
  },
  txt6: {
    fontSize: 12,
    textAlign: 'left',
    width: windowWidth * 0.6, // fontWeight: 'bold',
    color: '#FFFF',
  },
  option: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#FFFF',
    borderBottomWidth: 1,
  },
  logout: {
    borderBottomWidth: 0,
  },
  optionsContainer: {
    paddingVertical: 12,
    paddingHorizontal: 13,
    marginHorizontal: 14,
    marginVertical: 15,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 2,
    borderRightWidth: 2,

    borderBottomColor: '#0000003D',
    borderColor: '#FFFF',
    borderRadius: 12,
  },
});
