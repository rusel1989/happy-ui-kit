/* eslint-disable */
import React from 'react';
import Text from './index';
import BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 80,
  containerType: 'column',
  components: [{
    Component: Text.Custom,
    items: [{
      label: 'Default',
      props: { children: 'Default Text' }
    }]
  }]
};

export default demo;
