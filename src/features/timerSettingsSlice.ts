import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IntervalType, TimerSettingsState} from '../types/types';

export const initialState: TimerSettingsState = {
  timers: {
    pomodoroTimeInMS: 10000, // 25 minutes //FIXME: change to 25 minutes
    shortBreakTimeInMS: 300_000, // 5 minutes
    longBreakTimeInMS: 900_000, // 15 minutes
  },
  currentTimerType: 'pomodoroTimeInMS',
};

const timerSettingsSlice = createSlice({
  name: 'timerSettings',
  initialState,
  reducers: {
    updateTime: (
      state,
      action: PayloadAction<{
        type: IntervalType;
        amount: number;
      }>,
    ) => {
      const {type, amount} = action.payload;

      const currentValue = state.timers[type];
      // sets timer minimum of 1 minute and a maximum of 2 hours
      const newValue = Math.min(
        Math.max(currentValue + amount, 60_000),
        7_200_000,
      );
      state.timers[type] = newValue;
    },
    updateTimerType: (state, action: PayloadAction<{type: IntervalType}>) => {
      const {type} = action.payload;
      state.currentTimerType = type;
    },
  },
});

export const {updateTime, updateTimerType} = timerSettingsSlice.actions;

export default timerSettingsSlice.reducer;
