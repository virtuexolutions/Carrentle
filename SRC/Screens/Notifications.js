import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenBoiler from '../Components/ScreenBoiler'
import { useNavigation } from '@react-navigation/native'
import Header from '../Components/Header'
import { FlatList } from 'native-base'

const Notifications = () => {
    const navigation = useNavigation()

    const notificationArray = [
        {
            id: 1,
            text: 'Lorem Ipsum is simply dummy text',
            image: require('../Assets/Images/dummyman1.png')
        },
        {
            id: 2,
            text: 'Lorem Ipsum is simply dummy text',
            image: require('../Assets/Images/dummyman1.png')

        }, {
            id: 3,
            text: 'Lorem Ipsum is simply dummy text',
            image: require('../Assets/Images/dummyman1.png')

        },
    ]


    return (
        <View>
            <Header headerColor={['white', 'white']}
                title={'Notifications'}
                showBack={true} />
            <FlatList
                data={notificationArray}
                renderItem={({ item, index }) => {
                    <TouchableOpacity>
                        <View></View>
                    </TouchableOpacity>
                }}
            />
        </View>
    )
}

export default Notifications

const styles = StyleSheet.create({})