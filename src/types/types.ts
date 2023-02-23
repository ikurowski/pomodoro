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
  currentTimerType: IntervalType;
}

export type RootState = {
  timer: TimerSettingsState;
};
