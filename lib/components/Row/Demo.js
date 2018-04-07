
import React from 'react';
import Row from './index';
import Text from '../Text';
import BaseTheme from '../../theme/base';

const demoStyle = {
  height: 50,
  padding: 8,
  borderWidth: 1,
  borderColor: BaseTheme.palette.APP_BLACK
};

const items = [
  { alignItems: 'center', justifyContent: 'flex-start' },
  { alignItems: 'flex-start', justifyContent: 'space-between' },
  { alignItems: 'center', justifyContent: 'center' },
  { alignItems: 'flex-end', justifyContent: 'flex-end' }
].map(({ alignItems, justifyContent }) => {
  return { props: {
    style: demoStyle,
    backgroundColor: BaseTheme.palette.APP_LIGHT_GREY,
    children: (
      <Text.Monospace color={BaseTheme.palette.APP_BLACK} fontWeight='600' size={11}>
        {`<Row alignItems='${alignItems}'
  justifyContent='${justifyContent}' />`}
      </Text.Monospace>
    ),
    alignItems,
    justifyContent
  }};
});

const demo = {
  containerHeight: 300,
  containerType: 'column',
  components: [{
    Component: Row,
    items
  }]
};

export default demo;
