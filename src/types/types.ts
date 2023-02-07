export type Theme = {
  color: {
    primary: string;
    secondary: string;
    tetriary: string;
    quaternary: string;
    quinary: string;
  };
  backgroundColor: {
    primary: string;
  };
  textColor: {
    primary: string;
    secondary: string;
    tetriary: string;
    quaternary: string;
  };
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
