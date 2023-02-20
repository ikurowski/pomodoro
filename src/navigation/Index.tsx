import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

//components
import Timer from '../screens/timer/Index';
import Settings from '../screens/settings/Index';
import Tasks from '../screens/tasks/Index';
import useTheme from '../hooks/useTheme/useTheme';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator<RootStackParamList>();

function Navigation() {
  const {navigation: navigationTheme} = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        initialRouteName="Timer"
        sceneContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
        tabBar={props => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="Tasks" component={Tasks} />
        <Tab.Screen name="Timer" component={Timer} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
