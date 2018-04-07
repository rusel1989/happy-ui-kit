
import React from 'react';
import ListItem from './index';
import Col from '../Col';
import Text from '../Text';

import BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 180,
  containerType: 'column',
  components: [{
    Component: ListItem,
    items: [{
      label: 'Default',
      props: {
        label: 'List item',
        icon: 'save',
        iconColor: BaseTheme.palette.APP_PRIMARY
      }
    }, {
      label: 'Custom ListItem',
      props: {
        label: 'Custom list item',
        icon: 'arrow',
        labelColor: BaseTheme.palette.APP_DANGER,
        labelSize: 20,
        backgroundColor: BaseTheme.palette.APP_LIGHT_GREY,
        activeBackgroundColor: BaseTheme.palette.APP_DARK_GREY
      }
    }]
  }, {
    Component: ListItem.Selectable,
    items: [{
      label: 'SelectableListItem',
      props: {
        icon: 'radio-active',
        isSelected: false,
        label: 'Selectable Item',
        labelColor: BaseTheme.palette.APP_DARK_GREY,
        iconColor: BaseTheme.palette.APP_BLACK,
        selectedBackgroundColor: BaseTheme.palette.APP_LIGHT_GREY
      }
    }]
  }, {
    Component: ListItem.Collapsible,
    items: [{
      label: 'CollapsibleListItem',
      props: {
        label: 'Collapsible item',
        icon: 'arrow-down',
        children: <Col><Text>{`Collapsible content`}</Text></Col>,
        contentHeight: 50
      }
    }]
  }]
};

export default demo;
