/* eslint-disable */
import React from 'react';
import TextField from './index';
import BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 80,
  containerType: 'column',
  components: [{
    Component: TextField,
    items: [{
      label: 'Default',
      props: {
        placeholder: 'Text field'
      }
    }]
  }]
};

export default demo;
