const globalFuncion = {};

/**
 * Register a global function.
 * @memberof api
 * @param {string} name - Function name.
 * @param {Function} func - Function instance.
 */
const registerGlobalFunction = (name, func) => {
    if (globalFuncion.hasOwnProperty(name)) {
        throw 'Register an existed global function.';
    }
    globalFuncion[name] = func;
};

/**
 * Call a registered global function.
 * @memberof api
 * @param {string} name - Function name.
 * @param {...any} args - Arguments.
 * @returns {any} - Result
 */
const callGlobalFunction = (name, ...args) => {
    if (!globalFuncion.hasOwnProperty(name)) {
        throw 'Call an unexisted global function.';
    }
    return globalFuncion[name](...args);
};

/**
 * Unregister a global function.
 * @memberof api
 * @param {string} name - Function name.
 */
const unregisterGlobalFunction = (name) => {
    if (!globalFuncion.hasOwnProperty(name)) {
        throw 'Try to unregister an unexisted global function.';
    }
    delete globalFuncion[name];
};

/**
 * Change a block to another.
 * @memberof api
 * @param {any} targets - Scratch project JSON.
 * @param {string} srcBlockId - Source block ID.
 * @param {string} dstBlockId - Destination block ID.
 */
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

module.exports = {
    registerGlobalFunction,
    unregisterGlobalFunction,
    callGlobalFunction,
    migrateChangeBlock
};
