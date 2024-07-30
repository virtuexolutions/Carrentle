import React, { useState } from "react";
import { Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { windowHeight } from "../Utillity/utils";
import { moderateScale } from "react-native-size-matters";
import CustomText from "./CustomText";

const PaymentCard = (item) => {
    return (
        <View style={styles.container}>
            <CustomText ></CustomText>
        </View>
    );
};

export default PaymentCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        height: windowHeight * 0.12,
        marginTop: moderateScale(20, 0.6),
        borderRadius: moderateScale(20, 0.6),
    //  paddingHorizontal: 
    }

})

