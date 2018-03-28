/* eslint-disable */
import React from 'react';
import WheelPicker from './index';
import BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 150,
  containerType: 'column',
  components: [{
    Component: WheelPicker,
    items: [{
      label: 'Default',
      props: {
        value: { numbers: '30', strings: 'c' },
        height: 120,
        wheelSpacing: 20,
        backgroundColor: 'transparent',
        wheels: [{ id: 'numbers', values: ['10', '20', '30', '40', '50'] }, { id: 'strings', values: ['a', 'b', 'c', 'd', 'e'] }]
      }
    }]
  }]
};

export default demo;
