import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import BaseTheme from '../../theme/base';

const Separator = (props, context) => {
  const { width, color, spacingHorizontal, spacingVertical } = context.mergeStyle('Separator', props);
  return (
    <View style={{ height: width, backgroundColor: color, marginHorizontal: spacingHorizontal, marginTop: spacingVertical }} />
  );
};

Separator.Vertical = () => {
  return (
    <View style={{ width: 1, backgroundColor: BaseTheme.palette.SEPARATOR }} />
  );
};

Separator.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Separator.propTypes = {
  spacingHorizontal: PropTypes.number,
  spacingVertical: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string
};

Separator.defaultProps = {
  ...BaseTheme.Separator
};

Separator.demoProps = [{
  spacing: 16,
  width: 5,
  color: BaseTheme.palette.APP_PRIMARY
}, {
  width: 2,
  spacingVertical: 10,
  color: BaseTheme.palette.APP_DANGER
}];

export default Separator;
