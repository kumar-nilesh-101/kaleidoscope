const fs = require('node:fs');
const path = require('node:path');

const readmePaths = [];
const findReadme = (dir, filename) => {
    const dirContents = fs.readdirSync(dir);
    for (const content of dirContents) {
        const contentPath = path.join(dir, content);
        const stat = fs.statSync(contentPath);

        if (stat.isDirectory()) {
            findReadme(contentPath, filename);
        } else if (content.endsWith(filename)) {
            readmePaths.push(contentPath);
        }
    }
};

findReadme('./src', 'README.md');

let libReadmeBuffer = fs.readFileSync('./INIT.md');

for (const readmePath of readmePaths) {
    const readmeBuffer = fs.readFileSync(readmePath);
    libReadmeBuffer = Buffer.concat([
        libReadmeBuffer,
        Buffer.from('\n\n'),
        readmeBuffer,
    ]);
}

fs.writeFileSync('./README.md', libReadmeBuffer);
