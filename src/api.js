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
const addCategory = categoryInfo => apiInstance.vm.addCategory(categoryInfo);

/**
 * Remove a category from id.
 * @param {string} categoryId - Category id.
 */
const removeCategory = categoryId => apiInstance.vm.removeCategory(categoryId);

/**
 * Add a block from proptype.
 * @param {Block} blockInfo - Block proptype.
 */
const addBlock = blockInfo => apiInstance.vm.addBlock(blockInfo);

/**
 * Remove a block from opcode.
 * @param {string} blockOpcode - Block opcode.
 */
const removeBlock = blockOpcode => apiInstance.vm.removeBlock(blockOpcode);

/**
*  Get data for playground.
*/
const getPlaygroundData = () => apiInstance.vm.getPlaygroundData();

/**
* Load a Scratch project from a .sb, .sb2, .sb3 or json string.
* @param {string | object} input A json string, object, or ArrayBuffer representing the project to load.
* @param {function} extensionCallback A function to deal with extension list.
* @return {!Promise} Promise that resolves after targets are installed.
*/
const loadProject = (input, extensionCallback) => apiInstance.vm.loadProject(input, extensionCallback);

/**
* Return whether the editor is in the desktop environment.
*/
const isDesktop = () => apiInstance.gui.isDesktop();

/**
* Return whether the editor is loading.
*/
const isEditorLoading = () => apiInstance.gui.isEditorLoading();

const migrateChangeBlock = (targets, srcBlockId, dstBlockId) => {
    for (const target of targets) {
        console.log(target.blocks._blocks);
        for (const blockId in target.blocks._blocks) {
            console.log(blockId);
            if (target.blocks._blocks[blockId].opcode === srcBlockId) {
                target.blocks._blocks[blockId].opcode = dstBlockId;
            }
        }
    }
};

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
    // alert("嘿！开始注册")
    if (hasInit) return;
    apiInstance = api;
    this.gui = apiInstance.gui.gui;
    this.vm = apiInstance.vm.vm;
    this.blockly = apiInstance.blocks;
    //console.log("丢一个apiInstance:", apiInstance);
    //console.log("Extension API注册成功！", this.blockly, this.vm); //DEBUG
    hasInit = true;
}

module.exports = {
    addCategory,
    removeCategory,
    addBlock,
    removeBlock,
    getPlaygroundData,
    loadProject,
    migrateChangeBlock,
    vm,
    blockly,
    registExtensionAPI
};
