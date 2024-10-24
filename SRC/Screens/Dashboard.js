import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Get} from '../Axios/AxiosInterceptorFunction';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import HistoryComponent from '../Components/HistoryComponent';
import Loader from '../Components/Loader';
import navigationService from '../navigationService';
import {windowHeight, windowWidth} from '../Utillity/utils';
import RiderArrivedModal from '../Components/RiderArrivedModal';

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
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(false);
  const [Transactionhistory, setTransactionHistory] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [getMore, setGetMore] = useState(false);

  useEffect(() => {
    getPaymentHistory();
  }, []);
  useEffect(() => {
    getPaymentHistory();
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
    console.log('🚀 ~ getPaymentHistory ~ response:', response?.data);
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

  // const getRideHistory = async type => {
  //   const url = `auth/rider/assign-ride`;
  //   setLoading(true);
  //   const response = await Get(url, token);
  //   setLoading(false);
  //   console.log(response?.data, 'resoinseeeeeeeeeeee');
  //   if (response != undefined) {
  //     setLoading(false);
  //     setlatestRide(response?.data);
  //   }
  // };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
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
      <ScrollView style={{flex: 1}}>
        <LinearGradient
          start={{x: 1, y: 0.2}}
          end={{x: 1, y: 0.9}}
          colors={['#00309E', '#4680D1']}
          style={styles.sub_view}>
          <View style={styles.card_view}>
            <CustomText style={styles.today_text}>Today</CustomText>
            <CustomText isBold={true} style={styles.price_text}>
              {userData?.wallet?.balance}
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
                  style={{fontSize: moderateScale(12, 0.6), color: Color.grey}}>
                  Wallet Balance
                </CustomText>
                <CustomText
                  isBold={true}
                  style={{fontSize: moderateScale(14, 0.6)}}>
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
            <View style={[styles.lines, {width: '100%'}]} />
            <TouchableOpacity
              onPress={() => navigationService.navigate('MyWallet')}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginTop: moderateScale(15, 0.6),
              }}>
              <CustomText style={{fontSize: moderateScale(13, 0.6)}}>
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
          Latest Assign Rides
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
            style={{width: windowWidth, height: windowHeight}}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <CustomText style={{color: 'red', textAlign: 'center'}}>
                No data Found yet
              </CustomText>
            )}
            contentContainerStyle={{
              paddingBottom: moderateScale(10, 0.6),
            }}
            data={Transactionhistory}
            onScrollEndDrag={({nativeEvent}) => {
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
  today_text: {fontSize: moderateScale(16, 0.6), color: Color.grey},
  price_text: {fontSize: moderateScale(25, 0.6), color: Color.black},
  text: {fontSize: moderateScale(12, 0.6), marginLeft: moderateScale(5, 0.6)},
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
});
