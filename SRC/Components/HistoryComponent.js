import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {Rating} from 'react-native-ratings';
import CustomImage from '../Components/CustomImage';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color, position} from 'native-base/lib/typescript/theme/styled-system';

const HistoryComponent = () => {
  const newLocal = 'red';
  return (
    <View style={[styles.card, styles.shadowporp]}>
      <View style={styles.row}>
        <View style={styles.userImage}>
          <CustomImage
            style={{height: '100%', width: '100%', overflow: 'hidden'}}
            source={require('../Assets/Images/men.png')}
          />
        </View>
        <View style={styles.rowInnerView}>
          <CustomText isBold style={styles.text}>
            steven bowen
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.5,
              justifyContent: 'space-between',
            }}>
            <CustomText style={styles.coloredtext}>steven bowen</CustomText>
            <CustomText style={styles.coloredtext}>steven bowen</CustomText>
          </View>
        </View>
        <View style={styles.pay}>
          <CustomText
            numberOfLines={1}
            isBold
            style={[
              styles.text,
              {
                textAlign: 'center',
              },
            ]}>
            $25.00
          </CustomText>
          <CustomText
            style={{
              color: Color.darkGray,
              width: windowWidth * 0.2,
              fontSize: moderateScale(12, 0.6),
              paddingHorizontal: moderateScale(10, 0.6),
            }}>
            22 km
          </CustomText>
        </View>
      </View>
      <View
        style={{
          // backgroundColor: 'red',
          // height: windowHeight * 0.17,
          width: windowWidth * 0.9,
          paddingHorizontal:moderateScale(15,.6)
        }}>
        <CustomText 
         style={styles.pickup}>
          PICK UP LOCATION
        </CustomText>
        <CustomText 
        numberOfLines={1}
        
         style={[styles.pickup,{
          fontSize:moderateScale(13,.6),
          width:windowWidth*0.6,
          paddingBottom:moderateScale(12,.6)
         }]}>
          7985 SWIFT VILLAGE 
        </CustomText>
        <CustomText 
         style={styles.pickup}>
          DROP OFF LOCATION
        </CustomText>
        <CustomText 
        numberOfLines={1}
        
         style={[styles.pickup,{
          fontSize:moderateScale(13,.6),
          width:windowWidth*0.6,
          // backgroundColor:'red'
         }]}>
           105 WILLIAM ST.chicago ,us

        </CustomText>
      </View>
      <CustomText 
         style={[styles.pickup,{
          position:'absolute',
          bottom:15,
          right :20
         }]}>
          date :24/4/24
        </CustomText>
    </View>
  );
};

export default HistoryComponent;

const styles = StyleSheet.create({
  card: {
    height: windowHeight * 0.23,
    width: windowWidth * 0.9,
    borderRadius: moderateScale(5, 6),
    borderWidth: 1,
    borderColor: ' rgba(0,0,0,0.05)',
    // backgroundColor:'pink',
    marginBottom: moderateScale(20, 0.6),
  },
  pay: {width: windowWidth * 0.2, paddingHorizontal: moderateScale(10, 0.6)},

  // shadowporp: {
  //   shadowColor: 'rgba(0,0,0,0.19)',
  //   shadowOffset: {
  //     width: 1,
  //     height: 8,
  //   },
  //   shadowOpacity: 0.4,
  //   shadowRadius: 6.68,
  //   elevation: 0.1,
  // },

  imageContainer: {
    height: windowHeight * 0.28,
    overflow: 'hidden',
    width: '100%',
  },
  pickup:{
fontSize:moderateScale(10,.6)
  },
  coloredtext: {
    width: windowWidth * 0.24,
    fontSize: moderateScale(10, 0.6),
    backgroundColor: Color.cartheme1,
    padding: moderateScale(2, 0.6),
    color: 'white',
    paddingHorizontal: moderateScale(10, 0.6),
    borderRadius: moderateScale(10, 0.6),
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
  userImage: {
    overflow: 'hidden',
    height: windowHeight * 0.06,
    width: windowHeight * 0.06,
    borderRadius: (windowHeight * 0.06) / 2,
  },
  rowInnerView: {
    paddingHorizontal: moderateScale(10, 0.6),
    width: windowWidth * 0.54,
    // backgroundColor:'red'
  },
  text: {
    fontSize: moderateScale(13, 0.6),
    paddingBottom: moderateScale(3, 0.6),
  },

  heading: {
    paddingHorizontal: moderateScale(15, 0.6),
    fontSize: moderateScale(17, 0.6),
  },
  distanceView: {
    paddingVertical: moderateScale(10, 0.6),
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: moderateScale(15, 0.6),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.lightGrey,
  },

  btn: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.49,
    alignItems: 'center',
    paddingTop: moderateScale(10, 0.6),

    // justifyContent:'space-between'
  },
});
