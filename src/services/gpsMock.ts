export const generateMockLocation = () => {
    const latitude = 37.7749 + (Math.random() - 0.5) * 0.01; // Around San Francisco
    const longitude = -122.4194 + (Math.random() - 0.5) * 0.01;
    const speed = Math.random() * 10; // Random speed in m/s
  
    return { latitude, longitude, speed };
  };
  