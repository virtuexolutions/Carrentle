import React from 'react';
import {SIZES} from '../../constants';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';

const ListEmptyComponent = ({style, viewstyle, text, animationName}) => {
  return (
    <View
      style={[
        {
          marginTop: moderateScale(20, 0.6),
          alignItems: 'center',
          backgroundColor: 'red',
        },
        viewstyle,
      ]}>
      <View style={[{width: 200, height: 200}, style]}>
        <LottieView
          autoPlay
          loop
          style={[
            {
              height: '100%',
              width: '100%',
              alignItems: 'center',
              alignSelf: 'center',
            },
          ]}
          source={
            animationName
              ? animationName
              : require('../Assets/animations/null_data_found.json')
          }
        />
      </View>
      <CustomText style={{color: 'red', marginTop: moderateScale(10, 0.6)}}>
        {text}
      </CustomText>
    </View>
  );
};

export default ListEmptyComponent;
