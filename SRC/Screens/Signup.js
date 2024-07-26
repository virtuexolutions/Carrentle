import React, { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';
import Fontisto from 'react-native-vector-icons/Fontisto';
import navigationService from '../navigationService';
// import CardContainer from '../Components/CardContainer';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../Store/slices/common';
import { SetUserRole, setUserToken } from '../Store/slices/auth-slice';
import { ToastAndroid } from 'react-native';
import { Platform } from 'react-native';
import { validateEmail } from '../Config';
import { Icon } from 'native-base';
import ImagePickerModal from '../Components/ImagePickerModal';
import { useNavigation } from '@react-navigation/native';
import { FONTS, SIZES } from '../Constant/theme';
import localStorage from 'redux-persist/es/storage';
import localStoreUtil from '../Utillity/localstoreUntil';

const Signup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [confirmPass, setconfirmPass] = useState('');
  const [showNumberModal, setShowNumberModal] = useState(false);
  console.log(
    '🚀 ~ file: Signup.js:48 ~ Signup ~ showNumberModal:',
    showNumberModal,
  );
  const [countryCode, setCountryCode] = useState('US');
  const [imagePicker, setImagePicker] = useState(false);
  console.log('🚀 ~ file: Signup.js:50 ~ Signup ~ imagePicker:', imagePicker);
  const [image, setImage] = useState({});

  const [country, setCountry] = useState({
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  });
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [withFilter, setFilter] = useState(true);
  const [address, setAddress] = useState('');
  const { user_type } = useSelector(state => state.authReducer);
  console.log(user_type, 'userrtypeeeeee')

  const onSelect = country => {
    // console.log('dasdasdasdads =>', country);
    setCountryCode(country.cca2);
    setCountry(country);
  };

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          {
            // paddingBottom : moderateScale(40,0.6)
          }
        }>
        <LinearGradient
          start={{ x: 0, y: 2.1 }}
          end={{ x: 4, y: 2 }}
          colors={['#00309E', '#79B9F6', '#FFFFFF']}
          style={styles.container}>
          {/* <View
            style={{
              height: windowHeight * 0.13,
              width: windowHeight * 0.13,
              borderRadius: moderateScale((windowHeight * 0.13) / 2),
            }}>
            <CustomImage
              resizeMode="contain"
              source={require('../Assets/Images/dummyUser1.png')}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'blue',

                borderRadius: moderateScale((windowHeight * 0.13) / 2),
              }}
            />

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.edit}
              onPress={() => {
                setImagePicker(true);
              }}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.black}
                size={moderateScale(13, 0.3)}
                onPress={() => {
                  setImagePicker(true);
                }}
              />
            </TouchableOpacity>
          </View> */}

          <View
            style={{
              height: windowHeight * 0.12,
              width: windowHeight * 0.3,
              // backgroundColor :'red'
            }}>
            <CustomImage
              resizeMode="contain"
              source={require('../Assets/Images/logo.png')}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
          <CustomText
            style={{
              color: Color.white,
              fontSize: moderateScale(12, 0.6),
              width: windowWidth * 0.8,
              paddingTop: moderateScale(15, 0.6),
              textAlign: 'center',
            }}
            numberOfLines={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            suscipit gravida tellus, eu ullamcorper.
          </CustomText>
          <View
            style={{
              alignItems: 'center',
              marginTop: moderateScale(10, 0.3),
            }}>
            <TextInputWithTitle
              iconHeigth={windowHeight * 0.00005}
              iconName={'user'}
              iconType={FontAwesome}
              LeftIcon={true}
              titleText={'Username'}
              placeholder={'Username'}
              setText={setUserName}
              value={username}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              borderBottomWidth={1}
              // borderRadius={moderateScale(30, 0.3)}
              backgroundColor={'transparent'}
              borderColor={Color.black}
              marginTop={moderateScale(10, 0.3)}
              color={Color.white}
              placeholderColor={Color.lightGrey}
            // elevation
            />
            <TextInputWithTitle
              iconHeigth={windowHeight * 0.00005}
              iconName={'email'}
              iconType={Fontisto}
              LeftIcon={true}
              titleText={'Username'}
              placeholder={'Email'}
              setText={setEmail}
              value={email}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              borderBottomWidth={1}
              // borderRadius={moderateScale(30, 0.3)}
              backgroundColor={'transparent'}
              borderColor={Color.black}
              marginTop={moderateScale(30, 0.3)}
              color={Color.white}
              placeholderColor={Color.white}
            // elevation
            />

            <TextInputWithTitle
              iconHeigth={windowHeight * 0.00005}
              iconName={'key'}
              iconType={FontAwesome5}
              LeftIcon={true}
              titleText={'Password'}
              placeholder={'Type your Password'}
              setText={setPassword}
              value={password}
              secureText={true}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              borderBottomWidth={1}
              // borderRadius={moderateScale(30, 0.3)}
              // borderColor={'#000'}
              backgroundColor={'transparent'}
              marginTop={moderateScale(30, 0.3)}
              color={Color.white}
              placeholderColor={Color.white}
            // elevation
            />
            <TextInputWithTitle
              iconHeigth={windowHeight * 0.00005}
              iconName={'check'}
              iconType={FontAwesome}
              LeftIcon={true}
              titleText={'Password'}
              placeholder={'Re-type your Password'}
              setText={setPassword}
              value={password}
              secureText={true}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              borderBottomWidth={1}
              // borderRadius={moderateScale(30, 0.3)}
              // borderColor={'#000'}
              backgroundColor={'transparent'}
              marginTop={moderateScale(30, 0.3)}
              color={Color.white}
              placeholderColor={Color.white}
            // elevation
            />
            {user_type === 'Rider' &&
              <TextInputWithTitle
                iconHeigth={windowHeight * 0.00005}
                iconName={'check'}
                iconType={FontAwesome}
                LeftIcon={true}
                titleText={'Phone Number'}
                placeholder={'Enter Your Phone Number Here'}
                setText={setPhoneNumber}
                value={phoneNumber}
                secureText={true}
                viewHeight={0.06}
                viewWidth={0.75}
                inputWidth={0.55}
                borderBottomWidth={1}
                // borderRadius={moderateScale(30, 0.3)}
                // borderColor={'#000'}
                backgroundColor={'transparent'}
                marginTop={moderateScale(30, 0.3)}
                color={Color.white}
                placeholderColor={Color.white}
                keyboardType={'numeric'}
              // elevation
              />
            }
            {/* <TouchableOpacity
              onPress={() => {
                setShowNumberModal(true);
                console.log('first');
              }}
              activeOpacity={0.9}
              style={[
                styles.birthday,
                {
                  justifyContent: 'flex-start',
                  // backgroundColor: 'red',
                  borderRadius: moderateScale(25, 0.6),
                },
              ]}>
              <CountryPicker
                {...{
                  countryCode,
                  withCallingCode,
                  onSelect,
                  withFilter,
                }}
                visible={showNumberModal}
                onClose={() => {
                  setShowNumberModal(false);
                }}
              />

              {country && (
                <CustomText
                  style={{
                    fontSize: moderateScale(15, 0.6),
                    color: '#5E5E5E',
                  }}>{`${countryCode}(+${country?.callingCode})`}</CustomText>
              )}

              <Icon
                name={'angle-down'}
                as={FontAwesome}
                size={moderateScale(20, 0.6)}
                color={Color.themeDarkGray}
                onPress={() => {
                  setShowNumberModal(true);
                }}
                style={{
                  position: 'absolute',
                  right: moderateScale(5, 0.3),
                }}
              />
            </TouchableOpacity> */}
            <View style={{ marginTop: SIZES.padding }} />
            <CustomButton
              onPress={() => {
                dispatch(setUserToken({ token: 'abc' }));
                navigation.goBack();
              }}
              text={'sign in'}
              textColor={Color.white}
              borderWidth={1}
              borderColor={Color.white}
              borderRadius={moderateScale(8, 0.3)}
              width={windowWidth * 0.4}
              height={windowHeight * 0.06}
              marginTop={moderateScale(35, 0.3)}
              bgColor={'transparent'}
              isBold
            // isGradient
            />
          </View>
          <View style={styles.text_view}>
            <CustomText
              style={{
                color: Color.lightGrey,
                ...FONTS.Light10,
                textAlign: 'center',
                paddingHorizontal: SIZES.padding * 2.5
              }}
              numberOfLines={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              suscipit gravida tellus, eu ullamcorper.
            </CustomText>
          </View>

        </LinearGradient>
        <ImagePickerModal
          show={imagePicker}
          setShow={setImagePicker}
          setFileObject={setImage}
        />
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.1,
    // justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: '#cc5200',
  },
  text_view: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: SIZES.padding * 2,
  },
  birthday: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.06,
    marginTop: moderateScale(10, 0.3),
    borderRadius: moderateScale(10, 0.6),
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: Color.lightGrey,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Color.themeColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  icon: {
    backgroundColor: Color.white,
    height: windowHeight * 0.03,
    width: windowHeight * 0.03,
    borderRadius: (windowHeight * 0.03) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt5: {
    color: 'white',
    marginTop: moderateScale(20, 0.3),
    fontSize: moderateScale(11, 0.6),
    paddingVertical: moderateScale(10, 0.3),
  },
  txt6: {
    fontSize: moderateScale(10, 0.6),
    color: Color.white,
  },
  edit: {
    backgroundColor: Color.white,
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    position: 'absolute',
    // top: 110,
    bottom: -2,
    right: 5,
    borderRadius: moderateScale(10, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

});

export default Signup;
