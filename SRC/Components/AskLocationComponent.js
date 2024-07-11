import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TextInputWithTitle from './TextInputWithTitle';
import Feather from 'react-native-vector-icons/Feather';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';

const AskLocationComponent = () => {
  const [pickupPoint, setPickupPoint] = useState('');
  const [dropOff, setDropOff] = useState('');

  return (
    <View style={styles.box}>
      <TextInputWithTitle
        iconColor={'orange'}
        iconHeigth={windowHeight * 0.00005}
        iconName={'map-pin'}
        iconType={Feather}
        LeftIcon={true}
        titleText={'pickup point'}
        placeholder={'pickup point '}
        setText={setPickupPoint}
        value={pickupPoint}
        viewHeight={0.06}
        viewWidth={0.85}
        inputWidth={0.55}
        borderBottomWidth={2}
        borderRadius={moderateScale(30, 0.3)}
        backgroundColor={'white'}
        marginTop={moderateScale(15, 0.3)}
        color={Color.orange}
        placeholderColor={Color.darkGray}
      />

      <TextInputWithTitle
        iconHeigth={windowHeight * 0.00005}
        iconName={'map-pin'}
        iconType={Feather}
        LeftIcon={true}
        titleText={'pickup point'}
        placeholder={'pickup point '}
        setText={setDropOff}
        value={dropOff}
        viewHeight={0.06}
        viewWidth={0.85}
        inputWidth={0.55}
        borderBottomWidth={2}
        borderRadius={moderateScale(30, 0.3)}
        backgroundColor={'white'}
        marginTop={moderateScale(15, 0.3)}
        color={Color.blue}
        placeholderColor={Color.darkGray}
        
      />
    </View>
  );
};

export default AskLocationComponent;

const styles = StyleSheet.create({
  box: {
    height: windowHeight * 0.19,
    width: windowWidth * 0.9,
    borderRadius: moderateScale(10, 6),
    borderWidth: 1,
    borderColor: 'blue',
    marginBottom: moderateScale(20, 0.6),
    backgroundColor: '#e8e8e8',
    alignItems :'center'
  },
});
