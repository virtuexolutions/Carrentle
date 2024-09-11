import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../Components/Header';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { moderateScale } from 'react-native-size-matters';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { Icon } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReviewComponent from '../Components/ReviewComponent';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Color from '../Assets/Utilities/Color';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import CustomButton from '../Components/CustomButton';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { setUserToken } from '../Store/slices/auth-slice';
import { setUserData } from '../Store/slices/common';
import { useSelector } from 'react-redux';
import ImagePickerModal from '../Components/ImagePickerModal';
import navigationService from '../navigationService';

const EditProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [phonenumber, setPhonenumber] = useState();
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [DOB, setDOB] = useState('');
  const [image, setImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.authReducer.user);

  const onpressSubmit = async () => {
    const url = 'auth/profile  ';
    const body = {
      name: name,
      phone: phonenumber,
      gender: gender,
      dob: DOB,
      image: image?.uri
    };
    console.log(body, 'dataaaaaa')
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      }
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    console.log('body ====================> ', body, response?.data);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`Profile Update Succesfully`, ToastAndroid.SHORT)
        : Alert.alert(`Profile Update Succesfully`);
      dispatch(setUserToken({ token: response?.data?.token }));
      dispatch(setUserData(response?.data?.user_info));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: moderateScale(150, 0.6),
        // paddingHorizontal :moderateScale(20,.6)
      }}
      showsVerticalScrollIndicator={false}
      style={{
        minHeight: windowHeight,
        backgroundColor: 'white',
      }}>
      <Header
        showBack={true}
        title={'Edit Profile'}
        headerColor={['white', 'white']}
      />
      <View style={styles.info}>
        <View style={styles.imageContainer}>
          <CustomImage
            source={require('../Assets/Images/dummyUser1.png')}
            style={styles.image}
          />
        </View>
        <TouchableOpacity
          style={styles.camera}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Icon
            as={FontAwesome}
            name="camera"
            size={moderateScale(14, 0.3)}
            onPress={() => {
              // setModalVisible(true);
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.names}>
          <CustomText style={styles.text}>Parsley Montana</CustomText>
          <CustomText style={styles.subText}>San Francisco</CustomText>
        </View>
      </View>
      <View style={styles.profileDetails}>
        <TextInputWithTitle
          titleStlye={{ fontSize: moderateScale(16, 0.6), marginTop: moderateScale(20, 0.6), textAlign: 'left', color: Color.black, fontWeight: 'bold' }}
          title={'Name'}
          placeholder={'Name'}
          setText={setName}
          value={name}
          secureText={false}
          viewHeight={0.08}
          viewWidth={0.85}
          inputWidth={0.55}
          borderBottomWidth={1}
          borderRadius={moderateScale(10, 0.3)}
          backgroundColor={Color.lightGrey}
          color={Color.white}
          placeholderColor={Color.darkGray}
          elevation={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
        />
        <TextInputWithTitle
          titleStlye={{ fontSize: moderateScale(16, 0.6), textAlign: 'left', color: Color.black, fontWeight: 'bold' }}
          title={'Phone Number'}
          placeholder={'Phone Number'}
          setText={setPhonenumber}
          value={phonenumber}
          secureText={false}
          viewHeight={0.08}
          viewWidth={0.85}
          inputWidth={0.55}
          borderBottomWidth={1}
          borderRadius={moderateScale(10, 0.3)}
          backgroundColor={Color.lightGrey}
          color={Color.white}
          placeholderColor={Color.darkGray}
          elevation={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
        />
        <TextInputWithTitle
          titleStlye={{ fontSize: moderateScale(16, 0.6), textAlign: 'left', color: Color.black, fontWeight: 'bold' }}
          title={'Gender'}
          placeholder={'Gender'}
          setText={setGender}
          value={gender}
          secureText={false}
          viewHeight={0.08}
          viewWidth={0.85}
          inputWidth={0.55}
          borderBottomWidth={1}
          borderRadius={moderateScale(10, 0.3)}
          backgroundColor={Color.lightGrey}
          color={Color.white}
          placeholderColor={Color.darkGray}
          elevation={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
        />
        <TextInputWithTitle
          titleStlye={{ fontSize: moderateScale(16, 0.6), textAlign: 'left', color: Color.black, fontWeight: 'bold' }}
          title={'Date Of Birth'}
          placeholder={'Date of Birth'}
          setText={setDOB}
          value={DOB}
          secureText={false}
          viewHeight={0.08}
          viewWidth={0.85}
          inputWidth={0.55}
          borderBottomWidth={1}
          borderRadius={moderateScale(10, 0.3)}
          backgroundColor={Color.lightGrey}
          color={Color.white}
          placeholderColor={Color.darkGray}
          elevation={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
        />
        {/* <View style={styles.field}>
          <CustomText>Phone Number</CustomText>
          <CustomText style={styles.value}>584-490-9153</CustomText>
        </View>
        <View style={styles.field}>
          <CustomText>Email</CustomText>
          <CustomText style={styles.value}>@Gmail.Com</CustomText>
        </View>
        <View style={styles.field}>
          <CustomText>Gender</CustomText>
          <CustomText style={styles.value}>Male/Female</CustomText>
        </View>
        <View style={styles.field}>
          <CustomText>Birthday</CustomText>
          <CustomText style={styles.value}>July 29,2024</CustomText>
        </View> */}
        <CustomButton
          text={'Submit'}
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.06}
          marginTop={moderateScale(20, 0.3)}
          onPress={() => {
            onpressSubmit();
          }}
          bgColor={Color.cartheme}
          borderColor={Color.white}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.3)}
          isGradient
          loader={isLoading}
        />
      </View>
      <ImagePickerModal show={modalVisible} setShow={setModalVisible} setFileObject={setImage} />
      {/* <ReviewComponent show={modalVisible} setShow={setModalVisible} /> */}
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  info: {
    width: windowWidth,
    paddingHorizontal: moderateScale(13, 0.2),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12, 0.4),
  },
  imageContainer: {
    width: windowWidth * 0.30,
    height: windowWidth * 0.30,
    borderRadius: (windowWidth * 0.35) / 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  camera: {
    width: windowWidth * 0.09,
    height: windowWidth * 0.09,
    borderRadius: (windowWidth * 0.09) / 2,
    backgroundColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#72AFED',
    position: 'absolute',
    left: moderateScale(100, 0.4),
    bottom: moderateScale(4, 0.4),
  },
  icon: {
    color: 'blue',
  },
  text: {
    color: '#636363',
    fontWeight: 'bold',
    fontSize: moderateScale(18, 0.3),
  },
  subText: {
    color: '#989898',
    fontSize: moderateScale(12, 0.4),
  },
  profileDetails: {
    alignItems: 'center',
    paddingVertical: moderateScale(12, 0.3),
    gap: moderateScale(12, 0.3),
  },
  field: {
    width: windowWidth * 0.90,
    borderColor: '#093AA429',
    borderWidth: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: moderateScale(24, 0.3),
    paddingVertical: moderateScale(14, 0.2),
    paddingHorizontal: moderateScale(10, 0.3),
  },
  value: {
    color: '#000000',
    opacity: 0.47,
  },
});
