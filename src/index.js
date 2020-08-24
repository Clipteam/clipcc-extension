// index.js

const extension = require('./extension');
const ExtensionAPI = require('./interface');

class SampleExtension extends extension.Extension {
    constructor(api) {
        super(api);
        this.extensionId = 'clipcc.sample';
    }
    init() {
        this.addCategory({
            categoryId: 'sample',
            msgid: 'clipcc.json.sample',
            color: '#66CCFF'
        });
        this.addBlock({
            opcode: 'get',
            type: 1,
            msgid: 'clipcc.json.block.get',
            categoryId: 'clipcc.sample.sample',
            func: args => 233
        });
    }
}

module.exports = {
    ...extension,
    SampleExtension,
    ExtensionAPI
};
