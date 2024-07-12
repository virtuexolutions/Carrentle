import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SearchLocationModal from '../Components/SearchLocationModal'

const TestScreen = () => {
    const [isModalVisible , setIsModalVisible ] = useState(true)
    const [location , setLocation ] = useState({})

  return (
    <View>
     <SearchLocationModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} setLocation={setLocation}/>
    </View>
  )
}

export default TestScreen

const styles = StyleSheet.create({})