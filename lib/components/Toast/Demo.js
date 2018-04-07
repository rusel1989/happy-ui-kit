/* eslint-disable */
import React from 'react';
import Toast from './index';
import BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 80,
  containerType: 'column',
  components: [{
    Component: Toast,
    modal: true,
    renderAtBottom: true,
    items: [{
      label: 'Toast',
      props: { }
    }],
    methods: [{
      name: 'show',
      label: 'Show Toast',
      args: [{
        position: 0,
        children: 'Message toasted'
      }]
    }]
  }]
};

export default demo;
