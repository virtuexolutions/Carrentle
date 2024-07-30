import React, { useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    View,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
} from 'react-native';
import ScreenBoiler from '../Components/ScreenBoiler';
import { FONTS } from '../Constant/theme';

const MyJourney = ({ navigation }) => {
    return (
        <ScreenBoiler showHeader
            navigation={navigation}
            title={'book your cap'}
            headerColor={['white', 'white']}
            hideUser={false}
            statusBarBackgroundColor={'white'}
            statusBarContentStyle={'dark-content'}
            headertextstyle={{ ...FONTS.PoppinsSemiBold13 }}>

        </ScreenBoiler>
    );
};

export default MyJourney;

const styles = StyleSheet.create({

});
