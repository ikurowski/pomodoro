import React from 'react';
import {useRef} from 'react';
import {Text, View} from 'react-native';

export const RenderCounter = ({message}: {message: string}) => {
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  return (
    <View>
      <Text>
        Renders: {renderCounter.current}, {message}
      </Text>
    </View>
  );
};
