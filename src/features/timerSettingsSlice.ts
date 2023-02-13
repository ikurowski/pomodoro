import {createSlice} from '@reduxjs/toolkit';

export interface TimerSettingsState {
  pomodoroTimeInMS: number;
  shortBreakTimeInMS: number;
  longBreakTimeInMS: number;
}

const initialState: TimerSettingsState = {
  pomodoroTimeInMS: 1500000,
  shortBreakTimeInMS: 300000,
  longBreakTimeInMS: 900000,
};

const timerSettingsSlice = createSlice({
  name: 'timerSettings',
  initialState,
  reducers: {
    increasePomodoroTime: state => {
      state.pomodoroTimeInMS += 60000;
    },
    decreasePomodoroTime: state => {
      state.pomodoroTimeInMS -= 60000;
    },
    increaseShortBreakTime: state => {
      state.shortBreakTimeInMS += 60000;
    },
    decreaseShortBreakTime: state => {
      state.shortBreakTimeInMS -= 60000;
    },
    increaseLongBreakTime: state => {
      state.longBreakTimeInMS += 60000;
    },
    decreaseLongBreakTime: state => {
      state.longBreakTimeInMS -= 60000;
    },
  },
});

export const {
  increasePomodoroTime,
  decreasePomodoroTime,
  increaseShortBreakTime,
  decreaseShortBreakTime,
  increaseLongBreakTime,
  decreaseLongBreakTime,
} = timerSettingsSlice.actions;

export default timerSettingsSlice.reducer;
