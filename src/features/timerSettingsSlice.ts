import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IntervalType,
  TimerSettingsState,
  UpdateSettingsType,
} from '../types/types';

export const initialState: TimerSettingsState = {
  timers: {
    pomodoroTimeInMS: 1_500_000, // 25 minutes
    shortBreakTimeInMS: 300_000, // 5 minutes
    longBreakTimeInMS: 900_000, // 15 minutes
  },
  repeats: 4,
  currentTimerType: 'pomodoroTimeInMS',
  vibration: false,
  sound: false,
  isRunning: false,
  isPaused: false,
  breaks: false,
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
        property: UpdateSettingsType;
        value: boolean;
      }>,
    ) => {
      const {property, value} = action.payload;
      state[property] = value;
    },
    updateRepeats: (state, action: PayloadAction<{repeats: number}>) => {
      const {repeats} = action.payload;
      state.repeats = repeats;
    },
  },
});

export const {updateTime, updateTimerType, updateSettings, updateRepeats} =
  timerSettingsSlice.actions;

export default timerSettingsSlice.reducer;
