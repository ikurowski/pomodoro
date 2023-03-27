import {Dispatch, SetStateAction} from 'react';

export type Theme = {
  navigation: {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
    };
  };
  fontSize: {
    nine: number;
    thirtySix: number;
  };
};

export enum STORAGE_KEY {
  FOCUS_TIME = '@focus_time',
  SHORT_BREAK_TIME = '@short_break_time',
  LONG_BREAK_TIME = '@long_break_time',
  REPEATS = '@repeats',
  SOUND = '@sound',
  VIBRATION = '@vibration',
  BREAKS = '@breaks',
  TASKS = '@tasks',
}

export type IntervalType =
  | 'pomodoroTimeInMS'
  | 'shortBreakTimeInMS'
  | 'longBreakTimeInMS';

export interface TimerSettingsState {
  timers: {
    pomodoroTimeInMS: number;
    shortBreakTimeInMS: number;
    longBreakTimeInMS: number;
  };
  repeats: number;
  vibration: boolean;
  sound: boolean;
  currentTimerType: IntervalType;
  isRunning: boolean;
  isPaused: boolean;
  breaks: boolean;
}

export type TimerRootState = {
  timer: TimerSettingsState;
};

export interface CardWithSwitchProps {
  title: string;
  titleColor?: string;
  isEnabled: boolean;
  toggleSwitch: () => void;
}

export type ToggleTimerButtonProps = {
  toggleTimer: () => void;
  isRunning: boolean;
};

export type CircularProgressProps = {
  radius: number;
  backgroundColor: string;
  timer: number;
  pomodoroTimeInMS: number;
  shortBreakTimeInMS: number;
  longBreakTimeInMS: number;
};

export type UpdateSettingsType =
  | 'vibration'
  | 'sound'
  | 'isRunning'
  | 'isPaused'
  | 'breaks';

export interface NavIconsProps {
  label: string;
  isFocused: boolean;
  color: string;
  focusColor: string;
}

export interface UseAnimatedProps {
  strokeDashoffset: number;
  opacity: number;
}

export interface CardProps {
  title: string;
  titleColor?: string;
  time: number;
  millisecondsFormat?: boolean;
  openCard: string | false;
  storageKey?: STORAGE_KEY | false;
  cardEnd: string;
  wheelPickOptions: string[];
  setOpenCard: (title: string | false) => void;
  updateNumberFunction: (wheelPickerNumber: number) => void;
}

export interface ITasks {
  currentTask: ITask | null;
  otherTasks: ITask[];
}

export interface ITask {
  id: string;
  name: string;
  pomodoroTimeInMS: number;
  shortBreakTimeInMS: number;
  longBreakTimeInMS: number;
  repeats: number;
  repeatsDone: number;
  currentTask: boolean;
}

export interface TasksRootState {
  tasks: ITasks;
}

export interface TaskModalProps {
  title: string;
  visible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}
export interface TaskProps {
  name: string;
  timeInMS: number;
  repeatsDone: number;
  repeats: number;
  onPress: () => void;
}

export interface TaskListProps {
  currentTask: ITask | null;
  otherTasks: ITask[];
  onXButtonPress: (task: ITask) => void;
}

export interface TimerButtonProps {
  resetTimer: () => void;
  toggleTimer: () => void;
  isRunning: boolean;
  isPaused: boolean;
}
