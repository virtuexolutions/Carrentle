import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList
} from 'react-native';
import React, { useState } from 'react';
import CustomText from '../Components/CustomText';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Header from '../Components/Header';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import { Icon } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import LinearGradient from 'react-native-linear-gradient';
import { mode } from 'native-base/lib/typescript/theme/tools';
import CustomButton from '../Components/CustomButton';

const BookingRequest = () => {
    return (
        <View style={styles.container}>
            <Header showBack={true} headerColor={['white', 'white']}
                title={'Booking Request'} />
            <View style={styles.main_view}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: moderateScale(15, 0.6), width: moderateScale(15, 0.6), backgroundColor: Color.red, borderRadius: moderateScale(2, 0.6) }}>
                        <Icon name='arrowup' as={AntDesign} color={Color.white} />
                    </View>
                    <CustomText isBold={true} style={{ marginLeft: moderateScale(10, 0.6) }}>1 New</CustomText>
                </View>
                <View style={styles.card_view}>
                    <View style={styles.profile_view}>
                        <View style={styles.image_view}>
                            <CustomImage source={require('../Assets/Images/profile_1.png')} style={styles.image} />
                        </View>
                        <View style={{ marginTop: moderateScale(10, 0.6) }}>
                            <CustomText isBold={true} style={styles.heading_text}>Benny SpanBauer</CustomText>
                            <CustomText isBold={true} style={styles.text}>Texas</CustomText>
                        </View>
                        <LinearGradient
                            start={{ x: 0, y: 2.1 }}
                            end={{ x: 4, y: 2 }}
                            colors={['#00309E', '#79B9F6', '#FFFFFF']}
                            style={styles.active_btn_view}>
                            <TouchableOpacity style={styles.active_btn}>
                                <CustomText style={{ color: Color.white }}>Active</CustomText>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    <View style={styles.time_view}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name='send' as={Feather} />
                            <CustomText isBold={true} style={{ marginLeft: moderateScale(6, 0.6) }}>4.5 Km</CustomText>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name='clock' as={Feather} />
                            <CustomText isBold={true} style={{ marginLeft: moderateScale(6, 0.6) }}>30 min</CustomText>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginHorizontal: moderateScale(30, 0.6) }}>
                        <CustomText style={{ color: Color.grey }}>Date & Time</CustomText>
                        <CustomText>Dec 20 2024 | 10 : 00 Am</CustomText>
                    </View>
                </View>
                <View style={{ marginLeft: moderateScale(20, 0.6) }}>
                    <View style={{ marginTop: moderateScale(10, 0.6) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="map-pin" as={Feather} color={Color.orange} size={moderateScale(20, 0.6)} />
                            <View>

                                <CustomText isBold={true}
                                    style={{
                                        fontSize: 14,
                                        width: windowWidth * 0.4,
                                        marginLeft: moderateScale(18, 0.6),
                                    }}>
                                    Current Location
                                </CustomText>
                                <CustomText isBold={true} style={{
                                    fontSize: 12,
                                    color: Color.grey,
                                    width: windowWidth * 0.6,
                                    marginLeft: moderateScale(18, 0.6),
                                }}>Fannie Street san Angelo, Texas</CustomText>
                            </View>
                            <CustomText
                                isBold
                                style={[
                                    styles.text1,
                                    {
                                        position: 'absolute',
                                        color: 'black',
                                        paddingVertical: moderateScale(25, 0.6),
                                        marginLeft: moderateScale(-4, 0.6),
                                        marginTop: moderateScale(6, 0.6),
                                        transform: [{ rotate: '-90deg' }],
                                    },
                                ]}>
                                - - - - - -
                            </CustomText>
                        </View>
                        <View
                            style={{ flexDirection: 'row', marginTop: moderateScale(20, 0.6), }}>
                            <Icon name="map-pin" as={Feather} color={Color.cartheme} size={moderateScale(20, 0.6)} />
                            <View>

                                <CustomText isBold={true}
                                    style={{
                                        fontSize: 14,
                                        width: windowWidth * 0.4,
                                        marginLeft: moderateScale(18, 0.6),
                                    }}>
                                    Route
                                </CustomText>
                                <CustomText isBold={true} style={{
                                    fontSize: 12,
                                    width: windowWidth * 0.6,
                                    marginLeft: moderateScale(18, 0.6),
                                    color: Color.grey
                                }}>Naville Street Salem, Texas</CustomText>
                            </View>
                        </View>
                    </View>
                </View>
                <LinearGradient
                    start={{ x: 0, y: 2.1 }}
                    end={{ x: 4, y: 2 }}
                    colors={['#00309E', '#79B9F6', '#FFFFFF']}
                    style={styles.btn_view}
                >
                    <TouchableOpacity style={styles.btn}>
                        <CustomText style={{ color: Color.white }}>Track Passanger</CustomText>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
};

export default BookingRequest;
const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        backgroundColor: 'white',
    },
    main_view: {
        marginHorizontal: moderateScale(20, 0.6),
        marginVertical: moderateScale(30, 0.6)
    },
    card_view: {
        height: windowHeight * 0.24,
        width: '98%',
        backgroundColor: Color.white,
        marginVertical: moderateScale(15, 0.3),
        marginHorizontal: moderateScale(10, 0.6),
        borderRadius: moderateScale(20, 0.6),
        justifyContent: 'flex-start',
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(10, 0.6),
        shadowColor: Color.themeColor,
        shadowOffset: {
            width: 4,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.84,
        elevation: 5,
        alignSelf: "center"
    },
    image_view: {
        width: moderateScale(50, 0.6),
        height: moderateScale(50, 0.6)
    },
    image: {
        width: '100%',
        height: "100%",
        resizeMode: "cover"
    },
    profile_view: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    heading_text: {
        fontSize: moderateScale(14, 0.3),
        marginLeft: moderateScale(12, 0.6),
        width: moderateScale(120, 0.6),
    },
    text: {
        fontSize: moderateScale(12, 0.6),
        width: moderateScale(80, 0.6),
        marginLeft: moderateScale(12, 0.6),
        color: Color.grey
    },
    text1: {
        fontSize: moderateScale(7, 0.6),
    },
    active_btn_view: {
        height: moderateScale(25, 0.6),
        width: moderateScale(80, 0.6),
        borderRadius: moderateScale(20, 0.6),
        justifyContent: "center",
        alignItems: "center",
        marginLeft: moderateScale(40, 0.5)
    },
    active_btn: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(20, 0.6),
        justifyContent: "center",
        alignItems: "center",
    },
    time_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: moderateScale(40, 0.6),
        marginVertical: moderateScale(30, 0.6)
    },
    btn_view: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.06,
        borderRadius: moderateScale(20, 0.6),
        justifyContent: "center",
        alignItems: "center",
        marginTop: moderateScale(100, 0.6)
    },
    btn: {
        height: '100%',
        width: '100%',
        justifyContent: "center", alignItems: "center"
    }
});
