// interface.js

let hasInit = false;

const uninitedApi = () => {
    console.log('Used uninited Api');
}

class ExtensionAPI {
    constructor() {
        this.addCategory = (category) => uninitedApi();
        this.removeCategory = (categoryId) => uninitedApi();
        this.addBlock = (block) => uninitedApi();
        this.removeBlock = (blockId) => uninitedApi();
    }

    initExtensionAPI(api) {
        console.log('Init API');
        if (hasInit) return;
        hasInit = true;
        if (api.addBlock) this.addBlock = api.addBlock;
        if (api.removeBlock) this.removeBlock = api.removeBlock;
        if (api.addCategory) this.addCategory = api.addCategory;
        if (api.removeCategory) this.removeCategory = api.removeCategory;
    }
}

module.exports = ExtensionAPI;
