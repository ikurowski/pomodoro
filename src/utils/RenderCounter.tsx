import React from 'react';
import {useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const RenderCounter = ({message}: {message: string}) => {
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  return (
    <View style={styles.container}>
      <Text>
        Renders: {renderCounter.current}, {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
