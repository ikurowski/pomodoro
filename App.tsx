import React, {useEffect} from 'react';
import dayjs from 'dayjs';
import Navigation from './src/navigation/Index';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

function App() {
  useEffect(() => {
    dayjs.locale('pl');
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
