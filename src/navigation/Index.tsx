import React, {useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {updateSettings, updateTime} from '../features/timerSettingsSlice';
import {getAsyncData, STORAGE_KEY} from '../stores/RNAsyncStorage';

//types
import {RootState} from '../types/types';

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

LogBox.ignoreLogs([
  // FIXME warning "Sending onAnimatedValueUpdate with no listeners registered" - library issue, low priority  https://github.com/react-navigation/react-navigation/issues/7839
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

function Navigation() {
  const {navigation: navigationTheme} = useTheme();
  const insets = useSafeAreaInsets();
  const {isRunning} = useSelector((reduxState: RootState) => reduxState.timer);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const pomodoroTimeInMS = await getAsyncData(STORAGE_KEY.FOCUS_TIME);
        const shortBreakTimeInMS = await getAsyncData(
          STORAGE_KEY.SHORT_BREAK_TIME,
        );
        const longBreakTimeInMS = await getAsyncData(
          STORAGE_KEY.LONG_BREAK_TIME,
        );
        const sound = await getAsyncData(STORAGE_KEY.SOUND);
        const vibration = await getAsyncData(STORAGE_KEY.VIBRATION);
        if (pomodoroTimeInMS) {
          dispatch(
            updateTime({
              type: 'pomodoroTimeInMS',
              wheelPickerTime: pomodoroTimeInMS,
            }),
          );
        }
        if (shortBreakTimeInMS) {
          dispatch(
            updateTime({
              type: 'shortBreakTimeInMS',
              wheelPickerTime: shortBreakTimeInMS,
            }),
          );
        }
        if (longBreakTimeInMS) {
          dispatch(
            updateTime({
              type: 'longBreakTimeInMS',
              wheelPickerTime: longBreakTimeInMS,
            }),
          );
        }
        if (sound) {
          dispatch(updateSettings({property: 'sound', value: sound}));
        }
        if (vibration) {
          dispatch(updateSettings({property: 'vibration', value: vibration}));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [dispatch]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        initialRouteName="Timer"
        screenOptions={{
          swipeEnabled: !isRunning,
        }}
        sceneContainerStyle={{
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
        tabBarPosition="bottom"
        tabBar={props => <TabBar isRunning={isRunning} {...props} />}>
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
