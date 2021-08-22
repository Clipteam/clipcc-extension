const Extension = require('./extension');
const CompatibleExtension = require('./compatible-extension');
const MigrationHelper = require('./migration-helper');
const { ExtensionManager, extensionManager } = require('./extension-manager');
const api = require('./api/api');
const type = require('./type');

module.exports = {
    Extension,
    CompatibleExtension,
    MigrationHelper,
    ExtensionManager,
    extensionManager,
    api,
    type
};
