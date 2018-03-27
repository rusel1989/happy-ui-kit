import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { renderRefreshControl } from '../RefreshControl';

const PullToRefreshView = ({ onRefresh, refreshing, children, getRef, scrollEnabled, ...rest }) => {
  return (
    <ScrollView
      refreshControl={renderRefreshControl({ onRefresh, refreshing })}
      style={{ backgroundColor: 'white', flex: 1 }}
      removeClippedSubviews={false}
      scrollEnabled={scrollEnabled}
      ref={getRef}>
      {children}
    </ScrollView>
  );
};

PullToRefreshView.propTypes = {

};

export default PullToRefreshView;
