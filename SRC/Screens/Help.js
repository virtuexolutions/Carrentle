import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FONTS} from '../Constant/theme';

const Help = () => {
  const helpArray = [
    {
      id: 'h1',
      heading: 'Financial issues',
      expandedContent: {
        issue: 'Lost Items',
        description:
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. nulla congue leo sed est auctor, id viverra ante vestibulum. duis diam diam, lobortis eget quam et, dignissim elementum quam. sed mattis ullamcorper dolor ac eleifend. in tempor mollis neque sit amet fringilla.',
      },

      onPress: () => {},
    },
    {
      id: 'h2',
      heading: 'Financial issues',
      expandedContent: {
        issue: '',
        description: '',
      },
      onPress: () => {},
    },
    {
      id: 'h3',
      heading: 'Drive or vehicle feedback',
      expandedContent: {
        issue: '',
        description: '',
      },
      onPress: () => {},
    },
    {
      id: 'h4',
      heading: 'I was in a traffic accident',
      expandedContent: {
        issue: '',
        description: '',
      },
      onPress: () => {},
    },
    {
      id: 'h5',
      heading: 'I feel unsafe',
      expandedContent: {
        issue: '',
        description: '',
      },
      onPress: () => {},
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: moderateScale(150, 0.6),
      }}
      showsVerticalScrollIndicator={false}
      style={{
        minHeight: windowHeight,
        backgroundColor: 'white',
      }}>
      <Header
        showBack={true}
        title={'Help'}
        headerColor={['white', 'white']}
      />
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.firstRow}>
            <CustomText style={[FONTS.PoppinsLight10, {opacity: 0.6}]}>
              Additional Question
            </CustomText>

            <Icon
              as={MaterialIcons}
              name="keyboard-arrow-down"
              size={moderateScale(24, 0.3)}
            />
          </View>
          <CustomText style={FONTS.PoppinsMedium16}>Lost Items</CustomText>
          <CustomText
            style={[
              FONTS.PoppinsLight11,
              {
                opacity: 0.4,
                width: windowWidth * 0.8,
                textAlign: 'left',
              },
            ]}>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. nulla
            congue leo sed est auctor, id viverra ante vestibulum. duis diam
            diam, lobortis eget quam et, dignissim elementum quam. sed mattis
            ullamcorper dolor ac eleifend. in tempor mollis neque sit amet
            fringilla.
          </CustomText>
        </View>
        <View style={styles.field}>
          <CustomText>Financial Issues</CustomText>
          <Icon
            as={MaterialIcons}
            name="keyboard-arrow-right"
            size={moderateScale(24, 0.3)}
          />
        </View>
        <TouchableOpacity style={styles.field}>
          <CustomText>Drive or vehicle feedback</CustomText>
          <Icon
            as={MaterialIcons}
            name="keyboard-arrow-right"
            size={moderateScale(24, 0.3)}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.field}>
          <CustomText>I was in a traffic accident</CustomText>
          <Icon
            as={MaterialIcons}
            name="keyboard-arrow-right"
            size={moderateScale(24, 0.3)}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.field}>
          <CustomText>I feel unsafe</CustomText>
          <Icon
            as={MaterialIcons}
            name="keyboard-arrow-right"
            size={moderateScale(24, 0.3)}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({
  main: {
    width: windowWidth,
    marginTop: moderateScale(17, 0.3),
    // height: windowHeight * 0.7,
    // borderWidth:1,
    // borderColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(20, 0.3),
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  field: {
    width: windowWidth * 0.9,
    borderColor: '#093AA429',
    borderWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: moderateScale(24, 0.3),
    paddingVertical: moderateScale(14, 0.2),
    paddingHorizontal: moderateScale(15, 0.3),
  },
  container: {
    width: windowWidth * 0.9,
    borderRadius: moderateScale(20, 0.4),
    paddingHorizontal: moderateScale(15, 0.2),
    paddingVertical: moderateScale(7, 0.3),
    backgroundColor: 'white',
    // elevation: 8,
    // shadowColor: '#093AA438',
    // shadowOffset: {width: 0.5, height: 1},
    // shadowOpacity: 0.25,
    // shadowRadius: 3.25,
    shadowColor: '#093AA438',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
});
