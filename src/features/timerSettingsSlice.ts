import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IntervalType, TimerSettingsState} from '../types/types';

export const initialState: TimerSettingsState = {
  timers: {
    pomodoroTimeInMS: 5_000, // 25 minutes //FIXME: change to 25 minutes
    shortBreakTimeInMS: 7_000, // 5 minutes
    longBreakTimeInMS: 5_000, // 15 minutes
  },
  currentTimerType: 'pomodoroTimeInMS',
  isRunning: false,
};

const timerSettingsSlice = createSlice({
  name: 'timerSettings',
  initialState,
  reducers: {
    updateTime: (
      state,
      action: PayloadAction<{
        type: IntervalType;
        wheelPickerTime: number;
      }>,
    ) => {
      const {type, wheelPickerTime} = action.payload;

      state.timers[type] = wheelPickerTime;
    },
    updateTimerType: (state, action: PayloadAction<{type: IntervalType}>) => {
      const {type} = action.payload;
      state.currentTimerType = type;
    },
    updateIsRunning: (state, action: PayloadAction<{isRunning: boolean}>) => {
      const {isRunning} = action.payload;
      state.isRunning = isRunning;
    },
  },
});

export const {updateTime, updateTimerType, updateIsRunning} =
  timerSettingsSlice.actions;

export default timerSettingsSlice.reducer;
