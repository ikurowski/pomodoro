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
import {
  updateSettings,
  updateTime,
  updateRepeats,
} from '../features/timerSettingsSlice';
import {getAsyncData} from '../stores/RNAsyncStorage';

//types
import {IntervalType, TimerRootState, STORAGE_KEY} from '../types/types';
import {updateTasks} from '../features/tasksSlice';

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

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const [
          pomodoroTimeInMS,
          shortBreakTimeInMS,
          longBreakTimeInMS,
          sound,
          vibration,
          repeats,
          breaks,
          tasks,
        ] = await Promise.all([
          getAsyncData(STORAGE_KEY.FOCUS_TIME),
          getAsyncData(STORAGE_KEY.SHORT_BREAK_TIME),
          getAsyncData(STORAGE_KEY.LONG_BREAK_TIME),
          getAsyncData(STORAGE_KEY.SOUND),
          getAsyncData(STORAGE_KEY.VIBRATION),
          getAsyncData(STORAGE_KEY.REPEATS),
          getAsyncData(STORAGE_KEY.BREAKS),
          getAsyncData(STORAGE_KEY.TASKS),
        ]);

        const updateTimeDispatch = (
          type: IntervalType,
          wheelPickerTime: number,
        ) => {
          dispatch(updateTime({type, wheelPickerTime}));
        };

        if (pomodoroTimeInMS !== null) {
          updateTimeDispatch('pomodoroTimeInMS', pomodoroTimeInMS);
        }
        if (shortBreakTimeInMS !== null) {
          updateTimeDispatch('shortBreakTimeInMS', shortBreakTimeInMS);
        }
        if (longBreakTimeInMS !== null) {
          updateTimeDispatch('longBreakTimeInMS', longBreakTimeInMS);
        }
        if (repeats !== null) {
          dispatch(updateRepeats({repeats: repeats}));
        }
        if (sound !== null) {
          dispatch(updateSettings({property: 'sound', value: sound}));
        }
        if (vibration !== null) {
          dispatch(updateSettings({property: 'vibration', value: vibration}));
        }
        if (breaks !== null) {
          dispatch(updateSettings({property: 'breaks', value: breaks}));
        }
        if (tasks !== null) {
          dispatch(updateTasks(tasks));
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
