import React from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import Color from "../Assets/Utilities/Color";
import { FONTS } from "../Constant/theme";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { moderateScale } from "react-native-size-matters";
import CustomText from "./CustomText";
import CustomImage from "./CustomImage";
import LinearGradient from "react-native-linear-gradient";

const CustomModal = (props) => {
    const {
        isModalVisible,
        onClose,
        onOKPress,
        title,
        message,
        iconType,
        areYouSureAlert,
        heading_text,
        description_text,
        image,
        btn_text
    } = props;
    return (
        <Modal
            isVisible={isModalVisible}
            swipeDirection="up" style={styles.container}
        >
            <View style={styles.modal}>
                <View style={styles.main_view}>
                    <View>
                        <CustomImage source={image} />
                    </View>
                    <CustomText isBold={true} style={{ fontSize: moderateScale(15, 0.6), textAlign: 'center' }}>{heading_text}</CustomText>
                    <CustomText style={{ fontSize: moderateScale(12, 0.6), textAlign: 'center', color: Color.grey }}>{description_text}</CustomText>
                    <LinearGradient
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        colors={['#71B0F0', '#4680D1', '#00309E']}
                        locations={[0, 0.5, 1]}
                        style={styles.btn_view}>
                        <TouchableOpacity>
                            <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.white }}>{btn_text}</CustomText>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </Modal >);
};

export default CustomModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: "transparent"
    },
    main_view: {
        backgroundColor: Color.white,
        width: windowWidth * 0.7,
        height: windowHeight * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: moderateScale(15, 0.6),
        paddingHorizontal: moderateScale(15, 0.6),
        marginHorizontal: moderateScale(20, 0.6),
        borderRadius: moderateScale(15, 0.6)
    },

    btn_view: {
        width: windowWidth * 0.6,
        height: moderateScale(40, 0.6),
        backgroundColor: Color.red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(20, 0.6),
        marginTop: moderateScale(20, 0.6)
    }
})