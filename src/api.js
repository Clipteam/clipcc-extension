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
*  Get data for playground.
*/
const getPlaygroundData = () => apiInstance.getPlaygroundData();

/**
* Load a Scratch project from a .sb, .sb2, .sb3 or json string.
* @param {string | object} input A json string, object, or ArrayBuffer representing the project to load.
* @param {function} extensionCallback A function to deal with extension list.
* @return {!Promise} Promise that resolves after targets are installed.
*/
const loadProject = (input, extensionCallback) => apiInstance.loadProject(input, extensionCallback);

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
    // alert("嘿！开始注册")
    if (hasInit) return;
    apiInstance = api;
    this.vm = apiInstance.vm;
    this.blockly = apiInstance.blockly;
    // console.log("Extension API注册成功！", this.blockly, this.virtualMachine); //DEBUG
    hasInit = true;
}

module.exports = {
    addCategory,
    removeCategory,
    addBlock,
    removeBlock,
    getPlaygroundData,
    loadProject,
    vm,
    blockly,
    registExtensionAPI
};
