import React, {useEffect, useState} from 'react';
import {Icon} from 'native-base';
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
const {height, width} = Dimensions.get('window');
import Feather from 'react-native-vector-icons/Feather';

import {useDispatch, useSelector} from 'react-redux';
import {imageUrl} from '../Config';
import {setUserLogout, setUserLogoutAuth} from '../Store/slices/auth-slice';
import LinearGradient from 'react-native-linear-gradient';
import {
  setCurrentRideId,
  setEventDataRider,
  setUserLogOut,
} from '../Store/slices/common';
import navigationService from '../navigationService';
import AcceptRideModal from './AcceptRideModal';
import Geolocation from '@react-native-community/geolocation';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {getDistance} from 'geolib';

const Header = props => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.commonReducer.notification);
  const riderEvent = useSelector(state => state.commonReducer.riderEventData);
  console.log("🚀 ~ riderEvent:", riderEvent)
  const cartData = useSelector(state => state.commonReducer.cart);
  const navigationN = useNavigation();
  // const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    title,
    showBack,
    showList,
    headerColor,
    titleColor,
    close,
    navigateTO,
    index,
    cart,
    Notify,
    hideUser,
    navigation,
    textstyle,
  } = props;

  const [searchText, setSearchText] = useState('');
  const user_type = useSelector(state => state.authReducer.user_type);
  const user = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ Header ~ token: ', token, user_type);
  // console.log('🚀 ~ Header ~ token:', token);
  const [currentPossition, setcurrentPossition] = useState({});
  const [time, setTime] = useState(0);
  const statusArray = [
    {label: 'Change Password', value: 'ChangePassword'},
    {label: 'Terms & Conditions', value: 'TermsAndConditions'},
    {label: 'Financial Breakdown', value: 'FinancialBreakDown'},
    {label: 'Logout', value: 'Logout'},
  ];

  const Confirm = () => {
    Alert.alert('Action required', 'Login to Continue', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Login',
        onPress: () => {
          navigationService.navigate('LoginScreen');
        },
      },
    ]);
    return true;
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve(coords);
          },
          error => {
            reject(new Error(error.message));
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      });
      setcurrentPossition(position);
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  };

  useEffect(() => {
    console.log('yahaaa a rha ha');
    if (currentPossition && riderEvent?.pickup_location_lat != null) {
      const dropLocation = {
        latitude: parseFloat(riderEvent?.pickup_location_lat),
        longitude: parseFloat(riderEvent?.pickup_location_lng),
      };
      const checkDistanceBetween = getDistance(currentPossition, dropLocation);
      let km = Math.round(checkDistanceBetween / 1000);
      const distanceInMiles = km / 1.60934;
      const getTravelTime = async () => {
        const GOOGLE_MAPS_API_KEY = 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM';
        try {
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${currentPossition?.latitude},${currentPossition?.longitude}&destinations=${dropLocation.latitude},${dropLocation.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data.status === 'OK') {
            const distanceMatrix = data.rows[0].elements[0];
            const travelTime = distanceMatrix.duration.text;
            return setTime(travelTime);
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getTravelTime();
    }
  }, [currentPossition]);

  const onpressAccept = async currentStatus => {
    const body = {
      lat: currentPossition?.latitude,
      lng: currentPossition?.longitude,
      status: currentStatus,
      rider_arrived_time: time,
    };
    const url = `auth/rider/ride_update/${riderEvent?.id}`;
    const response = await Post(url, body, apiHeader(token));
    console.log('🚀 ~ onpressAccept response:', response?.data?.ride_info);
    if (response?.data?.ride_info?.status === 'accept') {
      dispatch(setEventDataRider({}));
      dispatch(setCurrentRideId(response?.data?.ride_info?.id));
      navigationService.navigate('TrackingScreen', {
        data: response?.data?.ride_info,
        rider_data: response?.data?.ride_info?.rider,
        ride_id: response?.data?.ride_info?.id,
      });
    } else {
      dispatch(setEventDataRider({}));
    }
    {
      console.log('RejectRide');
    }
  };

  return (
    <LinearGradient
      style={[styles.header2, index && {zIndex: 1}]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={headerColor ? headerColor : Color.themeBgColor}>
      <View
        style={{
          height: moderateScale(30, 0.3),
          width: moderateScale(30, 0.3),
          borderRadius: moderateScale(5, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: showBack || showList ? 'white' : 'transparent',
        }}>
        {showBack ? (
          <Icon
            name={'arrow-back'}
            as={Ionicons}
            size={moderateScale(25, 0.3)}
            color={Color.black}
            onPress={() => {
              navigationN.goBack();
            }}
          />
        ) : (
          <Icon
            style={[styles.menu, styles.shadowporp]}
            name={'menu'}
            as={Feather}
            size={moderateScale(25, 0.3)}
            color={Color.black}
            onPress={() => {
              navigationN.toggleDrawer();
              // navigation.openDrawer();
              // navigationN.dispatch(DrawerActions.toggleDrawer());
            }}
          />
        )}
      </View>
      {title ? (
        <>
          <CustomText style={[styles.text, textstyle]} isBold>
            {title}
          </CustomText>
        </>
      ) : (
        <CustomImage
          resizeMode={'contain'}
          style={{
            width: windowWidth * 0.21,
            // backgroundColor : 'red' ,
            height: windowHeight * 0.05,
          }}
          source={require('../Assets/Images/customerservice.png')}
        />
      )}

      {/* <CustomText isBold style={{color : Color.white , fontSize : moderateScale(20,0.6)}} >Hola!!</CustomText> */}
      {!hideUser && cart ? (
        <View
          style={{
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: moderateScale(6, 0.6),
          }}>
          {cartData?.length > 0 && (
            <View
              style={{
                width: moderateScale(14, 0.6),
                height: moderateScale(14, 0.6),
                borderRadius: moderateScale(7, 0.6),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                position: 'absolute',
                right: -4,
                zIndex: 1,
                top: 0,
              }}>
              <CustomText
                style={{
                  fontSize: 8,
                }}>
                {cartData?.length < 10 ? cartData?.length : '9+'}
              </CustomText>
            </View>
          )}

          <Icon
            name={'shopping-cart'}
            as={Feather}
            size={moderateScale(25, 0.3)}
            color={Color.black}
            onPress={() => {
              if (token == null) {
                Confirm();
                // navigationService.navigate('LoginScreen')
              } else if (cartData?.length > 0) {
                navigationService.navigate('CartScreen');
              } else {
                return Platform.OS == 'android'
                  ? ToastAndroid.show('No Item in cart', ToastAndroid.SHORT)
                  : Alert('No Item in cart');
              }
            }}
          />
        </View>
      ) : (
        <View
          style={{
            width: windowHeight * 0.045,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 12,
            height: windowHeight * 0.045,
            // overflow:'hidden',
            backgroundColor: '#dedbdbc8',
            borderRadius: (windowHeight * 0.045) / 2,
          }}>
          <CustomImage
            source={require('../Assets/Images/Group13.png')}
            style={{width: windowHeight * 0.04, height: windowHeight * 0.04}}
          />
        </View>
      )}
      {user_type?.toLowerCase() == 'rider' && (
        <AcceptRideModal
          data={riderEvent?.user}
          visible={Object.keys(riderEvent || {})?.length > 0}
          pickupLocation={riderEvent?.location_to}
          dropoffLocation={riderEvent?.location_from}
          distance={riderEvent?.distance}
          seats={riderEvent?.carinfo?.seats}
          CarNumber={riderEvent?.carinfo?.no}
          carName={riderEvent?.carinfo?.name}
          price={riderEvent?.amount + ' $'}
          isRider={true}
          onpressClose={() => setModalVisible(false)}
          onpressSeeLocation={() => {
            navigationService.navigate('WaitingScreen', {
              data: riderEvent,
              type: 'fromRequest',
            });
          }}
          // location={currentPossition}
          rider_id={riderEvent?.id}
          // onpressAccept={() => onpressAccept()}
          // status={status}
          // setstatus={setstatus}
          AcceptRide={() => {
            onpressAccept('accept');
          }}
          RejectRide={() => {
            onpressAccept('reject');
          }}
        />
      )}
    </LinearGradient>
  );
};
const styles = ScaledSheet.create({
  header1: {
    width: windowWidth,
    height: windowHeight * 0.1,
    backgroundColor: Color.white,
    marginBottom: moderateScale(5, 0.3),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  user_name: {
    fontSize: moderateScale(20, 0.6),
    color: Color.blue,
  },
  text: {
    fontSize: moderateScale(18, 0.6),
    color: Color.black,
  },
  menu: {
    height: windowHeight * 0.05,
    width: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    textAlign: 'center',
    backgroundColor: 'white',
    paddingTop: moderateScale(7, 0.6),
  },
  shadowporp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  statusModal: {
    alignSelf: 'flex-end',
    paddingVertical: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    marginTop: moderateScale(60, 0.3),
    borderColor: Color.green,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
  },
  header2: {
    width: windowWidth,
    backgroundColor: Color.themeColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    alignItems: 'center',
  },
  notificationCircle: {
    position: 'absolute',
    height: moderateScale(10, 0.3),
    width: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: Color.green,
    right: moderateScale(5, 0.3),
  },
});
export default Header;
