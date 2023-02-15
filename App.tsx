import React from 'react';
import {Provider} from 'react-redux';
import Navigation from './src/navigation/Index';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import store from './src/app/store';

function App() {
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
