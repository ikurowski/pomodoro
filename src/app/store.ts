import {configureStore} from '@reduxjs/toolkit';
import timerSettingsSlice from '../features/timerSettingsSlice';

const store = configureStore({
  reducer: {
    timer: timerSettingsSlice,
  },
});
export default store;
