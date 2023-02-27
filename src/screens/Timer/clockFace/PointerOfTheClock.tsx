import React from 'react';

import {CircularProgress} from './CircularProgress';

const PointerOfTheClock = ({
  isRunning,
  timer,
  radius,
}: {
  isRunning: boolean;
  timer: number;
  radius: number;
}) => {
  return (
    <CircularProgress
      isRunning={isRunning}
      timer={timer}
      radius={radius}
      backgroundColor="#F7FAF3"
    />
  );
};

export default PointerOfTheClock;
