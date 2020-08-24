// interface.js

let hasInit = false;

const uninitedApi = () => {
    console.log('Used uninited Api');
}

class ExtensionAPI {
    constructor() {
        this.api = null;
        this.addCategory = (category) => this.api.addCategory(category);
        this.removeCategory = (categoryId) => this.api.removeCategory(categoryId);
        this.addBlock = (block) => this.api.addBlock(block);
        this.removeBlock = (blockId) => this.api.removeBlock(blockId);
    }

    initExtensionAPI(api) {
        console.log('Init API', api);
        if (hasInit) return;
        hasInit = true;
        this.api = api;
    }
}

module.exports = ExtensionAPI;
