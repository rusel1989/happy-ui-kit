
import React from 'react';
import ParallaxView from './index';
import { View, Text } from 'react-native';
import * as BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 220,
  containerType: 'row',
  componentContainerStyle: { flex: 1 },
  components: [{
    Component: ParallaxView,
    items: [{
      label: 'Default',
      props: {
        style: { height: 200 },
        teaserHeight: 100,
        backgroundColor: BaseTheme.palette.APP_PRIMARY,
        headerBackgroundColor: BaseTheme.palette.APP_PRIMARY,
        header: <View style={{ height: 100 }}><Text>header</Text></View>,
        children: <View style={{ height: 200 }}><Text>content</Text></View>
      }
    }]
  }]
};

export default demo;
