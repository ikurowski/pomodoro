import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {LogBox} from 'react-native';
import {RootStackParamList} from '../types/navigation';

//components
import Timer from '../screens/timer/Index';
import Settings from '../screens/settings/Index';
import Tasks from '../screens/tasks/Index';
import useTheme from '../hooks/useTheme/useTheme';
import TabBar from './TabBar';

//storages
import {useSelector} from 'react-redux';

//types
import {TimerRootState} from '../types/types';

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

LogBox.ignoreLogs([
  // FIXME warning "Sending onAnimatedValueUpdate with no listeners registered" - library issue, low priority  https://github.com/react-navigation/react-navigation/issues/7839
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

function Navigation() {
  const {navigation: navigationTheme} = useTheme();
  const insets = useSafeAreaInsets();
  const {isRunning, isPaused} = useSelector(
    (reduxState: TimerRootState) => reduxState.timer,
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        initialRouteName="Timer"
        screenOptions={{
          swipeEnabled: isRunning ? false : !isPaused,
        }}
        sceneContainerStyle={{
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
        tabBarPosition="bottom"
        tabBar={props => (
          <TabBar isRunning={isRunning} isPaused={isPaused} {...props} />
        )}>
        <Tab.Screen name="Tasks" component={Tasks} options={{title: 'Tasks'}} />
        <Tab.Screen name="Timer" component={Timer} options={{title: 'Timer'}} />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{title: 'Settings'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
