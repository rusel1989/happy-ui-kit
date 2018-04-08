
import ProgressBar from './index';
import * as BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 120,
  containerType: 'column',
  components: [{
    Component: ProgressBar,
    items: [{
      label: 'Default',
      props: {
        progress: 0.65
      }
    }, {
      label: 'Custom ProgressBar',
      props: {
        progress: 0.4,
        barColor: BaseTheme.palette.APP_SUCCESS,
        backgroundColor: BaseTheme.palette.WHITE,
        textColor: BaseTheme.palette.APP_SECONDARY_TEXT,
        borderRadius: 5,
        height: 10,
        showText: false
      }
    }]
  }]
};

export default demo;
