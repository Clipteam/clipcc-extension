const Extension = require('./extension');
const CompatibleExtension = require('./compatible-extension');
const API = require('./api');

module.exports = {
    Extension,
    CompatibleExtension,
    ...API
};
