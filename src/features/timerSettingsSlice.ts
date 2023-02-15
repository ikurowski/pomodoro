import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TimerSettingsState, UpdateTimeAction} from '../types/types';

export const initialState: TimerSettingsState = {
  pomodoroTimeInMS: 150_0000, // 25 minutes
  shortBreakTimeInMS: 300_000, // 5 minutes
  longBreakTimeInMS: 900_000, // 15 minutes
};

const timerSettingsSlice = createSlice({
  name: 'timerSettings',
  initialState,
  reducers: {
    updateTime: (state, action: PayloadAction<UpdateTimeAction['payload']>) => {
      const {type, amount} = action.payload;
      const currentValue = state[type];
      // sets timer minimum of 1 minute and a maximum of 2 hours
      const newValue = Math.min(
        Math.max(currentValue + amount, 60000),
        7_200_000,
      );
      state[type] = newValue;
    },
  },
});

export const {updateTime} = timerSettingsSlice.actions;

export default timerSettingsSlice.reducer;
