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
            messageId: 'clipcc.json.sample',
            color: '#66CCFF'
        });
        this.addBlock({
            opcode: 'get',
            type: extension.BlockType.COMMAND,
            messageId: 'clipcc.json.block.get',
            categoryId: 'clipcc.sample.sample',
            func: args => 233
        });
        this.addCategory({
            categoryId: 'test',
            messageId: 'gui.extension.clipcc.json.description',
            color: '#FFB11B'
        });
        this.addBlock({
            opcode: 'testests',
            type: extension.BlockType.REPORTER,
            messageId: 'TEST [ARG]',
            categoryId: 'clipcc.sample.test',
            func: args => args.ARG + 1,
            arguments: {
                ARG: {
                    type: extension.ArgumentType.NUMBER,
                    default: '1'
                }
            }
        });
    }
}

module.exports = {
    ...extension,
    SampleExtension,
    ExtensionAPI
};
