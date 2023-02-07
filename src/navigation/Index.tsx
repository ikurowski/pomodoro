import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

//components
import Timer from '../screens/Timer';
import Settings from '../screens/Settings';
import SettingsButton from '../components/SettingsButton';
import {navigationTheme} from '../styles/styles';
import XButton from '../components/XButton';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Index: React.FC = (): JSX.Element | null => {
  // testing render count
  // const headerButton = (navigation: any) => (
  //   <SettingsButton navigation={navigation} />
  // );

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme.primary}>
        <Stack.Navigator
          initialRouteName="Timer"
          screenOptions={{
            headerShadowVisible: false,
            headerBackVisible: false,
            title: '',
            animation: 'slide_from_bottom',
            // gestureEnabled: false, // FIXME
          }}>
          <Stack.Screen
            name="Timer"
            component={Timer}
            options={({navigation}) => ({
              headerRight: () => <SettingsButton navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={({navigation}) => ({
              title: 'Settings',
              headerRight: () => <XButton navigation={navigation} />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Index;
