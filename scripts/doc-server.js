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

app.listen(59590);
