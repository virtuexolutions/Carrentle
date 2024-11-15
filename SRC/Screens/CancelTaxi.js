import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomImage from '../Components/CustomImage';
import navigationService from '../navigationService';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import Loader from '../Components/Loader';

const CencalTexi = ({route}) => {
  // const {id} = route.params;
  const id = null;
  const [groupValue, setGroupValue] = useState('');
  console.log('🚀 ~ CencalTexi ~ groupValue:', groupValue);

  const [modal_visibe, setisModal_visible] = useState(false);
  const [reason, setReason] = useState('');
  const token = useSelector(state => state.authReducer.token);
  const [loading, setLoading] = useState(false);

  const reason_array = [
    {
      id: 1,
      text: 'Wating For Long Time',
    },
    {
      id: 2,
      text: 'Unable to Contact driver',
    },
    {
      id: 3,
      text: 'Driver denied to go to destination',
    },
    {
      id: 4,
      text: 'Wrong address Shown',
    },
    {
      id: 5,
      text: 'The Price is not reasonable',
    },
  ];

  const onPressCancleRide = async () => {
    const body = {
      status: 'cancel',
      reason: groupValue,
    };
    const url = `auth/rider/ride_update/${id}`;
    const response = await Post(url, body, apiHeader(token));
    if (response?.data?.ride_info?.status === 'cancel') {
      setisModal_visible(true);
    }
  };

  useEffect(() => {
    getCencalReason();
  }, []);

  const getCencalReason = async () => {
    const url = 'auth/reasons';
    setLoading(true);
    const response = await Get(url, token);
    if (response?.data?.success === true) {
      setLoading(false);
      setReason(response?.data?.reson_list);
    }
    return console.log('🚀 ~ getCencalReason ~ response:', response?.data);
  };

  return (
    <View style={styles.container}>
      <Header
        showBack={true}
        headerColor={['white', 'white']}
        title={'Booking Request'}
      />
      <View style={styles.main_view}>
        <CustomText style={styles.text}>
          Please Select the Reason For Cancellation
        </CustomText>
        {loading ? (
          <View style={{width: windowWidth}}>
            <Loader style={{alignSelf: 'center'}} />
          </View>
        ) : (
          <>
            <FlatList
              data={reason}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: moderateScale(20, 0.6),
                      }}>
                      <TouchableOpacity
                        onPress={() => setGroupValue(item?.description)}
                        style={[
                          styles.checked,
                          {
                            backgroundColor:
                              groupValue === item?.text
                                ? Color.blue
                                : Color.white,
                          },
                        ]}>
                        {groupValue === item?.description && (
                          <Icon
                            name="check"
                            size={3}
                            as={AntDesign}
                            color={Color.white}
                            style={{alignSelf: 'center'}}
                          />
                        )}
                      </TouchableOpacity>
                      <CustomText style={styles.reason_text}>
                        {item?.description}
                      </CustomText>
                    </View>
                  </>
                );
              }}
            />
            <CustomText isBold={true} style={styles.other_text}>
              Others
            </CustomText>
            <View
              style={{
                width: windowWidth * 0.8,
                borderRadius: moderateScale(10, 0.6),
                height: moderateScale(45, 0.6),
                borderColor: Color.lightGrey,
                borderWidth: 1,
              }}>
              <TextInput
                onChangeText={text => setReason(text)}
                placeholder="Other Reason"
                style={{color: Color.black, width: '100%', height: '100%'}}
              />
            </View>
          </>
        )}
        <View
          style={{
            height: windowHeight * 0.35,
            width: windowWidth * 0.9,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <CustomButton
            text={'cancel ride'}
            textColor={Color.white}
            width={windowWidth * 0.7}
            height={windowHeight * 0.06}
            bgColor={Color.cartheme}
            borderColor={Color.white}
            borderWidth={1}
            borderRadius={moderateScale(30, 0.3)}
            isGradient
            onPress={() => onPressCancleRide()}
          />
        </View>
      </View>
      <Modal
        swipeDirection="up"
        transparent
        visible={modal_visibe}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: windowHeight,
            width: windowWidth,
            backgroundColor: 'rgba(0,0,0,0.6)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.35,
              backgroundColor: Color.white,
              borderRadius: moderateScale(20, 0.6),
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: moderateScale(12, 0.6),
            }}>
            <View
              style={{
                height: windowHeight * 0.12,
                width: windowWidth * 0.3,
                marginBottom: moderateScale(20, 0.6),
              }}>
              <CustomImage
                style={{width: '100%', height: '100%'}}
                source={require('../Assets/Images/sad_face.png')}
              />
            </View>
            <CustomText
              isBold
              style={{fontSize: moderateScale(15, 0.6), textAlign: 'center'}}>
              we're so sad about your cancellation
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                textAlign: 'center',
                color: Color.grey,
              }}>
              we will continue to improve our services & satisfy on the next
              trip
            </CustomText>
            <CustomButton
              text={'go back to Home'}
              textColor={Color.white}
              width={windowWidth * 0.6}
              height={windowHeight * 0.05}
              bgColor={Color.cartheme}
              borderColor={Color.white}
              borderWidth={1}
              marginTop={moderateScale(20, 0.6)}
              borderRadius={moderateScale(30, 0.3)}
              isGradient
              onPress={() => navigationService.navigate('MyDrawer')}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CencalTexi;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Color.white,
  },
  main_view: {
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(20, 0.6),
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: moderateScale(12, 0.3),
    color: Color.grey,
  },
  reason_text: {
    fontSize: moderateScale(13, 0.6),
    marginLeft: moderateScale(12, 0.6),
  },
  other_text: {
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(20, 0.6),
    marginBottom: moderateScale(10, 0.6),
  },
  btn_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.06,
    borderRadius: moderateScale(20, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.darkBlue,
    position: 'absolute',
    bottom: 0,
  },
  btn: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: moderateScale(20, 0.6),
    height: moderateScale(20, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Color.blue,
    borderRadius: moderateScale(2, 0.6),
  },
});
