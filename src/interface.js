// interface.js

let hasInit = false;
let apiInstance = null;

const apiUnknown = () => {
    console.log('Used registed Api');
}

const addCategory = categoryInfo => apiInstance.addCategory(categoryInfo);

const removeCategory = categoryId => apiInstance.removeCategory(categoryId);

const addBlock = blockInfo => apiInstance.addBlock(blockInfo);

const removeBlock = blockOpcode => apiInstance.removeBlock(blockOpcode);

function registExtensionAPI(api) {
    console.log('Init API', api);
    if (hasInit) return;
    apiInstance = api;
    hasInit = true;
}

module.exports = {
    addCategory,
    removeCategory,
    addBlock,
    removeBlock,
    registExtensionAPI
};
