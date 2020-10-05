// Extension Base Class

/**
 * @typedef {object} Argument
 * Argument meta data
 * @property {ArgumentType} type - type
 */

/**
 * @typedef {object} Message
 * Message
 * @property {string} id - id
 * @property {string} default - default
 */

/**
 * @typedef {object} Block
 * Block meta data
 * @property {string} opcode - opcode
 * @property {BlockType} type - type
 * @property {string} msg - l10n message
 * @property {string} categoryId - category id
 * @property {function} func - function
 */

/**
 * @typedef {object} Category
 * Category meta data
 * @property {string} categoryId - category id
 * @property {string} messageId - l10n message id
 * @property {string} color - rgb color like #rrggbb
 */

/**
 * Block types
 * @enum {number}
 */
const BlockType = {
    COMMAND: 1,
    REPORTER: 2,
    BOOLEAN: 3,
    BRANCH: 4,
    HAT: 5
};

/**
 * Argument types
 * @enum {number}
 */
const ArgumentType = {
    NUMBER: 1,
    STRING: 2,
    BOOLEAN: 3,
    COLOR: 4
};

class Extension {
    constructor(api) {
        this.api = api;
    }
    init() {
        // INIT YOUR EXTENSION
    }
    uninit() {
        // UNINIT YOUR EXTENSION
    }
}

module.exports = {
    ArgumentType,
    BlockType,
    Extension
};
