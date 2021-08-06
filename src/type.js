/**
 * Define types used by clipcc-extension.
 * @module Type
 */

/**
 * @typedef {object} ParameterPrototype
 * Argument meta data.
 * @property {ParameterType} type - Argument type.
 * @property {string | number} default - Default value.
 * @property {ShadowPrototype} shadow - Shadow.
 */

/**
 * @typedef {object} ShadowPrototype
 * Shadow meta data.
 * @property {string} type - Shadow type.
 * @property {string} fieldName - Field name.
 */

/**
 * @typedef {object} Message
 * Message
 * @property {string} id - id
 * @property {string} default - default
 */

/**
 * @typedef {object} BlockPrototype
 * Block prototype.
 * @property {string} opcode - Opcode.
 * @property {BlockType} type - Block type.
 * @property {string} msg - Message id.
 * @property {string} categoryId - Category id.
 * @property {Function} func - Function.
 * @property {ParameterPrototype[]} argument - Arguments.
 */

/**
 * @typedef {object} CategoryPrototype
 * Category prototype.
 * @property {string} categoryId - Category id.
 * @property {string} messageId - Message id.
 * @property {string} color - Color #rrggbb.
 */

/**
 * Block types.
 * @readonly
 * @enum {number}
 */
const BlockType = {
    /** A general command block */
    COMMAND: 1,
    /** A block which returns a number or string */
    REPORTER: 2,
    /** A block which returns a boolean value */
    BOOLEAN: 3,
    /** [Unsupported] A block with branch(es) */
    BRANCH: 4,
    /** [Unsupported] A hat block */
    HAT: 5
};

/**
 * Argument types.
 * @readonly
 * @enum {number}
 */
const ParameterType = {
    /** Number */
    NUMBER: 1,
    /** String */
    STRING: 2,
    /** Boolean value */
    BOOLEAN: 3,
    /** Any type */
    ANY: 4,
    /** Color selector */
    COLOR: 5,
    /** [Unsupported] */
    MATRIX: 6,
    /** [Unsupported] */
    NOTE: 7,
    /** [Unsupported] */
    ANGLE: 8,
    /** [Unsupported] */
    IMAGE: 99
};

/**
 * Shadow types.
 * @readonly
 * @enum {ShadowPrototype | boolean}
 */
const ShadowType = {
    NO_SHADOW: false,
    ANGLE: {
        type: 'math_angle',
        fieldName: 'NUM'
    },
    COLOR: {
        type: 'colour_picker',
        fieldName: 'COLOUR'
    },
    NUMBER: {
        type: 'math_number',
        fieldName: 'NUM'
    },
    STRING: {
        type: 'text',
        fieldName: 'TEXT'
    },
    MATRIX: {
        type: 'matrix',
        fieldName: 'MATRIX'
    },
    NOTE: {
        type: 'note',
        fieldName: 'NOTE'
    }
};

module.exports = {
    BlockType,
    ParameterType,
    ShadowType
};
