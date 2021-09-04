const { Graph, ERROR_DUPLICATED_EDGE } = require('./util/graph');

/**
 * Migration helper.
 */
class MigrationHelper {
    constructor() {
        this.graph = new Graph();
    }

    addVersionMigration(srcVer, dstVer, migrationScript) {
        try {
            this.graph.addEdge(srcVer, dstVer, 1, migrationScript);
        }
        catch (err) {
            if (err === ERROR_DUPLICATED_EDGE) throw 'Duplicated version migration.';
            else throw err;
        }
    }

    migrationFromVersion(srcVer, dstVer, projectData) {
        const path = this.graph.bfs(srcVer, dstVer);
        if (path.length === 0) throw 'No valid migration path.';
        for (const step of path) {
            this.graph.edge[step.from][step.to].data(projectData);
        }
    }
}

module.exports = MigrationHelper;
