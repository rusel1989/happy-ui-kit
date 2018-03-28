
import Button from './index';
import BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 160,
  containerType: 'column',
  components: [{
    Component: Button,
    items: [{
      label: 'Default',
      props: {
        label: 'Default Button'
      }
    }, {
      label: 'Custom Buttom',
      props: {
        label: 'Custom Buttom',
        backgroundColor: BaseTheme.palette.APP_DARK_GREY,
        color: BaseTheme.palette.WHITE,
        borderRadius: 20,
        height: 40,
        labelSize: 14,
        uppercaseLabel: false,
        fullWidth: false
      }
    }]
  }]
};

export default demo;
