const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '..', 'components'));
const components = [];
const imports = [];
const list = [];
const normalizeName = (name) =>
  name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase().trim());

// eslint-disable-next-line
const demoTemplate = (name) => {
  return `
import React from 'react';
import ${name} from './index';
import BaseTheme from '../../theme/base';

const demo = {
  containerHeight: 150,
  containerType: 'column',
  components: [{
    Component: ${name},
    items: [{
      label: 'Default',
      props: {}
    }, {
      label: 'Custom ${name}',
      props: {}
    }]
  }]
};

export default demo;`;
};

files.forEach((filename, i) => {
  if (filename.indexOf('.') < 0) {
    list.push(filename);
    // fs.writeFileSync(path.join(__dirname, '..', 'components', filename, 'Demo.js'), demoTemplate(filename));
    imports.push(`import ${filename} from './components/${filename}/Demo';`);
    components.push(`  ${filename}: {
    screen: createDemoScreen(${filename}),
    navigationOptions: {
      title: '${normalizeName(filename)}'
    }
  }`);
  }
});

const template = () => `
import { StackNavigator } from 'react-navigation';
import createDemoScreen from './demo/createDemoScreen';
import Home from './demo/Home';
import options from './demo/navOptions';

${imports.join('\n')}

const RootNavigator = StackNavigator({
  Index: {
    screen: Home,
    navigationOptions: {
      title: 'Happy UI kit'
    }
  },
${components.join(',\n')}
}, options);

export default RootNavigator;
`;

fs.writeFileSync(path.join(__dirname, '..', 'component-list.json'), JSON.stringify(list, null, 4));
fs.writeFileSync(path.join(__dirname, '..', 'navigation.js'), template());
