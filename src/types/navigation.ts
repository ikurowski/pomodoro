import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Timer: undefined;
  Settings: undefined;
  Tasks: undefined;
};

export type TimerScreenNavigation = NativeStackScreenProps<
  RootStackParamList,
  'Timer'
>;

export type SettingsScreenNavigation = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

export type TasksScreenNavigation = NativeStackScreenProps<
  RootStackParamList,
  'Tasks'
>;
