import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IntervalType, ITask, ITasks} from '../types/types';

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
    updateCurrentTaskSchedule: (
      state,
      action: PayloadAction<IntervalType[]>,
    ) => {
      if (state.currentTask) {
        state.currentTask.taskSchedule = action.payload;
      }
    },
    updatePomodorosToBeFilled: (state, action: PayloadAction<number>) => {
      if (state.currentTask) {
        state.currentTask.pomodorosToBeFilled = action.payload;
      }
    },
    editTask: (state, action: PayloadAction<ITask>) => {
      const editedTask = action.payload;
      const editedTaskIsInOtherTasks = state.otherTasks.some(
        task => task.id === editedTask.id,
      );
      const markedAsCurrentTask = editedTask.currentTask;
      const editedTaskIsCurrentTask = state.currentTask?.id === editedTask.id;

      if (markedAsCurrentTask && editedTaskIsCurrentTask) {
        // If the edited task is marked as the current task and it's already the current task, update it
        state.currentTask = editedTask;
      } else if (markedAsCurrentTask && !editedTaskIsCurrentTask) {
        // If the edited task is marked as the current task but it's not the current task,
        // set it as the current task and move the previous current task to the otherTasks array
        if (state.currentTask) {
          state.otherTasks.push({...state.currentTask, currentTask: false});
        }
        state.currentTask = editedTask;
        if (editedTaskIsInOtherTasks) {
          state.otherTasks = state.otherTasks.filter(
            task => task.id !== editedTask.id,
          );
        }
      } else if (!markedAsCurrentTask && !editedTaskIsCurrentTask) {
        // If the edited task is not marked as the current task, update it in the otherTasks array
        const taskIndex = state.otherTasks.findIndex(
          task => task.id === editedTask.id,
        );
        state.otherTasks[taskIndex] = editedTask;
      } else if (!markedAsCurrentTask && editedTaskIsCurrentTask) {
        // If the edited task is not marked as the current task but it was the current task,
        // remove the current task and move the edited task to the otherTasks array
        state.currentTask = null;
        state.otherTasks.push(editedTask);
      }
    },
  },
});

export const {
  addTask,
  removeTask,
  updateTasks,
  updateCurrentTaskSchedule,
  updatePomodorosToBeFilled,
  editTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
