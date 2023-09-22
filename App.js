import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './redux/store';
import { LogBox } from 'react-native';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';
import {useFonts} from 'expo-font';
const App = () => {
  const [loaded] = useFonts({
    'UberMoveBold': require('./assets/fonts/UberMoveBold.otf'),
    'UberMoveMedium': require('./assets/fonts/UberMoveMedium.otf'),
    'AirBnbCerealBold': require('./assets/fonts/AirbnbCereal_W_Bd.otf'),
    'AirBnbCerealMedium': require('./assets/fonts/AirbnbCereal_W_Md.otf'),
    'AirBnbCerealBook': require('./assets/fonts/AirbnbCereal_W_Bk.otf'),
    'AirBnbCerealLight': require('./assets/fonts/AirbnbCereal_W_Lt.otf'),
    'AirBnbCerealExtraBold': require('./assets/fonts/AirbnbCereal_W_XBd.otf'),
    'AirBnbCerealBlack': require('./assets/fonts/AirbnbCereal_W_Bk.otf'),
    'AirBnbCerealBlackk': require('./assets/fonts/AirbnbCereal_W_Blk.otf'),
    
  });
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <AuthenticatedUserProvider>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </AuthenticatedUserProvider>
    </Provider>
  );
};

export default App;
