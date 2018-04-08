
import Icon from './index';
import * as BaseTheme from '../../theme/base';

const icons = [
  { name: 'arrow', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'back', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'calendar', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'category', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'error', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'files', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'meeting', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'menu', color: BaseTheme.palette.APP_PRIMARY },
  { name: 'message', color: BaseTheme.palette.APP_PRIMARY }
];

const demo = {
  containerHeight: 60,
  containerType: 'row',
  components: [{
    Component: Icon,
    items: icons.map(props => ({ props, label: props.name }))
  }]
};

export default demo;
