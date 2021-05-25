/**
 * Define APIs.
 * @module API
 */

let hasInit = false;
let apiInstance = null;

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
    if (hasInit) return;
    apiInstance = api;
    hasInit = true;
}

module.exports = {
	getVM,
    addCategory,
    removeCategory,
    addBlock,
    removeBlock,
    registExtensionAPI
};
