import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IntervalType,
  TimerSettingsState,
  UpdateSettingsType,
} from '../types/types';

const initialState: TimerSettingsState = {
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
  schedule: [
    'pomodoroTimeInMS',
    'shortBreakTimeInMS',
    'pomodoroTimeInMS',
    'shortBreakTimeInMS',
    'pomodoroTimeInMS',
    'shortBreakTimeInMS',
    'pomodoroTimeInMS',
    'longBreakTimeInMS',
  ],
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
    updateTimerType: (state, action: PayloadAction<IntervalType>) => {
      state.currentTimerType = action.payload;
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
    updateRepeats: (state, action: PayloadAction<number>) => {
      state.repeats = action.payload;
    },
    updateSchedule: (state, action: PayloadAction<IntervalType[]>) => {
      state.schedule = action.payload;
    },
    removeFirstSchedule: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        if (state.schedule[0] !== 'pomodoroTimeInMS') {
          // if first item is not pomodoro then remove 3 items
          state.schedule = state.schedule.slice(3);
        } else {
          state.schedule = state.schedule.slice(2);
        }
      } else {
        state.schedule = state.schedule.slice(1);
      }
    },
  },
});

export const {
  updateTime,
  updateTimerType,
  updateSettings,
  updateRepeats,
  updateSchedule,
  removeFirstSchedule,
} = timerSettingsSlice.actions;

export default timerSettingsSlice.reducer;
