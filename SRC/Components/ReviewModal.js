import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from './CustomText';
import {AirbnbRating} from 'react-native-ratings';
import {moderateScale} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomButton from './CustomButton';
import TextInputWithTitle from './TextInputWithTitle';
import {Platform} from 'react-native';
import {ToastAndroid} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import moment from 'moment';
import CustomImage from './CustomImage';

const ReviewModal = ({item, setRef, rbRef, setClientReview}) => {
  const token = useSelector(state => state.authReducer.token);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <RBSheet
      ref={ref => setRef(ref)}
      closeOnDragDown={true}
      height={450}
      dragFromTopOnly={true}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <CustomText isBold style={styles.rate}>
          rate rider
        </CustomText>

        <View style={styles.imageContainer}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../Assets/Images/dummyUser.png')}
          />
        </View>
        <CustomText isBold style={styles.name}>
          mark alexender
        </CustomText>
        <CustomText isBold style={styles.loc}>
          manchester ,Uk
        </CustomText>

        <View
          style={{
            marginTop: moderateScale(-35, 0.3),
          }}
        />

        <AirbnbRating
          reviewColor={Color.themeColor1}
          reviewSize={25}
          size={25}
          count={5}
          reviews={['OK', 'Good', 'Very Good', 'Wow', 'Amazing']}
          defaultRating={0}
          onFinishRating={rating => {
            setRating(rating);
          }}
        />
        <TextInputWithTitle
          multiline={true}
          secureText={false}
          placeholder={'Your review'}
          setText={setReview}
          value={review}
          viewHeight={0.15}
          viewWidth={0.75}
          inputWidth={0.66}
          border={1}
          borderColor={Color.themeColor1}
          backgroundColor={'#FFFFFF'}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          marginTop={moderateScale(10, 0.6)}
          borderRadius={moderateScale(25, 0.3)}
        />

        <CustomButton
          text={
            loading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              'send review'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.6}
          height={windowHeight * 0.06}
          marginTop={moderateScale(20, 0.3)}
          onPress={() => {}}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(15, 0.3)}
          bgColor={Color.cartheme}
          isGradient={true}
          borderColor={'white'}
          borderWidth={1}
        />
      </View>
    </RBSheet>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 22,
    color: Color.themeColor1,
    padding: moderateScale(10, 0.3),
  },
  input: {
    width: windowWidth * 0.8,
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.themeLightGray,
    borderRadius: 10,
    height: windowHeight * 0.2,
    marginVertical: moderateScale(20, 0.3),
  },
  name: {
    marginTop: moderateScale(10.3),
    width: windowWidth * 0.6,
    fontSize: moderateScale(16, 0.6),
    textAlign: 'center',
    color: Color.cartheme1,
  },
  rate: {
    width: windowWidth * 0.6,
    fontSize: moderateScale(20, 0.6),
    textAlign: 'center',
    color: Color.cartheme1,
    letterSpacing: 1.5,
  },
  loc: {
    width: windowWidth * 0.6,
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
    color: Color.mediumGray,
  },
  imageContainer: {
    marginTop: moderateScale(5.3),
    height: windowHeight * 0.1,
    width: windowHeight * 0.1,
    borderRadius: moderateScale((windowHeight * 0.1) / 2),
    overflow: 'hidden',
  },
});
