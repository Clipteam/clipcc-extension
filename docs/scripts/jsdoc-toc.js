(function($) {
    // TODO: make the node ID configurable
    var treeNode = $('#jsdoc-toc-nav');

    // initialize the tree
    treeNode.tree({
        autoEscape: false,
        closedIcon: '&#x21e2;',
        data: [{"label":"<a href=\"CompatibleExtension.html\">CompatibleExtension</a>","id":"CompatibleExtension","children":[]},{"label":"<a href=\"Extension.html\">Extension</a>","id":"Extension","children":[]},{"label":"<a href=\"module-API.html\">API</a>","id":"module:API","children":[]},{"label":"<a href=\"module-Type.html\">Type</a>","id":"module:Type","children":[]}],
        openedIcon: ' &#x21e3;',
        saveState: false,
        useContextMenu: false
    });

    // add event handlers
    // TODO
})(jQuery);
