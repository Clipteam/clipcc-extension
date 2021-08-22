const Extension = require('./extension');
const API = require('./api/api');

/**
 * Compatible extension interface with original Scratch.
 * @extends Extension
 */
class CompatibleExtension extends Extension {
    /**
     * Create a compatible extension.
     * @param {object} instance - Extension instance.
     */
    constructor(instance) {
        super();
        this.instance = instance;
    }

    /**
     * Initialize the extension.
     */
    onInit() {
        const info = this.instance.getInfo();
        this.extensionId = info.id;
        const categoryId = this.extensionId + '.' + info.name;
        API.addCategory({
            categoryId: categoryId,
            messageId: info.name,
            color: info.color1
        });

        for (let block of info.blocks) {
            const argument = {};
            for (let argu in block.arguments) {
                argument[argu] = {
                    type: this.getArgumentType(block.arguments[argu].type),
                    default: block.arguments[argu].defaultValue
                };
            }
            API.addBlock({
                opcode: this.extensionId + '.' + block.opcode,
                type: this.getBlockType(block.blockType),
                messageId: block.text,
                categoryId: categoryId,
                function: this.instance[block.opcode],
                argument: argument
            });
        }
    }

    getBlockType(blockType) {
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
    
    getArgumentType(arguType) {
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
}

module.exports = CompatibleExtension;
