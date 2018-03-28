
import Dropdown from './index';

const demo = {
  containerHeight: 200,
  containerType: 'column',
  components: [{
    Component: Dropdown,
    items: [{
      label: 'Default',
      props: {
        label: 'Select anything',
        options: [{
          value: 'any', label: 'Anything'
        }, {
          value: 'some', label: 'Something'
        }],
        onSelect: (v) => console.log(v)
      }
    }]
  }]
};

export default demo;
