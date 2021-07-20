const Extension = require('./extension');
const CompatibleExtension = require('./compatible-extension');
const MigrationHelper = require('./migration-helper');
const extensionManager = require('./manager');
const API = require('./api');
const Type = require('./type');

module.exports = {
    Extension,
    CompatibleExtension,
    MigrationHelper,
    API,
    extensionManager,
    Type
};
