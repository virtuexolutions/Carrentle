import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';

import {
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import navigationService from '../navigationService';
import {useDispatch} from 'react-redux';

import {Icon} from 'native-base';
import ImagePickerModal from '../Components/ImagePickerModal';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
const Profile = () => {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false);
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
 

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableOpacity
      activeOpacity={0.8}
      onPress={()=>{
        navigation.goBack()
      }}
        style={styles.back}>
        <Icon
          name="arrowleft"
          as={AntDesign}
          style={styles.icon2}
          color={Color.white}
          size={moderateScale(20, 0.3)}
          onPress={()=>{
            navigation.goBack()
          }}
        />
      </TouchableOpacity>
      <ImageBackground
          style={{
            width: windowWidth,
            minHeight: windowHeight,
            paddingBottom: moderateScale(40, 0.6),
            // justifyContent: 'center',
            // backgroundColor:'red',
            // height: windowHeight*0.8,
            alignItems: 'center',
          }}
          source={require('../Assets/Images/customerservice.png')}>
          
{/* 
          <View
            style={{
           
              height: windowHeight * 0.13,
              width: windowHeight * 0.13,
              borderRadius: moderateScale((windowHeight * 0.13) / 2),
              // overflow : 'hidden'
            }}>
          </View> */}
           <CustomText style={styles.txt5}>Change Password</CustomText>
          <View
            style={{
              gap: 18,
              // paddingVertical: moderateScale(30, 0.3),
              alignItems: 'center',
              // justifyContent: 'center',
              marginTop: windowHeight * 0.15
              // marginTop: moderateScale(20, 0.3),
            }}>
           
              <TextInputWithTitle
              iconName={'lock1'}
              iconType={AntDesign}
              LeftIcon={true}
              titleText={'Current Password'}
              placeholder={'Current Password'}
              setText={setCurrPassword}
              value={currPassword}
              secureText={true}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              borderColor={'#000'}
              backgroundColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
            />
              <TextInputWithTitle
              iconName={'lock1'}
              iconType={AntDesign}
              LeftIcon={true}
              titleText={'New Password'}
              placeholder={'New Password'}
              setText={setNewPassword}
              value={newPassword}
              secureText={true}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              borderColor={'#000'}
              backgroundColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
            />

            <TextInputWithTitle
              iconName={'unlock'}
              iconType={FontAwesome}
              LeftIcon={true}
              titleText={'Confirm your new password'}
              placeholder={'Confirm your new password'}
              setText={setConfirmNewPassword}
              value={confirmNewPassword}
              secureText={true}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              border={1}
              borderRadius={moderateScale(30, 0.3)}
              borderColor={'#000'}
              backgroundColor={Color.white}
              marginTop={moderateScale(10, 0.3)}
              color={Color.black}
              placeholderColor={Color.veryLightGray}
              elevation
            />
           
          
              <CustomButton
                onPress={() => navigationService.navigate('LoginScreen')}
                text={
                  isLoading ? (
                    <ActivityIndicator color={Color.white} size={'small'} />
                  ) : (
                    'RESET'
                  )
                }
                fontSize={moderateScale(12, 0.3)}
                textColor={Color.white}
                borderRadius={moderateScale(30, 0.3)}
                width={windowWidth * 0.75}
                height={windowHeight * 0.06}
                marginTop={moderateScale(20, 0.3)}
                bgColor={Color.themeColor2}
                isBold
                // isGradient
              />
          </View>
        </ImageBackground>
    </ScrollView>
  );
};

export default Profile;
const styles = ScaledSheet.create({
  // birthday: {
  //   width: windowWidth * 0.75,
  //   height: windowHeight * 0.06,
  //   marginTop: moderateScale(10, 0.3),
  //   borderRadius: moderateScale(10, 0.6),
  //   borderWidth: 1,
  //   backgroundColor: 'white',
  //   borderColor: Color.lightGrey,
  //   flexDirection: 'row',
  //   paddingHorizontal: moderateScale(10, 0.6),
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   shadowColor: Color.themeColor,
  //   shadowOffset: {
  //     width: 0,
  //     height: 4,
  //   },
  //   shadowOpacity: 0.32,
  //   shadowRadius: 5.46,
  //   elevation: 9,
  // },
  txt5: {
    marginTop:windowHeight * 0.11,
    marginLeft:windowHeight * 0.18,
    fontSize : moderateScale(20,0.6),
    fontWeight: 'bold',
    width: windowWidth * 0.85, 
    color: '#FFFF',
  },

 back : {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    position: 'absolute',
    left: moderateScale(10, 0.6),
    top: moderateScale(10, 0.6),
    zIndex: 1,
    margin :5 ,
    alignItems : 'center',
    justifyContent : 'center'
  }
});




// import React, {useState} from 'react';
// import {
//   Image,
//   Dimensions,
//   ImageBackground,
//   Platform,
//   ToastAndroid,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {ScaledSheet, moderateScale} from 'react-native-size-matters';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import {useDispatch, useSelector} from 'react-redux';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// import navigationService from '../navigationService';

// import TextInputWithTitle from '../Components/TextInputWithTitle';
// import Color from '../Assets/Utilities/Color';
// import CustomStatusBar from '../Components/CustomStatusBar';
// import CustomText from '../Components/CustomText';

// import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
// import CustomButton from '../Components/CustomButton';
// import {ActivityIndicator} from 'react-native';
// import {Post} from '../Axios/AxiosInterceptorFunction';
// // import CardContainer from '../Components/CardContainer';
// // import CustomHeader from '../Components/CustomHeader';
// import {Icon} from 'native-base';
// import {useNavigation} from '@react-navigation/native';
// import {setUserToken} from '../Store/slices/auth';
// import LinearGradient from 'react-native-linear-gradient';
// import Header from '../Components/Header';

// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

// const ChangePassword = props => {
//   const navigationN = useNavigation();
//   const SelecteduserRole = useSelector(
//     state => state.commonReducer.selectedRole,
//   );
//   const dispatch = useDispatch();
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmNewPassword, setConfirmNewPassword] = useState('');

//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <>
//       <CustomStatusBar
//         backgroundColor={Color.white}
//         barStyle={'dark-content'}
//       />
//       <Header
//         showBack={true}
//         title={'Change Password'}
//         headerColor={['#CBE4E8', '#D2E4E4']}
       
//       />

//       <LinearGradient
//         style={{
//           width: windowWidth,
//           height: windowHeight*0.9,
//         }}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 1}}
//         colors={['#D2E4E4', '#D2E4E4']}
//         // locations ={[0, 0.5, 0.6]}
//       >
//         {/* <TouchableOpacity
//           activeOpacity={0.8}
//           style={{
//             position: 'absolute',
//             top: moderateScale(20, 0.3),
//             left: moderateScale(20, 0.3),
//             height: moderateScale(30, 0.3),
//             width: moderateScale(30, 0.3),
//             borderRadius: moderateScale(5, 0.3),
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'white',
//             zIndex: 1,
//           }}>
//           <Icon
//             name={'arrowleft'}
//             as={AntDesign}
//             size={moderateScale(22, 0.3)}
//             color={Color.themeColor}
//             onPress={() => {
//               navigationN.goBack();
//             }}
//           />
//         </TouchableOpacity> */}
//         <KeyboardAwareScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             // paddingBottom: moderateScale(20, 0.3),
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: '100%',
//             height: windowHeight*0.9,
//           }}>
//           <View
//             style={{
//               paddingVertical: moderateScale(30, 0.3),
//               alignItems: 'center',
//               // backgroundColor:'white',
//             }}>
//             <CustomText isBold style={styles.txt2}>
//               Change Password
//             </CustomText>
//             <CustomText style={styles.txt3}>
//               Want to change password ? don't worry, jsut take a simple step and
//               create your new password!
//             </CustomText>

//             <TextInputWithTitle
//               titleText={'Current Passwrod'}
//               secureText={false}
//               placeholder={'Current Passwrod'}
//               setText={setCurrentPassword}
//               value={currentPassword}
//               viewHeight={0.06}
//               viewWidth={0.75}
//               inputWidth={0.7}
//               // border={1}
//               borderColor={'#ffffff'}
//               backgroundColor={'#FFFFFF'}
//               marginTop={moderateScale(35, 0.3)}
//               color={Color.themeColor}
//               placeholderColor={Color.themeLightGray}
//               borderRadius={moderateScale(25, 0.3)}
//               elevation
//             />

//             <TextInputWithTitle
//               titleText={'Enter New Password'}
//               secureText={false}
//               placeholder={'Enter New Password'}
//               setText={setNewPassword}
//               value={newPassword}
//               viewHeight={0.06}
//               viewWidth={0.75}
//               inputWidth={0.7}
//               // border={1}
//               borderColor={'#ffffff'}
//               backgroundColor={'#FFFFFF'}
//               marginTop={moderateScale(10, 0.3)}
//               color={Color.themeColor}
//               placeholderColor={Color.themeLightGray}
//               borderRadius={moderateScale(25, 0.3)}
//               elevation
//             />
//             <TextInputWithTitle
//               titleText={'Confirm your new password'}
//               secureText={false}
//               placeholder={'Confirm your new password'}
//               setText={setConfirmNewPassword}
//               value={confirmNewPassword}
//               viewHeight={0.06}
//               viewWidth={0.75}
//               inputWidth={0.7}
//               // border={1}
//               borderColor={'#ffffff'}
//               backgroundColor={'#FFFFFF'}
//               marginTop={moderateScale(10, 0.3)}
//               color={Color.themeColor}
//               placeholderColor={Color.themeLightGray}
//               borderRadius={moderateScale(25, 0.3)}
//               elevation
//             />
//             <CustomButton
//               text={
//                 isLoading ? (
//                   <ActivityIndicator color={'#FFFFFF'} size={'small'} />
//                 ) : (
//                   'Reset'
//                 )
//               }
//               textColor={Color.white}
//               width={windowWidth * 0.75}
//               height={windowHeight * 0.06}
//               marginTop={moderateScale(20, 0.3)}
//               onPress={() => {
//                 dispatch(setUserToken({token: 'sadasdawdadas'}));
//               }}
//               bgColor={
//                 SelecteduserRole == 'Qbid member'
//                   ? Color.blue
//                   : Color.themeColor
//               }
//               // borderColor={Color.white}
//               // borderWidth={2}
//               borderRadius={moderateScale(30, 0.3)}
//             />
//           </View>
//         </KeyboardAwareScrollView>
//       </LinearGradient>
//     </>
//   );
// };

// const styles = ScaledSheet.create({
//   txt2: {
//     color: Color.black,
//     fontSize: moderateScale(25, 0.6),
//   },
//   txt3: {
//     color: Color.themeLightGray,
//     fontSize: moderateScale(10, 0.6),
//     textAlign: 'center',
//     width: '80%',
//     marginTop: moderateScale(5, 0.3),
//     lineHeight: moderateScale(17, 0.3),
//   },

//   phoneView: {
//     width: '80%',
//     paddingVertical: moderateScale(5, 0.3),
//     flexDirection: 'row',
//     marginTop: moderateScale(20, 0.3),
//   },
//   container2: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: windowWidth * 0.9,
//     // marginTop: moderateScale(10,0.3),
//   },
//   txt4: {
//     color: Color.purple,
//     fontSize: moderateScale(14, 0.6),
//     marginTop: moderateScale(8, 0.3),
//     fontWeight: 'bold',
//   },
//   txt5: {
//     color: Color.themeLightGray,
//     marginTop: moderateScale(10, 0.3),
//     fontSize: moderateScale(12, 0.6),
//   },
// });

// export default ChangePassword;
