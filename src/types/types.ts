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

export type ToggleTimerButtonProps = {
  toggleTimer: () => void;
  isRunning: boolean;
};

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

export type CircularProgressProps = {
  radius: number;
  backgroundColor: string;
  timer: number;
};

export interface UseAnimatedProps {
  strokeDashoffset: number;
  opacity: number;
}
