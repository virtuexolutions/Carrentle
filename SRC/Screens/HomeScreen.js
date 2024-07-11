import React, {useState, useEffect} from 'react';
import Color from '../Assets/Utilities/Color';
import {
  requestLocationPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {View, RefreshControl, ScrollView, FlatList} from 'react-native';
import CustomText from '../Components/CustomText';
import {useIsFocused, } from '@react-navigation/native';
import Header from '../Components/Header';
import BookYourCapComponent from '../Components/BookYourCapComponent';

const HomeScreen = props => {
  // const
  // const isFocused = useIsFocused();
  // const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const dummyArray = [
    {
      id: 1,
      carN0: 'car no2',
      ratings: 4.5,
      carModel :'2013 dodge caravan',
      userImage:require('../Assets/Images/men.png'),
      carimage:require('../Assets/Images/car1.png'),
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
      
      carModel :'2013 dodge caravan',
      userImage:require('../Assets/Images/dummyUser.png'),
      carimage:require('../Assets/Images/car3.png'),
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
      
      carModel :'2013 dodge caravan',
      userImage:require('../Assets/Images/dummyUser.png'),
      carimage:require('../Assets/Images/car4.png'),
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
      
      carModel :'2013 dodge caravan',
      userImage:require('../Assets/Images/dummyman1.png'),
      carimage:require('../Assets/Images/car3.png'),
      availableSeat: 2,
      pickUppoint: 'fannie street san angelo, texas',
      dropLocation: 'navile street salem colorado',
    },
    {
      id: 5,
      carN0: 'car no22',
      ratings: 2.9,
      time: '20 mint',

      carModel :'2013 dodge caravan',
      userImage:require('../Assets/Images/dummyUser1.png'),
      carimage:require('../Assets/Images/car4.png'),
      ratingCount: '2.0',
      distance: '0.11 km',
      availableSeat: 1,
      pickUppoint: 'fannie street san angelo, texas',
      dropLocation: 'navile street salem colorado',
    },
  ];

  return (
    <ScreenBoiler
      // showHeader
      title={'book your cap '}
      // headerColor={['white', 'white']}
      hideUser={false}
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          minHeight: windowHeight,
          backgroundColor: 'white',
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            // backgroundColor :'pink',
            paddingTop: moderateScale(10, 0.6),
            paddingHorizontal: moderateScale(18, 0.6),
          }}
          contentContainerStyle={{
            paddingBottom :moderateScale(150,.6)
          }}
          data={dummyArray}
          renderItem={(item, index) => {
            // console.log('🚀 ~ ============= >item:', item);
            return <BookYourCapComponent item={item?.item} />;
          }}
        />
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.themeColor,
  },
});

export default HomeScreen;
