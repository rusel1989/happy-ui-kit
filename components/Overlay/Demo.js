
import Overlay from './index';

const demo = {
  containerHeight: 240,
  containerType: 'column',
  components: [{
    Component: Overlay,
    items: [{
      label: 'Default',
      props: {
        style: { height: 200, position: 'relative' }
      }
    }]
  }]
};

export default demo;
