import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';

const RippleEffect = ({childrens, style}) => {
  const scaleAnim1 = useRef(new Animated.Value(0)).current;
  const opacityAnim1 = useRef(new Animated.Value(1)).current;

  const scaleAnim2 = useRef(new Animated.Value(0)).current;
  const opacityAnim2 = useRef(new Animated.Value(1)).current;

  const scaleAnim3 = useRef(new Animated.Value(0)).current;
  const opacityAnim3 = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.stagger(500, [
        createRippleAnimation(scaleAnim1, opacityAnim1),
        createRippleAnimation(scaleAnim2, opacityAnim2),
        createRippleAnimation(scaleAnim3, opacityAnim3),
      ]),
    ).start();
  };

  const createRippleAnimation = (scaleAnim, opacityAnim) => {
    return Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={[styles.container , style]}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{scale: scaleAnim1}],
            opacity: opacityAnim1,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{scale: scaleAnim2}],
            opacity: opacityAnim2,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{scale: scaleAnim3}],
            opacity: opacityAnim3,
          },
        ]}
      />
      {childrens}
    </View>
  );
};
const CIRCLE_SIZE = moderateScale(300);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    zIndex: 1
  },
  circle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'rgba(0, 48, 158, 0.3)',
    borderWidth: 1,
    borderColor: '#ADD8E6',
  },
});

export default RippleEffect;
