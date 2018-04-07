
import CircleChart from './index';
import BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 160,
  containerType: 'row',
  components: [{
    Component: CircleChart,
    items: [{
      label: 'Default',
      props: {}
    }, {
      label: 'Custom',
      props: {
        value: 65,
        lineWidth: 5,
        textColor: BaseTheme.palette.APP_SECONDARY_TEXT,
        tintColor: BaseTheme.palette.APP_ACCENT,
        backgroundColor: BaseTheme.palette.WHITE,
        formatText: (v) => `${v.toFixed(1)}%`,
        size: 80
      }
    }]
  }]
};

export default demo;
