import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITask, ITasks} from '../types/types';

const initialState: ITasks = {
  currentTask: null,
  otherTasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      if (action.payload.currentTask) {
        if (state.currentTask !== null) {
          state.otherTasks.push(state.currentTask);
        }
        state.currentTask = action.payload;
      } else {
        state.otherTasks.push(action.payload);
      }
    },
    removeTask: (state, action: PayloadAction<ITask>) => {
      if (action.payload.currentTask) {
        state.currentTask = null;
      } else {
        state.otherTasks = state.otherTasks.filter(
          task => task.name !== action.payload.name,
        );
      }
    },
  },
});

export const {addTask, removeTask} = tasksSlice.actions;

export default tasksSlice.reducer;