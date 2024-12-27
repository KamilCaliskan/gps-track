import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const App = () => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const fineLocationGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        const backgroundLocationGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION
        );

        if (
          fineLocationGranted === PermissionsAndroid.RESULTS.GRANTED &&
          backgroundLocationGranted === PermissionsAndroid.RESULTS.GRANTED
        ) {
          trackUserLocation();
        } else {
          setErrorMsg('Location permissions denied');
        }
      } else {
        trackUserLocation();
      }
    };

    const trackUserLocation = () => {
      Geolocation.watchPosition(
        (position) => {
          setLocation(position);
          sendLocationToServer(position); // Send location updates to the server
        },
        (error) => {
          console.error(error);
          setErrorMsg('Error fetching location');
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 10000,
          fastestInterval: 5000,
        }
      );
    };

    requestLocationPermission();
  }, []);

  const sendLocationToServer = async (position: any) => {
    try {
      await axios.post('http://your-api-url.com/location', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to send location to server:', error);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
          />
        </MapView>
      ) : (
        <View style={styles.loading}>
          {errorMsg ? <Text>{errorMsg}</Text> : <Text>Fetching location...</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
