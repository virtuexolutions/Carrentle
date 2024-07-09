import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ScreenBoiler from '../Components/ScreenBoiler'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import { Divider, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomText from '../Components/CustomText'
import CustomImage from '../Components/CustomImage';
import Header from '../Components/Header'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import Color from '../Assets/Utilities/Color'
const BoardingPointSearchScreen = () => {
    const array=[
        {id:1,name: 'Shrewsbury, Pennsylvania(PA)', isFav: false},
        {id:2,name: 'Abingdon, Virginia (VA)', isFav: true},
        {id:3,name: 'Port Sulphur, Louisiana (LA)', isFav: false},
        {id:4,name: 'Chelsea, Massachusetts (MA)', isFav: false},
        {id:5,name: 'Selma, California (CA)', isFav: false},
       
    ]
  return (
    <ScreenBoiler
    
    >
        <ScrollView
        style={{width: windowWidth, height: windowHeight}}
        >

        {/* <Header/> */}
        <View style={styles.locBox}>
            <View style={{
                width:'10%',
                gap:-9,
                justifyContent:'center',
                alignItems:'center'}}>
            <Entypo name='dot-single'
              size={moderateScale(34,0.2)}
            //   style={{position: 'absolute', 
            //   left: moderateScale(-1,0.2),
            //   top: moderateScale(-5,0.2)}}
              color={'#00309E'}
          />            
          <View style={{width: moderateScale(1,0.2), backgroundColor:'#00309E', height: windowHeight * 0.04, 
          // borderWidth:1
        }}></View>
            <Octicons name='dot'
               size={moderateScale(24,0.2)}
               style={{marginTop:moderateScale(6,0.2)}}
             //   style={{position: 'absolute', 
             //   left: moderateScale(-1,0.2),
             //   top: moderateScale(-5,0.2)}}
               color={'#00309E'}
           />
          </View>
            <View style={{width: windowWidth *0.85, 
            
            paddingVertical:moderateScale(11,0.2)}}>
                <CustomText >Thyane Wyomming(WY), 83127</CustomText>
                                {/* <TextInputWithTitle 
                                placeholder={"Where you want to go?"}

                            /> */}
                            
            <TextInputWithTitle
              iconHeigth={windowHeight * 0.00005}
              
            //   LeftIcon={true}
              titleText={'Password'}
              placeholder={'Where'}
              setText={() =>{}}
              value={""}
           
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.55}
              border={2}
              borderRadius={moderateScale(15, 0.3)}
              borderColor={'#000'}
              backgroundColor={'#F3F3F3'}
              marginTop={moderateScale(30, 0.3)}
              color={Color.black}
              placeholderColor={"#878786"}
              // elevation
            />
            
            </View>

        </View>
                            </ScrollView>
    </ScreenBoiler>
  )
}

export default BoardingPointSearchScreen;

const styles= StyleSheet.create({
    locBox:{
        width:windowWidth,
        // height: windowHeight * 0.25,
        flexDirection:'row'
    //    backgroundColor:'red'
    }
})