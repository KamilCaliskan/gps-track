// metro.config.js
const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  resolver: {
    ...config.resolver,
    // İhtiyaç duyduğunuz çözümleme işlemleri burada eklenebilir
  },
  transformer: {
    ...config.transformer,
    
  },
};

