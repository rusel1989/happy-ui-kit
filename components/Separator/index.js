import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';

const Separator = ({ spacing, spacingVertical, width, color }) => {
  return (
    <View style={{ height: width, backgroundColor: color, marginHorizontal: spacing, marginTop: spacingVertical }} />
  );
};

Separator.Vertical = () => {
  return (
    <View style={{ width: 1, backgroundColor: colors.SEPARATOR }} />
  );
};

Separator.propTypes = {
  spacing: PropTypes.number,
  spacingVertical: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string
};

Separator.defaultProps = {
  spacing: 0,
  spacingVertical: 0,
  width: 1,
  color: colors.SEPARATOR
};

Separator.demoProps = {
  spacing: 16,
  width: 5,
  color: colors.APP_PRIMARY
};

export default Separator;
