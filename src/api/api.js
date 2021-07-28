/**
 * Define APIs.
 * @module API
 */

let hasInit = false;
let instance = null;

/**
* Get the GUI.
* [Dangerous] You should not call this function in your extension.
*/
let gui = null

/**
* Get the blockly.
* [Dangerous] You should not call this function in your extension.
*/
let blockly = null

/**
* Get the virtual machine of ClipCC.
* [Dangerous] You should not call this function in your extension.
*/
let vm = null;

/**
* Regist an API.
* [Dangerous] You should not call this function in your extension.
* @param {object} api - API object.
*/
function registExtensionAPI(api) {
    if (hasInit) return;
    instance = api;
    this.gui = instance.gui.gui;
    this.vm = instance.vm.vm;
    this.blockly = instance.blocks;
    hasInit = true;
}

/**
 * Add a category from proptype.
 * @param {Category} categoryInfo - Category proptype. 
 */
 const addCategory = categoryInfo => instance.vm.addCategory(categoryInfo);

 /**
  * Remove a category from id.
  * @param {string} categoryId - Category id.
  */
 const removeCategory = categoryId => instance.vm.removeCategory(categoryId);
 
 /**
  * Add a block from proptype.
  * @param {Block} blockInfo - Block proptype.
  */
 const addBlock = blockInfo => instance.vm.addBlock(blockInfo);
 
 /**
  * Remove a block from opcode.
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
  * @return {!Promise} Promise that resolves after targets are installed.
  */
 const loadProject = (input, extensionCallback) => instance.vm.loadProject(input, extensionCallback);
 
 /**
  * Return whether the editor is in the desktop environment.
  */
 const isDesktop = () => instance.gui.isDesktop();
 
 /**
  * Return whether the editor is loading.
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
    loadProject
};
