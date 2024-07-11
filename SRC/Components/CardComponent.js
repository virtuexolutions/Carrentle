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

const CardComponent = () => {
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
          <CustomText style={styles.text}>2013 dodge caravan</CustomText>

          <CustomText style={{fontSize :moderateScale(13,.6)}}>
            4.5 sstars <CustomText style={{fontSize :moderateScale(13,.6)}}> id.11587</CustomText>{' '}
          </CustomText>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Rating
              type="custom"
              startingValue={5}
              ratingCount={5}
              imageSize={moderateScale(16, 0.3)}
              style={{
                width: windowWidth * 0.25,
                //   backgroundColor :'red'
              }}
              ratingBackgroundColor={'white'}
            />
          </View>
        </View>
      </View>
      <View style={styles.distanceView}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              // backgroundColor:'red',
              height: windowHeight * 0.027,
              width: windowWidth * 0.1,
              marginHorizontal: moderateScale(10, 0.6),
            }}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../Assets/Images/Icon.png')}
            />
          </View>
          <View>
            <CustomText isBold style={{fontSize: moderateScale(10, 0.6)}}>
              car 2
            </CustomText>
            <CustomText style={{fontSize: moderateScale(10, 0.6)}}>
              $10.00
            </CustomText>
          </View>
        </View>
        <View>
          <CustomText isBold style={styles.text2}>
            distance
          </CustomText>
          <CustomText style={styles.text1}>{'5 km'}</CustomText>
        </View>
        <View>
          <CustomText isBold style={styles.text2}>
            time
          </CustomText>
          <CustomText style={styles.text1}>{'dsdsds'}</CustomText>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              borderRightWidth: 1,
              borderColor: Color.lightGrey,
            },
          ]}>
          <Icon
            name={'message-circle'}
            as={Feather}
            size={moderateScale(28, 0.6)}
            color={Color.mediumGray}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Icon
            name={'call-outline'}
            as={Ionicons}
            size={moderateScale(28, 0.6)}
            color={Color.mediumGray}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  card: {
    height: windowHeight * 0.27,
    width: windowWidth * 0.9,
    borderRadius: moderateScale(5, 6),
    borderWidth: 1,
    borderColor:' rgba(0,0,0,0.05)',
    // backgroundColor:'pink',
    marginBottom: moderateScale(20, 0.6),
  },
  shadowporp: {shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.26,
    shadowRadius: 6.68,
    elevation: 1,
  },
 
  imageContainer: {
    height: windowHeight * 0.28,
    overflow: 'hidden',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
  userImage: {
    overflow: 'hidden',
    height: windowHeight * 0.1,
    width: windowHeight * 0.1,
    borderRadius: (windowHeight * 0.1) / 2,
  },
  rowInnerView: {
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    width: windowWidth * 0.54,
  },
  text: {
    fontSize: moderateScale(15, 0.6),
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
  },
  text1: {
    fontSize: moderateScale(9, 0.6),
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
