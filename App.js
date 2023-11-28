import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './redux/store';
import { LogBox } from 'react-native';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import registerNNPushToken from 'native-notify';
import * as Updates from 'expo-updates';

function App() {
  registerNNPushToken(15441, 'lMj48alK7WFNGCaVKvQmAz');
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }
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

  useEffect(() => {
    // Add any initialization logic or side effects here
    onFetchUpdateAsync();
  }, []);

  return (
    <Provider store={store}>
      <AuthenticatedUserProvider>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </AuthenticatedUserProvider>
    </Provider>
  );
}

export default App;
