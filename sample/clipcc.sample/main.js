const clipcc = require('clipcc-extension');

class SampleExtension extends clipcc.Extension.Extension {
    constructor () {
        super();
        this.extensionId = 'clipcc.sample';
    }
    init () {
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

module.exports = SampleExtension;
