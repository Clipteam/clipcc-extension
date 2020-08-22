// interface.js

const hasInit = false;

let addCategory = (category) => {};
let removeCategory = (categoryId) => {};
let addBlock = (block) => {};
let removeBlock = (blockId) => {};

function initExtensionAPI (api) {
    if (hasInit) return;
    hasInit = true;
    if (api.addBlock) addBlock = api.addBlock;
    if (api.removeBlock) removeBlock = api.removeBlock;
    if (api.addCategory) addCategory = api.addCategory;
    if (api.removeCategory) removeCategory = api.removeCategory;
}

module.exports = {
    initExtensionAPI,
    addCategory,
    removeCategory,
    addBlock,
    removeBlock
};
