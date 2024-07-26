import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ScrollView,
  ToastAndroid,
  View,
  StyleSheet,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import navigationService from '../navigationService';
import { useDispatch, useSelector } from 'react-redux';
// import CardContainer from '../Components/CardContainer';
import { SetUserRole, setUserToken } from '../Store/slices/auth-slice';
import { Post } from '../Axios/AxiosInterceptorFunction';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { setUserData } from '../Store/slices/common';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
// import LinearGradient from 'react-native-linear-gradient';
import ImagePickerModal from '../Components/ImagePickerModal';
import { position } from 'native-base/lib/typescript/theme/styled-system';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS, SIZES } from '../Constant/theme';

const LoginScreen = props => {
  const dispatch = useDispatch();
  // const navigation =useNavigation()
  const [username, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  const navigation = useNavigation();

  const { user_type } = useSelector(state => state.authReducer);
  console.log(user_type, 'userrtypeeeeee')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenBoiler
        statusBarBackgroundColor={'white'}
        statusBarContentStyle={'dark-content'}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <LinearGradient
            start={{ x: 0, y: 2.1 }}
            end={{ x: 4, y: 2 }}
            colors={['#00309E', '#79B9F6', '#FFFFFF']}
            style={styles.container}>
            <View
              style={{
                height: windowHeight * 0.3,
                width: windowHeight * 0.3,
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
              style={styles.description}
              numberOfLines={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              suscipit gravida tellus, eu ullamcorper.
            </CustomText>
            <View
              style={{
                alignItems: 'center',
                marginTop: moderateScale(20, 0.3),
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
                viewWidth={0.85}
                inputWidth={0.55}
                borderBottomWidth={1}
                borderRadius={moderateScale(30, 0.3)}
                backgroundColor={'transparent'}
                borderColor={Color.black}
                marginTop={moderateScale(10, 0.3)}
                color={Color.white}
                placeholderColor={Color.lightGrey}
              />
              <TextInputWithTitle
                iconHeigth={windowHeight * 0.00005}
                iconName={'key'}
                iconType={FontAwesome5}
                LeftIcon={true}
                titleText={'Password'}
                placeholder={'Password'}
                setText={setPassword}
                value={password}
                secureText={true}
                viewHeight={0.06}
                viewWidth={0.85}
                inputWidth={0.55}
                borderBottomWidth={1}
                borderRadius={moderateScale(30, 0.3)}
                // borderColor={'#000'}
                backgroundColor={'transparent'}
                marginTop={moderateScale(30, 0.3)}
                color={Color.white}
                placeholderColor={Color.lightGrey}
              // elevation
              />
              <View style={{ marginTop: SIZES.padding * 1.5 }} />
              <CustomButton
                onPress={() => {
                  // navigation.navigate('EnterLocationScreen');
                  // navigation.navigate('PaymentScreen') 
                  navigation.navigate('TaxiAvailability');
                }}
                text={'Log in'}
                fontSize={moderateScale(14, 0.3)}
                textColor={Color.white}
                borderWidth={1.5}
                borderColor={Color.white}
                borderRadius={moderateScale(8, 0.3)}
                width={windowWidth * 0.4}
                height={windowHeight * 0.06}
                marginTop={moderateScale(30, 0.3)}
                bgColor={'transparent'}
                isBold
              />
            </View>
            <CustomText style={styles.text}>
              don't have an ancount ?
            </CustomText>
            <CustomText
              isBold
              onPress={() => navigation.navigate('Signup')}
              style={styles.signup_btn}>
              Sign up
            </CustomText>
            <View style={styles.text_view}>
              <CustomText
                style={{
                  color: Color.lightGrey,
                  ...FONTS.Light10,
                  textAlign: 'center',
                  fontSize: moderateScale(13, 0.6),
                  width: windowWidth * 0.85,
                }}
                numberOfLines={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                suscipit gravida tellus, eu ullamcorper.
              </CustomText>
            </View>

          </LinearGradient>
          {/* </ImageBackground> */}
          <ImagePickerModal
            show={imagePicker}
            setShow={setImagePicker}
            setFileObject={setImage}
          />
        </ScrollView>
      </ScreenBoiler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: windowHeight * 0.1,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  description: {
    color: Color.lightGrey,
    ...FONTS.Light10,
    // fontSize: moderateScale(13, 0.6),
    paddingHorizontal: SIZES.padding * 1.25,
    marginTop: moderateScale(-45, 0.3),
    textAlign: 'center'
  },
  text: {
    color: 'white',
    marginTop: moderateScale(20, 0.3),
    ...FONTS.Regular10,
    // fontSize: moderateScale(13, 0.6),
    paddingTop: moderateScale(10, 0.3),
  },
  signup_btn: {
    // fontSize: moderateScale(16, 0.6),
    ...FONTS.Bold16,
    color: 'white',
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
  icon: {
    backgroundColor: Color.white,
    height: windowHeight * 0.03,
    width: windowHeight * 0.03,
    borderRadius: (windowHeight * 0.03) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_view: { justifyContent: 'flex-end', flex: 1, marginBottom: SIZES.padding * 2 }
});

export default LoginScreen;
