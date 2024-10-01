import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import TextInputWithTitle from './TextInputWithTitle';
import Feather from 'react-native-vector-icons/Feather';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import Modal from 'react-native-modal';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

const AskLocationComponent = ({visible, setIsVisible, onUpdateStops}) => {
  const [inputValue, setInputValue] = useState('');
  const [multipleStops, setMultipleStops] = useState([]);
  console.log('🚀 ~ AskLocationComponent ~ multipleStops:', multipleStops);
  console.log('🚀 ~ AskLocationComponent ~ InputValue:', inputValue);
  const googlePlacesRef = useRef(null);

  const updateStops = updatedStops => {
    setMultipleStops(updatedStops);
    onUpdateStops(updatedStops); // Step 5: Call the callback function with the updated stops
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
                <View
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
                </View>
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
              setInputValue('');
              console.log('Location ========>>>>', {
                name: data?.description,
                lat: details?.geometry?.location?.lat,
                lng: details?.geometry?.location?.lng,
              });
              setInputValue(data?.description);
              const updatedStops = [
                ...multipleStops,
                {
                  name: data?.description,
                  lat: details?.geometry?.location?.lat,
                  lng: details?.geometry?.location?.lng,
                },
              ];
              updateStops(updatedStops);
              googlePlacesRef.current?.clear();
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
                fontSize: 16,
                borderWidth: 2,
                borderColor: Color.lightGrey,
                borderRadius: moderateScale(20, 0.6),
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
    marginBottom: moderateScale(20, 0.6),
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
  },
});
