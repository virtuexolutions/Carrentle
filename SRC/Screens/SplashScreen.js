import {View} from 'native-base';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';

const SplashScreen = () => {
  const backgroundImage = require('../Assets/Images/splash.gif');
  return (
    <View style={styles.container}>
      <FastImage
        source={backgroundImage}
        style={{width: '100%', height: '100%'}}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
  },
  bottomImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.3,
  },

  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
});

export default SplashScreen;
