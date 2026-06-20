const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// global.css holds the design tokens (CSS variables) that NativeWind resolves.
module.exports = withNativeWind(config, { input: './global.css' });
