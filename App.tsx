import React, {useEffect} from 'react';
import dayjs from 'dayjs';
import Navigation from './src/navigation/Index';

function App(): JSX.Element {
  useEffect(() => {
    dayjs.locale('pl');
  }, []);

  return <Navigation />;
}

export default App;
