const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '..', 'components'));
const components = [];
const imports = [];
const list = [];

const normalizeName = (name) =>
  name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase().trim());

files.forEach((filename, i) => {
  if (filename.indexOf('.') < 0) {
    list.push(filename);
    imports.push(`import ${filename} from './components/${filename}';`);
    components.push(`  ${filename}: {
    screen: createComponentScreen(${filename}),
    navigationOptions: {
      title: '${normalizeName(filename)}'
    }
  }`);
  }
});

const template = () => `
import { StackNavigator } from 'react-navigation';
import createComponentScreen from './demo/ComponentScreen';
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
