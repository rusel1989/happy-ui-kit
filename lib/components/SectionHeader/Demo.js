
import SectionHeader from './index';
import * as BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 150,
  containerType: 'column',
  components: [{
    Component: SectionHeader,
    items: [{
      label: 'Default',
      props: {
        title: 'Section header'
      }
    }, {
      label: 'Custom SectionHeader',
      props: {
        title: 'Custom section header',
        height: 40,
        textColor: BaseTheme.palette.WHITE,
        backgroundColor: BaseTheme.palette.APP_DARK_GREY,
        uppercase: false
      }
    }]
  }]
};

export default demo;
