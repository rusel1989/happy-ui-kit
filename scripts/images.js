const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '..', 'assets', 'images'));
const images = [];

const getImageName = (filename) => {
  const basename = path.basename(filename, '.png');
  return basename;
};

files.forEach((filename, i) => {
  if (filename.indexOf('@') < 0) {
    images.push(`  '${getImageName(filename)}': require('./assets/images/${filename}')`);
  }
});

const template = (img) => `
import map from 'lodash/map';

export const getImagesMap = () => ({
${img}
});

export const getImagesArray = () => map(getImagesMap());

export const getImage = (name) => getImagesMap()[name];
`;

fs.writeFileSync(path.join(__dirname, '..', 'images.js'), template(images.sort().join(',\n')));
