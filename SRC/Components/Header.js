import React, {useState} from 'react';
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
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
const {height, width} = Dimensions.get('window');
import Feather from 'react-native-vector-icons/Feather';

import {useDispatch, useSelector} from 'react-redux';
import {imageUrl} from '../Config';
import {setUserLogout, setUserLogoutAuth} from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';
import {setUserLogOut} from '../Store/slices/common';
import navigationService from '../navigationService';

const Header = props => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.commonReducer.notification);
  const cartData = useSelector(state => state.commonReducer.cart);
  const navigationN = useNavigation();
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const {
    title,
    showBack,
    showList,
    headerColor,
    titleColor,
    close,
    navigateTO,
    headerType,
    cart,
    Notify,
    hideUser,
  } = props;

  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
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

  return (
    <LinearGradient
      style={styles.header2}
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
            name={'menu'}
            as={Feather}
            size={moderateScale(25, 0.3)}
            color={Color.black}
            onPress={() => {
              console.log('hello mg ')
              navigation.toggleDrawer();
              // navigation.t
              // navigationN.dispatch(DrawerActions.toggleDrawer())
              
            }}
          />
        )}
      </View>
      {title ? (
        <CustomText
          style={{
            fontSize: moderateScale(18, 0.6),
            color: Color.black,
          }}isBold>
          {title}
        </CustomText>
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
            width: moderateScale(40, 0.3),
          }}>
            <CustomText>mg</CustomText>
          </View>
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
  statusModal: {
    alignSelf: 'flex-end',
    paddingVertical: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    // borderRadius: moderateScale(5, 0.3),
    marginTop: moderateScale(60, 0.3),
    // borderWidth: 1,
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
    // height: windowHeight * 0.13,
    backgroundColor: Color.themeColor,
    // justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  notificationCircle: {
    position: 'absolute',
    height: moderateScale(10, 0.3),
    width: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: Color.green,
    right: moderateScale(5, 0.3),
    // marginTop : moderateScale(10,0.3)
  },
});
export default Header;
