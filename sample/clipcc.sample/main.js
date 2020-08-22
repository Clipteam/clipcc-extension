const clipcc = require('clipcc-extension');

class Sample extends clipcc.Extension {
    constructor() {
        this.extensionId = 'clipcc.sample';
    }
}

module.exports = SampleExtension;
