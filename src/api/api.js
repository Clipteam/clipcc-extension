let hasInit = false;
let instance = null;

/**
 * Register an API.
 * [Dangerous] You should not call this function in your extension.
 * @memberof api
 * @param {object} api - API object.
 */
function registExtensionAPI(api) {
    if (hasInit) return;
    instance = api;
    hasInit = true;
}

/**
 * Get clipcc-vm instance.
 * @memberof api
 * @returns {ClipCCVM}
 */
const getVmInstance = () => instance.vm.vm;

/**
 * Get clipcc-gui document.
 * @memberof api
 * @returns {Document}
 */
const getGuiDocument = () => instance.document;

/**
 * Get clipcc-gui window.
 * @memberof api
 * @returns {Window}
 */
const getGuiWindow = () => instance.window;

/**
 * Get clipcc-gui instance.
 * @memberof api
 * @returns {ClipCCGUI}
 */
const getGuiInstance = () => instance.gui.gui;

/**
 * Get clipcc-block instance.
 * @memberof api
 * @returns {ClipCCBlock}
 */
const getBlockInstance = () => instance.blocks;

/**
 * Get clipcc-render instance.
 * @memberof api
 * @returns {ClipCCRender}
 */
const getRenderInstance = () => instance.vm.vm.renderer;

/**
 * Get stage canvas.
 * @memberof api
 * @returns {HTMLCanvasElement}
 */
const getStageCanvas = () => instance.vm.vm.renderer.canvas;

/**
 * Add a category from prototype.
 * @memberof api
 * @param {CategoryPrototype} categoryInfo - Category prototype.
 */
const addCategory = categoryInfo => instance.vm.addCategory(categoryInfo);

/**
 * Remove a category by id.
 * @memberof api
 * @param {string} categoryId - Category id.
 */
const removeCategory = categoryId => instance.vm.removeCategory(categoryId);

/**
 * Add a block from prototype.
 * @memberof api
 * @param {BlockPrototype} blockInfo - Block prototype.
 */
const addBlock = blockInfo => instance.vm.addBlock(blockInfo);

/**
 * Add several blocks from prototype.
 * @memberof api
 * @param {BlockPrototype[]} blockInfos - Block prototype.
 */
const addBlocks = blockInfos => instance.vm.addBlocks(blockInfos);

/**
 * Remove a block by opcode.
 * @memberof api
 * @param {string} blockOpcode - Block opcode.
 */
const removeBlock = blockOpcode => instance.vm.removeBlock(blockOpcode);

/**
 * Remove several blocks by opcode.
 * @memberof api
 * @param {string[]} blockOpcodes - Block opcode.
 */
const removeBlocks = blockOpcodes => instance.vm.removeBlocks(blockOpcodes);

/**
 * Get data for playground.
 * @memberof api
 * @ignore
 */
const getPlaygroundData = () => instance.vm.getPlaygroundData();

/**
 * Load a Scratch project from a .sb, .sb2, .sb3 or json string.
 * @memberof api
 * @ignore
 * @param {string | object} input A json string, object, or ArrayBuffer representing the project to load.
 * @param {Function} extensionCallback A function to deal with extension list.
 * @return {Promise} Promise that resolves after targets are installed.
 */
const loadProject = (input, extensionCallback) => instance.vm.loadProject(input, extensionCallback);

/**
 * Return whether the editor is in the desktop environment.
 * @memberof api
 * @ignore
 * @return {boolean}
 */
const isDesktop = () => instance.gui.isDesktop();

/**
 * Return whether the editor is loading.
 * @memberof api
 * @ignore
 * @return {boolean}
 */
const isEditorLoading = () => instance.gui.isEditorLoading();

/**
 * Return the settings value of given id.
 * @memberof api
 * @ignore
 * @param {string} id The id of a settings item.
 * @return {any}
 */
const getSettings = (id) => instance.gui.getSettings(id);

module.exports = {
    registExtensionAPI,
    ...require('./util'),
    addCategory,
    removeCategory,
    addBlock,
    addBlocks,
    removeBlock,
    removeBlocks,
    getPlaygroundData,
    loadProject,
    isDesktop,
    getSettings,
    isEditorLoading,
    getVmInstance,
    getGuiDocument,
    getGuiWindow,
    getGuiInstance,
    getBlockInstance,
    getRenderInstance,
    getStageCanvas
};
