import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import Header from '../Components/Header';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import Color from '../Assets/Utilities/Color';
import { Card } from 'native-base';
import HistoryComponent from '../Components/HistoryComponent';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'native-base'

const PaymentHistory = () => {
  const navigation = useNavigation()

  const dummyArray = [
    {
      id: 1,
      carN0: 'car no2',
      ratings: 4.5,
      carModel: '2013 dodge caravan',
      userImage: require('../Assets/Images/men.png'),
      carimage: require('../Assets/Images/car1.png'),
      ratingCount: '4.0',
      time: '3 mint',
      distance: '0.2 km',
      availableSeat: 2,
      pickUppoint: 'fannie street san angelo, texas',
      dropLocation: 'navile street salem colorado',
    },
    {
      id: 2,
      carN0: 'car no3',
      ratings: 4.1,
      time: '5 mint',
      ratingCount: '3.0',

      carModel: '2013 dodge caravan',
      userImage: require('../Assets/Images/dummyUser.png'),
      carimage: require('../Assets/Images/car3.png'),
      distance: '0.4 km',
      availableSeat: 4,
      pickUppoint: 'fannie street san angelo, texas',
      dropLocation: 'navile street salem colorado',
    },
    {
      id: 3,
      carN0: 'car no22',
      ratings: 4.2,
      ratingCount: '4.0',
      time: '10 mint',
      distance: '0.5 km',

      carModel: '2013 dodge caravan',
      userImage: require('../Assets/Images/dummyUser.png'),
      carimage: require('../Assets/Images/car4.png'),
      availableSeat: 3,
      pickUppoint: 'fannie street san angelo, texas',
      dropLocation: 'navile street salem colorado',
    },
    {
      id: 4,
      carN0: 'car no12',
      ratings: 3.5,
      ratingCount: '3.0',
      time: '3 mint',
      distance: '0.4 km',

      carModel: '2013 dodge caravan',
      userImage: require('../Assets/Images/dummyman1.png'),
      carimage: require('../Assets/Images/car3.png'),
      availableSeat: 2,
      pickUppoint: 'fannie street san angelo, texas',
      dropLocation: 'navile street salem colorado',
    },
    {
      id: 5,
      carN0: 'car no22',
      ratings: 2.9,
      time: '20 mint',

      carModel: '2013 dodge caravan',
      userImage: require('../Assets/Images/dummyUser1.png'),
      carimage: require('../Assets/Images/car4.png'),
      ratingCount: '2.0',
      distance: '0.11 km',
      availableSeat: 1,
      pickUppoint: 'fannie street san angelo, texas',
      dropLocation: 'navile street salem colorado',
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: moderateScale(150, 0.6),
        // paddingHorizontal :moderateScale(20,.6)
      }}
      showsVerticalScrollIndicator={false}
      style={{
        minHeight: windowHeight,
        backgroundColor: 'white',
      }}>

      <Header showBack={true} title={'payment History'} headerColor={['white', 'white']} />

      {/* <View style={styles.row}>
        <View style={styles.container}>
          <View style={styles.image}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../Assets/Images/caricon.png')}
            />
          </View>
          <View
            style={{
              paddingHorizontal: moderateScale(9, 0.6),
              justifyContent: 'center',
            }}>
            <CustomText
              
              style={[
                styles.text,
                {
                  fontSize: moderateScale(12, 0.6),
                },
              ]}>
              total jobs
            </CustomText>
            <CustomText
            isBold
              style={[
                styles.text,
                {
                  fontSize: moderateScale(13, 0.6),
                },
              ]}>
              10
            </CustomText>
          </View>
        </View>
        <View style={[styles.container,{
          borderRadius:moderateScale(10,.6)
        }]}>
          <View
            style={[
              styles.image,
              {height: windowHeight * 0.053, width: windowWidth * 0.1},
            ]}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../Assets/Images/coin.png')}
            />
          </View>
          <View
            style={{
              paddingHorizontal: moderateScale(9, 0.6),
              justifyContent: 'center',
            }}>
            <CustomText
             
              style={[
                styles.text,
                {
                  fontSize: moderateScale(12, 0.6),
                },
              ]}>
              total earning
            </CustomText>
            <CustomText
            isBold
              style={[
                styles.text,
                {
                  fontSize: moderateScale(13, 0.6),
                },
              ]}>
              1045
            </CustomText>
          </View>
        </View>
      </View> */}

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: moderateScale(10, 0.6),
          paddingHorizontal: moderateScale(18, 0.6),
        }}
        contentContainerStyle={{
          paddingBottom: moderateScale(10, 0.6),
        }}
        data={dummyArray}
        renderItem={(item, index) => {
          return <HistoryComponent item={item?.item} />;
        }}
      />
    </ScrollView>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.45,
    borderRadius: moderateScale(10, 0.6),
    height: windowHeight * 0.08,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    borderColor: Color.cartheme1,
    borderWidth: 1,
  },
  text: {
    textAlign: 'center',
  },
  row: {
    width: windowWidth,
    height: windowHeight * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  image: {
    height: windowHeight * 0.043,
    width: windowWidth * 0.12,
    padding: moderateScale(5, 0.6),
    marginTop: moderateScale(10, 0.6),
  },
  header: {
    width: windowWidth,
    paddingHorizontal: moderateScale(12, 0.3),
    paddingVertical: moderateScale(12, 0.2),
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  btn: {
    width: windowWidth * 0.09,
    backgroundColor: 'white',
    height: windowWidth * 0.09,
    justifyContent: 'center',
    elevation: 12,
    alignItems: 'center',
    borderRadius: (windowWidth * 0.09) / 2,
    zIndex: 1
  },

});
