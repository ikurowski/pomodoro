import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import dayjs from 'dayjs';
import Navigation from './src/navigation/Index';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import store from './src/app/store';

function App() {
  useEffect(() => {
    dayjs.locale('pl');
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle={'light-content'} />
        <Navigation />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
