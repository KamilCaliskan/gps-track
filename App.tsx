import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const App = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      if (Platform.OS === 'android') {
        const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (granted === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => setLocation(position),
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        } else {
          console.log('Location permission denied');
        }
      } else {
        Geolocation.getCurrentPosition(
          (position) => setLocation(position),
          (error) => console.log(error),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    };
    getLocation();
  }, []);

  return (
    <SafeAreaView>
      <Text>GPS Location:</Text>
      {location ? (
        <Text>Latitude: {location.coords.latitude}</Text>
      ) : (
        <Text>Loading location...</Text>
      )}
    </SafeAreaView>
  );
};

export default App;
