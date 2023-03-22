import {configureStore} from '@reduxjs/toolkit';
import tasksSlice from '../features/tasksSlice';
import timerSettingsSlice from '../features/timerSettingsSlice';

const store = configureStore({
  reducer: {
    timer: timerSettingsSlice,
    tasks: tasksSlice,
  },
});
export default store;
