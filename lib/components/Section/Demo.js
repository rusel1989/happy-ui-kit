
import React from 'react';
import Section from './index';
import * as BaseTheme from '../../theme/base';
import Text from '../Text';

const demo = {
  containerHeight: 220,
  containerType: 'column',
  components: [{
    Component: Section,
    items: [{
      label: 'Default',
      props: {
        title: 'Section title',
        children: <Text>Section content</Text>
      }
    }, {
      label: 'Custom Section',
      props: {
        title: 'Custom section',
        headerUppercase: false,
        headerHeight: 40,
        headerTextSize: 18,
        headerTextColor: BaseTheme.palette.WHITE,
        headerBackgroundColor: BaseTheme.palette.APP_PRIMARY_DARKER,
        children: <Text>Section content</Text>
      }
    }]
  }]
};

export default demo;
