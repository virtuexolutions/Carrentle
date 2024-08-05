import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import CustomImage from '../Components/CustomImage';
import PaymentCard from '../Components/PaymentCard';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MyWallet = ({ navigation }) => {
  const paymentHistoryList = [
    {
      id: 1,
      profilepic: require('../Assets/Images/profile_1.png'),
      name: 'Frederick A.Dawkins',
      pickupLocatoion: 'Fannie Street San Angelo, Texas',
      dropOffLocation: 'Neville Street Salem, Colorado',
      distance: '63 Km',
      price: 250,
    },
    {
      id: 2,
      profilepic: require('../Assets/Images/profile_2.png'),
      name: 'Frederick A.Dawkins',
      pickupLocatoion: 'Fannie Street San Angelo, Texas',
      dropOffLocation: 'Neville Street Salem, Colorado',
      distance: '63 Km',
      price: 250,
    },
    {
      id: 3,
      profilepic: require('../Assets/Images/profile_3.png'),
      name: 'Frederick A.Dawkins',
      pickupLocatoion: 'Fannie Street San Angelo, Texas',
      dropOffLocation: 'Neville Street Salem, Colorado',
      distance: '63 Km',
      price: 250,
    },
  ];
  return (
    <ScreenBoiler
      showHeader
      navigation={navigation}
      title={'My Wallet'}
      headerColor={['white', 'white']}
      hideUser={false}
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={['#71B0F0', '#4680D1', '#00309E']}
          locations={[0, 0.5, 1]}
          // start={{ x: 0.5, y: 0 }}
          // end={{ x: 0, y: 1.5 }}
          // colors={['#00309E', '#79B9F6', '#FFFFFF']}
          style={styles.card_view}>
          <View style={styles.tab_bar_view}>
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles.tab_bar,
                {
                  borderBottomLeftRadius: moderateScale(20, 0.6),
                  borderTopLeftRadius: moderateScale(20, 0.6),
                  backgroundColor: Color.white,
                },
              ]}>
              <CustomText style={[styles.tab_bar_text, { color: Color.black }]}>
                Cash
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles.tab_bar,
                {
                  borderBottomRightRadius: moderateScale(20, 0.6),
                  borderTopRightRadius: moderateScale(20, 0.6),
                  backgroundColor: 'transparent',
                },
              ]}>
              <CustomText style={[styles.tab_bar_text, { color: Color.white }]}>
                Discount
              </CustomText>
            </TouchableOpacity>
          </View>
          <View>
            <CustomText isBold={true} style={styles.payment}>
              $326.00
            </CustomText>
            <CustomText style={styles.text}>Total Earn</CustomText>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.payment_method_button}>
            <View style={styles.payment_method_btn}>
              <CustomImage
                source={require('../Assets/Images/Group13.png')}
                style={{
                  width: windowHeight * 0.04,
                  height: windowHeight * 0.04,
                }}
              />
            </View>
            <CustomText isBold={true} style={styles.paymet_btn_text}>
              WithDraw
            </CustomText>
            <Icon
              as={AntDesign}
              name="right"
              size={moderateScale(15, 0.6)}
              color={Color.grey}
            />
          </TouchableOpacity>
        </LinearGradient>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={paymentHistoryList}
          renderItem={(item, index) => {
            return <PaymentCard data={item?.item} />;
          }}
        />
      </View>
    </ScreenBoiler>
  );
};

export default MyWallet;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white,
    paddingVerticalL: moderateScale(20, 0.3),
    alignItems: 'center',
  },
  card_view: {
    height: windowHeight * 0.21,
    width: windowWidth * 0.9,
    borderRadius: moderateScale(20, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(45, 0.3),
  },
  payment: {
    fontSize: moderateScale(22, 0.6),
    color: Color.white,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: moderateScale(12, 0.6),
    color: Color.white,
    textTransform: 'uppercase',
  },
  payment_method_button: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.5,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: moderateScale(130, 0.6),
    borderRadius: moderateScale(20, 0.3),
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15),
  },
  paymet_btn_text: {
    fontSize: 15,
    color: Color.black,
    paddingHorizontal: moderateScale(5, 0.6),
  },
  tab_bar_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(40, 0.3),
    width: windowWidth * 0.7,
    backgroundColor: 'transparent',
    borderRadius: moderateScale(20, 0.6),
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
    marginBottom: moderateScale(4, 0.6),
    borderColor: Color.white,
    borderWidth: 1.5,
  },
  selected_tabBar: {
    backgroundColor: 'transparent',
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab_bar: {
    backgroundColor: Color.white,
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payment_method_btn: {
    height: moderateScale(30, 0.3),
    width: moderateScale(30, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderRadius: moderateScale(20, 0.6),
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
  tab_bar_text: { fontSize: moderateScale(12, 0.3), color: Color.black },
  selected_tab_text: { fontSize: moderateScale(12, 0.3), color: Color.white },
});
