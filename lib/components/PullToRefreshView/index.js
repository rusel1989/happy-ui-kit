import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import ExtraPropTypes from 'react-extra-prop-types'

import { renderRefreshControl } from '../../utils';

const PullToRefreshView = ({ onRefresh, refreshing, children, getRef, scrollEnabled, style, ...rest }) => {
  return (
    <ScrollView
      refreshControl={renderRefreshControl({ onRefresh, refreshing })}
      style={[ { backgroundColor: 'white', flex: 1 }, style ]}
      removeClippedSubviews={false}
      scrollEnabled={scrollEnabled}
      ref={getRef}>
      {children}
    </ScrollView>
  );
};

PullToRefreshView.displayName = 'PullToRefreshView';

PullToRefreshView.contextTypes = {
  theme: PropTypes.object
};

PullToRefreshView.propTypes = {
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  children: PropTypes.node,
  getRef: PropTypes.func,
  scrollEnabled: PropTypes.bool,
  style: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ])
};

PullToRefreshView.defaultProps = {
  onRefresh: () => {},
  refreshing: false,
  getRef: () => {},
  scrollEnabled: true
};

export default PullToRefreshView;
