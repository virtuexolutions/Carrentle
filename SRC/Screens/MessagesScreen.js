import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {useDispatch, useSelector} from 'react-redux';
import {
  Actions,
  Avatar,
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import CustomImage from '../Components/CustomImage';
import {useNavigation} from '@react-navigation/native';
import Header from '../Components/Header';
import {mode} from 'native-base/lib/typescript/theme/tools';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MessagesScreen = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'john',
          avatar: require('../Assets/Images/dummyUser1.png'),
        },
      },
      {
        _id: 2,
        text: 'Hello',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'chris',
          avatar: require('../Assets/Images/dummyUser.png'),
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.white}}>
      <Header headerColor={['white', 'white']} title={'Chat'} showBack={true} />
      <View style={styles.row}>
        <View>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(20, 0.6),
              color: Color.darkGray,
            }}>
            Parsley Montana
          </CustomText>
          <CustomText
            style={{fontSize: moderateScale(18, 0.6), color: Color.grey}}>
            San Francisco
          </CustomText>
        </View>
        <View
          style={{
            width: moderateScale(60, 0.6),
            height: moderateScale(60, 0.6),
            borderRadius: moderateScale(30, 0.6),
          }}>
          <CustomImage
            source={require('../Assets/Images/dummyUser1.png')}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: moderateScale(30, 0.6),
            }}
          />
        </View>
      </View>
      <GiftedChat
        textInputStyle={{
          color: Color.black,
          marginTop: moderateScale(5, 0.3),
        }}
        placeholderTextColor={Color.darkGray}
        messages={messages}
        isTyping={false}
        alignTop
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                backgroundColor: Color.lightGrey,
                height: moderateScale(50, 0.6),
                justifyContent: 'center',
                marginHorizontal: moderateScale(6, 0.6),
                borderRadius: moderateScale(12, 0.6),
                bottom: 10,
              }}>
              <Composer
                {...props}
                textInputStyle={{
                  flex: 1,
                  color: 'black',
                  padding: 10,
                  alignSelf: 'flex-start',
                }}></Composer>
            </InputToolbar>
          );
        }}
        alwaysShowSend={true}
        renderSend={props => {
          return (
            <Send
              {...props}
              containerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: moderateScale(15, 0.6),
                width: moderateScale(30, 0.6),
                bottom: 3,
              }}>
              <Icon
                name="send"
                as={FontAwesome}
                size={moderateScale(22)}
                color={Color.themeColor}
              />
            </Send>
          );
        }}
        renderMessage={props => {
          const {currentMessage, user} = props;
          return (
            <View style={styles.messageContainer}>
              <Avatar
                source={{uri: currentMessage.user.avatar}}
                size={32}
                containerStyle={styles.avatar}
              />
              <View style={styles.bubble}>
                <Text style={styles.userName}>{currentMessage.user.name}</Text>
                <Text style={styles.messageText}>{currentMessage.text}</Text>
              </View>
            </View>
          );
        }}
        // renderBubble={props => {
        //   return (
        //     <Bubble
        //       {...props}
        //       wrapperStyle={{
        //         right: {
        //           backgroundColor: Color.blue,
        //           borderRadius: 20,
        //           paddingVertical: 8,
        //           paddingHorizontal: 12,
        //           borderTopLeftRadius: 15,
        //           borderTopRightRadius: 0,
        //           borderBottomLeftRadius: 15,
        //           borderBottomRightRadius: 15,
        //         },
        //         left: {
        //           backgroundColor: Color.lightBlue,
        //           borderTopLeftRadius: 15,
        //           borderTopRightRadius: 15,
        //           borderBottomLeftRadius: 15,
        //           borderBottomRightRadius: 0,
        //         },
        //       }}
        //       containerStyle={{
        //         left: {
        //           position: 'absolute',
        //           left: 10,
        //         },
        //         right: {
        //           marginRight: moderateScale(10, 0.6),
        //         },
        //       }}
        //     />
        //   );
        // }}
        // renderActions={props => (
        //   <Actions
        //     {...props}
        //     icon={() => (
        //       <Icon
        //         as={MaterialCommunityIcons}
        //         name="sticker-emoji"
        //         size={22}
        //         color={Color.darkBlue}
        //       />
        //     )}
        //     onPressActionButton={() => {
        //       console.log('Action button pressed');
        //     }}
        //   />
        // )}
        onSend={messages => onSend(messages)}
        key={item => item?.id}
        user={{
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = ScaledSheet.create({
  header: {
    color: Color.black,
    fontSize: moderateScale(18, 0.3),
    width: windowWidth * 0.9,
  },
  image: {
    marginHorizontal: moderateScale(10, 0.3),
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.7,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  row: {
    width: windowWidth,
    height: windowHeight * 0.06,
    paddingHorizontal: moderateScale(20, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(20, 0.6),
    justifyContent: 'space-between',
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
    marginTop: moderateScale(-3, 0.6),
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  avatar: {
    marginRight: 8,
    backgroundColor: 'red',
  },
  bubble: {
    backgroundColor: '#e0f7fa', // Light blue background
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
  },
  userName: {
    fontWeight: 'bold',
    color: '#007aff', // Adjust color for the name
  },
  messageText: {
    color: '#333333',
  },
});
