import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IntervalType, TimerSettingsState} from '../types/types';

export const initialState: TimerSettingsState = {
  timers: {
    pomodoroTimeInMS: 1_500_000, // 25 minutes
    shortBreakTimeInMS: 300_000, // 5 minutes
    longBreakTimeInMS: 900_000, // 15 minutes
  },
  currentTimerType: 'pomodoroTimeInMS',
  vibration: true,
  sound: true,
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
    updateSettings: (
      state,
      action: PayloadAction<{
        property: 'vibration' | 'sound' | 'isRunning';
        value: boolean;
      }>,
    ) => {
      const {property, value} = action.payload;
      state[property] = value;
    },
  },
});

export const {updateTime, updateTimerType, updateSettings} =
  timerSettingsSlice.actions;

export default timerSettingsSlice.reducer;
