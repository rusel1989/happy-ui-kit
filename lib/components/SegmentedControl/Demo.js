
import SegmentedControl from './index';

const demo = {
  containerHeight: 100,
  containerType: 'column',
  components: [{
    Component: SegmentedControl,
    items: [{
      label: 'Default',
      props: {
        onChange: (i) => console.log(`selected ${i}`),
        options: ['Segmented', 'Control']
      }
    }]
  }]
};

export default demo;
