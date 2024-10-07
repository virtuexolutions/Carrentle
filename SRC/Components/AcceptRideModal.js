import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import {Rating} from 'react-native-ratings';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import {mode} from 'native-base/lib/typescript/theme/tools';
import CustomButton from './CustomButton';
import Entypo from 'react-native-vector-icons/Entypo';
const AcceptRideModal = ({
  username,
  isSentRequest,
  pickupLocation,
  dropoffLocation,
  distance,
  time,
  item,
  price,
  image,
  onPressMessageBtn,
  visible,
  setVisible,
  seats,
  CarNumber,
  carName,
  onpressClose,
  isRider,
  onpressSeeLocation
}) => {
  return (
    <Modal
      isVisible={visible}
      swipeDirection="up"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.userImage}>
            <CustomImage
              style={{height: '100%', width: '100%', overflow: 'hidden'}}
              source={{uri: image}}
            />
          </View>
          <View style={styles.rowInnerView}>
            <CustomText style={styles.text}>{username}</CustomText>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Rating
                type="custom"
                startingValue={5}
                ratingCount={5}
                imageSize={moderateScale(8, 0.3)}
                style={{
                  width: windowWidth * 0.1,
                }}
                ratingBackgroundColor={'white'}
              />
              <CustomText
                style={{
                  fontSize: moderateScale(9, 0.6),
                  marginLeft: moderateScale(4, 0.3),
                }}>
                (8)
              </CustomText>
            </View>
          </View>
          <TouchableOpacity style={{right: -30}} onPress={onpressClose}>
            <Icon
              name="cross"
              as={Entypo}
              size={moderateScale(25, 0.6)}
              color={Color.red}
            />
          </TouchableOpacity>
        </View>
        <CustomText
          isBold
          style={{
            marginHorizontal: moderateScale(10, 0.6),
            fontSize: moderateScale(18, 0.6),
          }}>
          {carName}
        </CustomText>
        <CustomText
          isBold
          style={{
            marginHorizontal: moderateScale(10, 0.6),
            fontSize: moderateScale(18, 0.6),
          }}>
          {CarNumber}
        </CustomText>
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: moderateScale(10, 0.3),
            paddingHorizontal: moderateScale(10, 0.6),
          }}>
          <View>
            <CustomText isBold style={styles.text2}>
              Distance
            </CustomText>
            <CustomText style={styles.text1}>{distance + ' Km'}</CustomText>
          </View>
          <View style={{marginLeft: moderateScale(20, 0.3)}}>
            <CustomText isBold style={styles.text2}>
              price
            </CustomText>
            <CustomText style={styles.text1}>{price}</CustomText>
          </View>
          <View style={{marginLeft: moderateScale(20, 0.3)}}>
            <CustomText isBold style={styles.text2}>
              Available seats
            </CustomText>
            <CustomText style={styles.text1}>{seats}</CustomText>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomButton
            text={'Chat'}
            textColor={Color.white}
            width={windowWidth * 0.4}
            height={windowHeight * 0.06}
            marginTop={moderateScale(30, 0.3)}
            onPress={onPressMessageBtn}
            bgColor={Color.cartheme}
            borderColor={Color.white}
            borderWidth={1}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
          />
          <CustomButton
            text={isRider ?'See User Location' : 'Track Rider' }
            textColor={Color.white}
            width={windowWidth * 0.4}
            height={windowHeight * 0.06}
            marginTop={moderateScale(30, 0.3)}
            bgColor={Color.cartheme}
            borderColor={Color.white}
            borderWidth={1}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
            onPress={onpressSeeLocation}
            // disabled={true}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AcceptRideModal;

const styles = StyleSheet.create({
  card: {
    height: windowHeight * 0.45,
    width: windowWidth * 0.9,
    borderRadius: moderateScale(10, 6),
    borderWidth: 2,
    borderColor: '#29478A',
    paddingHorizontal: moderateScale(10, 0.3),
    paddingVertical: moderateScale(10, 0.3),
    borderRadius: moderateScale(20, 0.6),
    backgroundColor: Color.white,
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
    height: windowHeight * 0.06,
    width: windowHeight * 0.06,
    borderRadius: (windowHeight * 0.06) / 2,
  },
  rowInnerView: {
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(5, 0.6),
    width: windowWidth * 0.54,
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: 'bold',
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
    height: moderateScale(30, 0.6),
    width: moderateScale(30, 0.6),
    borderRadius: (windowHeight * 0.04) / 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: moderateScale(8, 0.3),
    marginLeft: moderateScale(20, 0.6),
  },
});
