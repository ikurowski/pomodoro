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
}

export type RootState = {
  timer: TimerSettingsState;
};

export interface CardWithSwitchProps {
  title: string;
  isEnabled: boolean;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
}

export type ToggleTimerButtonProps = {
  toggleTimer: () => void;
  isRunning: boolean;
};

export type CircularProgressProps = {
  radius: number;
  backgroundColor: string;
  timer: number;
};

export type UpdateSettingsType =
  | 'vibration'
  | 'sound'
  | 'isRunning'
  | 'isPaused';

export interface UseAnimatedProps {
  strokeDashoffset: number;
  opacity: number;
}

export interface CardProps {
  title: string;
  time: number;
  millisecondsFormat?: boolean;
  openCard: string | false;
  storageKey: STORAGE_KEY;
  cardEnd: string;
  wheelPickOptions: string[];
  setOpenCard: (title: string | false) => void;
  updateNumberFunction: (wheelPickerNumber: number) => void;
}
