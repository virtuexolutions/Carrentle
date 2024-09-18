import React from 'react';
import { SIZES } from '../../constants';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';

const ListEmptyComponent = ({ style, color, viewstyle, size, animationName }) => {
    return (
        <View
            style={[{
                marginTop: moderateScale(20, 0.6),
                alignItems: 'center',
            }, viewstyle]}>
            <View style={{ width: 200, height: 200, }}>
                <LottieView
                    autoPlay
                    loop
                    style={[
                        {
                            height: '100%',
                            width: '1000%',
                            alignItems: 'center',
                            alignSelf: 'center',
                        },
                        style,
                    ]}
                    source={animationName ? animationName : require('../Assets/animations/not_found.json')}
                />
            </View>
            <CustomText style={{ color: 'red', marginTop: moderateScale(10, 0.6) }}>No wallet history Found yet</CustomText>
        </View>
    );
};

export default ListEmptyComponent;
