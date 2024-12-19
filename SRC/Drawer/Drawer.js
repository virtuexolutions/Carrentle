import {Pusher} from '@pusher/pusher-websocket-react-native';
import {useNavigation} from '@react-navigation/native';
import {Divider, Icon} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import {imageUrl} from '../Config';
import {setUserLogoutAuth} from '../Store/slices/auth-slice';
import {setUserLogOut} from '../Store/slices/common';
import {
  resetPusher,
  setriderIsSubscribed,
  setUserIsSubscribed,
} from '../Store/slices/socket';
import {windowHeight, windowWidth} from '../Utillity/utils';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const Drawer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  const pusher = Pusher.getInstance();
  const role = useSelector(state => state.authReducer.role);
  const {user_type} = useSelector(state => state.authReducer);
  const riderChannelName = useSelector(
    state => state.socketReducer.riderChannelName,
  );
  const userChannelName = useSelector(
    state => state.socketReducer.userChannelName,
  );
  console.log('🚀 ~ Drawer ~ userChannelName:', userChannelName);

  const pusherInstance = useSelector(
    state => state.socketReducer.pusherInstance,
  );
  const adminData = [
    // {
    //   name: 'Home',
    //   iconName: 'car',
    //   iconType: AntDesign,
    //   onPress: () => {
    //     // navigation.navigate('HomeScreen');
    //   },
    // },
    {
      name: user_type === 'Rider' ? 'DashBoard' : 'Book a ride ',
      iconName: user_type === 'Rider' ? 'home' : 'car',
      iconType: AntDesign,
      onPress: () => {
        navigation.navigate(user_type === 'Rider' ? 'DashBoard' : 'HomeScreen');
      },
    },
    {
      name: 'Payment history',
      iconName: 'car',
      iconType: AntDesign,
      onPress: () => {
        navigation.navigate('PaymentHistory');
      },
    },
    {
      name: 'my journey ',
      iconName: 'compass-outline',
      iconType: Ionicons,
      onPress: () => {
        navigation.navigate('MyJourneys');
      },
    },
    {
      name: 'notifications ',
      iconName: 'notifications-outline',
      iconType: Ionicons,
      onPress: () => {
        navigation.navigate('Notifications');
      },
    },
    {
      name: 'my wallet ',
      iconName: 'wallet',
      iconType: AntDesign,
      onPress: () => {
        navigation.navigate('MyWallet');
      },
    },
    {
      name: 'campaigns ',
      iconName: 'eye-outline',
      iconType: Ionicons,
      onPress: () => {
        // navigation.navigate('HomeScreen');
      },
    },
    {
      name: 'help',
      iconName: 'help-circle',
      iconType: Feather,
      onPress: () => {
        navigation.navigate('Help');
      },
    },
    {
      name: 'terms & policies',
      iconName: 'shield',
      iconType: Feather,
      onPress: () => {
        navigation.navigate('TermsAndConditions');
      },
    },

    {
      name: 'Log out',
      iconName: 'power',
      iconType: Feather,
      onPress: () => {
        logoutUser();
      },
    },
  ];
  // useEffect(() => {
  //   if (pusherInstance && riderChannelName) {
  //     const channel = pusherInstance.channels.get(riderChannelName);
  //     // if (channel === riderChannelName) {
  //     //   channel.bind('event_name', data => {
  //     //     console.log('Received event data:', data);
  //     //     dispatch(setEventData(data));
  //     //   });

  //     //   channel.bind('subscription_succeeded', () => {
  //     //     console.log(`Successfully subscribed to ${channelName}`);
  //     //   });
  //     // } else {
  //     //   console.error('Channel not found');
  //     // }
  //   }
  // }, [dispatch, pusherInstance]);

  const logoutUser = async () => {
    try {
      console.log(pusher.connectionState, 'connectionState');
      if (user_type === 'Rider') {
        if (riderChannelName) {
          pusher.disconnect();
          // console.log('Rider');
          // pusher.unsubscribe(riderChannelName);
          // dispatch(setriderIsSubscribed(false));
        } else {
          console.warn('rider channel name is null or undefined');
        }
      } else {
        if (userChannelName) {
          console.log('User');
          pusher.disconnect();
          // pusher.unsubscribe(`customer-channel-${userData?.id}`);
          // dispatch(setUserIsSubscribed(false));
        } else {
          console.warn('User channel name is null or undefined');
        }
      }

      dispatch(setUserLogoutAuth());
      dispatch(setUserLogOut());
      dispatch(resetPusher());
    } catch (error) {
      console.error('Error while disconnecting Pusher:', error);
    }
  };

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <View
        style={{
          height: windowHeight,
          backgroundColor: '#F8F8F8',
        }}>
        {/* back buttons */}
        <View
          style={{
            width: '100%',
            paddingVertical: moderateScale(16, 0.2),
            paddingHorizontal: moderateScale(10, 0.2),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            as={AntDesign}
            name="arrowleft"
            color={'#636363'}
          />
          <CustomText style={styles.menu_text}>Menu</CustomText>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              backgroundColor: '#F8F8F8',
              padding: moderateScale(6, 0.2),
              borderRadius: moderateScale(7, 0.3),
            }}>
            <Icon as={Entypo} name="cross" color={'#636363'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: windowHeight * 0.2,
            width: '100%',
            paddingVertical: moderateScale(12, 0.2),
          }}>
          {/* {token == null ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                height: windowHeight * 0.12,
                paddingHorizontal: moderateScale(10, 0.6),
                marginTop: moderateScale(20, 0.3),
                paddingVertical: moderateScale(10, 0.2),
              }}>
              <View style={styles.Profile}>
                <CustomImage
                  resizeMode={'cover'}
                  source={require('../Assets/Images/men.png')}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <CustomText
                style={{
                  color: Color.black,
                  fontSize: moderateScale(20, 0.6),
                  marginLeft: moderateScale(10, 0.3),
                  // backgroundColor: 'purple',
                  // top: 50,
                }}
                isBold
                onPress={() => {
                  navigationService.navigate('LoginScreen');
                }}>
                {`Login/Signup`}
              </CustomText>
            </View>
          ) : ( */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('EditProfile')}
            style={{
              height: windowHeight * 0.12,
              flexDirection: 'row',
              backgroundColor: '#FFFFFF',
              marginTop: moderateScale(20, 0.3),
              alignItems: 'center',
              paddingVertical: moderateScale(10, 0.2),
              paddingHorizontal: moderateScale(6, 0.2),
              shadowColor: '#00000021',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.2,
              elevation: 6,
              // marginLeft: moderateScale(10, 0.3),
            }}>
            <View style={styles.Profile}>
              <CustomImage
                resizeMode={'cover'}
                source={{uri: imageUrl + userData?.photo}}
                style={{width: '100%', height: '100%'}}
              />
            </View>

            <View style={{marginLeft: moderateScale(10, 0.3)}}>
              <CustomText
                style={{fontSize: moderateScale(16, 0.6), color: Color.black}}
                isBold>
                {userData?.name}
              </CustomText>

              <CustomText
                style={{
                  width: windowWidth * 0.4,
                  fontSize: moderateScale(11, 0.6),
                  color: Color.grey,
                }}>
                {userData?.email}
              </CustomText>
            </View>
            <View
              style={{
                width: windowHeight * 0.025,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 12,
                height: windowHeight * 0.025,
                backgroundColor: '#dedbdbc8',
                marginLeft: moderateScale(20, 0.6),
                borderRadius: (windowHeight * 0.02) / 2,
              }}>
              <CustomImage
                source={require('../Assets/Images/Group13.png')}
                style={{
                  width: windowHeight * 0.021,
                  height: windowHeight * 0.021,
                }}
              />
            </View>
          </TouchableOpacity>
          {/* )} */}
        </View>
        <ScrollView
          style={{
            marginLeft: moderateScale(10, 0.3),
            marginTop: moderateScale(10, 0.3),
          }}>
          {adminData.map((item, index) => (
            <>
              <TouchableOpacity
                onPress={item?.onPress}
                style={{
                  width: windowWidth * 0.7,
                  // borderBottomWidth: 0.5,
                  borderColor: Color.black,
                  margin: moderateScale(15, 0.3),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', width: '90%'}}>
                  <Icon
                    name={item?.iconName}
                    as={item?.iconType}
                    size={moderateScale(20, 0.3)}
                    color={'#00309E'}
                    onPress={item?.onPress}
                  />
                  <CustomText
                    style={{
                      fontSize: moderateScale(14, 0.6),
                      color: '#404040',
                      marginLeft: moderateScale(10, 0.3),
                    }}>
                    {item.name}
                  </CustomText>
                </View>
                <Icon
                  name={'arrow-forward-ios'}
                  size={moderateScale(20, 0.3)}
                  as={MaterialIcons}
                  color={'#79B9F6'}
                  style={{position: 'absolute', right: 0}}
                />
              </TouchableOpacity>
              <Divider
                marginTop={moderateScale(1, 0.2)}
                marginX={moderateScale(15, 0.2)}
                color={'#F0F0F0'}
                width={'90%'}
                borderWidth={0.1}
                borderColor={'#b0adad'}
              />
            </>
          ))}
        </ScrollView>
        {/* <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: windowWidth * 0.14,
            height: windowWidth * 0.14,
            borderRadius: (windowWidth * 0.14) / 1,
            backgroundColor: Color.white,
            position: 'absolute',
            bottom: 40,
            left: 20,
            elevation: 10,
          }}>
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            name="chevron-left"
            as={Feather}
            size={moderateScale(25)}
            color={Color.black}
            />
        </View> */}
        {/* </LinearGradient> */}
      </View>
    </ScreenBoiler>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  Profile: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: (windowWidth * 0.2) / 1,
    borderWidth: 1,
    borderColor: Color.white,
    overflow: 'hidden',
  },
  menu_text: {
    color: Color.darkGray,
  },
});
