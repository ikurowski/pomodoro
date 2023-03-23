import React, {useEffect} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

//components
import TextContainer from '../../components/TextContainer';
import NunitoMedium from '../../components/fonts/NunitoMedium';
import Task from '../tasks/Task';

//types
import {ITask, TasksRootState} from '../../types/types';

//stores
import {removeTask} from '../../features/tasksSlice';
import Animated, {
  SlideInLeft,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {BottomTabsNavigationProp} from '../../types/navigation';

function ChooseTask({
  navigation,
  disableChooseTask,
}: {
  navigation: BottomTabsNavigationProp;
  disableChooseTask: boolean;
}) {
  const {currentTask} = useSelector((state: TasksRootState) => state.tasks);

  const dispatch = useDispatch();
  const opacity = useSharedValue(1);

  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (disableChooseTask) {
      opacity.value = withTiming(0.5);
    } else {
      opacity.value = withTiming(1);
    }
  }, [disableChooseTask, opacity]);

  const onXButtonPress = (task: ITask) => {
    dispatch(removeTask(task));
  };

  if (currentTask) {
    return (
      <View style={styles.taskContainer}>
        <Task
          name={currentTask.name}
          timeInMS={currentTask.pomodoroTimeInMs}
          repeatsDone={currentTask.repeatsDone}
          repeats={currentTask.repeats}
          onPress={() => onXButtonPress(currentTask)}
        />
      </View>
    );
  }

  const onPressChooseTask = () => {
    navigation.navigate('Tasks');
  };

  return (
    <Animated.View
      entering={SlideInLeft}
      exiting={SlideOutLeft}
      style={[styles.chooseTaskContainer, animatedOpacity]}>
      <Pressable disabled={disableChooseTask} onPress={onPressChooseTask}>
        <TextContainer moreStyles={styles.textContainerMoreStyles}>
          <NunitoMedium>Choose your task...</NunitoMedium>
        </TextContainer>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: moderateScale(16),
  },
  chooseTaskContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainerMoreStyles: {
    marginBottom: moderateScale(16),
    paddingHorizontal: moderateScale(32),
    paddingTop: moderateScale(12),
  },
});

export default ChooseTask;
