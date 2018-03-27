import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '@happy/components/theme';

const Separator = ({ spacing = 0, spacingVertical = 0 }) => {
  return (
    <View style={{ height: 1, backgroundColor: colors.LIGHT_GREY, marginHorizontal: spacing, marginTop: spacingVertical }} />
  );
};

Separator.Vertical = () => {
  return (
    <View style={{ width: 1, backgroundColor: colors.SEPARATOR }} />
  );
};

Separator.propTypes = {

};

export default Separator;
