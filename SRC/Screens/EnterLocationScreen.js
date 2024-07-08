import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'

const EnterLocationScreen = () => {

 const  Location = async () => {
        return {
          region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        };
    }
   const  onRegionChange= async (region) =>{
      this.setState({ region });
    }
      
    

  return (
//     <MapView
//     initialRegion={{
//       latitude: 37.78825,
//       longitude: -122.4324,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     }}
//   />
    <View>
      <Text>EnterLocationScreen</Text>
    </View>
  )
}

export default EnterLocationScreen

const styles = StyleSheet.create({})