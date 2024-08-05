import { Checkbox } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import CustomText from '../Components/CustomText'
import Header from '../Components/Header'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomModal from '../Components/CustomModal'

const CencalTexi = () => {
    const [modal_visibe, setisModal_visible] = useState(false)

    return (
        <View style={styles.container}>
            <Header showBack={true} headerColor={['white', 'white']}
                title={'Booking Request'} />
            <View style={styles.main_view}>
                <CustomText style={styles.text}>Please Select the Reason For Cancellation</CustomText>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(20, 0.6) }}>
                    <Checkbox value='Wating For Long Time' borderColor={Color.darkBlue} />
                    <CustomText style={styles.reason_text}>Wating For Long Time</CustomText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(20, 0.6) }}>
                    <Checkbox value='Wating For Long Time' borderColor={Color.darkBlue} />
                    <CustomText style={styles.reason_text}>Unable to Contact driver</CustomText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(20, 0.6) }}>
                    <Checkbox value='Wating For Long Time' borderColor={Color.darkBlue} />
                    <CustomText style={styles.reason_text}>Driver denied to go to destination </CustomText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(20, 0.6) }}>
                    <Checkbox value='Wating For Long Time' borderColor={Color.darkBlue} />
                    <CustomText style={styles.reason_text}>Driver denied to come to pickup</CustomText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(20, 0.6) }}>
                    <Checkbox value='Wating For Long Time' borderColor={Color.darkBlue} />
                    <CustomText style={styles.reason_text}>Wrong address Shown</CustomText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(20, 0.6) }}>
                    <Checkbox value='Wating For Long Time' borderColor={Color.darkBlue} />
                    <CustomText style={styles.reason_text}>The Price is not reasonable</CustomText>
                </View>
                <CustomText isBold={true} style={styles.other_text}>Others</CustomText>
                <View style={{ width: windowWidth * 0.7, borderRadius: moderateScale(20, 0.6), height: moderateScale(35, 0.6), borderColor: Color.lightGrey, borderWidth: 1 }}>
                    <TextInput placeholder='Other Reason' style={{ color: Color.black, width: '100%', height: '100%', }} />
                </View>
                <TouchableOpacity activeOpacity={0.5} style={styles.btn_view} onPress={() => setisModal_visible(!modal_visibe)}>
                    <CustomText style={{ color: Color.white }}>Submit</CustomText>
                </TouchableOpacity>
            </View>
            {/* <CustomModal isModalVisible={modal_visibe} btn_text={'Ok'} heading_text={"we're so sad about your cancellation"} description_text={'we will continue to improve our services & satisfy on the next trip'} image={require('../Assets/Images/sad_face.png')} /> */}
        </View>
    )
}

export default CencalTexi

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: Color.white
    },
    main_view: {
        paddingHorizontal: moderateScale(20, 0.6),
        paddingVertical: moderateScale(20, 0.6),
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    text: {
        fontSize: moderateScale(12, 0.3),
        color: Color.grey
    },
    reason_text: {
        fontSize: moderateScale(13, 0.6),
        marginLeft: moderateScale(12, 0.6)
    },
    other_text: {
        fontSize: moderateScale(15, 0.6),
        marginVertical: moderateScale(10, 0.6)
    },
    btn_view: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.06,
        borderRadius: moderateScale(20, 0.6),
        justifyContent: "center",
        alignItems: "center",
        marginTop: moderateScale(250, 0.6),
        backgroundColor: Color.darkBlue
    },
    btn: {
        height: '100%',
        width: '100%',
        justifyContent: "center", alignItems: "center",
    }
})