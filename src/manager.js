/**
 * Extension manager.
 * @module Manager
 */

/**
 * Extension manager.
 */
class ExtensionManager {
    constructor() {
        this.info = {};
        this.instance = {};
        this.load = {};
    }

    /**
     * Add an extension.
     * @param {string} id - Extension id.
     * @param {ExtensionInfo} info - Extension info.
     * @param {Extension} instance - Extension instance.
     */
    addInstance(id, info, instance) {
        if (this.instance.hasOwnProperty(id)) return;
        this.info[id] = info;
        this.load[id] = false;
        this.instance[id] = instance;
    }

    /**
     * Remove an extension.
     * @param {string} id - Extension id.
     */
    removeInstance(id) {
        if (this.instance.hasOwnProperty(id)) {
            delete this.info[id];
            delete this.instance[id];
        }
    }

    /**
     * Get an extension instance.
     * @param {string} id - Extension id.
     * @returns {Extension} - Extension instance.
     */
    getInstance(id) {
        return this.instance[id];
    }
    
    /**
     * Get an extension info.
     * @param {string} id - Extension id.
     * @returns {ExtensionInfo} - Extension info.
     */
    getInfo(id) {
        console.log(this.info)
        return this.info[id];
    }

    /**
     * Check if an extension existed.
     * @param {string} id - Extension id.
     */
    exist(id) {
        return this.instance.hasOwnProperty(id);
    }

    setLoadStatus(id, loadStatus) {
        this.load[id] = loadStatus;
    }

    getLoadStatus(id) {
        return this.load[id];
    }

    getLoadedExtensions() {
        const result = [];
        for (const key in this.load) {
            if (this.load[key]) result.push(key);
        }
        return result;
    }
}

const extensionManager = new ExtensionManager();

module.exports = extensionManager;
