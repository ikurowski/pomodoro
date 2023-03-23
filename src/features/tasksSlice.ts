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
          state.otherTasks.push({...state.currentTask, currentTask: false});
        }
        state.currentTask = action.payload;
      } else {
        state.otherTasks.push(action.payload);
      }
    },
    removeTask: (state, action: PayloadAction<ITask>) => {
      const taskToRemove = action.payload;
      if (taskToRemove.currentTask) {
        state.currentTask = null;
      } else if (taskToRemove.id) {
        state.otherTasks = state.otherTasks.filter(
          task => task.id !== taskToRemove.id,
        );
      }
    },
    updateTasks: (state, action: PayloadAction<ITasks>) => {
      state.currentTask = action.payload.currentTask;
      state.otherTasks = action.payload.otherTasks;
    },
  },
});

export const {addTask, removeTask, updateTasks} = tasksSlice.actions;

export default tasksSlice.reducer;
