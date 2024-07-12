import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import {Divider, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import Header from '../Components/Header';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import Color from '../Assets/Utilities/Color';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather'
import { color } from 'native-base/lib/typescript/theme/styled-system';
import SearchLocationModal from '../Components/SearchLocationModal';

const BoardingPointSearchScreen = ({navigation}) => {
  // const navigation = useNavigation();
  const [isModalVisible ,setIsModalVisible] =useState(false)
  const [location ,setLocation]=useState({})
  console.log("🚀 ~ BoardingPointSearchScreen ~ location:", location)
  
  console.log("🚀 ~ BoardingPointSearchScreen ~ isModalVisible:", isModalVisible)

  const array = [
    {id: 1, name: 'Shrewsbury, Pennsylvania(PA)', isFav: false},
    {id: 2, name: 'Abingdon, Virginia (VA)', isFav: true},
    {id: 3, name: 'Port Sulphur, Louisiana (LA)', isFav: false},
    {id: 4, name: 'Chelsea, Massachusetts (MA)', isFav: false},
    {id: 5, name: 'Selma, California (CA)', isFav: false},
  ];
  return (
    // <ScreenBoiler>
      <ScrollView style={{width: windowWidth, height: windowHeight}}>
        {/* <Header
          // navigation={navigation}
          title={'Boarding Point'}
          headerColor={['white', 'white']}
          hideUser={false}
        /> */}
        <View style={styles.locBox}>
          <View
            style={{
              width: '10%',
              gap: -9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo
              name="dot-single"
              size={moderateScale(34, 0.2)}
              color={'#00309E'}
            />
            <View
              style={{
                width: moderateScale(1, 0.2),
                backgroundColor: '#00309E',
                height: windowHeight * 0.04,
              }}></View>
            <Octicons
              name="dot"
              size={moderateScale(24, 0.2)}
              style={{marginTop: moderateScale(6, 0.2)}}
              color={'#00309E'}
            />
          </View>
          <View
            style={{
              width: windowWidth * 0.85,
              paddingVertical: moderateScale(11, 0.2),
            }}>
            <CustomText>Thyane Wyomming(WY), 83127</CustomText>

            <TouchableOpacity
            onPress={() =>{
              setIsModalVisible(true)
            }}
            style={styles.btn}> 
            <CustomText style={{
              color:'#878786'
            }}>where</CustomText>

            </TouchableOpacity>

          </View>
        </View>
         
<SearchLocationModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} setLocation={setLocation}/>
      </ScrollView>
    // </ScreenBoiler>
  );
};

export default BoardingPointSearchScreen;

const styles = StyleSheet.create({
  locBox: {
    width: windowWidth,
    // height: windowHeight * 0.25,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  btn:{
    width :windowWidth*0.75,
    backgroundColor :'#F3F3F3',
    borderWidth:1,
    borderColor :Color.lightGrey,
    height :windowHeight*0.06,
    borderRadius: moderateScale(13,.6),
    // alignItems :'center',
    paddingHorizontal :moderateScale(10,.6),
    justifyContent :'center',
    marginTop :moderateScale(30,.3)
  }
});
