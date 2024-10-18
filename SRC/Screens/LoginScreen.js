import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import ScreenBoiler from '../Components/ScreenBoiler';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import authAction from '../Store/auth-action';
import {setUserToken} from '../Store/slices/auth-slice';
import {setUserData} from '../Store/slices/common';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';

const LoginScreen = props => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePicker, setImagePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({});
  const navigation = useNavigation();
  const {UserLogin} = authAction();
  const token = useSelector(state => state.authReducer.token);

  const onpressSubmit = async () => {
    const url = 'login';
    const body = {email: username, password: password};
    setLoading(true);
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      }
    }
    
    const response = await Post(url, body, apiHeader(token));

    console.log('==============> l0gin ', response?.data);
    setLoading(false);
    if (response != undefined) {
      navigation.navigate('MyDrawer');
      console.log(response?.data, 'dataaaaaaaaa');
      dispatch(setUserToken({token: response?.data?.token}));
      dispatch(setUserData(response?.data?.user_info));
      Platform.OS == 'android'
        ? ToastAndroid.show(`Login SuccessFully`, ToastAndroid.SHORT)
        : Alert.alert(`Login SuccessFully`);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenBoiler
        statusBarBackgroundColor={'white'}
        statusBarContentStyle={'dark-content'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient
            start={{x: 0, y: 2.1}}
            end={{x: 4, y: 2}}
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
            <CustomText style={styles.description} numberOfLines={2}>
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
                backgroundColor={'transparent'}
                marginTop={moderateScale(30, 0.3)}
                color={Color.white}
                placeholderColor={Color.lightGrey}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('VerifyEmail')}
                activeOpacity={0.6}
                style={{
                  alignSelf: 'flex-end',
                  marginTop: moderateScale(8, 0.6),
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(12, 0.7),
                    textDecorationLine: 'underline',
                    color: 'white',
                  }}>
                  Forget Password?
                </CustomText>
              </TouchableOpacity>
              <View style={{marginTop: moderateScale(20, 0.6)}} />
              <CustomButton
                onPress={() => {
                  onpressSubmit();
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
                loader={loading}
              />
            </View>
            <CustomText style={styles.text}>don't have an ancount ?</CustomText>
            <CustomText
              isBold
              onPress={() => navigation.navigate('Signup')}
              style={styles.signup_btn}>
              Sign up
            </CustomText>
            <View style={styles.text_view}>
              <CustomText
                loader={loading}
                style={{
                  color: Color.lightGrey,
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
    fontSize: moderateScale(13, 0.6),
    paddingHorizontal: moderateScale(32, 0.6),
    marginTop: moderateScale(-45, 0.3),
    textAlign: 'center',
  },
  text: {
    color: 'white',
    marginTop: moderateScale(20, 0.3),
    fontSize: moderateScale(13, 0.6),
    paddingTop: moderateScale(10, 0.3),
  },
  signup_btn: {
    fontSize: moderateScale(16, 0.6),
    color: 'white',
  },
  edit: {
    backgroundColor: Color.white,
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    position: 'absolute',
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
  text_view: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: moderateScale(40, 0.6),
  },
});

export default LoginScreen;
