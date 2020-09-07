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
            categoryId: 'test',
            messageId: 'Test',
            color: '#66CCFF'
        });
        this.addBlock({
            opcode: 'test1',
            type: extension.BlockType.BOOLEAN,
            messageId: 'TEST1 [ARG1] [ARG2]',
            categoryId: 'clipcc.sample.test',
            function: args => args.ARG1 === args.ARG2,
            argument: {
                ARG1: {
                    type: extension.ArgumentType.STRING,
                    default: 'aaa'
                },
                ARG2: {
                    type: extension.ArgumentType.STRING,
                    default: 'bbb'
                }
            }
        });
        this.addBlock({
            opcode: 'test2',
            type: extension.BlockType.REPORTER,
            messageId: 'TEST2 [ARG] [BOOL]',
            categoryId: 'clipcc.sample.test',
            function: args => args.BOOL ? args.ARG : args.ARG + 2,
            argument: {
                ARG: {
                    type: extension.ArgumentType.NUMBER,
                    default: 1
                },
                BOOL: {
                    type: extension.ArgumentType.BOOLEAN
                }
            }
        });
        this.addBlock({
            opcode: 'test3',
            type: extension.BlockType.COMMAND,
            messageId: 'TEST3 [COLOR]',
            categoryId: 'clipcc.sample.test',
            function: args => args.COLOR,
            argument: {
                COLOR: {
                    type: extension.ArgumentType.COLOR
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
