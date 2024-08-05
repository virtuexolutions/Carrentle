import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import HistoryComponent from '../Components/HistoryComponent';
import { useNavigation } from '@react-navigation/native';


const PaymentHistory = () => {
  const navigation = useNavigation()

  const dummyArray = [
    {
      id: 1,
      userImage: require('../Assets/Images/men.png'),
      date: 'Dec 20 2024',
      time: '10 : 00 AM',
      price: '$15',
      taxi_expanse: 'Taxi Expance',
      name: "Danial Austin"
    },
    {
      id: 2,
      userImage: require('../Assets/Images/dummyUser.png'),
      date: 'Dec 20 2024',
      time: '10 : 00 AM',
      price: '$15',
      taxi_expanse: 'Taxi Expance',
      name: "Danial Austin"
    },
    {
      id: 3,
      userImage: require('../Assets/Images/dummyUser.png'),
      date: 'Dec 20 2024',
      time: '10 : 00 AM',
      price: '$15',
      taxi_expanse: 'Taxi Expance',
      name: "Danial Austin"

    },
    {
      id: 4,
      userImage: require('../Assets/Images/dummyman1.png'),
      date: 'Dec 20 2024',
      time: '10 : 00 AM',
      price: '$15',
      taxi_expanse: 'Taxi Expance',
      name: "Danial Austin"

    },
    {
      id: 5,
      userImage: require('../Assets/Images/dummyUser1.png'),
      date: 'Dec 20 2024',
      time: '10 : 00 AM',
      price: '$15',
      taxi_expanse: 'Taxi Expance',
      name: "Danial Austin"
    },
    {
      id: 6,
      userImage: require('../Assets/Images/dummyUser1.png'),
      date: 'Dec 20 2024',
      time: '10 : 00 AM',
      price: '$15',
      taxi_expanse: 'Taxi Expance',
      name: "Danial Austin"
    },
    {
      id: 7,
      userImage: require('../Assets/Images/dummyUser1.png'),
      date: 'Dec 20 2024',
      time: '10 : 00 AM',
      price: '$15',
      taxi_expanse: 'Taxi Expance',
      name: "Danial Austin"
    },
    {
      id: 8,
      userImage: require('../Assets/Images/dummyUser1.png'),
      date: 'Dec 20 2024',
      time: '10 : 00 AM',
      price: '$15',
      taxi_expanse: 'Taxi Expance',
      name: "Danial Austin"
    },
    {
      id: 9,
      userImage: require('../Assets/Images/dummyUser1.png'),
      date: 'Dec 20 2024',
      time: '10 : 00 AM',
      price: '$15',
      taxi_expanse: 'Taxi Expance',
      name: "Danial Austin"
    },

  ];

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: moderateScale(150, 0.6),
      }}
      showsVerticalScrollIndicator={false}
      style={{
        minHeight: windowHeight,
        backgroundColor: 'white',
      }}>

      <Header showBack={true} title={'payment History'} headerColor={['white', 'white']} />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: moderateScale(10, 0.6),
          paddingHorizontal: moderateScale(18, 0.6),
        }}
        contentContainerStyle={{
          paddingBottom: moderateScale(10, 0.6),
        }}
        data={dummyArray}
        renderItem={(item, index) => {
          return <HistoryComponent data={item?.item} />;
        }}
      />
    </ScrollView>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.45,
    borderRadius: moderateScale(10, 0.6),
    height: windowHeight * 0.08,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    borderColor: Color.cartheme1,
    borderWidth: 1,
  },
  text: {
    textAlign: 'center',
  },
  row: {
    width: windowWidth,
    height: windowHeight * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  image: {
    height: windowHeight * 0.043,
    width: windowWidth * 0.12,
    padding: moderateScale(5, 0.6),
    marginTop: moderateScale(10, 0.6),
  },
  header: {
    width: windowWidth,
    paddingHorizontal: moderateScale(12, 0.3),
    paddingVertical: moderateScale(12, 0.2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: windowHeight * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    height: windowHeight * 0.045,
    backgroundColor: '#dedbdbc8',
    borderRadius: (windowHeight * 0.045) / 2,
  },
  btn: {
    width: windowWidth * 0.09,
    backgroundColor: 'white',
    height: windowWidth * 0.09,
    justifyContent: 'center',
    elevation: 12,
    alignItems: 'center',
    borderRadius: (windowWidth * 0.09) / 2,
    zIndex: 1
  },

});
