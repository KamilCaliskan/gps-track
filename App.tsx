import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { sendLocation } from './src/services/apiService';
import { generateMockLocation } from './src/services/gpsMock';

const App = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    speed: number | null;
  } | null>(null);

  const [isTracking, setIsTracking] = useState<boolean>(false);

  // Request location permissions
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS permissions are handled automatically
  };

  // Start GPS tracking
  const startTracking = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      console.log('Location permission denied');
      return;
    }

    setIsTracking(true);

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      Geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
          });
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true, distanceFilter: 0 }
      );
    } else {
      // Mock location for testing in non-mobile environments
      const intervalId = setInterval(() => {
        setLocation(generateMockLocation());
      }, 1000);

      return () => clearInterval(intervalId);
    }
  };

  // Stop GPS tracking
  const stopTracking = () => {
    Geolocation.stopObserving();
    setIsTracking(false);
  };

  // Send location to API server
  useEffect(() => {
    if (location) {
      sendLocation(location);
    }
