import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from './CustomImage';
import { Rating, AirbnbRating } from 'react-native-ratings';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import Color from '../Assets/Utilities/Color';
import { FONTS, SIZES } from '../Constant/theme';

const ReviewComponent = ({show, setShow}) => {
  return (
    <Modal
      isVisible={show}
      onBackdropPress={() => {
        setShow(false);
      }}
      swipeDirection={'down'}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: Color.white,
      }}>
      <LinearGradient
        colors={['#79B9F6', '#093AA4']}
        start={{x: 0.4, y: 0}}
        end={{x: 0.5, y: 0.8}}
        style={styles.card}>
        <View style={styles.imageContainer}>
          <CustomImage
            source={require('../Assets/Images/dummyUser1.png')}
            style={styles.image}
          />
        </View>
           <View style={{flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(10,0.3)}}>
            <AirbnbRating
              type='custom'
              defaultRating={5}
            //   ratingCount={6}
              reviews={[]}
              imageSize={moderateScale(26, 0.3)}  
           />
          </View>
          <CustomText style={[FONTS.poppinsRegular16 ,styles.text1]}>What Did You Love About Raymond</CustomText>
          <CustomText style={styles.price}>$90</CustomText>
          <CustomButton 
             onPress={() => {
                // navigation.navigate('BoardingPointScreen')
              }}
              textstyle={{ ...FONTS.PoppinsBold13 }}
              text={'Submit'}
              textColor={Color.black}
              borderWidth={2}
              borderColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
              width={windowWidth * 0.6}
              height={windowHeight * 0.06}
              marginTop={moderateScale(22, 0.3)}
              bgColor={"white"}
              isBold
              textTransform={'capitalize'}
          />
      </LinearGradient>
    </Modal>
  );
};

export default ReviewComponent;

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.88,
    // height: windowHeight * 0.45,
    borderRadius: moderateScale(26, 0.4),
    // backgroundColor:'red'
    paddingTop:moderateScale(50,0.4),
    paddingBottom:moderateScale(20,0.3),
    justifyContent:'flex-end',
    alignItems:'center',

  },
  imageContainer: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.35,
    borderRadius: (windowWidth * 0.35) / 2,
    overflow: 'hidden',
    position:'absolute',
    top:moderateScale(-50, 0.4),
    left: moderateScale(100,0.2),
    zIndex:1
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text1:{
    marginTop:moderateScale(12,0.3),
    // fontSize:moderateScale(17,0.3),
    color:Color.white
    // width: windowWidth * 0.87
  },
  price:{
    fontSize : moderateScale(35,0.3),
    color:Color.white,
    fontWeight:'bold',
  }
});
