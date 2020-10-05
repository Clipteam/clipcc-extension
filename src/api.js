let hasInit = false;
let apiInstance = null;

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
 * Block proptype.
 * @property {string} opcode - opcode
 * @property {BlockType} type - type
 * @property {string} msg - l10n message
 * @property {string} categoryId - category id
 * @property {function} func - function
 */

/**
 * @typedef {object} Category
 * Category proptype.
 * @property {string} categoryId - category id
 * @property {string} messageId - l10n message id
 * @property {string} color - rgb color like #rrggbb
 */

/**
 * Block types.
 * @readonly
 * @enum {number}
 */
const BlockType = {
    /** A general command block */
    COMMAND: 1,
    /** A block which returns a number or string */
    REPORTER: 2,
    /** A block which returns a boolean value */
    BOOLEAN: 3,
    /** A block with branch(es) */
    BRANCH: 4,
    /** A hat block */
    HAT: 5
};

/**
 * Argument types.
 * @readonly
 * @enum {number}
 */
const ArgumentType = {
    /** Number */
    NUMBER: 1,
    /** String */
    STRING: 2,
    /** Boolean value */
    BOOLEAN: 3,
    /** Color selector */
    COLOR: 4
};

/**
 * Add a category from proptype.
 * @param {Category} categoryInfo - Category proptype. 
 */
const addCategory = categoryInfo => apiInstance.addCategory(categoryInfo);

/**
 * Remove a category from id.
 * @param {string} categoryId - Category id.
 */
const removeCategory = categoryId => apiInstance.removeCategory(categoryId);

/**
 * Add a block from proptype.
 * @param {Block} blockInfo - Block proptype.
 */
const addBlock = blockInfo => apiInstance.addBlock(blockInfo);

/**
 * Remove a block from opcode.
 * @param {string} blockOpcode - Block opcode.
 */
const removeBlock = blockOpcode => apiInstance.removeBlock(blockOpcode);

/**
 * Regist an API.
 * [Dangerous] You should not call this function in your extension.
 * @param {object} api - API object.
 */
function registExtensionAPI(api) {
    console.log('Init API', api);
    if (hasInit) return;
    apiInstance = api;
    hasInit = true;
}

module.exports = {
    BlockType,
    ArgumentType,
    addCategory,
    removeCategory,
    addBlock,
    removeBlock,
    registExtensionAPI
};
