import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';

const TaxiAvailability = () => {
  return (
    <LinearGradient
      colors={['#3464eb', '#7d9dc7']}
      start={{x: 0.5, y: 0}}
      end={{x: 1, y: 1}}
      style={{
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        paddingTop: moderateScale(72, 0.2),
      }}>
      <CustomImage source={require('../Assets/Images/logo.png')} />
      <CustomText
        style={{
          marginTop: moderateScale(14, 0.2),
          width: windowWidth * 0.8,
          textAlign: 'center',
          color: '#b2c2d6',
        }}
        numberOfLines={1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,{' '}
      </CustomText>
      <CustomText
        style={{
          // marginTop: moderateScale(14,0.2),
          width: windowWidth * 0.7,
          textAlign: 'center',
          color: '#b2c2d6',
        }}
        numberOfLines={1}>
        sed do eiusmod tempor incididunt labore.
      </CustomText>
      <View
        style={{
          marginTop: moderateScale(50, 0.2),
          width: windowWidth,
          paddingHorizontal: moderateScale(10, 0.2),
          alignItems: 'center',
        }}>
        <CustomText isBold style={{color: 'white', textAlign: 'center'}}>
          Search for the best available taxi.
        </CustomText>
        <CustomText
          style={{
            width: windowWidth * 0.9,
            color: '#b2c2d6',
            textAlign: 'center',
          }}
          numberOfLines={3}>
          Lorem ipsum dolor sit amet, do eiusmod tempor incididunt ut, eiusmod
          tempor incididunt ut labore et dolore magna aliqua.{' '}
        </CustomText>
      </View>
      <CustomButton
        bgColor={'white'}
        textColor={'#050537'}
        text={'City'}
        textTransform={'none'}
        isBold
        marginTop={moderateScale(24, 0.3)}
        fontSize={moderateScale(26, 0.3)}
        width={windowWidth * 0.8}
        height={windowHeight * 0.11}
        borderRadius={moderateScale(12, 0.2)}
      />
      <CustomButton
        marginTop={moderateScale(10, 0.2)}
        // bgColor={'white'}
        textColor={'white'}
        text={'Out of City'}
        textTransform={'none'}
        borderColor={'white'}
        borderWidth={1}
        // isBold
        fontSize={moderateScale(26, 0.3)}
        width={windowWidth * 0.8}
        height={windowHeight * 0.11}
        borderRadius={moderateScale(12, 0.2)}
      />
      <View style={{alignItems: 'center', position: 'absolute', bottom: 45}}>
        <CustomText
          style={{
            marginTop: moderateScale(14, 0.2),
            width: windowWidth * 0.8,
            textAlign: 'center',
            color: '#96aece',
          }}
          numberOfLines={1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </CustomText>
        <CustomText
          style={{
            // marginTop: moderateScale(14,0.2),
            width: windowWidth * 0.7,
            textAlign: 'center',
            color: '#96aece',
          }}
          numberOfLines={1}>
          sed do eiusmod tempor incididunt labore.
        </CustomText>
      </View>
    </LinearGradient>
  );
};

export default TaxiAvailability;

const styles = StyleSheet.create({});
