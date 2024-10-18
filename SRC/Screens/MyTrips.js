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

const tripsListArray = [
    {
        id: 1,
        name: 'SARAH WILOSOIN',
        price: 70.00,
        time: '30 min',
        pickup_location: '345 Cityhali Park',
        dropoff_location: 'Barclay Stadium',
        pickup_time: '04 : 30 PM',
        dropoff_time: '04 : 30 PM',
        profile_pic: require('../Assets/Images/profile_1.png')
    },
    {
        id: 2,
        name: 'SARAH WILOSOIN',
        price: 70.00,
        time: '30 min',
        pickup_location: '345 Cityhali Park',
        dropoff_location: 'Barclay Stadium',
        pickup_time: '04 : 30 PM',
        dropoff_time: '04 : 30 PM',
        profile_pic: require('../Assets/Images/profile_1.png')
    }, {
        id: 3,
        name: 'SARAH WILOSOIN',
        price: 70.00,
        time: '30 min',
        pickup_location: '345 Cityhali Park',
        dropoff_location: 'Barclay Stadium',
        pickup_time: '04 : 30 PM',
        dropoff_time: '04 : 30 PM',
        profile_pic: require('../Assets/Images/profile_1.png')
    },
    {
        id: 4,
        name: 'SARAH WILOSOIN',
        price: 70.00,
        time: '30 min',
        pickup_location: '345 Cityhali Park',
        dropoff_location: 'Barclay Stadium',
        pickup_time: '04 : 30 PM',
        dropoff_time: '04 : 30 PM',
        profile_pic: require('../Assets/Images/profile_1.png')
    },
]

const MyTrips = () => {
    return (
        <View style={styles.container}>
            <Header showBack={true} headerColor={['white', 'white']}
                title={'My Trips'} />
            <View style={styles.main_view}>
                <View style={styles.trip_btn_view}>
                    <TouchableOpacity style={styles.btn_view}>
                        <CustomText style={styles.btn_text}>Today Trips</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn_view}>
                        <CustomText style={styles.btn_text}>All Trips</CustomText>
                    </TouchableOpacity>
                </View>
                <CustomText style={styles.today_date}>Today, 4:30 Pm</CustomText>
                <FlatList data={tripsListArray}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.card_view}>
                                <View style={styles.profile_view}>
                                    <View style={styles.image_view}>
                                        <CustomImage source={item.profile_pic} style={styles.image} />
                                    </View>
                                    <CustomText isBold={true} style={styles.name}>{item?.name}</CustomText>
                                    <View style={styles.text_view}>
                                        <CustomText style={{ fontSize: moderateScale(10, 0.6), color: Color.grey }}>Final Cost</CustomText>
                                        <CustomText isBold={true} style={{ fontSize: moderateScale(11, 0.6), color: Color.darkBlue }}>{"U$$ " + item?.price}</CustomText>
                                    </View>
                                    <View style={styles.text_view}>
                                        <CustomText style={{ fontSize: moderateScale(10, 0.6), color: Color.grey }}>Time</CustomText>
                                        <CustomText isBold={true} style={{ fontSize: moderateScale(11, 0.6), color: Color.darkBlue }}>{item?.time}</CustomText>
                                    </View>

                                </View>
                                <View style={{ marginTop: moderateScale(10, 0.6) }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="map-pin" as={Feather} color={Color.orange} />
                                        <CustomText isBold={true}
                                            style={{
                                                fontSize: 12,
                                                width: windowWidth * 0.4,
                                                marginLeft: moderateScale(18, 0.6),
                                            }}>
                                            {item?.pickup_location}
                                        </CustomText>
                                        <CustomText style={styles.time}>{item?.pickup_time}</CustomText>
                                        <CustomText
                                            isBold
                                            style={[
                                                styles.text1,
                                                {
                                                    position: 'absolute',
                                                    color: 'black',
                                                    paddingVertical: moderateScale(15, 0.6),
                                                    marginLeft: moderateScale(3, 0.6),
                                                    transform: [{ rotate: '-90deg' }],
                                                },
                                            ]}>
                                            - -
                                        </CustomText>
                                    </View>
                                    <View
                                        style={{ flexDirection: 'row', marginTop: moderateScale(10, 0.6), }}>
                                        <Icon name="map-pin" as={Feather} color={Color.cartheme} />
                                        <CustomText isBold={true}
                                            style={{
                                                fontSize: 12,
                                                width: windowWidth * 0.4,
                                                marginLeft: moderateScale(18, 0.6),
                                            }}>
                                            {item?.dropoff_location}
                                        </CustomText>
                                        <CustomText style={styles.time}>{item?.dropoff_time}</CustomText>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    );
};

export default MyTrips;
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
    trip_btn_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(10, 0.6)
    },
    btn_view: {
        width: windowWidth * 0.4,
        height: moderateScale(40, 0.6),
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: moderateScale(20, 0.6),
        borderWidth: 1.5,
        borderColor: Color.grey
    },
    btn_text: {
        color: Color.grey,
        fontSize: moderateScale(13, 0.6)
    },
    today_date: {
        fontSize: moderateScale(14, 0.6),
        fontWeight: 'bold',
        marginTop: moderateScale(15, 0.6)
    },
    card_view: {
        height: windowHeight * 0.18,
        width: '98%',
        backgroundColor: Color.white,
        marginVertical: moderateScale(15, 0.3),
        marginHorizontal: moderateScale(10, 0.6),
        borderRadius: moderateScale(20, 0.6),
        alignItems: "flex-start",
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
    profile_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
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
    name: {
        fontSize: moderateScale(13, 0.3),
        marginLeft: moderateScale(12, 0.6),
        width: moderateScale(100, 0.6),
        bottom: moderateScale(10, 0.6)
    },
    text_view: { alignItems: 'center', marginLeft: moderateScale(30, 0.6) },
    text1: {
        fontSize: moderateScale(7, 0.6),
    },
    time: {
        fontSize: moderateScale(10, 0.6),
        marginLeft: moderateScale(70, 0.6),
        color: Color.grey
    }
});
