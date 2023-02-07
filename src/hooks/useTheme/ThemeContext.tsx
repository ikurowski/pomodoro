import {createContext} from 'react';
import type {Theme} from '../../types/types';
import {theme} from '../../styles/styles';

const ThemeContext = createContext<Theme>(theme);

ThemeContext.displayName = 'ThemeContext';

export default ThemeContext;
