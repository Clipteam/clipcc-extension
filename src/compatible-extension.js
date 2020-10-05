const {
    Extension,
    BlockType,
    ArgumentType
} = require('./extension');

function getBlockType(blockType) {
    switch (blockType) {
        case 'Boolean': return BlockType.BOOLEAN;
        case 'button': return 0;
        case 'command': return BlockType.COMMAND;
        case 'conditional': return 0;
        case 'event': return BlockType.HAT;
        case 'hat': return BlockType.HAT;
        case 'loop': return 0;
        case 'reporter': return BlockType.REPORTER;
        default: return 0;
    }
}

function getArgumentType(arguType) {
    switch (arguType) {
        case 'angle': return 0;
        case 'Boolean': return ArgumentType.BOOLEAN;
        case 'color': return ArgumentType.COLOR;
        case 'number': return ArgumentType.NUMBER;
        case 'string': return ArgumentType.STRING;
        case 'matrix': return 0;
        case 'note': return 0;
        case 'image': return 0;
        default: return 0;
    }
}

class CompatibleExtension extends Extension {
    constructor(instance, api) {
        super(api);
        this.instance = instance;
    }

    init() {
        const info = this.instance.getInfo();
        this.extensionId = info.id;
        const categoryId = this.extensionId + '.' + info.name;
        this.addCategory({
            categoryId: info.name,
            messageId: info.name,
            color: info.color1
        });

        for (let block of info.blocks) {
            const argument = {};
            for (let argu in block.arguments) {
                argument[argu] = {
                    type: getArgumentType(block.arguments[argu].type),
                    default: block.arguments[argu].defaultValue
                };
            }
            this.addBlock({
                opcode: block.opcode,
                type: getBlockType(block.blockType),
                messageId: block.text,
                categoryId: categoryId,
                function: this.instance[block.opcode],
                argument: argument
            });
        }
    }
}

module.exports = CompatibleExtension;
