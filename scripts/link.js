const path = require('path');
const fs = require('fs');
const cp = require('child_process');
const fsWalk = require('fs-walk');

const root = path.join(__dirname, '..');
const appRoot = path.join(root, 'app');
const dirs = [ appRoot ];

fsWalk.walk(path.join(root, 'app'), (basedir, filename, stat, next) => {
  if (basedir.replace(root + '/', '') === 'app') {
    const name = path.join(basedir, filename);
    if (fs.statSync(name).isDirectory()) {
      dirs.push(name);
    }
  }
  next();
}, () => {
  dirs.forEach((d) => {
    cp.execSync('yarn link', { cwd: d, stdio: 'ignore' });
  });
  const pkgNames = dirs.map(d => `@happy/${path.basename(d)}`);
  process.chdir(root);
  cp.execSync(`yarn link ${pkgNames.join(' ')}`);
  console.log(`Linked ${pkgNames.length} packages\n - ${pkgNames.join('\n - ')}`);
  process.exit();
});
