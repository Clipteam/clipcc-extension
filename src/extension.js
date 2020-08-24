// Extension Base Class

/**
 * @typedef {object} Argument
 * Argument meta data
 * @property {ArgumentType} type - type
 */

/**
 * @typedef {object} Block
 * Block meta data
 * @property {string} opcode - opcode
 * @property {BlockType} type - type
 * @property {string} msgid - l10n message id
 * @property {string} categoryId - category id
 * @property {function} func - function
 */

/**
 * @typedef {object} Category
 * Category meta data
 * @property {string} categoryId - category id
 * @property {string} msgid - l10n message id
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

    /**
     * Add a category
     * @param {Category} category - Category meta data
     */
    addCategory(category) {
        this.api.addCategory(Object.assign({}, category, {
            categoryId: this.extensionId + '.' + category.categoryId
        }));
    }

    /**
     * Remove a category
     * @param {string} categoryId - Category id
     */
    removeCategory(categoryId) {
        this.api.removeCategory(categoryId);
    }

    /**
     * Add a block
     * @param {Block} block - Block meta data
     */
    addBlock(block) {
        this.api.addBlock(Object.assign({}, block, {
            opcode: this.extensionId + '.' + block.opcode
        }));
    }

    /**
     * Remove a block
     * @param {string} opcode - Block opcode
     */
    removeBlock(opcode) {
        this.api.removeBlock(opcode);
    }
}

module.exports = {
    ArgumentType,
    BlockType,
    Extension
};
