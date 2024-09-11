import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomImage from '../Components/CustomImage';
import { Icon } from 'native-base';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { imageUrl } from '../Config';
import moment from 'moment';

const HistoryComponent = ({ data }) => {
  return (
    <View style={styles.main_view}>
      <View style={styles.user_image_view}>
        <CustomImage source={{ uri: imageUrl + data?.rider?.photo }} style={styles.image} />
      </View>
      <View style={{ marginLeft: moderateScale(12, 0.6) }}>
        <CustomText isBold={true} style={styles.user_name}>{data?.rider?.name}</CustomText>
        <View style={{ flexDirection: 'row', marginTop: moderateScale(2, 0.6) }}>
          <CustomText style={styles.text}>{moment(data?.rider?.updated_at).format('MM-DD-YYYY')}</CustomText>
          <CustomText style={[styles.text]}>|</CustomText>
          <CustomText style={styles.text}>{moment(data?.rider?.updated_at).format('HH-MM')}</CustomText>
        </View>
      </View>
      <View style={{ marginLeft: moderateScale(60, 0.6), alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        <CustomText isBold={true} style={styles.price}>{data?.amount + " $"}</CustomText>
        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
          <CustomText style={styles.texi_expence}>'Taxi Expance'</CustomText>
          <View style={{ height: moderateScale(10, 0.6), width: moderateScale(10, 0.6), backgroundColor: Color.blue, borderRadius: moderateScale(3, 0.6) }}>
            <Icon name='arrowup' as={AntDesign} color={Color.white} size={moderateScale(10, 0.6)} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HistoryComponent;

const styles = StyleSheet.create({
  main_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.12,
    marginVertical: moderateScale(6, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(6, 0.6),
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: 'center',
    borderRadius: moderateScale(10, 0.8),
    shadowColor: Color.lightGrey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

  },
  user_image_view: {
    height: moderateScale(50, 0.6),
    width: moderateScale(50, 0.6),
    borderRadius: moderateScale(20, 0.6)
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(30, 0.6)
  },
  user_name: {
    fontSize: moderateScale(14, 0.6),
    width: moderateScale(120, 0.6),
  },
  text: {
    fontSize: moderateScale(11, 0.6),
    color: Color.grey
  },
  price: {
    fontSize: moderateScale(14, 0.6),
  },
  texi_expence: {
    fontSize: moderateScale(11, 0.6),
    color: Color.grey
  }
});
