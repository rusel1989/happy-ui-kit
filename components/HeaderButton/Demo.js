
import HeaderButton from './index';
import SaveButton from './SaveButton';
import CloseButton from './CloseButton';
import BackButton from './BackButton';

const demo = {
  containerHeight: 80,
  containerType: 'column',
  components: [{
    Component: HeaderButton,
    items: [{
      label: 'Default',
      props: {}
    }, {
      label: 'Custom HeaderButton',
      props: {}
    }]
  }, {
    Component: BackButton,
    items: [{
      label: 'Default',
      props: {}
    }, {
      label: 'Custom BackButton',
      props: {}
    }]
  }, {
    Component: CloseButton,
    items: [{
      label: 'Default',
      props: {}
    }, {
      label: 'Custom CloseButton',
      props: {}
    }]
  }, {
    Component: SaveButton,
    items: [{
      label: 'Default',
      props: {}
    }, {
      label: 'Custom SaveButton',
      props: {}
    }]
  }]
};

export default demo;
