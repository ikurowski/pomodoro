import React from 'react';
import {StyleSheet, View} from 'react-native';

//components
import PoppinsRegular from '../../components/fonts/PoppinsRegular';

//styles
import {theme} from '../../styles/styles';

function Mark({markFilled}: {markFilled: boolean}) {
  return (
    <PoppinsRegular
      size={30}
      color={markFilled ? theme.textColor.primary : '#ffffff44'}
      style={styles.mark}>
      .
    </PoppinsRegular>
  );
}

function ScheduleMarks({
  numberOfMarks = 4,
  marksToBeFilled,
}: {
  numberOfMarks?: number;
  marksToBeFilled: number;
}) {
  const marks = [];

  for (let i = 0; i < numberOfMarks; i++) {
    if (i < marksToBeFilled) {
      marks.unshift(<Mark markFilled={false} key={i} />);
    } else {
      marks.unshift(<Mark markFilled={true} key={i} />);
    }
  }
  return <View style={styles.container}>{marks}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mark: {
    marginHorizontal: 2,
  },
});

export default ScheduleMarks;