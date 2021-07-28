/**
 * Define APIs.
 * @module API
 */

let hasInit = false;
let instance = null;

/**
* Register an API.
* [Dangerous] You should not call this function in your extension.
* @param {object} api - API object.
*/
function registExtensionAPI(api) {
    if (hasInit) return;
    instance = api;
    hasInit = true;
}

/**
 * Get clipcc-vm instance.
 * @returns {ClipCCVM}
 */
const getVM = () => instance.vm.vm;

/**
 * Get clipcc-gui instance.
 * @returns {ClipCCGUI}
 */
const getGUI = () => instance.gui.gui;

/**
 * Get clipcc-block instance.
 * @returns {ClipCCBlock}
 */
const getBlockly = () => instance.blocks;

/**
 * Add a category from prototype.
 * @param {Category} categoryInfo - Category prototype. 
 */
const addCategory = categoryInfo => instance.vm.addCategory(categoryInfo);

/**
 * Remove a category by id.
 * @param {string} categoryId - Category id.
 */
const removeCategory = categoryId => instance.vm.removeCategory(categoryId);

/**
 * Add a block from prototype.
 * @param {Block} blockInfo - Block prototype.
 */
const addBlock = blockInfo => instance.vm.addBlock(blockInfo);

/**
 * Remove a block by opcode.
 * @param {string} blockOpcode - Block opcode.
 */
const removeBlock = blockOpcode => instance.vm.removeBlock(blockOpcode);

/**
 *  Get data for playground.
 */
const getPlaygroundData = () => instance.vm.getPlaygroundData();

/**
 * Load a Scratch project from a .sb, .sb2, .sb3 or json string.
 * @param {string | object} input A json string, object, or ArrayBuffer representing the project to load.
 * @param {function} extensionCallback A function to deal with extension list.
 * @return {Promise} Promise that resolves after targets are installed.
 */
const loadProject = (input, extensionCallback) => instance.vm.loadProject(input, extensionCallback);

/**
 * Return whether the editor is in the desktop environment.
 * @return {boolean}
 */
const isDesktop = () => instance.gui.isDesktop();

/**
 * Return whether the editor is loading.
 * @return {boolean}
 */
const isEditorLoading = () => instance.gui.isEditorLoading();

module.exports = {
    vm,
    blockly,
    registExtensionAPI,
    ...require('./util'),
    addCategory,
    removeCategory,
    addBlock,
    removeBlock,
    getPlaygroundData,
    loadProject,
    isDesktop,
    isEditorLoading,
    getVM,
    getGUI,
    getBlockly
};
