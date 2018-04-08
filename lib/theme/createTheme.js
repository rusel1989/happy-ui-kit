import merge from 'lodash/merge';
import { palette, spacing } from './base';
import getComponentsTheme from './components';

const createTheme = (theme = {}) => {
  const themedComponents = getComponentsTheme(theme.palette, theme.spacing);
  const t = merge({}, { palette, spacing, ...themedComponents }, theme);
  return t;
};

export default createTheme;
