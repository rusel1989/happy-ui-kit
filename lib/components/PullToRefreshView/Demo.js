
import React from 'react';
import PullToRefreshView from './index';
import { Text } from 'react-native';

const demo = {
  containerHeight: 240,
  containerType: 'row',
  componentContainerStyle: { flex: 1 },
  components: [{
    Component: PullToRefreshView,
    items: [{
      label: 'Default',
      props: {
        onRefresh: () => console.log('on refresh'),
        children: <Text>Pull to refresh</Text>,
        style: { height: 200 }
      }
    }]
  }]
};

export default demo;
