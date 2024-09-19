import {
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import {useNavigation} from '@react-navigation/native';
import Header from '../Components/Header';
import {useSelector} from 'react-redux';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';

const Notifications = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const notificationArray = [
    {
      id: 1,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 2,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 3,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 4,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 5,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 6,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 7,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 8,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
    },
    {
      id: 9,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
    },
  ];

  return (
    <View>
      <Header
        headerColor={['white', 'white']}
        title={'Notifications'}
        showBack={true}
      />

      <View style={styles.main_view}>
        <FlatList
          data={notificationArray}
          style={{marginBottom: moderateScale(10, 0.6)}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity style={styles.noti_view}>
                <View style={styles.imageView}>
                  <Image source={item?.image} style={styles.image} />
                </View>
                <CustomText style={styles.noti_text}>{item?.text}</CustomText>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  main_view: {
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(20, 0.6),
  },
  noti_view: {
    width: windowWidth * 0.86,
    backgroundColor: Color.white,
    height: moderateScale(60, 0.6),
    borderRadius: moderateScale(12, 0.6),
    marginBottom: moderateScale(20, 0.6),
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(10, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noti_text: {
    fontSize: moderateScale(12, 0.6),
    marginLeft: moderateScale(6, 0.6),
    width: '70%',
  },
  imageView: {
    width: 40,
    height: 40,
    borderRadius: moderateScale(20, 0.6),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(20, 0.6),
  },
});
