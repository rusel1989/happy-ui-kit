
import Separator from './index';
import * as BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 100,
  containerType: 'column',
  components: [{
    Component: Separator,
    items: [{
      label: 'Default',
      props: {}
    }, {
      label: 'Custom Separator',
      props: {
        width: 2,
        spacingVertical: 10,
        color: BaseTheme.palette.APP_DANGER
      }
    }]
  }]
};

export default demo;
