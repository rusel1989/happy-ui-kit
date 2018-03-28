
import ChipGroup from './index';

const demo = {
  containerHeight: 100,
  containerType: 'column',
  components: [{
    Component: ChipGroup,
    items: [{
      label: 'Default',
      props: {
        selectable: true,
        options: ['One', 'Two', 'Three'],
        value: 'One'
      }
    }]
  }]
};

export default demo;
