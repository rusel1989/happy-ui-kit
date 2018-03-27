import React from 'react';
import { ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';

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

PullToRefreshView.propTypes = {
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  children: PropTypes.node,
  getRef: PropTypes.func,
  scrollEnabled: PropTypes.bool,
  style: PropTypes.object
};

PullToRefreshView.defaultProps = {
  onRefresh: () => {},
  refreshing: false,
  getRef: () => {},
  scrollEnabled: true
};

PullToRefreshView.demoProps = {
  onRefresh: () => console.log('on refresh'),
  children: <Text>Pull to refresh</Text>,
  style: { height: 200 }
};

export default PullToRefreshView;
