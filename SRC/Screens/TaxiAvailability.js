import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import { moderateScale } from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import Color from '../Assets/Utilities/Color';
import { FONTS, SIZES } from '../Constant/theme';

const TaxiAvailability = () => {
  return (
    <LinearGradient
      colors={['#00309E', '#79B9F6']}
      start={{ x: 0.45, y: 0.3 }}
      end={{ x: 0.2, y: 0.75 }}
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
          ...FONTS.PoppinsLight11

        }}
        numberOfLines={1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,{' '}
      </CustomText>
      <CustomText
        style={{
          marginTop: moderateScale(14,0.2),
          width: windowWidth * 0.7,
          textAlign: 'center',
          color: '#b2c2d6',
          ...FONTS.PoppinsLight11
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
        <CustomText isBold style={{ color: 'white', textAlign: 'center', ...FONTS.PoppinsBold14 }}>
          Search for the best available taxi.
        </CustomText>
        <CustomText
          style={{
            width: windowWidth * 0.9,
            color: '#b2c2d6',
            textAlign: 'center',
            ...FONTS.poppinsRegular12
          }}
          numberOfLines={3}>
          Lorem ipsum dolor sit amet, do eiusmod tempor incididunt ut, eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </CustomText>
      </View>
      <CustomButton
        textstyle={{ color: Color.blue, ...FONTS.PoppinsBold16 }}
        bgColor={'white'}
        textColor={Color.themeColor}
        text={'City'}
        textTransform={'none'}
        onPress={() => {
          navigationService.navigate('MyDrawer')
        }}
        isBold
        marginTop={moderateScale(24, 0.3)}
        width={windowWidth * 0.8}
        height={windowHeight * 0.09}
        borderRadius={moderateScale(12, 0.2)}
      />
      <CustomButton
        textstyle={{ color: Color.white, ...FONTS.PoppinsMedium16 }}
        marginTop={moderateScale(10, 0.2)}
        // bgColor={'white'}
        textColor={'white'}
        text={'Out of City'}
        textTransform={'none'}
        borderColor={'white'}
        borderWidth={1}
        onPress={() => {
          navigationService.navigate('MyDrawer')
        }}
        fontSize={moderateScale(26, 0.3)}
        width={windowWidth * 0.8}
        height={windowHeight * 0.09}
        borderRadius={moderateScale(12, 0.2)}
      />
      <View style={{ alignItems: 'center', position: 'absolute', bottom: 45 }}>
        <CustomText
          style={{
            marginTop: moderateScale(14, 0.2),
            width: windowWidth * 0.8,
            fontSize: moderateScale(10, 0.3),
            textAlign: 'center',
            color: '#FFFFFF',
          }}
          numberOfLines={1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </CustomText>
        <CustomText
          style={{
            // marginTop: moderateScale(14,0.2),
            width: windowWidth * 0.7,
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: moderateScale(10, 0.3),
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
