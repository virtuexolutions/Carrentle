import { Icon } from 'native-base';
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Modal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomButton from './CustomButton';
import CustomText from './CustomText';

const AskLocationComponent = ({visible, setIsVisible, onUpdateStops}) => {
  const [inputValue, setInputValue] = useState('');
  const [multipleStops, setMultipleStops] = useState([]);
  const googlePlacesRef = useRef(null);

  const updateStops = updatedStops => {
    setMultipleStops(updatedStops);
    // onUpdateStops(updatedStops);
  };

  return (
    <Modal
      isVisible={visible}
      swipeDirection="up"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.box}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(16, 0.6),
            marginTop: moderateScale(15, 0.6),
          }}>
          Add Your Stops
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
          }}>
          <FlatList
            data={multipleStops}
            numColumns={3}
            renderItem={({item, index}) => (
              <View
                style={{
                  backgroundColor: Color.white,
                  width: moderateScale(80, 0.6),
                  height: moderateScale(30, 0.6),
                  marginTop: moderateScale(12, 0.8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: moderateScale(50, 0.6),
                  marginLeft: moderateScale(12, 0.6),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    let newArray = [...multipleStops];
                    newArray.splice(index, 1);
                    setMultipleStops(newArray);
                  }}
                  style={{
                    width: moderateScale(15, 0.6),
                    height: moderateScale(15, 0.6),
                    backgroundColor: 'red',
                    borderRadius: moderateScale(20, 0.6),
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    right: -2,
                    bottom: 20,
                  }}>
                  <Icon as={Entypo} name="cross" color={Color.white} />
                </TouchableOpacity>
                <CustomText numberOfLines={1} key={index}>
                  {item?.name}
                </CustomText>
              </View>
            )}
          />
        </View>
        <View style={{height: windowHeight * 0.3}}>
          <GooglePlacesAutocomplete
            ref={googlePlacesRef}
            onFail={error => console.error(error, 'errrrrrorrrr')}
            placeholder="Add Stops Name"
            textInputProps={{
              placeholderTextColor: '#5d5d5d',
            }}
            onPress={(data, details = null) => {
              if (details) {
                const newStop = {
                  name: data.description,
                  lat: details.geometry.location.lat,
                  lng: details.geometry.location.lng,
                };
                const updatedStops = [...multipleStops, newStop];
                updateStops(updatedStops);
                googlePlacesRef.current?.clear();
              }
            }}
            query={{
              key: 'AIzaSyAa9BJa70uf_20IoTJfAiK_3wz5Vr_I7wM',
              language: 'en',
            }}
            isRowScrollable={true}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                width: windowWidth * 0.8,
                marginLeft: moderateScale(5, 0.6),
                marginTop: moderateScale(20, 0.6),
              },
              textInput: {
                height: windowHeight * 0.06,
                color: '#5d5d5d',
                fontSize: 14,
                borderWidth: 2,
                borderColor: Color.lightGrey,
                borderRadius: moderateScale(20, 0.6),
                paddingLeft: moderateScale(12, 0.6),
              },
              listView: {
                width: windowWidth * 0.8,
                marginLeft: moderateScale(5, 0.6),
                borderColor: Color.veryLightGray,
              },
              description: {
                color: 'black',
              },
            }}
          />
        </View>
        <CustomButton
          text={'Add Stops'}
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.06}
          marginTop={moderateScale(20, 0.3)}
          bgColor={Color.cartheme}
          borderColor={Color.white}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.3)}
          isGradient
          onPress={() => {
            setIsVisible(false);
            onUpdateStops(multipleStops);
          }}
        />
      </View>
    </Modal>
  );
};

export default AskLocationComponent;

const styles = StyleSheet.create({
  box: {
    height: windowHeight * 0.5,
    width: windowWidth * 0.9,
    borderRadius: moderateScale(10, 6),
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
  },
});
