const fs = require('fs');
const path = require('path');

const dir = path.dirname(__filename);
const files = fs.readdirSync(dir);
let total = 0; let passed = 0;
for (const file of files) {
    if (file === 'index.js') continue;
    console.log(`Running ${file} ...`);
    ++total;
    try {
        require(path.join(dir, file));
        console.log(`Running ${file} done.`);
        ++passed;
    }
    catch (err) {
        console.error(err);
        console.error(`Running ${file} failed.`);
    }
}
console.log(`All tests completed. (${passed}/${total})`);
