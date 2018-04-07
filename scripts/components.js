const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '..', 'lib', 'components'));
const $exports = [];

files.forEach((filename, i) => {
  if (filename.indexOf('.') < 0) {
    $exports.push(`export { default as ${filename} } from './components/${filename}';`);
  }
});

const comps = () => `
${$exports.join('\n')}
`;

fs.writeFileSync(path.join(__dirname, '..', 'lib', 'index.js'), comps());
