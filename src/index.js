// index.js

const extension = require('./extension');
const CompatibleExtension = require('./compatible-extension');
const ExtensionAPI = require('./interface');

module.exports = {
    ...extension,
    CompatibleExtension,
    ...ExtensionAPI
};
