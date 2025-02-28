import { Pusher } from '@pusher/pusher-websocket-react-native';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Get } from '../Axios/AxiosInterceptorFunction';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import HistoryComponent from '../Components/HistoryComponent';
import Loader from '../Components/Loader';
import navigationService from '../navigationService';
import {
  setRiderIsSubscribed,
  setriderChannelName,
} from '../Store/slices/socket';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { setCurrentStatus, setEventDataRider } from '../Store/slices/common';
import CustomImage from '../Components/CustomImage';
import moment from 'moment';
import { baseUrl } from '../Config';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../Components/CustomButton';

const previous_trip_card = [
  {
    id: 1,
    name: 'Frederick A.Dawkins',
    pickupLocatoion: 'Fannie Street San Angelo, Texas',
    dropOffLocation: 'Neville Street Salem, Colorado',
    distance: '63 Km',
    price: '$ 90',
    userImage: require('../Assets/Images/men.png'),
  },
  {
    id: 2,
    name: 'Frederick A.Dawkins',
    pickupLocatoion: 'Fannie Street San Angelo, Texas',
    dropOffLocation: 'Neville Street Salem, Colorado',
    distance: '63 Km',
    price: '$ 90',
    userImage: require('../Assets/Images/men.png'),
  },
  {
    id: 3,
    name: 'Frederick A.Dawkins',
    pickupLocatoion: 'Fannie Street San Angelo, Texas',
    dropOffLocation: 'Neville Street Salem, Colorado',
    distance: '63 Km',
    price: '$ 90',
    userImage: require('../Assets/Images/men.png'),
  },
  {
    id: 4,
    name: 'Frederick A.Dawkins',
    pickupLocatoion: 'Fannie Street San Angelo, Texas',
    dropOffLocation: 'Neville Street Salem, Colorado',
    distance: '63 Km',
    price: '$ 90',
    userImage: require('../Assets/Images/men.png'),
  },
];

const DashBoard = () => {
  const focused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const isSubscribed = useSelector(
    state => state.socketReducer.riderIsSubscribed,
  );
  const riderEventData = useSelector(
    state => state.commonReducer.riderEventData,
  );
  const currentLocation = useSelector(
    state => state.commonReducer.currentLocation,
  );
  const currentRideId = useSelector(state => state.commonReducer.currentRideId);

  const [history, setHistory] = useState();
  console.log("🚀 ~ DashBoard ~ history:", history)
  const [current_ride, setCurrentRide] = useState({});
  console.log("🚀 ~ DashBoard ~ current_ride:", current_ride)
  const [loading, setLoading] = useState(false);
  const [Transactionhistory, setTransactionHistory] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [getMore, setGetMore] = useState(false);
  const pusher = Pusher.getInstance();
  const dispatch = useDispatch();
  console.log("🚀 ~ DashBoard ~ currentRideId:", currentRideId)

  const getRideHistory = async () => {
    const url = 'auth/rider/ride_history';
    const reponse = await Get(url, token);
    if (reponse != undefined) {
      setHistory(reponse?.data?.ride_lists);
      const ongoingRide = reponse?.data?.ride_lists.find(
        ride => ride.id === currentRideId,
      );
      setCurrentRide(ongoingRide);
    }
  };

  // useEffect(() => {
  //   const tracklocation = async ({ latitude, longitude }) => {
  //     const url = `auth/rider/update_location/${ride_id}`;
  //     const body = {
  //       lat: latitude,
  //       lng: longitude,
  //     };
  //     const response = await Post(url, body, apiHeader(token));
  //   };
  // }, [currentLocation])

  useEffect(() => {
    getRideHistory();
    async function connectPusher() {
      try {
        console.log(
          `Subscribing to channel: ${`rider-channel-${userData?.id}`}`,
        );
        await pusher.init({
          apiKey: '2cbabf5fca8e6316ecfe',
          cluster: 'ap2',
        });
        myChannel = await pusher.subscribe({
          channelName: `rider-channel-${userData?.id}`,
          onSubscriptionSucceeded: (channelName, data) => {
            console.log('Successfully subscribed to:', channelName);
            dispatch(setriderChannelName(channelName));
            dispatch(setRiderIsSubscribed(true));
          },
          onSubscriptionError: error => {
            console.error('Subscription error:', error);
          },
          onEvent: event => {
            console.log('Event received: rider', event.data);
            const data = JSON.parse(event.data);
            if (data.message.ride_info?.status === 'in process') {
              dispatch(setEventDataRider(data.message.ride_info));
            } else {
              dispatch(setEventDataRider({}));
            }
            dispatch(setCurrentStatus(data.message.ride_info?.status))
          },
        });
        await pusher.connect();
      } catch (error) {
        console.error('Error during Pusher connection:', error);
      }
    }
    if (pusher.connectionState == 'DISCONNECTED') {
      connectPusher();
    }
  }, [focused]);

  useEffect(() => {
    if (token) {
      getPaymentHistory();
    }
  }, [focused]);

  useEffect(() => {
    setPageNum(1);
  }, [Transactionhistory]);

  useEffect(() => {
    if (pageNum > 1) {
      getPaymentHistory('loadMore');
    }
  }, [pageNum]);

  const getPaymentHistory = async type => {
    const url = `auth/transaction?page=${pageNum}`;
    type == 'loadMore' ? setLoadMore(true) : setLoading(true);
    const response = await Get(url, token);
    type == 'loadMore' ? setLoadMore(false) : setLoading(false);
    setLoading(false);
    if (response != undefined) {
      if (type == 'loadMore') {
        setTransactionHistory(prev => [...prev, ...response?.data?.date?.data]);
      } else {
        setTransactionHistory(response?.data?.date?.data);
      }
    }
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 10;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <View style={styles.main_view}>
      <Header
        headerColor={['white', 'white']}
        title={'DashBoard'}
        showBack={false}
      />
      <ScrollView
        style={{
          width: windowWidth,
          height: windowHeight,
        }}>
        <LinearGradient
          start={{ x: 1, y: 0.2 }}
          end={{ x: 1, y: 0.9 }}
          colors={['#00309E', '#4680D1']}
          style={styles.sub_view}>
          <View style={styles.card_view}>
            <CustomText style={styles.today_text}>Today</CustomText>
            <CustomText isBold={true} style={styles.price_text}>
              {(userData?.wallet?.balance != null
                ? userData?.wallet?.balance
                : 0) + '$'}
            </CustomText>
            <View style={styles.lines} />
            <View style={styles.rides_view}>
              <View style={styles.ride_sub_view}>
                <Icon name="taxi" as={FontAwesome5} color={Color.blue_color} />
                <CustomText isBold={true} style={styles.text}>
                  0 Rides
                </CustomText>
              </View>
              <View style={styles.ride_sub_view}>
                <Icon name="clock" as={FontAwesome5} color={Color.blue_color} />
                <CustomText isBold={true} style={styles.text}>
                  0 Hours
                </CustomText>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.wallet_history_card}>
          <View style={styles.wallet_card}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View>
                <CustomText
                  style={{ fontSize: moderateScale(12, 0.6), color: Color.grey }}>
                  Wallet Balance
                </CustomText>
                <CustomText
                  isBold={true}
                  style={{ fontSize: moderateScale(14, 0.6) }}>
                  $ 1,291
                </CustomText>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: moderateScale(100, 0.6),
                  height: moderateScale(35, 0.6),
                  borderRadius: moderateScale(20, 0.6),
                  borderWidth: 1,
                  borderColor: Color.blue_color,
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(13, 0.6),
                    marginRight: moderateScale(10, 0),
                  }}
                  isBold={true}>
                  WithDraw
                </CustomText>
                <Icon
                  name="arrow-right"
                  as={FontAwesome5}
                  color={Color.blue_color}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.lines, { width: '100%' }]} />
            <TouchableOpacity
              onPress={() => navigationService.navigate('MyWallet')}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginTop: moderateScale(15, 0.6),
              }}>
              <CustomText style={{ fontSize: moderateScale(13, 0.6) }}>
                Payment History
              </CustomText>
              <View>
                <Icon
                  name="arrow-forward-ios"
                  as={MaterialIcons}
                  color={Color.blue_color}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <CustomText
          isBold={true}
          style={{
            fontSize: moderateScale(16, 0.6),
            textAlign: 'left',
            width: '90%',
            marginVertical: moderateScale(10, 0.6),
            color: Color.blue_color,
            marginLeft: moderateScale(15, 0.6),
          }}>
          Ride history
        </CustomText>
        {loading ? (
          <Loader
            style={{
              width: moderateScale(50, 0.6),
              height: moderateScale(50, 0.6),
              alignItems: 'center',
              alignSelf: 'center ',
            }}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <CustomText style={{ color: 'red', textAlign: 'center' }}>
                No data Found yet
              </CustomText>
            )}
            contentContainerStyle={{
              paddingBottom: moderateScale(10, 0.6),
            }}
            data={history}
            onScrollEndDrag={({ nativeEvent }) => {
              {
                if (isCloseToBottom(nativeEvent)) {
                  setPageNum(prev => prev + 1);
                  setGetMore(true);
                }
              }
            }}
            ListFooterComponent={() => {
              return (
                loadMore && (
                  <View
                    style={{
                      width: windowWidth,
                      marginTop: moderateScale(10, 0.3),
                    }}>
                    <ActivityIndicator
                      size={moderateScale(35, 0.6)}
                      color={Color.themeColor}
                    />
                  </View>
                )
              );
            }}
            renderItem={(item, index) => {
              return <HistoryComponent data={item?.item} />;
            }}
          />
        )}
      </ScrollView>
      {["accept", "OnTheWay", "OnRide", "Waiting"].includes(current_ride?.status) && (
        <View style={[styles.latest_ride_view, {
          bottom: 20
        }
        ]}>
          <View style={styles.latest_ride_subView}>
            <View style={styles.latest_ride_image_view}>
              <CustomImage
                source={{ uri: `${baseUrl}/${history?.user?.photo}` }}
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
                {current_ride?.user?.name}
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
                  {current_ride?.status}
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
              {moment(current_ride?.created_at).format('MM-DD-YYYY')}
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
                {current_ride?.location_from}
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
                {current_ride?.location_to}
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
            onPress={() =>
              navigationService.navigate('TrackingScreen', {
                data: current_ride,
                description: current_ride,
                ride_id: current_ride?.id,
              })
            }
          />
        </View>
      )}
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  main_view: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sub_view: {
    width: windowWidth,
    height: windowHeight * 0.2,
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_view: {
    width: windowWidth * 0.8,
    // height: windowHeight * 0.2,
    paddingVertical: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(15, 0.6),
    marginBottom: moderateScale(20, 0.6),
    shadowColor: Color.blue,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 7,
    position: 'absolute',
    top: moderateScale(40, 0.8),
  },
  lines: {
    backgroundColor: Color.lightGrey,
    height: 1.5,
    width: '90%',
    marginTop: moderateScale(20, 0.6),
  },
  rides_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(20, 0.6),
    alignItems: 'center',
    width: windowWidth * 0.7,
  },
  ride_sub_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  today_text: { fontSize: moderateScale(16, 0.6), color: Color.grey },
  price_text: { fontSize: moderateScale(25, 0.6), color: Color.black },
  text: { fontSize: moderateScale(12, 0.6), marginLeft: moderateScale(5, 0.6) },
  wallet_card: {
    width: windowWidth * 0.9,
    backgroundColor: Color.white,
    alignItems: 'center',
    borderRadius: moderateScale(15, 0.6),
    marginBottom: moderateScale(20, 0.6),
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 7,
    alignSelf: 'center',
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(20, 0.6),
  },
  wallet_history_card: {
    paddingHorizontal: moderateScale(20, 0.6),
    marginTop: moderateScale(80, 0.6),
  },
  history_card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.15,
    backgroundColor: Color.white,
    marginTop: moderateScale(10, 0.6),
    borderRadius: moderateScale(20, 0.6),
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginHorizontal: moderateScale(10, 0),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seatView: {
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(8, 0.6),
    flexDirection: 'row',
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
  },
  text1: {
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
    height: windowHeight * 0.25,
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
