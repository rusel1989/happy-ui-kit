import React from 'react';
import { RefreshControl } from 'react-native';
import { colors } from '@happy/components/theme';
import PropTypes from 'prop-types';

export const renderRefreshControl = ({ refreshing, onRefresh }) => {
  return (
    <RefreshControl
      colors={[colors.APP_PRIMARY]}
      tintColor={colors.APP_PRIMARY}
      refreshing={refreshing}
      onRefresh={onRefresh} />
  );
};

export default ({ refreshing, onRefresh }) => {
  return (
    <RefreshControl
      colors={[colors.PINK]}
      tintColor={colors.PINK}
      refreshing={refreshing}
      onRefresh={onRefresh} />
  );
};
