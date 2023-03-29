import {Alert} from 'react-native';

const taskCompletedAlert = (navigation: any) =>
  Alert.alert(
    //TODO proper alert component
    'Task completed',
    'You have completed all the repeats of this task',
    [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('Tasks');
        },
      },
    ],
  );

export default taskCompletedAlert;
