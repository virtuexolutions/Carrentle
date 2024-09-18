import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import BookYourCapComponent from '../Components/BookYourCapComponent';
import ScreenBoiler from '../Components/ScreenBoiler';
import {
  windowHeight,
  windowWidth
} from '../Utillity/utils';
import { useSelector } from 'react-redux';
import { Get } from '../Axios/AxiosInterceptorFunction';
import Loader from '../Components/Loader';

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rbRef, setRbRef] = useState(null);
  const [review, setReview] = useState(false)
  const token = useSelector(state => state.authReducer.token);
  const [cablist, setCabList] = useState(false);

  useEffect(() => {
    getCabList();
  }, []);

  const getCabList = async () => {
    const url = 'auth/customer/car_list';
    setIsLoading(true);
    const reponse = await Get(url, token);
    console.log(reponse?.data?.data, 'responseeeeeeeeeeeeeeee');
    setIsLoading(false);
    if (reponse != undefined) {
      setCabList(reponse?.data?.data);
    }
  };


  const dummyArray = [
    {
      id: 1,
      carN0: 'car no2',
      ratings: 4.5,
      carModel: '2013 dodge caravan',
      userImage: require('../Assets/Images/men.png'),
      carimage: require('../Assets/Images/car1.png'),
      ratingCount: '4.0',
      time: '3 mint',
      distance: '0.2 km',
      availableSeat: 2,
      pickUppoint: 'fannie street san angelo, texas',
      dropLocation: 'navile street salem colorado',
    },
    {
      id: 2,
      carN0: 'car no3',
      ratings: 4.1,
      time: '5 mint',
      ratingCount: '3.0',

      carModel: '2013 dodge caravan',
      userImage: require('../Assets/Images/dummyUser.png'),
      carimage: require('../Assets/Images/car3.png'),
      distance: '0.4 km',
      availableSeat: 4,
      pickUppoint: 'fannie street san angelo, texas',
      dropLocation: 'navile street salem colorado',
    },
    {
      id: 3,
      carN0: 'car no22',
      ratings: 4.2,
      ratingCount: '4.0',
      time: '10 mint',
      distance: '0.5 km',

      carModel: '2013 dodge caravan',
      userImage: require('../Assets/Images/dummyUser.png'),
      carimage: require('../Assets/Images/car4.png'),
      availableSeat: 3,
      pickUppoint: 'fannie street san angelo, texas',
      dropLocation: 'navile street salem colorado',
    },
    {
      id: 4,
      carN0: 'car no12',
      ratings: 3.5,
      ratingCount: '3.0',
      time: '3 mint',
      distance: '0.4 km',

      carModel: '2013 dodge caravan',
      userImage: require('../Assets/Images/dummyman1.png'),
      carimage: require('../Assets/Images/car3.png'),
      availableSeat: 2,
      pickUppoint: 'fannie street san angelo, texas',
      dropLocation: 'navile street salem colorado',
    },
    {
      id: 5,
      carN0: 'car no22',
      ratings: 2.9,
      time: '20 mint',

      carModel: '2013 dodge caravan',
      userImage: require('../Assets/Images/dummyUser1.png'),
      carimage: require('../Assets/Images/car4.png'),
      ratingCount: '2.0',
      distance: '0.11 km',
      availableSeat: 1,
      pickUppoint: 'fannie street san angelo, texas',
      dropLocation: 'navile street salem colorado',
    },
  ];

  return (
    <ScreenBoiler
      showHeader
      navigation={navigation}
      title={'book your cab'}
      headerColor={['white', 'white']}
      hideUser={false}
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(80, 0.6),
        }}
        showsVerticalScrollIndicator={false}
        style={{
          minHeight: windowHeight,
          backgroundColor: 'white',
        }}>
        <View style={{ paddingHorizontal: moderateScale(18, 0.6) }}>
          {isLoading ? (<Loader />) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{
                paddingTop: moderateScale(10, 0.6),
                paddingHorizontal: moderateScale(18, 0.6),
              }}
              data={cablist}
              renderItem={(item, index) => {
                return <BookYourCapComponent item={item?.item} />;
              }}
            />
          )}
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  icon: {
    marginHorizontal: moderateScale(10, 0.3),
  },
  Text: {
    fontSize: 18,
    textAlign: 'center',
    paddingTop: moderateScale(30, 0.3),
  },
  input: {
    backgroundColor: Color.lightGrey,
    width: windowWidth * 0.9,
    height: windowHeight * 0.16,
    marginVertical: moderateScale(20, 0.3),
    borderRadius: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(20, 0.3),
  },
  btnText: {
    color: Color.white,
    fontSize: moderateScale(17, 0.3),
  },
});

export default HomeScreen;
