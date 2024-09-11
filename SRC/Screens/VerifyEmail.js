import React, {useState} from 'react';
import {Platform, ToastAndroid} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import navigationService from '../navigationService';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ScreenBoiler from '../Components/ScreenBoiler';

const VerifyEmail = props => {
  const SelecteduserRole = useSelector(
    state => state.commonReducer.selectedRole,
  );
  const token = useSelector(state => state.authReducer.token);
  console.log(token, 'tokeeeeennnn');
  const fromForgot = props?.route?.params?.fromForgot;
  console.log('here=>', fromForgot);
  const [email, setemail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async () => {
    console.log('asdhkasdjagsdjags');
    const url = 'password/email';
    if (['', null, undefined].includes(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('email number is required', ToastAndroid.SHORT)
        : alert('email number is required');
    }
    setIsLoading(true);
    const response = await Post(url, {email: email}, apiHeader());
    console.log(response, '=====>...... reposensye');
    setIsLoading(false);
    if (response != undefined) {
      console.log('response data =>', response?.data);
      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${email}`, ToastAndroid.SHORT)
        : alert(`OTP sent to ${email}`);
      fromForgot
        ? navigationService.navigate('VerifyNumber', {
            fromForgot: fromForgot,
            email: `${email}`,
          })
        : navigationService.navigate('VerifyNumber', {
            email: `${email}`,
          });
    }
  };

  return (
    <>
      <ScreenBoiler
        statusBarBackgroundColor={'white'}
        statusBarContentStyle={'dark-content'}>
        <LinearGradient
          style={{
            width: windowWidth,
            height: windowHeight,
          }}
          start={{x: 0, y: 2.1}}
          end={{x: 4, y: 2}}
          colors={['#00309E', '#79B9F6', '#FFFFFF']}
          // locations ={[0, 0.5, 0.6]}
        >
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: moderateScale(20, 0.3),
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: windowHeight,
            }}>
            <CustomText isBold style={styles.txt2}>
              Forget Password
            </CustomText>
            <CustomText style={styles.txt3}>
              Forgot your password ? don't worry, jsut take a simple step and
              create your new password!
            </CustomText>

            <TextInputWithTitle
              titleText={'Enter your Email'}
              secureText={false}
              placeholder={'Enter your Email'}
              setText={setemail}
              value={email}
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
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Submit'
                )
              }
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
              loader={isLoading}
              onPress={
                () => sendOTP()
                // navigationService.navigate('VerifyNumber', {
                //   emailNumber: email,
                // });
              }
            />
          </KeyboardAwareScrollView>
        </LinearGradient>
      </ScreenBoiler>
    </>
  );
};

const styles = ScaledSheet.create({
  txt2: {
    color: Color.white,
    fontSize: moderateScale(25, 0.6),
  },
  txt3: {
    color: Color.white,
    fontSize: moderateScale(10, 0.6),
    textAlign: 'center',
    width: '80%',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },

  emailView: {
    width: '80%',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.3),
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
  },
  txt4: {
    color: Color.yellow,
    fontSize: moderateScale(14, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.themeLightGray,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.6),
  },
});

export default VerifyEmail;
