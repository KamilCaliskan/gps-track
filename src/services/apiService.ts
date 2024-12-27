import axios from 'axios';

const API_URL = 'http://localhost:3000/location';

export const sendLocation = async (location: {
  latitude: number;
  longitude: number;
  speed: number | null;
}) => {
  try {
    const response = await axios.post(API_URL, location);
    console.log('Location sent:', response.data);
  } catch (error) {
    console.error('Error sending location:', error);
  }
};
