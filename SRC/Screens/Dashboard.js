import { Icon } from 'native-base'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { moderateScale } from 'react-native-size-matters'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Color from '../Assets/Utilities/Color'
import CustomText from '../Components/CustomText'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { mode } from 'native-base/lib/typescript/theme/tools'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomImage from '../Components/CustomImage'
import navigationService from '../navigationService'
import Header from '../Components/Header'

const previous_trip_card = [
    {
        id: 1,
        name: 'Frederick A.Dawkins',
        pickupLocatoion: 'Fannie Street San Angelo, Texas',
        dropOffLocation: 'Neville Street Salem, Colorado',
        distance: '63 Km',
        price: '$ 90',
        userImage: require('../Assets/Images/men.png'),
    },
    {
        id: 2,
        name: 'Frederick A.Dawkins',
        pickupLocatoion: 'Fannie Street San Angelo, Texas',
        dropOffLocation: 'Neville Street Salem, Colorado',
        distance: '63 Km',
        price: '$ 90',
        userImage: require('../Assets/Images/men.png'),
    },
    {
        id: 3,
        name: 'Frederick A.Dawkins',
        pickupLocatoion: 'Fannie Street San Angelo, Texas',
        dropOffLocation: 'Neville Street Salem, Colorado',
        distance: '63 Km',
        price: '$ 90',
        userImage: require('../Assets/Images/men.png'),
    },
    {
        id: 4,
        name: 'Frederick A.Dawkins',
        pickupLocatoion: 'Fannie Street San Angelo, Texas',
        dropOffLocation: 'Neville Street Salem, Colorado',
        distance: '63 Km',
        price: '$ 90',
        userImage: require('../Assets/Images/men.png'),
    },
]

const DashBoard = () => {

    return (
        <View style={styles.main_view}>
            <Header
                headerColor={['white', 'white']}
                title={'DashBoard'}
                showBack={false}
            />
            <LinearGradient
                start={{ x: 1, y: 0.2 }}
                end={{ x: 1, y: 0.9 }}
                colors={['#00309E', '#4680D1']}
                style={styles.sub_view}>
                <View style={styles.card_view}>
                    <CustomText style={styles.today_text}>Today</CustomText>
                    <CustomText isBold={true} style={styles.price_text}>$ 249.6</CustomText>
                    <View style={styles.lines} />
                    <View style={styles.rides_view}>
                        <View style={styles.ride_sub_view}>
                            <Icon name='taxi' as={FontAwesome5} color={Color.blue_color} />
                            <CustomText isBold={true} style={styles.text}>14 Rides</CustomText>
                        </View>
                        <View style={styles.ride_sub_view}>
                            <Icon name='clock' as={FontAwesome5} color={Color.blue_color} />
                            <CustomText isBold={true} style={styles.text}>14 Hours</CustomText>
                        </View>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.wallet_history_card}>
                <View style={styles.wallet_card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                        <View>
                            <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.grey }}>Wallet Balance</CustomText>
                            <CustomText isBold={true} style={{ fontSize: moderateScale(14, 0.6) }}>$ 1,291</CustomText>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", width: moderateScale(100, 0.6), height: moderateScale(35, 0.6), borderRadius: moderateScale(20, 0.6), borderWidth: 1, borderColor: Color.blue_color }}>
                            <CustomText style={{ fontSize: moderateScale(13, 0.6), marginRight: moderateScale(10, 0.) }} isBold={true}>WithDraw</CustomText>
                            <Icon name='arrow-right' as={FontAwesome5} color={Color.blue_color} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.lines, { width: '100%' }]} />
                    <TouchableOpacity onPress={() => navigationService.navigate('MyWallet')} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", width: '100%', marginTop: moderateScale(15, 0.6) }}>
                        <CustomText style={{ fontSize: moderateScale(13, 0.6) }}>Payment History</CustomText>
                        <View >
                            <Icon name='arrow-forward-ios' as={MaterialIcons} color={Color.blue_color} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <CustomText isBold={true} style={{ fontSize: moderateScale(16, 0.6), textAlign: 'left', width: '90%', marginVertical: moderateScale(10, 0.6), color: Color.blue_color }}>Previous Rides History</CustomText>
            <FlatList ListFooterComponent={<View style={{ height: moderateScale(20, 0.6) }} />} data={previous_trip_card} renderItem={({ item, index }) => {
                return (
                    <View style={styles.history_card}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: moderateScale(30, 0.6), height: moderateScale(30, 0.6), borderRadius: moderateScale(20, 0.6), marginRight: moderateScale(10, 0.6) }}>
                                    <CustomImage style={{ width: '100%', height: '100%', borderRadius: moderateScale(20, 0.6) }} source={item?.userImage} />
                                </View>
                                <CustomText style={{ fontSize: moderateScale(14, 0.6) }} isBold={true}>{item?.name}</CustomText>
                            </View>
                            <View style={styles.seatView}>
                                <View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            // paddingVertical :moderateScale(5,.6)
                                        }}>
                                        <Icon
                                            name="map-marker"
                                            as={FontAwesome}
                                            size={moderateScale(12, 0.6)}
                                            color={'#FF8A00'}
                                        />
                                        <CustomText
                                            style={[
                                                styles.text1,
                                                {
                                                    paddingBottom: moderateScale(12, 0.6),
                                                },
                                            ]}>
                                            {item?.pickupLocatoion}
                                        </CustomText>
                                    </View>
                                    <CustomText
                                        isBold
                                        style={[
                                            styles.text1,
                                            {
                                                position: 'absolute',
                                                color: 'black',
                                                top: 17,
                                                marginLeft: moderateScale(-3, 0.6),
                                                transform: [{ rotate: '-90deg' }],
                                            },
                                        ]}>
                                        ---
                                    </CustomText>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            paddingVertical: moderateScale(10, 0.6),
                                        }}>
                                        <Icon
                                            name="map-marker"
                                            as={FontAwesome}
                                            size={moderateScale(12, 0.6)}
                                            color={'#72AFED'}
                                        />
                                        <CustomText style={styles.text1}>{item?.pickupLocatoion}</CustomText>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: moderateScale(25, 0.6) }}>
                                <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.darkBlue }}>Distance : </CustomText>
                                <CustomText style={{ fontSize: moderateScale(12, 0.3) }} isBold>{item?.distance}</CustomText>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.darkBlue }}>Price : </CustomText>
                                <CustomText style={{ fontSize: moderateScale(12, 0.6) }} isBold>{item?.price}</CustomText>
                            </View>
                        </View>
                    </View>
                )
            }} />
        </View>
    )
}

export default DashBoard

const styles = StyleSheet.create({
    main_view: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sub_view: {
        width: windowWidth,
        height: windowHeight * 0.20,
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(10, 0.6),
        justifyContent: "center",
        alignItems: "center"
    },
    card_view: {
        width: windowWidth * 0.8,
        height: windowHeight * 0.2,
        backgroundColor: Color.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: moderateScale(15, 0.6),
        marginBottom: moderateScale(20, 0.6),
        shadowColor: Color.blue,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 7,
        position: 'absolute',
        top: moderateScale(40, 0.8)

    },
    lines: {
        backgroundColor: Color.lightGrey,
        height: 1.5,
        width: '90%',
        marginTop: moderateScale(20, 0.6)
    },
    rides_view: { flexDirection: "row", justifyContent: 'space-between', marginTop: moderateScale(20, 0.6), alignItems: "center", width: windowWidth * 0.7 },
    ride_sub_view: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    today_text: { fontSize: moderateScale(16, 0.6), color: Color.grey },
    price_text: { fontSize: moderateScale(25, 0.6), color: Color.black },
    text: { fontSize: moderateScale(12, 0.6), marginLeft: moderateScale(5, 0.6) },
    wallet_card: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.18,
        backgroundColor: Color.white,
        alignItems: "center",
        borderRadius: moderateScale(15, 0.6),
        marginBottom: moderateScale(20, 0.6),
        shadowColor: Color.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 7,
        alignSelf: 'center',
        paddingHorizontal: moderateScale(20, 0.6),
        paddingVertical: moderateScale(20, 0.6)
    },
    wallet_history_card: { paddingHorizontal: moderateScale(20, 0.6), marginTop: moderateScale(80, 0.6) },
    history_card: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.15,
        backgroundColor: Color.white,
        marginTop: moderateScale(10, 0.6),
        borderRadius: moderateScale(20, 0.6),
        paddingHorizontal: moderateScale(15, 0.6),
        paddingVertical: moderateScale(15, 0.6),
        shadowColor: Color.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        marginHorizontal: moderateScale(10, 0.),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    seatView: {
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(15, 0.6),
        paddingVertical: moderateScale(8, 0.6),
        flexDirection: 'row',
    }, text2: {
        fontSize: moderateScale(10, 0.6),
    },
    text1: {
        fontSize: moderateScale(10, 0.6),
    },
})