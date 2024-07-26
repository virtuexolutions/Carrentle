import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825; // Default Latitude
const LONGITUDE = -122.4324; // Default Longitude
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Maps = () => {
    const [pickup, setPickup] = useState(null);
    const [dropoff, setDropoff] = useState(null);
    console.log('pickup', pickup, 'dropoff', dropoff)
    const handleMapPress = (e) => {
        const { coordinate } = e.nativeEvent;
        if (!pickup) {
            setPickup(coordinate);
        } else if (!dropoff) {
            setDropoff(coordinate);
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                onPress={handleMapPress}
            >
                {pickup && <Marker coordinate={pickup} title="Pickup Location" />}
                {dropoff && <Marker coordinate={dropoff} title="Dropoff Location" />}

                {pickup && dropoff && (
                    <MapViewDirections
                        origin={pickup}
                        destination={dropoff}
                        apikey="AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc"
                        strokeWidth={3}
                        strokeColor="hotpink"
                    />
                )}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Maps;
