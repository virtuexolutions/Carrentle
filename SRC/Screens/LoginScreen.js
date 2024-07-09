import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
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
import {useDispatch} from 'react-redux';
// import CardContainer from '../Components/CardContainer';
import {SetUserRole, setUserToken} from '../Store/slices/auth';
import {Post} from '../Axios/AxiosInterceptorFunction';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {setUserData} from '../Store/slices/common';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
// import LinearGradient from 'react-native-linear-gradient';
import ImagePickerModal from '../Components/ImagePickerModal';
import {position} from 'native-base/lib/typescript/theme/styled-system';

const LoginScreen = props => {
  // const navigation =useNavigation()
  const [username, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePicker, setImagePicker] = useState(false);
  const [image, setImage] = useState({});
  const navigation = useNavigation();

  const dispatch = useDispatch();

  return (
    <ScreenBoiler
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          start={{x: 0.1, y: 0.2}}
          end={{x: 1.5, y: 0.4}}
          colors={Color.themeBgColor}
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
            style={{
              color: Color.white,
              fontSize: moderateScale(13, 0.6),
              width: windowWidth * 0.8,
              // textAlign: 'justify',
              marginTop: moderateScale(-45, 0.3),
            }}
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
              viewWidth={0.75}
              inputWidth={0.55}
              borderBottomWidth={2}
              // borderRadius={moderateScale(30, 0.3)}
              backgroundColor={'transparent'}
              borderColor={Color.black}
              marginTop={moderateScale(10, 0.3)}
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
              placeholder={'Password'}
              setText={setPassword}
              value={password}
              secureText={true}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              borderBottomWidth={2}
              // borderRadius={moderateScale(30, 0.3)}
              // borderColor={'#000'}
              backgroundColor={'transparent'}
              marginTop={moderateScale(30, 0.3)}
              color={Color.white}
              placeholderColor={Color.white}
              // elevation
            />

            <CustomButton
              onPress={() => {
                // navigation.navigate('EnterLocationScreen')
                dispatch(setUserToken({token:'abc'}))

                // navigation.navigate('PaymentScreen')
                // navigation.navigate('HomeScreen')
              }}
              text={'Log in'}
              fontSize={moderateScale(14, 0.3)}
              textColor={Color.white}
              borderWidth={2}
              borderColor={Color.white}
              borderRadius={moderateScale(8, 0.3)}
              width={windowWidth * 0.4}
              height={windowHeight * 0.06}
              marginTop={moderateScale(30, 0.3)}
              bgColor={'transparent'}
              isBold
              // isGradient
            />

            <CustomText style={styles.txt5}>don't have an ancount ?</CustomText>
          </View>

          
            <CustomText
            isBold
              onPress={() => navigation.navigate('Signup')}
              style={styles.txt6}>
              Sign up 
            </CustomText>
            
          
          <CustomText
            style={{
              color: Color.white,
              fontSize: moderateScale(13, 0.6),
              width: windowWidth * 0.85,
              position :'absolute',
              bottom :25,
          
            }}
            numberOfLines={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            suscipit gravida tellus, eu ullamcorper.
          </CustomText>
        </LinearGradient>
        {/* </ImageBackground> */}
        <ImagePickerModal
          show={imagePicker}
          setShow={setImagePicker}
          setFileObject={setImage}
        />
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: windowHeight * 0.1,
    // justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: '#cc5200',
  },
  txt5: {
    color: 'white',
    marginTop: moderateScale(20, 0.3),
    fontSize: moderateScale(13, 0.6),
    paddingTop: moderateScale(10, 0.3),
  },
  txt6: {
    fontSize: moderateScale(16, 0.6),
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
});

export default LoginScreen;
