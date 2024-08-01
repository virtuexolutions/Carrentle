import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { Rating } from 'react-native-ratings';
import CustomImage from '../Components/CustomImage';
import { Icon } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';

const BookingCard = ({ username, isSentRequest, pickupLocation, dropoffLocation, distance, time }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.userImage}>
          <CustomImage
            style={{ height: '100%', width: '100%', overflow: 'hidden' }}
            source={require('../Assets/Images/men.png')}
          />
        </View>
        <View style={styles.rowInnerView}>
          <CustomText style={styles.text}>{username}</CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Rating
              type="custom"
              startingValue={5}
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
                marginLeft: moderateScale(4, 0.3)
              }}>
              (8)
            </CustomText>
          </View>
        </View>
        <TouchableOpacity style={styles.btn}>
          <CustomImage source={require('../Assets/Images/phone.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <CustomImage source={require('../Assets/Images/message.png')} />
        </TouchableOpacity>
      </View>
      {isSentRequest ? null :
        <CustomText isBold style={styles.heading}>
          {riderName}
        </CustomText>
      }
      <View
        style={{
          paddingVertical: moderateScale(5, 0.6),
          flexDirection: 'row',
          paddingHorizontal: moderateScale(10, 0.6),
        }}>
        <Icon
          name="map-marker"
          as={FontAwesome}
          size={moderateScale(18, 0.6)}
          color={'#FF8A00'}
        />
        <CustomText
          style={[
            styles.text,
            {
              paddingHorizontal: moderateScale(10, 0.6),
            },
          ]}>
          {pickupLocation}
        </CustomText>
      </View>
      <View
        style={{
          paddingVertical: moderateScale(5, 0.6),
          flexDirection: 'row',
          paddingHorizontal: moderateScale(10, 0.6),
        }}>
        <Icon
          name="map-marker"
          as={FontAwesome}
          size={moderateScale(18, 0.6)}
          color={Color.darkBlue}
        />
        <CustomText
          style={[
            styles.text,
            {
              paddingHorizontal: moderateScale(10, 0.6),
            },
          ]}>
          {dropoffLocation}
        </CustomText>
      </View>

      {isSentRequest ? null :
        <>
          <CustomText
            style={[
              styles.text,
              {
                paddingHorizontal: moderateScale(15, 0.6),
              },
            ]}>
            Available seats
          </CustomText>

          <CustomText
            style={[
              styles.text,
              {
                paddingHorizontal: moderateScale(15, 0.6),
              },

            ]}>02</CustomText>

        </>
      }
      <View style={isSentRequest ? styles.details_view : styles.distanceView}>
        <View style={{ flexDirection: 'row' }}>
          {isSentRequest ? null :
            <>
              <View
                style={{ height: windowHeight * 0.028, width: windowWidth * 0.1 }}>
                <CustomImage
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={require('../Assets/Images/Icon.png')}
                />
              </View>

              <CustomText isBold style={[styles.text, {
                paddingHorizontal: moderateScale(5, .6)
              }]}>car no 251</CustomText>
            </>
          }
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'flex-start', marginTop: moderateScale(10, 0.3) }}>
          <View>
            <CustomText isBold style={styles.text2}>
              Distance
            </CustomText>
            <CustomText style={styles.text1}>{distance + " Km"}</CustomText>
          </View>
          <View style={{ marginLeft: moderateScale(20, 0.3) }}>
            <CustomText isBold style={styles.text2}>
              time
            </CustomText>
            <CustomText style={styles.text1}>{time}</CustomText>
          </View>
        </View>
      </View>
    </View>
  )
}

export default BookingCard

const styles = StyleSheet.create({
  card: {
    height: windowHeight * 0.25,
    width: windowWidth * 0.9,
    borderRadius: moderateScale(10, 6),
    borderWidth: 2,
    borderColor: '#29478A',
    marginBottom: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 120,
    zIndex: 1,
    paddingHorizontal: moderateScale(12, 0.3),
    opacity: 0.9
  },
  imageContainer: {
    height: windowHeight * 0.28,
    overflow: 'hidden',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: moderateScale(10, 0.6),
  },
  userImage: {
    overflow: 'hidden',
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.06) / 2,
  },
  rowInnerView: {
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(5, 0.6),
    width: windowWidth * 0.54
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: 'bold'
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
  },
  text1: {
    fontSize: moderateScale(10, 0.6),
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
  },
  details_view: {
    paddingVertical: moderateScale(10, 0.6),
    marginHorizontal: moderateScale(15, 0.6),
  },
  btn: {
    height: windowHeight * 0.04,
    width: windowHeight * 0.04,
    borderRadius: windowHeight * 0.04 / 2,
    backgroundColor: '#0779fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(3, .3)
  }
})