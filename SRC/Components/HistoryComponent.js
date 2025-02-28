import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomImage from '../Components/CustomImage';
import { Icon } from 'native-base';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import { imageUrl } from '../Config';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HistoryComponent = ({ data, isStatus = true }) => {
  return (
    <View style={styles.main_view}>
      <View style={styles.user_image_view}>
        <CustomImage
          source={{ uri: imageUrl + data?.rider?.photo }}
          style={styles.image}
        />
      </View>
      <View style={{ marginLeft: moderateScale(12, 0.6) }}>
        <CustomText isBold={true} style={styles.user_name}>
          {data?.user?.name}
        </CustomText>
        {/* <View style={{ flexDirection: 'row', marginTop: moderateScale(2, 0.6) }}>
          <CustomText style={styles.text}>
            {moment(data?.rider?.updated_at).format('MM-DD-YYYY')}
          </CustomText>
          <CustomText style={[styles.text]}>{" " + "|" + " "}</CustomText>
          <CustomText style={styles.text}>
            {moment(data?.rider?.updated_at).format('HH-MM')}
          </CustomText>
        </View> */}
        <View style={styles.text_view2}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Icon size={moderateScale(12, 0.6)} name="map-pin" as={Feather} color={Color.orange} />
              <CustomText
                isBold={true}
                style={{
                  fontSize: 10,
                  paddingHorizontal: moderateScale(5, 0.6),
                }}>
                pickupLocatoion
              </CustomText>
              <CustomText
                isBold
                style={[
                  styles.text1,
                  {
                    position: 'absolute',
                    color: 'black',
                    paddingVertical: moderateScale(10, 0.6),
                    top: 11,
                    // marginLeft: moderateScale(-3, 0.6),
                    transform: [{ rotate: '-90deg' }],
                  },
                ]}>
                - - -
              </CustomText>
            </View>
            <CustomText
              numberOfLines={1}
              style={{
                fontSize: 9,
                width: windowWidth * 0.36,
                marginLeft: moderateScale(18, 0.6),
              }}>
              {data?.location_from}
            </CustomText>

            <View
              style={{
                flexDirection: 'row',
                marginTop: moderateScale(7, 0.6),
              }}>
              <Icon size={moderateScale(12, 0.6)} name="map-pin" as={Feather} color={Color.cartheme} />
              <CustomText
                isBold={true}
                style={{
                  fontSize: 10,
                  paddingHorizontal: moderateScale(5, 0.6),
                }}>
                drop off location
              </CustomText>
            </View>
            <CustomText
              numberOfLines={1}
              style={{
                fontSize: 9,
                width: windowWidth * 0.36,
                marginLeft: moderateScale(18, 0.6),
              }}>
              {data?.location_to}
            </CustomText>
          </View>
        </View>
      </View>
      <View
        style={{
          marginLeft: moderateScale(10, 0.6),
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          marginTop: moderateScale(20, 0.9)
        }}>
        <View style={{ flexDirection: 'row', marginTop: moderateScale(2, 0.6) }}>
          <CustomText style={styles.text}>
            {moment(data?.rider?.updated_at).format('MM-DD-YYYY')}
          </CustomText>
          <CustomText style={[styles.text]}>{" " + "|" + " "}</CustomText>
          <CustomText style={styles.text}>
            {moment(data?.rider?.updated_at).format('HH-MM')}
          </CustomText>
        </View>
        <CustomText isBold={true} style={styles.price}>
          {data?.amount + ' $'}
        </CustomText>
        {isStatus && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 2,
            }}>
            <View
              style={{
                width: moderateScale(10, 0.5),
                height: moderateScale(10, 0.6),
                backgroundColor: 'black',
                borderRadius: moderateScale(100, 0.6),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: moderateScale(2, 0.6),
                marginRight: moderateScale(4, 0.6),
              }}></View>
            <CustomText
              style={{ fontSize: moderateScale(11, 0.6), color: Color.black }}>
              {data?.status}
            </CustomText>
          </View>
        )}
      </View>
    </View>
  );
};

export default HistoryComponent;

const styles = StyleSheet.create({
  main_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.12,
    marginVertical: moderateScale(6, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(6, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    borderRadius: moderateScale(10, 0.8),
    shadowColor: Color.darkGray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: Color.white,
  },
  user_image_view: {
    height: moderateScale(50, 0.6),
    width: moderateScale(50, 0.6),
    borderRadius: moderateScale(20, 0.6),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(30, 0.6),
  },
  user_name: {
    fontSize: moderateScale(14, 0.6),
    width: moderateScale(140, 0.6),
  },
  text: {
    fontSize: moderateScale(11, 0.6),
    color: Color.grey,
  },
  price: {
    fontSize: moderateScale(14, 0.6),
  },
  texi_expence: {
    fontSize: moderateScale(11, 0.6),
    color: Color.grey,
  },
  text1: {
    fontSize: moderateScale(6, 0.6),
  },
  text_view2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
