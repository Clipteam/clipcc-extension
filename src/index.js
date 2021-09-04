const Extension = require('./extension');
const CompatibleExtension = require('./compatible-extension');
const MigrationHelper = require('./migration-helper');
const {
    ExtensionManager,
    LoadMode,
    extensionManager,
    ERROR_UNAVAILABLE_EXTENSION,
    ERROR_CIRCULAR_REQUIREMENT
} = require('./extension-manager');
const api = require('./api/api');
const type = require('./type');

/**
 * Extension API.
 * @namespace api
 */

/**
 * Type definition.
 * @namespace type
 */

/**
 * Error code.
 * @namespace error
 */

module.exports = {
    Extension,
    CompatibleExtension,
    MigrationHelper,
    ExtensionManager,
    LoadMode,
    error: {
        ERROR_UNAVAILABLE_EXTENSION,
        ERROR_CIRCULAR_REQUIREMENT
    },
    extensionManager,
    api,
    type
};
