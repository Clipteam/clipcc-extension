/**
 * @typedef {object} ExtensionInfo
 * Extension info, defined in `info.json`.
 * @memberof type
 * @property {string} id - ID.
 * @property {string} version - Version.
 * @property {string | string[]} author - Author(s).
 * @property {string} icon - Icon.
 * @property {string} inset_icon - Inset icon.
 * @property {string} [default_language] - [unsupported] Default language.
 */

/**
 * Extension base class.
 */
class Extension {
    /**
     * Initialize the extension.
     */
    onInit() {}

    /**
     * Uninitialize the extension.
     */
    onUninit() {}

    /**
     * Before load the project.
     */
    beforeProjectLoad(data, extensions) {}

    /**
     * Before save the project.
     */
    beforeProjectSave(data) {}
}

module.exports = Extension;
