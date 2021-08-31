const Extension = require('./extension');
const CompatibleExtension = require('./compatible-extension');
const MigrationHelper = require('./migration-helper');
const {
    ExtensionManager,
    extensionManager,
    ERROR_UNAVAILABLE_EXTENSION,
    ERROR_CIRCULAR_REQUIREMENT
} = require('./extension-manager');
const api = require('./api/api');
const type = require('./type');

module.exports = {
    Extension,
    CompatibleExtension,
    MigrationHelper,
    ExtensionManager,
    error: {
        ERROR_UNAVAILABLE_EXTENSION,
        ERROR_CIRCULAR_REQUIREMENT
    },
    extensionManager,
    api,
    type
};
