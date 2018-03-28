import ActionSheet from './index';

const demo = {
  containerHeight: 80,
  containerType: 'column',
  components: [{
    Component: ActionSheet,
    renderAtBottom: true,
    label: 'Default',
    items: [{
      label: 'ActionSheet',
      props: {}
    }],
    methods: [{
      name: 'show',
      label: 'Show sheet',
      args: [{
        options: [
          { label: 'Option 1', icon: 'save', value: 'value' },
          { label: 'Option 2', icon: 'remove', value: 'value2' }
        ]
      }, '']
    }]
  }]
};

export default demo;
