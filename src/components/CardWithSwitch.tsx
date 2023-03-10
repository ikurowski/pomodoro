import React, {useState} from 'react';
import {Switch} from 'react-native';

//components
import NunitoMedium from './fonts/NunitoMedium';

//styles
import useTheme from '../hooks/useTheme/useTheme';
import {colors as colorsSheet} from '../styles/styles';
import TextContainer from './TextContainer';

function CardWithSwitch({title}: {title: string}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const {
    navigation: {colors},
  } = useTheme();

  return (
    <TextContainer>
      <NunitoMedium color={colors.card} size={16}>
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
