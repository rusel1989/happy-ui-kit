import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types';

import * as BaseTheme from '../../theme/base';

const Separator = ({ style, ...props }, context) => {
  const { width, color, spacingHorizontal, spacingVertical } = context.mergeStyle('Separator', props);
  return (
    <View style={{ height: width, backgroundColor: color, marginHorizontal: spacingHorizontal, marginTop: spacingVertical, ...style }} />
  );
};

Separator.Vertical = () => {
  return (
    <View style={{ width: 1, backgroundColor: BaseTheme.palette.SEPARATOR }} />
  );
};

Separator.displayName = 'Separator';

Separator.contextTypes = {
  theme: PropTypes.object,
  mergeStyle: PropTypes.func
};

Separator.propTypes = {
  spacingHorizontal: PropTypes.number,
  spacingVertical: PropTypes.number,
  width: PropTypes.number,
  color: ExtraPropTypes.color
};

Separator.defaultProps = {
};

export default Separator;
