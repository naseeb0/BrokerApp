import 'dotenv/config';

export default {
  expo: {
    name: 'BrokerLink',
    slug: 'brokerlink',
    name: 'BrokerLink',
    slug: 'broker-link',
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
      apiKey: "AIzaSyDZuWuz0h-uAhFrssQQm3Mbi6StZtMeiUs",

  authDomain: "eventsnet-fa0f0.firebaseapp.com",

  projectId: "eventsnet-fa0f0",

  storageBucket: "eventsnet-fa0f0.appspot.com",

  messagingSenderId: "901264439913",

  appId: "1:901264439913:web:b0c1eb2fcfefe9ecfd40f8"


    }
  }
};
