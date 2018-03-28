
import React from 'react';
import Col from './index';
import Text from '../Text';

import BaseTheme from '../../theme/base';

const demoStyle = {
  height: 100,
  padding: 8,
  borderWidth: 1,
  borderColor: BaseTheme.palette.APP_BLACK
};

const items = [
  { alignItems: 'center', justifyContent: 'flex-start' },
  { alignItems: 'flex-end', justifyContent: 'center' }
].map(({ alignItems, justifyContent }) => {
  return {
    label: `${alignItems} ${justifyContent}`,
    props: {
      style: demoStyle,
      backgroundColor: BaseTheme.palette.APP_LIGHT_GREY,
      children: (
        <Text.Monospace color={BaseTheme.palette.APP_BLACK} fontWeight='600' size={11}>
          {`<Col alignItems='${alignItems}'
    justifyContent='${justifyContent}' />`}
        </Text.Monospace>
      ),
      alignItems,
      justifyContent
    }
  };
});

const demo = {
  containerHeight: 300,
  containerType: 'column',
  components: [{
    Component: Col,
    items
  }]
};

export default demo;
