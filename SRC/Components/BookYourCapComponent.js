import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomButton from './CustomButton';
import {Rating} from 'react-native-ratings';
import Color from '../Assets/Utilities/Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {background, color, position} from 'native-base/lib/typescript/theme/styled-system';

const BookYourCapComponent = ({item}) => {
  console.log('🚀 ~ BookYourCapComponent ~ item :', item?.carN0);
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <View style={styles.imageContainer}>
        <CustomImage
          style={{height: '100%', width: '100%'}}
          source={item?.carimage}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.userImage}>
          <CustomImage
            style={{height: '100%', width: '100%', overflow: 'hidden'}}
            source={item?.userImage}
          />
        </View>
        <View style={styles.rowInnerView}>
          <CustomText style={styles.text}>{item?.carN0}</CustomText>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Rating
              type="custom"
              startingValue={item?.ratings}
              ratingCount={5}
              imageSize={moderateScale(8, 0.3)}
              style={{
                width: windowWidth * 0.1,
                // justifyContent: 'center',
                // backgroundColor: 'green',
              }}
              ratingBackgroundColor={'white'}
            />

            <CustomText
              //  isBold
              style={{
                fontSize: moderateScale(9, 0.6),
              }}>
              ({item?.ratingCount})
            </CustomText>
          </View>
        </View>
      </View>
      <CustomText isBold style={styles.heading}>
        2013 dodge caravan
      </CustomText>

      <View style={styles.distanceView}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{height: windowHeight * 0.028, width: windowWidth * 0.1}}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../Assets/Images/Icon.png')}
            />
          </View>
          <CustomText
            isBold
            style={[
              styles.text,
              {
                paddingHorizontal: moderateScale(5, 0.6),
                paddingVertical: moderateScale(5, 0.6),
              },
            ]}>
            {item?.carN0}
          </CustomText>
        </View>
        <View>
          <CustomText isBold style={styles.text2}>
            distance
          </CustomText>
          <CustomText style={styles.text1}>{item?.distance}</CustomText>
        </View>
        <View>
          <CustomText isBold style={styles.text2}>
            time
          </CustomText>
          <CustomText style={styles.text1}>{item?.time}</CustomText>
        </View>
      </View>
      <View style={styles.seatView}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              // paddingVertical :moderateScale(5,.6)

            }}>
            <Icon
              name="map-marker"
              as={FontAwesome}
              size={moderateScale(12, 0.6)}
              color={'#FF8A00'}
            />
            <CustomText
              style={[
                styles.text1,
                {
                  paddingBottom: moderateScale(10, 0.6),
                },
              ]}>
              {item?.pickUppoint}
            </CustomText>
          </View>
          <CustomText
            isBold
            style={[
              styles.text1,
              {

                position :'absolute',
                color: 'black',
                top:17,
                marginLeft :moderateScale(-7,.6),
                transform:[{ rotate: '-90deg'}] ,
              },
            ]}>
            -----
          </CustomText>

          <View
            style={{
              flexDirection: 'row',
              paddingVertical :moderateScale(10,.6)
            }}>
            <Icon
              name="map-marker"
              as={FontAwesome}
              size={moderateScale(12, 0.6)}
              color={'#72AFED'}
            />
            <CustomText style={styles.text1}>{item?.dropLocation}</CustomText>
          </View>
        </View>
        <View style={{
          marginTop :moderateScale(20,.3)
        }}>
          <CustomText style={styles.text2}>available seats</CustomText>
          <CustomText
            style={[
              styles.text1,
              {
                textAlign: 'center',
              },
            ]}>
            {item?.availableSeat}
          </CustomText>
        </View>
      </View>
      <CustomButton
        onPress={() => {
          // navigation.navigate('HomeScreen')
        }}
        text={'Book your cab'}
        fontSize={moderateScale(14, 0.3)}
        textColor={Color.white}
        borderWidth={2}
        borderColor={Color.white}
        borderRadius={moderateScale(30, 0.3)}
        width={windowWidth * 0.8}
        height={windowHeight * 0.06}
        marginTop={moderateScale(5, 0.3)}
        bgColor={Color.cartheme}
        isBold
        isGradient
        textTransform={'capitalize'}
      />
    </View>
  );
};

export default BookYourCapComponent;
const styles = StyleSheet.create({
  container: {
    // backgroundColor :'red',
    height: windowHeight * 0.63,
    width: windowWidth * 0.9,
    borderRadius: moderateScale(10, 6),
    borderWidth: 1,
    borderColor: '#DA30296B',
    marginBottom: moderateScale(20, 0.6),
  },
  // shadowprops :{
  //   shadowColor: 'black',
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 2,
  //   elevation: 5,

  // },
  shadowProp: {
    shadowColor: '#00000052',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 30,
    // elevation: 0.01,
  },
  imageContainer: {
    height: windowHeight * 0.28,
    overflow: 'hidden',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  userImage: {
    overflow: 'hidden',
    height: windowHeight * 0.06,
    width: windowHeight * 0.06,
    borderRadius: (windowHeight * 0.06) / 2,
  },
  rowInnerView: {
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
  text: {
    fontSize: moderateScale(11, 0.6),
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
    // backgroundColor:'red',
    paddingVertical: moderateScale(10, 0.6),
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderColor: 'red',
    marginHorizontal: moderateScale(15, 0.6),
  },
  seatView: {
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(8, 0.6),
    flexDirection: 'row',
  },
});
