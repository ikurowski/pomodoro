import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {
  updateCurrentTaskSchedule,
  updatePomodorosToBeFilled,
} from '../features/tasksSlice';
import {
  updateSettings,
  updateSchedule,
  removeFirstSchedule,
  updateTimerType,
} from '../features/timerSettingsSlice';
import {IntervalType} from '../types/types';

export const useTimerDispatch = () => {
  const dispatch = useDispatch();
  const dispatchIsRunning = useCallback(
    (dispatchValue: boolean) => {
      dispatch(updateSettings({property: 'isRunning', value: dispatchValue}));
    },
    [dispatch],
  );
  const dispatchIsPaused = useCallback(
    (dispatchValue: boolean) => {
      dispatch(updateSettings({property: 'isPaused', value: dispatchValue}));
    },
    [dispatch],
  );
  const dispatchPomodorosToBeFilled = useCallback(
    (dispatchValue: number) => {
      dispatch(updatePomodorosToBeFilled(dispatchValue));
    },
    [dispatch],
  );
  const dispatchSchedule = useCallback(
    (dispatchValue: IntervalType[]) => {
      dispatch(updateSchedule({schedule: dispatchValue}));
    },
    [dispatch],
  );
  const dispatchRemoveFirstSchedule = useCallback(
    (dispatchValue: boolean) => {
      dispatch(removeFirstSchedule(dispatchValue));
    },
    [dispatch],
  );
  const dispatchUpdateCurrentTaskSchedule = useCallback(
    (dispatchValue: IntervalType[]) => {
      dispatch(updateCurrentTaskSchedule(dispatchValue));
    },
    [dispatch],
  );
  const dispatchUpdateTimerType = useCallback(
    (dispatchValue: IntervalType) => {
      dispatch(updateTimerType({type: dispatchValue}));
    },
    [dispatch],
  );

  return {
    dispatchIsRunning,
    dispatchIsPaused,
    dispatchPomodorosToBeFilled,
    dispatchSchedule,
    dispatchRemoveFirstSchedule,
    dispatchUpdateCurrentTaskSchedule,
    dispatchUpdateTimerType,
  };
};

export default useTimerDispatch;
