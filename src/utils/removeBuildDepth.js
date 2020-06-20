const fs = require('fs');
const path = require('path');


const root = 'build';

console.log('Removing one dir depth...');

fs
    .readdirSync(root, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'static')
    .map(dirent => dirent.name)
    .forEach(name => {
        fs.renameSync(path.join(root, name, 'index.html'), path.join(root, `${name}.html`));
        fs.rmdirSync(path.join(root, name));
    });

console.log('Done!');
