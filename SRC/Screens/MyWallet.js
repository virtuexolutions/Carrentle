import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenBoiler from '../Components/ScreenBoiler'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import CustomText from '../Components/CustomText'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'native-base'
import Feather from 'react-native-vector-icons/Feather';
import CustomImage from '../Components/CustomImage'
import PaymentCard from '../Components/PaymentCard'

const MyWallet = ({ navigation }) => {

    const paymentHistoryList = [
        {
            id: 1,
            profilepic: require('../Assets/Images/profile_1.png'),
            name: 'Frederick A.Dawkins',
            pickupLocatoion: 'Fannie Street San Angelo, Texas',
            dropOffLocation: "Neville Street Salem, Colorado",
            distance: "63 Km",
            price: 250
        },
        {
            id: 2,
            profilepic: require('../Assets/Images/profile_2.png'),
            name: 'Frederick A.Dawkins',
            pickupLocatoion: 'Fannie Street San Angelo, Texas',
            dropOffLocation: "Neville Street Salem, Colorado",
            distance: "63 Km",
            price: 250
        },
        {
            id: 3,
            profilepic: require('../Assets/Images/profile_3.png'),
            name: 'Frederick A.Dawkins',
            pickupLocatoion: 'Fannie Street San Angelo, Texas',
            dropOffLocation: "Neville Street Salem, Colorado",
            distance: "63 Km",
            price: 250
        }
    ]

    return (
        <ScreenBoiler
            showHeader
            navigation={navigation}
            title={'book your cap'}
            headerColor={['white', 'white']}
            hideUser={false}
            statusBarBackgroundColor={'white'}
            statusBarContentStyle={'dark-content'}
        >
            <View style={styles.container}>
                <LinearGradient
                    start={{ x: 0, y: 2.1 }}
                    end={{ x: 4, y: 2 }}
                    colors={['#00309E', '#79B9F6', '#FFFFFF']}
                    style={styles.card_view}>
                    <View></View>
                    <View>
                        <CustomText style={styles.payment}> $326.00</CustomText>
                        <CustomText style={styles.text}>Total Payment</CustomText>
                    </View>
                    <TouchableOpacity activeOpacity={1} style={styles.payment_method_button}>
                        <View style={{
                            height: moderateScale(30, 0.3),
                            width: moderateScale(30, 0.3),
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Color.white,
                            borderRadius: moderateScale(20, 0.6),
                            shadowColor: Color.black,
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4.84,
                            elevation: 5,
                        }}>
                            <CustomImage
                                source={require('../Assets/Images/Group13.png')}
                                style={{ width: windowHeight * 0.04, height: windowHeight * 0.04 }}
                            />
                        </View>
                        <Text style={styles.paymet_btn_text}>Payment Method</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <FlatList showsVerticalScrollIndicator={false} data={paymentHistoryList} renderItem={(item, index) => {
                    return <PaymentCard item={item} />
                }} />
            </View>
        </ScreenBoiler>
    )
}

export default MyWallet

const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        backgroundColor: Color.white,
        paddingHorizontal: moderateScale(20, 0.3),
        paddingVerticalL: moderateScale(20, 0.3)
    },
    card_view: {
        height: windowHeight * 0.18,
        width: windowWidth * 0.9,
        backgroundColor: 'red',
        borderRadius: moderateScale(20, 0.3),
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: moderateScale(40, 0.3)

    },
    payment: {
        fontSize: moderateScale(18, 0.6),
        color: Color.white,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        textAlign: "center",
        fontSize: moderateScale(12, 0.6),
        color: Color.white,
        textTransform: 'uppercase'
    },
    payment_method_button: {
        height: windowHeight * 0.06,
        width: windowWidth * 0.5,
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: "space-between",
        position: 'absolute',
        top: moderateScale(120, 0.6),
        borderRadius: moderateScale(20, 0.3),
        shadowColor: Color.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 5,
        flexDirection: "row",
        paddingHorizontal: moderateScale(15)
    },
    paymet_btn_text: {
        fontSize: 15,
        fontWeight: '600',
        color: Color.black
    }
})