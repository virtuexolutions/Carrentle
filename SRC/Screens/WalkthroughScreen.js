import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import {Icon} from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
import Color from '../Assets/Utilities/Color';
import {useSelector, useDispatch} from 'react-redux';
import ScreenBoiler from '../Components/ScreenBoiler';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {setWalkThrough} from '../Store/slices/auth-slice';
import LinearGradient from 'react-native-linear-gradient';
import {position} from 'native-base/lib/typescript/theme/styled-system';
import AntDesign from 'react-native-vector-icons/AntDesign'

const WalkThroughScreen = props => {
  const dispatch = useDispatch();

  const slides = [
    {
      key: '1',
      image: require('../Assets/Images/walk1.jpg'),
      title: 'CHEVY CRUZ',
      text: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Pellentesque Eu Pulvinar Metus, Fringilla Semper Enim. Etiam Viverra Porttitor Nunc Laoreet Faucibus. Fusce Accumsan Mauris At Sem Finibus Gravida. Donec Cursus Tincidunt Eros In Efficitur. Maecenas Cursus Pretium Dui, In Tristique Turpis Finibus Nec. Class Aptent. `,
    },
    {
      key: '2',
      image: require('../Assets/Images/walk2.jpg'),
      image1: require('../Assets/Images/icon2.png'),
      title: 'LOREM IPSUM DOLOR SIT',
      text: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Pellentesque Eu Pulvinar Metus, Fringilla Semper Enim. Etiam Viverra Porttitor Nunc Laoreet Faucibus. Fusce Accumsan Mauris At Sem Finibus Gravida. Donec Cursus Tincidunt Eros In Efficitur. Maecenas Cursus Pretium Dui, In Tristique Turpis Finibus Nec. Class Aptent.`,
    },
    {
      key: '3',
      image: require('../Assets/Images/walk3.jpg'),
      image1: require('../Assets/Images/icon2.png'),
      title: 'DODGE CARAVAN',
      text: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Pellentesque Eu Pulvinar Metus, Fringilla Semper Enim. Etiam Viverra Porttitor Nunc Laoreet Faucibus. Fusce Accumsan Mauris At Sem Finibus Gravida. Donec Cursus Tincidunt Eros In Efficitur. Maecenas Cursus Pretium Dui, In Tristique Turpis Finibus Nec. Class Aptent.`,
    },
  ];

  const RenderSlider = ({item}) => {
    return (
      <View style={styles.SliderContainer}>
        <ImageBackground
          style={{
            width: windowWidth,
            minHeight: windowHeight,
            paddingBottom: moderateScale(40, 0.6),
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={item?.image}>
       
          <View
            style={{
              width: windowWidth * 0.9,
              borderRadius: moderateScale(20, 0.6),
              paddingTop: moderateScale(26, 0.6),
              height :windowHeight,
              alignItems: 'center',
            }}>
               <View
              style={{
                // marginTop:item?.key == 2? moderateScale(100, 0.6):moderateScale(140, 0.6),
                // height:  item?.key == 2 ? windowHeight*0.9 : windowHeight * 0.45,
                width: windowWidth*0.18,
                height:windowHeight*0.13,
                position: 'absolute',
                bottom: item?.key == 2 ? 280 :400,
                left:item.key == 3 && 5,
              }}>
              <CustomImage
                source={item?.image1}
                resizeMode={item?.key == 2 ?'cover' :'contain'}
                style={{
                  height: '100%',
                   width: '100%',
                }}
              />
            </View>
            <CustomText
              style={{
                color: Color.white,
                fontSize: item?.key != 2 ? moderateScale(50, 0.6) :moderateScale(40, 0.6),
                width: windowWidth * 0.8,
                padding: moderateScale(10, 0.6),
                lineHeight: moderateScale(44, 0.6),
                // backgroundColor: 'green',
                position: 'absolute',
                top: item?.key == 3 ?windowHeight*0.37 : windowHeight*0.24,
                transform:[{rotate: item?.key == 2 ? '-90deg' :'-0deg'}] ,
                left: item?.key != 3 ? 50 :55,
                letterSpacing:0.6,
                textTransform:'upperCase'
              }}
              numberOfLines={2}
              isBold>
              {item?.title}
            </CustomText>
            {/*   */}
            {/* <View>
            <CustomText
              style={{
                color: Color.white,
                fontSize: moderateScale(50, 0.6),
                width: windowWidth * 0.5,
                padding: moderateScale(10, 0.6),
                lineHeight: moderateScale(44, 0.6),
                // backgroundColor: 'green',
                position: 'absolute',
                top: 155,
                // transform:[{ rotate: '-90deg'}] ,
                left: 90,
              }}
              numberOfLines={2}
              isBold>
              {item?.title}
            </CustomText>

            </View> */}

           

            <CustomText
              style={{
                color: Color.white,
                fontSize: moderateScale(11, 0.6),
                width:  item?.key == 2 ? windowWidth*0.63 :item?.key == 3 ? windowWidth*0.8 :windowWidth * 0.9,
                lineHeight: moderateScale(15, 0.3),
                textAlign: 'left',
                paddingVertical: moderateScale(5, 0.6),
                position: 'absolute',
                top:  item?.key == 2 ? windowHeight*0.63 :item?.key ==3 ? windowHeight*0.5  : windowHeight*0.69,
               left:  item?.key == 2 ? 125: 0,
              }}
              numberOfLines={15}>
              {item?.text}
            </CustomText>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const RenderNextBtn = () => {
    return (
      <TouchableOpacity
        style={{
          height: windowHeight * 0.07,
          width: windowHeight * 0.07,
          borderRadius: (windowHeight * 0.07) / 2,
          backgroundColor: 'transparent',
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Color.white,
          position :'absolute',
          bottom :10,
        right  :150,
        }}>
        <Icon
          name="arrowright"
          as={AntDesign}
          size={moderateScale(25, 0.6)}
          color={Color.white}
        />
      </TouchableOpacity>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnRight]}>
        Done
      </CustomText>
    );
  };
  // const RenderSkipBtn = () => {
  //   return (
  //     <CustomText
  //       onPress={() => {
  //         dispatch(setWalkThrough(true));
  //       }}
  //       style={[styles.generalBtn, styles.btnLeft]}>
  //       Skip
  //     </CustomText>
  //   );
  // };
  // const RenderBackBtn = () => {
  //   return (
  //     <CustomText style={[styles.generalBtn, styles.btnLeft]}>Back</CustomText>
  //   );
  // };
  return (
    <ScreenBoiler
      showHeader={false}
      statusBarBackgroundColor={[Color.white, Color.white]}
      statusBarContentStyle={'dark-content'}>
      <View style={styles.container1}>
        {/* <CustomImage
          source={backgroundImage}
          resizeMode="contain"
          style={styles.bgImage}
        /> */}
        <AppIntroSlider
          renderItem={RenderSlider}
          data={slides}
          // showDoneButton={false}
          // showSkipButton={true}
          // showPrevButton={true}
          showNextButton={true}
          // activeDotStyle={{backgroundColor: Color.themeColor2}}
          // dotStyle={{
          //   backgroundColor: 'transparent',
          //   borderWidth: 1,
          //   borderColor: Color.white,
          // }}
          renderDoneButton={RenderDoneBtn}
          renderNextButton={RenderNextBtn}
          // renderSkipButton={RenderSkipBtn}
          // renderPrevButton={RenderBackBtn}
        />
      </View>
    </ScreenBoiler>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: windowHeight * 0.1,
    // justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor: '#cc5200',
  },
  container1: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
  SliderContainer: {
    // flex: 1,
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  title: {
    color: Color.themeColor2,
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
    width: windowWidth * 0.8,
    marginTop: windowHeight * 0.065,
  },
  subcontainer: {
    width: windowWidth,
    height: windowHeight * 0.55,
    backgroundColor: Color.green,
    borderTopLeftRadius: moderateScale(35, 0.3),
    borderTopRightRadius: moderateScale(35, 0.3),
  },
  subText: {
    color: Color.themeColor2,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
    width: windowWidth * 0.8,
    marginTop: moderateScale(10, 0.3),
  },
  generalBtn: {
    paddingVertical: moderateScale(15, 0.3),
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
  },
  btnLeft: {
    color: Color.white,
    paddingLeft: moderateScale(20, 0.3),
  },
  btnRight: {
    color: Color.white,
    paddingRight: moderateScale(20, 0.3),
  },
});

export default WalkThroughScreen;
const BoldText = ({children}) => {
  return <Text style={{fontWeight: 'bold'}}>{children}</Text>;
};
