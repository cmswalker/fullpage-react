
const fs = require('fs');
const path = require('path');

let options;

try {
    options = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.babelrc')));

    options.presets = options.presets.map((preset) => {
        if (preset[0] === 'env') {
            return ['env', Object.assign(preset[1], { modules: 'commonjs' })];
        }

        return preset;
    });
} catch (error) {
    console.log('Transform Error', error);
    throw error;
}


module.exports = require('babel-jest').createTransformer(options);
