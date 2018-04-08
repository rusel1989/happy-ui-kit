
import IconButton from './index';
import * as BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 100,
  containerType: 'row',
  components: [{
    Component: IconButton,
    items: [{
      label: 'Default',
      props: {
        name: 'remove',
        onPress: () => console.log('remove')
      }
    }, {
      label: 'Custom Icon Button',
      props: {
        name: 'save',
        color: BaseTheme.palette.APP_DANGER,
        onPress: () => console.log('save')
      }
    }]
  }]
};

export default demo;
