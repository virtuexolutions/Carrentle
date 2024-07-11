import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import {Rating} from 'react-native-ratings';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../Components/CustomButton';

const PaymentScreen = ({ navigation }) => {
  return (
    <ScreenBoiler
      // showHeader
      // headerTransparent={true}
      // title={'confrim your payment'}
      // headerColor={['white', 'white']}
      // hideUser={false}
      statusBarBackgroundColor={'white'}
      statusBarContentStyle={'dark-content'}>
        <View style={{width: windowWidth, 
          paddingHorizontal:moderateScale(12,0.3),
          paddingVertical:moderateScale(12,0.2),
          flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <TouchableOpacity
          style={{width: windowWidth * 0.09, 
            backgroundColor:'white',
            height: windowWidth * 0.09,
            justifyContent:'center',
            elevation:12,
            alignItems:'center',
            borderRadius: (windowWidth * 0.09)/2
          }}
          onPress={()=>{
            navigation.toggleDrawer()
          }}
          >

          <Icon as={Ionicons} name="menu" size={moderateScale(20,0.2)} />
          </TouchableOpacity>
          <CustomText>Confirm your payment</CustomText>
          <View style={{
          width: windowHeight * 0.045, 
          justifyContent:'center',
          alignItems:'center',
          elevation:12,
          height:windowHeight * 0.045, 
          // overflow:'hidden',
          backgroundColor:'#dedbdbc8', borderRadius: (windowHeight * 0.045) / 2}}>
          <CustomImage source={require('../Assets/Images/Group13.png')} 
            style={{width:windowHeight * 0.04, height: windowHeight * 0.04}}
          />
        </View>
        </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={{
          height: windowHeight *0.65,
          paddingTop: moderateScale(10, 0.6),
          //   backgroundColor: 'green',
        }}>
        <View style={[styles.mainContainer, styles.shadowprops]}>
          <View style={styles.row}>
            <View style={styles.userImage}>
              <CustomImage
                style={{height: '100%', width: '100%', overflow: 'hidden'}}
                source={require('../Assets/Images/dummyUser.png')}
              />
            </View>
            <View style={styles.rowInnerView}>
              <View>
                <CustomText isBold style={styles.text1}>
                  theodora j.gardner
                </CustomText>
                <CustomText style={styles.text}>2486 trip</CustomText>
                <View
                  style={[
                    styles.row,
                    {
                      borderBottomWidth: 0,
                      height: windowHeight * 0.05,
                      paddingHorizontal: moderateScale(0, 0.6),
                      alignItems: 'center',
                    },
                  ]}>
                  <CustomText isBold style={styles.text}>
                    texi model :
                  </CustomText>
                  <CustomText
                    style={[
                      styles.text,
                      {
                        paddingHorizontal: moderateScale(5, 0.6),
                      },
                    ]}>
                    2486 dsfsdfsdfsdtrip
                  </CustomText>
                </View>
              </View>

              <View style={styles.ratings}>
                <Rating
                  type="custom"
                  startingValue={4}
                  ratingCount={5}
                  imageSize={moderateScale(10, 0.3)}
                  style={{
                    width: windowWidth * 0.1,
                  }}
                  ratingBackgroundColor={'white'}
                />

                <CustomText style={styles.totalRatings}>(4.5)</CustomText>
              </View>
            </View>
          </View>

          <View style={styles.LocationView}>
            <View style={styles.marker}>
              <Fontisto name='map-marker-alt' size={moderateScale(17,0.2)} color="#FF8A00"/>
              <CustomText style={{
                width: windowWidth * 0.1,
                marginTop:moderateScale(10,0.2),
                textAlign:'center',
            //  borderColor:'red',
            //  borderWidth:1,
                marginLeft:moderateScale(2,0.2),
                transform: [{ rotate: '90deg' }]}}>- - - - -</CustomText>

              <Fontisto name='map-marker-alt' size={moderateScale(17,0.2)} color="#72AFED" style={{marginTop:moderateScale(12,0.2)}}/>
            </View>
            <View
              style={{
                paddingHorizontal: moderateScale(8, 0.6),
              }}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(11, 0.6),
                  letterSpacing: 0.5,
                }}>
                pickup point
              </CustomText>
              <CustomText style={styles.text}>
                fannie street san angelo, texas{' '}
              </CustomText>
              <CustomText
                isBold
                style={[
                  styles.text,
                  {
                    paddingTop: moderateScale(17, 0.6),
                    fontSize: moderateScale(11, 0.6),
                  },
                ]}>
                drop off
              </CustomText>
              <CustomText
                style={[
                  styles.text,
                  {
                    paddingHorizontal: moderateScale(5, 0.6),
                  },
                ]}>
                navile street salem colorado
              </CustomText>
            </View>
          </View>
        </View>
        <View style={[styles.container, styles.shadowprops]}>
          <View>
            <CustomText isBold style={styles.heading}>
              payment methods
            </CustomText>
            <CustomText style={styles.text}>*** *** *** 2482</CustomText>
            <View
              style={[
                styles.row,
                {
                  borderBottomWidth: 0,
                  height: windowHeight * 0.05,
                  paddingHorizontal: moderateScale(0, 0.6),
                  alignItems: 'center',
                },
              ]}>
              <CustomText isBold style={styles.text}>
                expires on :
              </CustomText>
              <CustomText
                style={[
                  styles.text,
                  {
                    paddingHorizontal: moderateScale(5, 0.6),
                  },
                ]}>
                12/22
              </CustomText>
            </View>
          </View>
          <View style={styles.containerRow}>
            <CustomText isBold style={styles.dollar}>
              $10.00{' '}
            </CustomText>
            <CustomText isBold style={[styles.dollar, { color:'#193075' }]}>
              visa
            </CustomText>
          </View>
        </View>
        <View style={[styles.container2, styles.shadowprops]}>
          <CustomText isBold style={styles.heading}>
            promo code
          </CustomText>
          <View style={styles.promoView}>
            <CustomText style={{fontSize: moderateScale(11, 0.6)}}>
              asdasdasdas
            </CustomText>
            <Icon
              name="keyboard-arrow-right"
              as={MaterialIcons}
              size={moderateScale(15, 0.6)}
              color={'grey'}
            />
          </View>
        </View>
        <View style={styles.Textrow}>
          <CustomText isBold style={{fontSize: moderateScale(12, 0.6)}}>
            trip fare breakdown
          </CustomText>
          <CustomText>$10.00</CustomText>
        </View>
        <View style={styles.Textrow}>
          <CustomText isBold style={{fontSize: moderateScale(12, 0.6)}}>
            sub total
          </CustomText>
          <CustomText>$10.00</CustomText>
        </View>
        <View style={styles.Textrow}>
          <CustomText
            isBold
            style={{
              color: '#fac60a',
              fontSize: moderateScale(12, 0.6),
            }}>
            promo code
          </CustomText>
          <CustomText
               style={{
                color: '#fac60a',
                fontSize: moderateScale(12, 0.6),
              }}
          >$10.00</CustomText>
        </View>
        <View style={styles.Textrow}>
          <CustomText isBold style={{fontSize: moderateScale(14, 0.6)}}>
            total
          </CustomText>
          <CustomText>$10.00</CustomText>
        </View>
        <CustomButton
          onPress={() => {
            // navigation.navigate('HomeScreen')
          }}
          isGradient
          text={'pay $45.00'}
          fontSize={moderateScale(14, 0.3)}
          textColor={Color.white}
          borderWidth={2}
          borderColor={Color.white}
          borderRadius={moderateScale(30, 0.3)}
          width={windowWidth * 0.9}
          height={windowHeight * 0.07}
          marginTop={moderateScale(30, 0.3)}
          bgColor={['#79B9F6', '#00309E']}
          isBold
          // isGradient
        />
      </ScrollView>
    </ScreenBoiler>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: moderateScale(20, 0.6),
    height: windowHeight * 0.3,
    width: windowWidth * 0.94,
    backgroundColor: 'white',
    borderRadius: moderateScale(20, 0.6),
    marginBottom: moderateScale(10, 0.3),
  },
  shadowprops: {
    elevation: 7,
    shadowColor: 'black',
    shadowOpacity: 0.89,
    shadowOffset: {
      width: windowWidth * 0.01,
      height: windowHeight * 0.9,
    },
  },
  userImage: {
    overflow: 'hidden',
    height: windowHeight * 0.06,
    width: windowHeight * 0.06,
    borderRadius: (windowHeight * 0.06) / 2,
  },
  rowInnerView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: windowWidth * 0.75,
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
  text: {
    fontSize: moderateScale(10, 0.6),
  },
  text1: {
    fontSize: moderateScale(12, 0.6),
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    height: windowHeight * 0.1,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  ratings: {
    flexDirection: 'row',
    width: windowWidth * 0.2,
    paddingTop: moderateScale(5, 0.6),
  },
  totalRatings: {
    paddingHorizontal: moderateScale(10, 0.6),
    fontSize: moderateScale(9, 0.6),
  },
  marker: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.06,
    alignItems:'center',    
    // backgroundColor: 'pink',
  },
  LocationView: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(15, 0.6),
  },
  container: {
    height: windowHeight * 0.12,
    width: windowWidth * 0.94,
    backgroundColor: 'white',
    borderRadius: moderateScale(20, 0.6),
    marginBottom: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container2: {
    height: windowHeight * 0.12,
    width: windowWidth * 0.94,
    backgroundColor: 'white',
    borderRadius: moderateScale(20, 0.6),
    marginBottom: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(15, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
  heading: {
    fontSize: moderateScale(14, 0.6),
  },
  containerRow: {
    // backgroundColor: 'red',
    height: windowHeight * 0.07,
    width: windowWidth * 0.35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dollar: {
    color: '#fac60a',
    fontSize: moderateScale(16, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
  promoView: {
    //   backgroundColor: 'red',
    width: '100%',
    paddingVertical: moderateScale(10, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.lightGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: moderateScale(10, 0.6),
  },
  Textrow: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
    width: windowWidth * 0.9,
    marginTop: moderateScale(15, 0.6),
    justifyContent: 'space-between',
  },
});
