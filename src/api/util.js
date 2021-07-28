// Utils

const globalFuncion = {};

/**
 * Register a global function.
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
 * @param {string} name - Function name.
 * @param {...any} args - Arguments.
 * @returns {any} - Result
 */
const callGlobalFunction = (name, ...args) => {
    if (!globalFuncion.hasOwnProperty(name)) {
        throw 'Calling an unexisted global function.';
    }
    return globalFuncion[name](...args);
};

/**
 * Change a block to another.
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
    callGlobalFunction,
    migrateChangeBlock
};
