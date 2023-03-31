import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {updateTasks} from '../features/tasksSlice';
import {
  updateRepeats,
  updateSchedule,
  updateSettings,
  updateTime,
} from '../features/timerSettingsSlice';
import {getMultipleAsyncData} from '../storage/RNAsyncStorage';
import {IntervalType, STORAGE_KEY} from '../types/types';

const useFetchAsyncData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const keys = [
          STORAGE_KEY.FOCUS_TIME,
          STORAGE_KEY.SHORT_BREAK_TIME,
          STORAGE_KEY.LONG_BREAK_TIME,
          STORAGE_KEY.SOUND,
          STORAGE_KEY.VIBRATION,
          STORAGE_KEY.REPEATS,
          STORAGE_KEY.BREAKS,
          STORAGE_KEY.TASKS,
          STORAGE_KEY.SCHEDULE,
        ];
        const [
          pomodoroTimeInMS,
          shortBreakTimeInMS,
          longBreakTimeInMS,
          sound,
          vibration,
          repeats,
          breaks,
          tasks,
          schedule,
        ] = await getMultipleAsyncData(keys);

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
          dispatch(updateRepeats(repeats));
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
        if (schedule !== null) {
          dispatch(updateSchedule(schedule));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [dispatch]);
};

export default useFetchAsyncData;
