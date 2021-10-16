const { Graph } = require('./util/graph');
const { matchVersion } = require('./util/version');

/**
 * Load mode.
 * @enum {number}
 * @readonly
 * @ignore
 */
const LoadMode = {
    UNLOAD: 0,
    INITIATIVE_LOAD: 1,
    PASSIVE_LOAD: 2
};

/**
 * @memberof error
 */
const ERROR_UNAVAILABLE_EXTENSION = 0x90;
/**
 * @memberof error
 */
const ERROR_CIRCULAR_REQUIREMENT = 0x91;

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
     * @param {string} id Extension id.
     * @param {ExtensionInfo} info Extension info.
     * @param {Extension} instance Extension instance.
     */
    addInstance(id, info, instance) {
        if (this.instance.hasOwnProperty(id)) return;
        this.info[id] = Object.assign({
            dependency: {}
        }, info);
        this.load[id] = LoadMode.UNLOAD;
        this.instance[id] = instance;
    }

    /**
     * Remove an extension.
     * @param {string} id Extension id.
     */
    removeInstance(id) {
        if (this.instance.hasOwnProperty(id)) {
            delete this.info[id];
            delete this.load[id];
            delete this.instance[id];
        }
    }

    /**
     * Get an extension instance.
     * @param {string} id Extension id.
     * @returns {Extension} Extension instance.
     */
    getInstance(id) {
        return this.instance[id];
    }

    /**
     * Get an extension info.
     * @param {string} id Extension id.
     * @returns {ExtensionInfo} Extension info.
     */
    getInfo(id) {
        console.log(this.info);
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

    /**
     * Get loaded extendions.
     * @returns {{[key: string]: string}} Object as { extension: version }
     */
    getLoadedExtensions() {
        const result = {};
        for (const key in this.load) {
            if (this.load[key]) {
                result[key] = this.info[key].version;
            }
        }
        return result;
    }

    /**
     * Get loaded extendions.
     * @returns {{id: string, version: string}[]}
     */
    getLoadedExtensionsList() {
        const result = [];
        for (const key in this.load) {
            if (this.load[key]) {
                result.push({
                    id: key,
                    version: this.info[key].version
                });
            }
        }
        return result;
    }

    /**
     * Get loaded extendions.
     * @returns {string[]}
     */
    getLoadedExtensionsIdList() {
        const result = [];
        for (const key in this.load) {
            if (this.load[key]) {
                result.push(key);
            }
        }
        return result;
    }

    /**
     * Load all the extensions given.
     * @param {Object[]} extensions The list of extension ID.
     * @param {Function} vmCallback Load vm extension.
     */
    loadExtensionsWithMode(extensions, vmCallback) {
        for (const extension of extensions) {
            if (!this.getLoadStatus(extension.id)) {
                if (!this.info[extension.id].api) { // undefined, null or 0
                    vmCallback(extension.id);
                }
                else {
                    this.instance[extension.id].onInit();
                }
                this.setLoadStatus(extension.id, extension.mode);
            }
        }
    }

    /**
     * Unload all the extensions given.
     * @param {string[]} extensions The list of extension ID.
     */
    unloadExtensions(extensions) {
        for (const extension of extensions) {
            if (this.getLoadStatus(extension)) {
                if (this.info[extension.id].api) {
                    this.instance[extension].onUninit();
                }
                this.setLoadStatus(extension, LoadMode.UNLOAD);
            }
        }
    }

    /**
     * Get the correct loading order.
     * @param {string[]} extensions The list of extension ID.
     * @returns {Object[]}
     */
    getExtensionLoadOrder(extensions) {
        const graph = new Graph();
        for (const extensionId of extensions) {
            if (!this.info.hasOwnProperty(extensionId)) {
                console.error(`Unavailable extension: ${extensionId}`);
                throw {
                    code: ERROR_UNAVAILABLE_EXTENSION,
                    extension: [{ id: extensionId, version: 'any' }],
                    requireStack: []
                };
            }
            this._checkExtensionLoadingOrderById(extensionId, [], graph);
        }
        return graph.topo().map(id => ({
            id: id,
            mode: extensions.includes(id) ? LoadMode.INITIATIVE_LOAD : LoadMode.PASSIVE_LOAD
        }));
    }

    _findIdInList(id, list) {
        for (const i in list) {
            if (list[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Get loading order of the extension with given id.
     * @param {string} extensionId The extension id.
     * @param {Object[]} requireStack Require stack.
     * @param {Graph} graph Load order.
     */
    _checkExtensionLoadingOrderById(extensionId, requireStack, graph) {
        requireStack.push({
            id: extensionId,
            version: this.info[extensionId].version
        });
        if (!graph.hasNode(extensionId)) {
            graph.addNode(extensionId);
        }
        for (const dependency in this.info[extensionId].dependency) {
            if (!this.info.hasOwnProperty(dependency)) {
                // console.error(`Unavailable extension: ${dependency}`);
                // this._printRequireStack(requireStack);
                throw {
                    code: ERROR_UNAVAILABLE_EXTENSION,
                    extension: [{ id: dependency, version: this.info[extensionId].dependency[dependency] }],
                    requireStack
                };
            }
            if (this._findIdInList(dependency, requireStack) >= 0) {
                // console.error(`Circular requirement: ${dependency}`);
                // this._printRequireStack(requireStack);
                throw {
                    code: ERROR_CIRCULAR_REQUIREMENT,
                    requireStack
                };
            }
            const targetVersion = this.info[extensionId].dependency[dependency];
            if (matchVersion(this.info[dependency].version, targetVersion)) {
                graph.addEdge(dependency, extensionId);
                this._checkExtensionLoadingOrderById(dependency, requireStack, graph);
                /* if (!this._findIdInList(dependency, result)) {
                    result.unshift({ id: dependency, mode: loadMode.PASSIVE_LOAD });
                    this._checkExtensionLoadingOrderById(dependency, requireStack, result);
                }*/
            }
            else {
                // console.error(`Unmatched version: ${extensionId}(${targetVersion}), got ${this.info[dependency].version}`);
                // this._printRequireStack(requireStack);
                throw {
                    code: ERROR_UNAVAILABLE_EXTENSION,
                    extension: [{ id: dependency, version: this.info[extensionId].dependency[dependency] }],
                    requireStack
                };
            }
        }
        requireStack.pop();
    }

    /**
     * Get the correct unloading order.
     * @param {string[]} extensions The list of extension ID.
     */
    getExtensionUnloadOrder(extensions) {
        const graph = new Graph();
        for (const extension of extensions) {
            if (this.load.hasOwnProperty(extension) && this.load[extension]) {
                this._checkExtensionUnloadingOrderById(extension, graph);
            }
        }
        return graph.topo();
    }

    /**
     * Get unloading order of the extension with given id.
     * @param {string} extensionId Extension ID.
     * @param {Graph} graph Unlaod order.
     */
    _checkExtensionUnloadingOrderById(extensionId, graph, last) {
        if (!graph.hasNode(extensionId)) {
            graph.addNode(extensionId);
        }
        for (const extension in this.load) {
            if (extension === last) continue;
            if (this.load[extension]) {
                if (this.info[extension].dependency.hasOwnProperty(extensionId)) {
                    graph.addEdge(extension, extensionId);
                    this._checkExtensionUnloadingOrderById(extension, graph, extensionId);
                }
            }
        }
        for (const dependency in this.info[extensionId].dependency) {
            if (dependency === last) continue;
            if (this.load[dependency] === LoadMode.PASSIVE_LOAD) {
                graph.addEdge(extensionId, dependency);
                this._checkExtensionUnloadingOrderById(dependency, graph, extensionId);
            }
        }
    }

    static _printRequireStack(requireStack) {
        while (requireStack.length > 0) {
            const item = requireStack.pop();
            console.error(`    required by ${item.id}(${item.version})`);
        }
    }

    emitEventToExtension(id, event, ...args) {
        if (!this.instance.hasOwnProperty(id)) throw `Unavaliable extension id: ${id}`;
        if (this.instance[id]) {
            const func = this.instance[id][event];
            if (typeof func === 'function') {
                func(...args);
            }
        }
    }

    emitEventToAll(event, ...args) {
        for (const instance of this.instance) {
            if (!instance) continue;
            const func = instance[event];
            if (typeof func === 'function') {
                func(...args);
            }
        }
    }

    emitEvent(event, ...args) {
        for (const key in this.load) {
            if (this.instance[key]) {
                const func = this.instance[key][event];
                if (typeof func === 'function') {
                    func(...args);
                }
            }
        }
    }
}

const extensionManager = new ExtensionManager();

module.exports = {
    ExtensionManager,
    LoadMode,
    extensionManager,
    ERROR_UNAVAILABLE_EXTENSION,
    ERROR_CIRCULAR_REQUIREMENT
};
