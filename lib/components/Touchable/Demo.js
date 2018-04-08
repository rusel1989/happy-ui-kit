
/* eslint-disable */
import React from 'react';
import Touchable from './index';
import Text from '../Text'
import * as BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 80,
  containerType: 'column',
  components: [{
    Component: Touchable,
    items: [{
      label: 'Default',
      props: {
        children: <Text style={{ padding: 16 }}>Touch Me !</Text>
      }
    }]
  }]
};

export default demo;
