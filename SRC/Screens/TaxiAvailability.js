import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import navigationService from '../navigationService';
import { windowHeight, windowWidth } from '../Utillity/utils';

const TaxiAvailability = () => {
  return (
    <LinearGradient
      colors={['#00309E', '#79B9F6']}
      start={{x: 0.45, y: 0.3}}
      end={{x: 0.2, y: 0.75}}
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
          fontSize: moderateScale(11, 0, 6),
        }}
        numberOfLines={1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,{' '}
      </CustomText>
      <CustomText
        style={{
          marginTop: moderateScale(14, 0.2),
          width: windowWidth * 0.7,
          textAlign: 'center',
          color: '#b2c2d6',
          fontSize: moderateScale(11, 0, 6),
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
        <CustomText
          isBold
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: moderateScale(14, 0.6),
          }}>
          Search for the best available taxi.
        </CustomText>
        <CustomText
          style={{
            width: windowWidth * 0.9,
            color: '#b2c2d6',
            textAlign: 'center',
            fontSize: moderateScale(12, 0.6),
          }}
          numberOfLines={3}>
          Lorem ipsum dolor sit amet, do eiusmod tempor incididunt ut, eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </CustomText>
      </View>
      <CustomButton
        textstyle={{color: Color.blue, fontSize: moderateScale(16, 0.6)}}
        bgColor={'white'}
        textColor={Color.themeColor}
        text={'City'}
        textTransform={'none'}
        onPress={() => {
          navigationService.navigate('MyDrawer');
        }}
        isBold
        marginTop={moderateScale(24, 0.3)}
        width={windowWidth * 0.8}
        height={windowHeight * 0.09}
        borderRadius={moderateScale(12, 0.2)}
      />
      <CustomButton
        textstyle={{color: Color.white, fontSize: moderateScale(16, 0.3)}}
        marginTop={moderateScale(10, 0.2)}
        textColor={'white'}
        text={'Out of City'}
        textTransform={'none'}
        borderColor={'white'}
        borderWidth={1}
        onPress={() => {
          navigationService.navigate('MyDrawer');
        }}
        fontSize={moderateScale(26, 0.3)}
        width={windowWidth * 0.8}
        height={windowHeight * 0.09}
        borderRadius={moderateScale(12, 0.2)}
      />
      <View style={{alignItems: 'center', position: 'absolute', bottom: 45}}>
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
