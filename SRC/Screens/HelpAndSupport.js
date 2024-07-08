import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';

import {moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import CustomButton from '../Components/CustomButton';

const HelpAndSupport = () => {
  const navigation = useNavigation();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  // const [showNumberModal, setShowNumberModal] = useState(false);
  // const [countryCode, setCountryCode] = useState('US');
  // const [withFilter, setFilter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // const [country, setCountry] = useState({
  //   callingCode: ['1'],
  //   cca2: 'US',
  //   currency: ['USD'],
  //   flag: 'flag-us',
  //   name: 'United States',
  //   region: 'Americas',
  //   subregion: 'North America',
  // });
  // const [withCallingCode, setWithCallingCode] = useState(true);
  //   const onSelect = country => {
  //     // console.log('dasdasdasdads =>', country);
  //     setCountryCode(country.cca2);
  //     setCountry(country);
  //   };

  return (
    <ImageBackground
      style={{
        width: windowWidth,
        minHeight: windowHeight,
        paddingBottom: moderateScale(40, 0.6),
      }}
      source={require('../Assets/Images/setting_Bg.png')}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.back}>
        <Icon
          name="arrowleft"
          as={AntDesign}
          style={styles.icon2}
          color={Color.white}
          size={moderateScale(20, 0.3)}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          minHeight : windowHeight ,
          // marginTop: windowHeight * 0.1,
        }}
        contentContainerStyle={{
          paddingTop: windowHeight * 0.1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: moderateScale(50, 0.6),
          // backgroundColor: 'red',
        }}>
        {/* <CustomText
          isBold
          style={{
            color: Color.white,
            width: windowWidth,
            textAlign: 'center',
            fontSize: moderateScale(25, 0.6),
            // marginVertical: moderateScale(9,0.2)
          }}>
          Help & Support
        </CustomText> */}
        <View
          style={{
            height: windowHeight * 0.12,
            width: windowHeight * 0.12,
          }}>
          <Image
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../Assets/Images/customerservice.png')}
          />
        </View>
        <CustomText
        numberOfLine={2}
          isBold
          style={{
            color: Color.white,
            width: windowWidth *0.5,
            textAlign: 'center',
            fontSize: moderateScale(20, 0.6),
            paddingVertical:moderateScale(15,.6),
            // backgroundColor:'red',
            lineHeight:moderateScale(28,.6),
            letterSpacing:moderateScale(2.9,.6)
          }}>
         hello, How can we help you ?
        </CustomText>
        <View
          style={{
            alignItems: 'center',

            marginTop: moderateScale(20, 0.3),
          }}>
          <TextInputWithTitle
            titleText={'Username'}
            placeholder={'Username'}
            setText={setUserName}
            value={username}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            backgroundColor={Color.white}
            borderColor={Color.black}
            // marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />

          <TextInputWithTitle
            titleText={'Email'}
            placeholder={'Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            borderColor={Color.black}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />
          <TextInputWithTitle
            titleText={'Phone'}
            placeholder={'Phone'}
            setText={setContact}
            value={contact}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            borderColor={Color.black}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />
          <TextInputWithTitle
            titleText={'subject'}
            placeholder={'subject'}
            setText={setSubject}
            value={subject}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.55}
            border={1}
            borderRadius={moderateScale(30, 0.3)}
            borderColor={Color.black}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            elevation
          />
          <TextInputWithTitle
            titleText={'Enter description'}
            placeholder={'Enter description'}
            setText={setDescription}
            value={description}
            viewHeight={0.2}
            viewWidth={0.75}
            inputWidth={0.55}
            border={1}
            borderRadius={moderateScale(5, 0.3)}
            borderColor={Color.black}
            backgroundColor={Color.white}
            marginTop={moderateScale(10, 0.3)}
            color={Color.black}
            placeholderColor={Color.veryLightGray}
            multiline={true}
            elevation
          />
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

          <View
            style={{
              width: windowWidth * 0.8,
              alignItems: 'center',
              paddingHorizontal: moderateScale(15, 0.3),
            }}>
            <CustomButton
              // onPress={() => navigationService.navigate('LoginScreen')}
              text={
                isLoading ? (
                  <ActivityIndicator color={Color.white} size={'small'} />
                ) : (
                  'Send question'
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
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HelpAndSupport;
const styles = StyleSheet.create({
  back: {
    width: moderateScale(35, 0.6),
    height: moderateScale(35, 0.6),
    borderRadius: moderateScale(5, 0.6),
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    position: 'absolute',
    left: moderateScale(10, 0.6),
    top: moderateScale(10, 0.6),
    zIndex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});
