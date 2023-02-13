import {configureStore} from '@reduxjs/toolkit';
import timerSettingsSlice, {
  TimerSettingsState,
} from '../features/timerSettingsSlice';

export type RootState = {
  timer: TimerSettingsState;
};

const store = configureStore({
  reducer: {
    timer: timerSettingsSlice,
  },
});
export default store;
