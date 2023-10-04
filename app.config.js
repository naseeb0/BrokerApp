import 'dotenv/config';

export default {
  expo: {
    name: 'BrokerLink',
    slug: 'brokerlink',
    privacy: 'public',
    platforms: ['ios', 'android'],
    version: '0.15.0',
    orientation: 'portrait',
    icon: './assets/appIcon.png',
    splash: {
      image: './assets/splas.png',
      resizeMode: 'cover',
      backgroundColor: '#008489'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    extra: {
      apiKey: "AIzaSyAT1EfWI2IMKrGM_vM2bVoAX8c0nGpq1nQ",

  authDomain: "homebaba-de874.firebaseapp.com",

  projectId: "homebaba-de874",

  storageBucket: "homebaba-de874.appspot.com",

  messagingSenderId: "9451773000",

  appId: "1:9451773000:web:936d894ccc99401970cc7d"



    }
  }
};
