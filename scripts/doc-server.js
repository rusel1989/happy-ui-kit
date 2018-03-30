const app = require('express')();
const fs = require('fs');
const path = require('path');

app.use(require('body-parser').json());

const propsPath = path.join(__dirname, '..', 'demo', 'props');

app.post('/save-parsed-props/:componentName', (req, res, next) => {
  fs.writeFileSync(path.join(propsPath, req.params.componentName + '.json'), JSON.stringify(req.body, null, 2));
  let file = fs.readFileSync(path.join(propsPath, 'index.js')).toString();
  const compName = req.params.componentName.replace('.', '');
  const compImport = `import ${compName} from './${req.params.componentName}.json';\n`;
  const compExport = `export { ${compName} as ${compName}Props };\n`;

  if (file.indexOf(compImport) < 0) {
    file = compImport + file;
  }

  if (file.indexOf(compExport) < 0) {
    file = file + compExport;
  }

  fs.writeFileSync(path.join(propsPath, 'index.js'), file);
  res.json({ message: 'Success !' });
});

const propTypesTpl = (propTypes) => {
  return propTypes.map(({ name, type }) => {
    return `  ${name}: PropTypes.${type}`;
  }).join(',\n');
};

const defaultPropValueTpl = (value, type) => {
  console.log(value, type);
  if (!type || type === 'string' || type === 'color') {
    return `'${value}'`;
  } else {
    return value;
  }
};

const defaultPropsTpl = (defaultProps, propTypes) => {
  return Object.keys(defaultProps).map((propName) => {
    console.log(propName);
    if (typeof defaultProps[propName] === 'undefined') {
      return null;
    }
    const type = propTypes.find(({ name }) => name === propName);
    return `  ${propName}: ${defaultPropValueTpl(defaultProps[propName], type && type.type)}`;
  }).filter(s => !!s).join(',\n');
};

const compTpl = (compName, compConfig) => {
  return `import React from 'react';
import PropTypes from 'prop-types';
import ${compConfig.baseComponentName} from '../${compConfig.baseComponentName}';

const ${compName} = (props) => {
  return (
    <${compConfig.baseComponentName} {...props} />
  );
};

${compName}.displayName = '${compName}';

${compName}.propTypes = {
${propTypesTpl(compConfig.propTypes)}
};

${compName}.defaultProps = {
${defaultPropsTpl(compConfig.defaultProps, compConfig.propTypes)}
};

export default ${compName};
`;
};

app.post('/save-component/:name', (req, res, next) => {
  const compDir = path.join(__dirname, '..', 'components', req.params.name);
  if (!fs.existsSync(compDir)) {
    fs.mkdirSync(compDir);
  }
  fs.writeFileSync(path.join(compDir, 'index.js'), compTpl(req.params.name, req.body));
  res.json({ message: 'Success !' });
});

app.listen(59590);
