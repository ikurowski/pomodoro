import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

//components
import NunitoSemiBold from '../../components/fonts/NunitoSemiBold';
import Task from './Task';

//types
import {TaskListProps} from '../../types/types';

function TasksList({currentTask, otherTasks, onXButtonPress}: TaskListProps) {
  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      {currentTask && (
        <>
          <NunitoSemiBold size={20}>Current Task</NunitoSemiBold>
          <Task
            name={currentTask.name}
            timeInMS={currentTask.pomodoroTimeInMs}
            repeatsDone={currentTask.repeatsDone}
            repeats={currentTask.repeats}
            onPress={() => onXButtonPress(currentTask)}
          />
        </>
      )}
      {otherTasks.length > 0 && (
        <>
          <NunitoSemiBold size={20}>Other Tasks</NunitoSemiBold>
          {otherTasks.map(task => {
            return (
              <Task
                key={task.id}
                name={task.name}
                timeInMS={task.pomodoroTimeInMs}
                repeatsDone={task.repeatsDone}
                repeats={task.repeats}
                onPress={() => onXButtonPress(task)}
              />
            );
          })}
        </>
      )}
      {otherTasks.length === 0 && currentTask === null && (
        <View style={styles.emptyListContainer}>
          <NunitoSemiBold size={20}>No tasks yet</NunitoSemiBold>
        </View>
      )}
    </ScrollView>
  );
}

export default TasksList;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(100),
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
