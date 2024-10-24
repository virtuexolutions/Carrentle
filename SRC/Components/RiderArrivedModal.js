import {StyleSheet, Modal, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import LottieView from 'lottie-react-native';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import CustomButton from './CustomButton';

const RiderArrivedModal = ({isModalVisible, onPressStart, onpressClose}) => {
  const user_type = useSelector(state => state.authReducer.user_type);
  return (
    <Modal
      isVisible={isModalVisible}
      swipeDirection="up"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(10, 5, 6, 0.19)',
        }}>
        <View
          style={{
            width: windowWidth * 0.8,
            backgroundColor: 'white',
            height:
              user_type === 'Rider' ? windowHeight * 0.36 : windowHeight * 0.3,
            alignItems: 'center',
            borderRadius: moderateScale(10, 0.6),
            paddingVertical: moderateScale(10, 0.6),
          }}>
          <TouchableOpacity
            style={{right: 10, top: 10, position: 'absolute'}}
            onPress={onpressClose}>
            <Icon
              name="cross"
              as={Entypo}
              size={moderateScale(25, 0.6)}
              color={Color.red}
            />
          </TouchableOpacity>
          <View
            style={{
              width: windowWidth * 0.5,
              height: windowHeight * 0.2,
            }}>
            <LottieView
              autoPlay
              loop
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                alignSelf: 'center',
              }}
              source={require('../Assets/animations/cab_arrived_animation.json')}
            />
          </View>
          <View></View>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(15, 0.6),
              color: Color.darkBlue,
              textAlign: 'center',
            }}>
            {user_type === 'Rider'
              ? 'Waiting For Customer'
              : 'Your Cab Is Arrived at Your Pickup Location'}
          </CustomText>
          {user_type === 'Rider' && (
            <>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.darkBlue,
                  textAlign: 'center',
                }}>
                When Customer Arrived start the Ride
              </CustomText>
              <CustomButton
                text={'Start Ride'}
                textColor={Color.white}
                width={windowWidth * 0.6}
                height={windowHeight * 0.05}
                marginTop={moderateScale(20, 0.3)}
                bgColor={Color.cartheme}
                borderColor={Color.white}
                borderWidth={1}
                borderRadius={moderateScale(30, 0.3)}
                isGradient
                onPress={onPressStart}
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default RiderArrivedModal;

const styles = StyleSheet.create({});
