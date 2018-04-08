import Checkbox from './index';
import * as BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 80,
  containerType: 'row',
  components: [{
    Component: Checkbox,
    items: [{
      label: 'Default checkbox',
      props: {
        selected: false
      }
    }, {
      label: 'Default selected checkbox',
      props: {
        selected: true
      }
    }, {
      label: 'Checkbox with animation',
      props: {
        selected: true,
        selectedIcon: 'save',
        selectedTintColor: BaseTheme.palette.APP_SUCCESS,
        animation: 'zoomIn'
      }
    }]
  }]
};

export default demo;
