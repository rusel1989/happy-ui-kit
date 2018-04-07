
import React from 'react';
import Card from './index';
import Text from '../Text';

const demo = {
  containerHeight: 180,
  containerType: 'column',
  components: [{
    Component: Card,
    items: [{
      label: 'Default',
      props: {
        children: <Text>Card content</Text>
      }
    }, {
      label: 'Custom Card',
      props: {
        borderRadius: 10,
        shadow: false,
        children: <Text>Custom card content</Text>
      }
    }]
  }]
};

export default demo;
