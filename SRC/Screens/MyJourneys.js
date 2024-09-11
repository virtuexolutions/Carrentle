import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Header from '../Components/Header';
import { moderateScale } from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import Color from '../Assets/Utilities/Color';
import { Image } from 'react-native-svg';
import { mode } from 'native-base/lib/typescript/theme/tools';
import { color, position } from 'native-base/lib/typescript/theme/styled-system';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { Get } from '../Axios/AxiosInterceptorFunction';
import moment from 'moment';
import Loader from '../Components/Loader';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const MyJourneys = () => {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.authReducer.token);
  const [journey_list, setjourneyList] = useState(false);

  useEffect(() => {
    getJourneyList()
  }, [])


  const getJourneyList = async () => {
    const url = 'auth/customer/journey'
    setLoading(true)
    const reponse = await Get(url, token)
    console.log(reponse?.data?.data?.rides, 'responseeeeeeeeeeeeeeee')
    setLoading(false)
    if (reponse != undefined) {
      setjourneyList(reponse?.data?.data?.rides)
    }
  }

  const journeyList = [
    {
      id: 1,
      date: '29,July,2024',
      heading: 'Dodge Caravan',
      subheading: 'Lorem Ipsum Dolor Sit Amet',
      timeduration: '10 Mins, 2 Hours',
      buttontext: '26Km',
      image: require('../Assets/Images/car7.png'),
    },
    {
      id: 2,
      date: '27,July,2024',
      heading: '2023 BMW',
      subheading: 'Lorem Ipsum Dolor Sit Amet',
      timeduration: '14 Mins, 1 Hours',
      buttontext: '18Km',
      image: require('../Assets/Images/car5.png'),
    },
    {
      id: 3,
      date: '29,July,2024',
      heading: 'San Francisco',
      subheading: 'Lorem Ipsum Dolor Sit Amet',
      timeduration: '10 Mins, 2 Hours',
      buttontext: '26Km',
      image: require('../Assets/Images/car6.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        headerColor={['white', 'white']}
        title={'My Journey'}
        showBack={false}
      />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
            paddingTop: moderateScale(20, 0.6),
            paddingBottom: moderateScale(100, 0.6),
          }}
          showsVerticalScrollIndicator={false}
          data={journey_list}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: width * 0.87,
                  height: height * 0.24,
                  borderWidth: 1,
                  borderRadius: 15,
                  overflow: 'visible',
                  marginTop: moderateScale(30, 0.6),
                }}>
                <View style={styles.carImages}>
                  <CustomImage
                    style={{
                      height: '100%',
                      width: '110%',
                    }}
                    resizeMode={'contain'}
                    source={require('../Assets/Images/car7.png')}
                  />
                </View>
                <View
                  style={{
                    marginLeft: moderateScale(10, 0.3),
                    marginTop: moderateScale(15, 0.3),
                  }}>
                  <CustomText style={styles.dateStyle}>{moment(item?.created_at).format('MM-DD-YYYY')}</CustomText>

                  <CustomText isBold style={styles.headingStyle}>
                    {item.location_from}
                  </CustomText>
                  <CustomText style={styles.subheadingStyle}>
                    {item.location_to}
                  </CustomText>
                  <CustomText style={styles.durationStyle}>
                    {item.time ? item.time : '10 min'}
                  </CustomText>
                  <LinearGradient
                    start={{ x: 0, y: 2.1 }}
                    end={{ x: 4, y: 2 }}
                    colors={['#00309E', '#79B9F6', '#FFFFFF']}
                    style={styles.button}>
                    <CustomText style={{ color: Color.white }}>
                      {item.distance + 'Km'}
                    </CustomText>
                  </LinearGradient>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default MyJourneys;

const styles = StyleSheet.create({
  dateStyle: {
    fontSize: moderateScale(15, 0.6),
    letterSpacing: 1,
    color: Color.black,
  },
  headingStyle: {
    fontSize: moderateScale(23, 0.6),
  },
  subheadingStyle: {
    fontSize: moderateScale(11, 0.6),
    color: Color.themeLightGray,
  },
  durationStyle: {
    fontSize: 12,
    marginTop: 4,
    color: Color.themeLightGray,
  },
  button: {
    width: width * 0.3,
    height: moderateScale(40, 0.6),
    backgroundColor: '#79B9F6',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  carImages: {
    height: moderateScale(100, 0.6),
    width: moderateScale(130, 0.6),
    alignSelf: 'flex-end',
    position: 'absolute',
    top: moderateScale(-40, 0.6),
  },
  container: {
    height: height,
    width: width,
    backgroundColor: 'white',
  },
});
