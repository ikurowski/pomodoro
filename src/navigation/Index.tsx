import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

//components
import Timer from '../screens/timer/Index';
import Settings from '../screens/settings/Index';
import SettingsButton from '../components/buttons/SettingsButton';
import XButton from '../components/buttons/XButton';
import useTheme from '../hooks/useTheme/useTheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  const {navigation: navigationTheme} = useTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Timer"
        screenOptions={{
          headerShadowVisible: false,
          headerBackVisible: false,
          title: '',
          animation: 'slide_from_bottom',
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
  );
}

export default Navigation;
