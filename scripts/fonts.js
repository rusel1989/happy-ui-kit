const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '..', 'assets', 'fonts'));
const fonts = [];

files.forEach((filename, i) => {
  fonts.push(`  '${path.basename(filename, '.ttf')}': require('./assets/fonts/${filename}')`);
});

const template = (iosFonts = '', androidFonts = '') => `
export const android = {
${androidFonts}
};

export const ios = {
${androidFonts}
};
`;

fs.writeFileSync(path.join(__dirname, '..', 'fonts.js'), template('', fonts.sort().join(',\n')));
