import React from 'react';
import { SIZES } from '../../constants';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const Loader = ({ style, color, viewstyle, size }) => {
  return (
    <View
      style={[{
        marginTop: moderateScale(50, 0.6),
        alignItems: 'center',
      }, viewstyle]}>
      <LottieView
        autoPlay
        loop
        style={[
          {
            height: '60%',
            width: 100,
            alignItems: 'center',
            alignSelf: 'center',
          },
          style,
        ]}
        source={require('../Assets/animations/loader.json')}
      />
    </View>
  );
};

export default Loader;
