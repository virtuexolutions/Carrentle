import {useNavigation} from '@react-navigation/native';
import {format, isToday, parse} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import Header from '../Components/Header';
import {windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {Get} from '../Axios/AxiosInterceptorFunction';

const Notifications = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const [opened, setIsOpened] = useState(null);
  const [loading, setLoading] = useState(null);
  const [notification, setNotifications] = useState(null);
  console.log(notification, 'notificationnnnnnnnnnnnnnnnn');
  const notificationArray = [
    {
      id: 1,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
      date: new Date(),
    },
    {
      id: 2,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
      date: new Date(),
    },
    {
      id: 3,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
      date: '24-12-2018',
    },
    {
      id: 4,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
      date: '24-12-2018',
    },
    {
      id: 5,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
      date: '24-12-2018',
    },
    {
      id: 6,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
      date: '24-12-2016',
    },
    {
      id: 7,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
      date: '24-12-2016',
    },
    {
      id: 8,
      text: 'Lorem Ipsum is simply dummy text',
      image: require('../Assets/Images/dummyman1.png'),
      date: '24-12-2016',
    },
    {
      id: 9,
      text: 'Lorem Ipsum is simply dummy text',
      date: '24-12-2016',
      image: require('../Assets/Images/dummyman1.png'),
    },
  ];
  const groupByDate = notifications => {
    const groupedNotifications = {};

    notifications.forEach(notification => {
      const notificationDate =
        typeof notification.date === 'string'
          ? parse(notification.date, 'dd-MM-yyyy', new Date())
          : notification.date;

      const dateKey = isToday(notificationDate)
        ? 'Today'
        : format(notificationDate, 'dd-MM-yyyy');

      if (!groupedNotifications[dateKey]) {
        groupedNotifications[dateKey] = [];
      }

      groupedNotifications[dateKey].push(notification);
    });

    return groupedNotifications;
  };

  useEffect(() => {
    getNotificationList();
  }, []);

  const getNotificationList = async () => {
    const url = 'auth/notification';
    setLoading(true);
    const reponse = await Get(url, token);
    setLoading(false);
    if (reponse != undefined) {
      setNotifications(reponse?.data?.notification);
    }
  };

  const groupedNotifications = groupByDate(notificationArray);

  const renderNotification = ({item}) => console.log(item, 'item');
  // <TouchableOpacity style={styles.noti_view}>
  //   <View style={styles.imageView}>
  //     <Image source={item?.image} style={styles.image} />
  //   </View>
  //   <CustomText style={styles.noti_text}>{item?.text}</CustomText>
  // </TouchableOpacity>

  return (
    <View>
      <Header
        headerColor={['white', 'white']}
        title={'Notifications'}
        showBack={true}
      />
      <View style={styles.main_view}>
        <FlatList
          data={Object.keys(groupedNotifications)}
          keyExtractor={item => item.id}
          style={{marginBottom: moderateScale(10, 0.6)}}
          showsVerticalScrollIndicator={false}
          renderItem={({item: dateKey}) => (
            <View>
              <CustomText
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginVertical: moderateScale(10, 0.6),
                }}>
                {dateKey}
              </CustomText>
              <FlatList
                data={groupedNotifications[dateKey]}
                keyExtractor={item => item.id.toString()}
                renderItem={renderNotification}
              />
            </View>
          )}
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
