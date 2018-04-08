
import React from 'react';
import SectionList, { createAnimatedComponent } from './index';
import ListItem from '../ListItem';
import * as BaseTheme from '../../theme/base'; // eslint-disable-line

const AnimatedListItem = createAnimatedComponent(ListItem);

const demo = {
  containerHeight: 240,
  containerType: 'row',
  componentContainerStyle: { flex: 1 },
  components: [{
    Component: SectionList,
    items: [{
      label: 'Default',
      props: {
        style: { height: 200 },
        animated: true,
        duration: 150,
        sections: [{
          title: 'Section 1',
          totalIndex: 0,
          data: [{ name: 'item 1', key: 'item-1', totalIndex: 1 }, { name: 'item 2', key: 'item-2', totalIndex: 2 }]
        }, {
          title: 'Section 2',
          totalIndex: 3,
          data: [{ name: 'item 3', key: 'item-3', totalIndex: 4 }, { name: 'item 4', key: 'item-4', totalIndex: 5 }]
        }],
        renderItem: ({ item, ...rest }) => <AnimatedListItem showSeparator={false} label={item.name} height={50} {...rest} />
      }
    }]
  }]
};

export default demo;
