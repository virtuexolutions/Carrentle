import { Pusher } from '@pusher/pusher-websocket-react-native';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Get } from '../Axios/AxiosInterceptorFunction';
import BookYourCapComponent from '../Components/BookYourCapComponent';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Loader from '../Components/Loader';
import ScreenBoiler from '../Components/ScreenBoiler';
import { baseUrl } from '../Config';
import {
  setUserChannelName,
  setUserEventData,
  setUserIsSubscribed,
} from '../Store/slices/socket';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';

const HomeScreen = ({ navigation }) => {
  const focused = useIsFocused();
  const isSubscribed = useSelector(
    state => state.socketReducer.userIsSubscribed,
  );
  const user_type = useSelector(state => state.authReducer.user_type);

  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);

  console.log('🚀 ~ HomeScreen ~ token:', token, user_type);
  const [cablist, setCabList] = useState(false);
  const dispatch = useDispatch();
  const userEventData = useSelector(state => state.socketReducer.userEventData);
  const [latest_ride, setlatestRide] = useState({});
  console.log("🚀 ~ HomeScreen ~ latest_ride:", latest_ride)
  const pusher = Pusher.getInstance();
  const [pending_ride, setPendingRide] = useState(false)
  console.log("🚀 ~ HomeScreen ~ pending_ride:", pending_ride)
  const currentRideId = useSelector(state => state.commonReducer.currentRideId);
  console.log("🚀 ~ HomeScreen ~ currentRideId:", currentRideId)

  const getRideHistory = async () => {
    const url = 'auth/customer/ride_history';
    const reponse = await Get(url, token);
    console.log('🚀 ~ getRideHistory ~ reponse:', reponse?.data);
    if (reponse != undefined) {
      // setHistory(reponse?.data);
    }
  };
  useEffect(() => {
    getRideHistory();
    async function connectPusher() {
      try {
        // const channelName = `rider-channel-${userData?.id}`;
        console.log(
          `Subscribing to channel: ${`customer-channel-${userData?.id}`}`,
        );
        await pusher.init({
          apiKey: '2cbabf5fca8e6316ecfe',
          cluster: 'ap2',
        });
        myChannel = await pusher.subscribe({
          channelName: `customer-channel-${userData?.id}`,
          onSubscriptionSucceeded: (channelName, data) => {
            console.log('Successfully subscribed to:', channelName);
            dispatch(setUserChannelName(`customer-channel-${userData?.id}`));
            dispatch(setUserIsSubscribed(true));
          },
          onSubscriptionError: error => {
            console.error('Subscription error:', error);
          },
          onEvent: event => {
            console.log('Event received:', event.data);
            const data = JSON.parse(event.data);
            dispatch(setUserEventData(data?.message?.ride_info));
          },
        });
        await pusher.connect();
      } catch (error) {
        console.error('Error during Pusher connection:', error);
      }
    }
    console.log(
      '🚀 ~ useEffect ~ pusher.connectionState:',
      pusher.connectionState,
    );
    if (pusher.connectionState == 'DISCONNECTED') {
      connectPusher();
    }
  }, [focused]);

  useEffect(() => {
    if (token) {
      getCabList();
      getLatestRide();
    }
  }, []);

  const getCabList = async () => {
    const url = 'auth/customer/car_list';
    setIsLoading(true);
    const reponse = await Get(url, token);
    console.log('🚀 ~ getCabList ~ reponse:', reponse?.data);
    setIsLoading(false);
    if (reponse != undefined) {
      setCabList(reponse?.data?.data);
    }
  };

  const getLatestRide = async () => {
    const url = 'auth/customer/ride_history';
    const response = await Get(url, token);
    console.log("🚀 ~ getLatestRide ~ response:", response?.data?.ride_lists)
    if (response?.data?.ride_lists != null) {
      const ongoingRide = response?.data?.ride_lists.find(
        (ride) => ride.status === "accept" || ride.status === "OnTheWay"
      );
      console.log("🚀 ~ getLatestRide ~ ongoingRide:", ongoingRide)
      setlatestRide(ongoingRide);
      setPendingRide(Object.keys(ongoingRide).length > 0 ? true : false)
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
      statusBarContentStyle={'dark-content'}>
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
          {isLoading ? (
            <Loader style={{ width: 70, height: 70 }} />
          ) : (
            <>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                  paddingTop: moderateScale(10, 0.6),
                  paddingHorizontal: moderateScale(18, 0.6),
                }}
                data={cablist}
                renderItem={({ item, index }) => {
                  return <BookYourCapComponent item={item} pending_ride={pending_ride} />;
                }}
              />
              <View style={{ marginBottom: moderateScale(60, 0.6) }} />
            </>
          )}
        </View>
      </ScrollView>
      {["accept", "OnTheWay", "OnRide", "Waiting"].includes(latest_ride?.status) && (
        <View style={styles.latest_ride_view}>
          <View style={styles.latest_ride_subView}>
            <View style={styles.latest_ride_image_view}>
              <CustomImage
                source={{ uri: `${baseUrl}/${latest_ride?.user?.photo}` }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: windowWidth,
                }}
              />
            </View>
            <View
              style={{
                marginLeft: moderateScale(10, 0.6),
                width: windowWidth * 0.5,
              }}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(16, 0.6),
                  color: Color.black,
                }}>
                {latest_ride?.user?.name}
              </CustomText>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomText
                  isBold
                  style={{
                    fontSize: moderateScale(11, 0.6),
                    color: Color.black,
                  }}>
                  status :
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(11, 0.6),
                    color: Color.veryLightGray,
                    marginLeft: moderateScale(8, 0.6),
                  }}>
                  {latest_ride?.status}
                </CustomText>
              </View>
            </View>
            <CustomText isBold style={{ fontSize: moderateScale(12, 0.6) }}>
              Date :
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(11, 0.6),
                marginLeft: moderateScale(10, 0.6),
              }}>
              {moment(latest_ride?.created_at).format('DD-MM-YYYY')}
            </CustomText>
          </View>
          <View style={styles.text_view2}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="map-pin" as={Feather} color={Color.orange} />
                <CustomText
                  isBold={true}
                  style={{
                    fontSize: 13,
                    paddingHorizontal: moderateScale(5, 0.6),
                  }}>
                  pickupLocatoion
                </CustomText>
                <CustomText
                  isBold
                  style={[
                    styles.text1,
                    {
                      position: 'absolute',
                      color: 'black',
                      paddingVertical: moderateScale(10, 0.6),
                      top: 11,
                      // marginLeft: moderateScale(-3, 0.6),
                      transform: [{ rotate: '-90deg' }],
                    },
                  ]}>
                  - - -
                </CustomText>
              </View>
              <CustomText
                numberOfLines={1}
                style={{
                  fontSize: 10,
                  width: windowWidth * 0.8,
                  marginLeft: moderateScale(18, 0.6),
                }}>
                {latest_ride?.location_from}
              </CustomText>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: moderateScale(7, 0.6),
                }}>
                <Icon name="map-pin" as={Feather} color={Color.cartheme} />
                <CustomText
                  isBold={true}
                  style={{
                    fontSize: 13,
                    paddingHorizontal: moderateScale(5, 0.6),
                  }}>
                  drop off location
                </CustomText>
              </View>
              <CustomText
                numberOfLines={1}
                style={{
                  fontSize: 10,
                  width: windowWidth * 0.8,
                  marginLeft: moderateScale(18, 0.6),
                }}>
                {latest_ride?.location_to}
              </CustomText>
            </View>
          </View>
          <CustomButton
            text={'Track Ride'}
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            marginTop={moderateScale(10, 0.3)}
            bgColor={Color.cartheme}
            borderColor={Color.white}
            borderWidth={1}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
            onPress={() => navigationService.navigate("CabTracking", {
              data: latest_ride,
              description: latest_ride,
              ride_id: latest_ride?.id
            })}
          />
        </View>
      )}
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
  // latest_ride_view: {
  //   width: windowWidth,
  //   height: windowHeight * 0.15,
  //   backgroundColor: Color.white,
  //   alignSelf: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 4,
  //   },
  //   shadowOpacity: 0.32,
  //   shadowRadius: 5.46,
  //   elevation: 9,
  //   marginTop: moderateScale(10, 0.6),
  //   borderRadius: moderateScale(20, 0.6),
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   paddingHorizontal: moderateScale(15, 0.6),
  // },
  text: {
    fontSize: moderateScale(12, 0.6),
    fontWeight: 'bold',
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
  },
  latest_ride_view: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Color.white,
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight * 0.27,
    paddingHorizontal: moderateScale(10, 0.6),
    borderTopStartRadius: moderateScale(26, 0.6),
    borderTopEndRadius: moderateScale(26, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    paddingVertical: moderateScale(8, 0.6),
  },
  latest_ride_image_view: {
    width: moderateScale(50, 0.6),
    height: moderateScale(50, 0.6),
    backgroundColor: Color.white,
    borderRadius: windowWidth,
  },
  latest_ride_subView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text_view2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  text1: {
    fontSize: moderateScale(9, 0.6),
  },
});

export default HomeScreen;
