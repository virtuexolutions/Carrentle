import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Rating} from 'react-native-ratings';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {baseUrl} from '../Config';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from './CustomButton';
import CustomImage from './CustomImage';
import CustomText from './CustomText';

const BookYourCapComponent = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, styles.shadowprops]}>
      <View style={styles.imageContainer}>
        <CustomImage
          style={{height: '100%', width: '100%'}}
          source={{uri: baseUrl + item?.image}}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.rowInnerView}>
          <CustomText style={styles.text}>{item?.no}</CustomText>
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
        {item?.name}
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
            status
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: item?.status === 'active' ? 'green' : 'red',
                height: 8,
                width: 8,
                borderRadius: moderateScale(20, 0.3),
                marginRight: moderateScale(2, 0.6),
              }}
            />
            <CustomText style={styles.text1}>{item?.status}</CustomText>
          </View>
        </View>
        <View>
          <CustomText isBold style={styles.text2}>
            available seats
          </CustomText>
          <CustomText style={styles.text1}>{item?.seats + ' seats'}</CustomText>
        </View>
      </View>
      {/* <View style={styles.seatView}>
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
                position: 'absolute',
                color: 'black',
                top: 17,
                marginLeft: moderateScale(-7, 0.6),
                transform: [{ rotate: '-90deg' }],
              },
            ]}>
            -----
          </CustomText>

          <View
            style={{
              flexDirection: 'row',
              paddingVertical: moderateScale(10, 0.6),
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
        <View
          style={{
            marginTop: moderateScale(20, 0.3),
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
      </View> */}

      <CustomButton
        onPress={() => {
          navigation.navigate('BoardingPointScreen', {
            carData: item,
            date: 'BFN',
          });
        }}
        text={'Book Now'}
        textColor={Color.white}
        borderWidth={2}
        borderColor={Color.white}
        borderRadius={moderateScale(30, 0.3)}
        width={windowWidth * 0.7}
        height={windowHeight * 0.06}
        marginTop={moderateScale(10, 0.3)}
        bgColor={Color.cartheme}
        isBold
        isGradient
        textTransform={'capitalize'}
      />
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: windowWidth * 0.8,
          alignSelf: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: moderateScale(12, 0.6),
          marginTop: moderateScale(10, 0.6),
        }}>
        <CustomButton
          onPress={() => {
            navigation.navigate('BoardingPointScreen', {
              carData: item,
              date: 'BFN',
            });
          }}
          text={'Book for Now'}
          textColor={Color.white}
          borderWidth={2}
          borderColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.35}
          height={windowHeight * 0.06}
          marginTop={moderateScale(10, 0.3)}
          bgColor={Color.cartheme}
          isBold
          isGradient
          textTransform={'capitalize'}
        />
        <CustomButton
          onPress={() => {
            navigation.navigate('BoardingPointScreen', {
              carData: item,
              date: 'BFL',
            });
          }}
          text={'Book for Later'}
          textColor={Color.white}
          borderWidth={2}
          borderColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.35}
          height={windowHeight * 0.06}
          marginTop={moderateScale(10, 0.3)}
          bgColor={Color.cartheme}
          isBold
          isGradient
          textTransform={'capitalize'}
        />
      </View> */}
    </View>
  );
};

export default BookYourCapComponent;
const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.45,
    borderRadius: moderateScale(10, 6),
    borderWidth: 1.5,
    borderColor: '#DA30296B',
    marginVertical: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(6, 0.6),
  },
  imageContainer: {
    height: windowHeight * 0.2,
    overflow: 'hidden',
    width: '80%',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  userImage: {
    overflow: 'hidden',
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.06) / 2,
  },
  rowInnerView: {
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
    textAlign: 'center',
  },
  heading: {
    paddingHorizontal: moderateScale(15, 0.6),
    fontSize: moderateScale(17, 0.6),
  },
  distanceView: {
    paddingVertical: moderateScale(10, 0.6),
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderColor: 'red',
    marginTop: moderateScale(6, 0.6),
    marginHorizontal: moderateScale(15, 0.6),
  },
  seatView: {
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(8, 0.6),
    flexDirection: 'row',
  },
});
