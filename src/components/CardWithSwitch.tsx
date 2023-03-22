import React from 'react';
import {Switch} from 'react-native';

// components
import NunitoMedium from './fonts/NunitoMedium';
import TextContainer from './TextContainer';

// styles
import useTheme from '../hooks/useTheme/useTheme';
import {colors as colorsSheet} from '../styles/styles';

//types
import {CardWithSwitchProps} from '../types/types';

function CardWithSwitch(props: CardWithSwitchProps) {
  const {
    navigation: {colors},
  } = useTheme();

  const {title, titleColor = colors.card, isEnabled, toggleSwitch} = props;

  return (
    <TextContainer>
      <NunitoMedium color={titleColor} size={16}>
        {title}
      </NunitoMedium>
      <Switch
        onValueChange={toggleSwitch}
        value={isEnabled}
        trackColor={{true: colors.primary}}
        ios_backgroundColor={colorsSheet.lightestGrey}
      />
    </TextContainer>
  );
}

export default CardWithSwitch;
