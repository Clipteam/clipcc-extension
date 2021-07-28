// migration-helper.js

const { Graph, DUPLICATED_EDGE } = require('./util/graph');

class MigrationHelper {
    constructor() {
        this.graph = new Graph();
    }

    addVersionMigration(srcVer, dstVer, migrationScript) {
        try {
            this.graph.addEdge(srcVer, dstVer, 1, migrationScript);
        }
        catch (err) {
            if (err === DUPLICATED_EDGE) throw 'Duplicated version migration.';
            else throw err;
        }
    }

    migrationFromVersion(srcVer, dstVer, projectData) {
        const path = this.graph.bfs(srcVer, dstVer);
        if (path.length === 0) throw 'Valid migration path not found.';
        for (const step of path) {
            this.graph.edge[step.from][step.to].data(projectData);
        }
    }
}

module.exports = MigrationHelper;
