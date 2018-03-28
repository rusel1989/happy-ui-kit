
import Chip from './index';
import BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 100,
  containerType: 'row',
  components: [{
    Component: Chip,
    items: [{
      label: 'Default Chip',
      props: {
        label: 'Default Chip'
      }
    }, {
      label: 'Custom Chip',
      props: {
        label: 'Custom chip',
        backgroundColor: BaseTheme.palette.APP_PRIMARY_DARKER,
        tintColor: BaseTheme.palette.WHITE,
        borderWidth: 0,
        animated: true
      }
    }]
  }]
};

export default demo;
