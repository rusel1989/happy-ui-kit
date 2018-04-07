
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
      label: 'Custom Button',
      props: {
        label: 'Custom Button',
        backgroundColor: BaseTheme.palette.APP_DARK_GREY,
        labelColor: BaseTheme.palette.WHITE,
        labelFont: 'RobotoCondensed-Regular',
        borderRadius: 20,
        height: 40,
        labelSize: 14,
        uppercaseLabel: false,
        fullWidth: false,
        raised: true
      }
    }]
  }]
};

export default demo;
