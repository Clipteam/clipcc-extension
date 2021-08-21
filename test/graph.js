const assert = require('assert');
const { Graph } = require('../src/util/graph');

const g1 = new Graph();
g1.addEdge(2, 4, 2);
g1.addEdge(1, 4, 3);
g1.addEdge(3, 4, 3);
g1.addEdge(5, 7, 5);
g1.addEdge(7, 3, 3);
g1.addEdge(6, 1, 1);
g1.addEdge(6, 3, 4);
g1.addEdge(5, 6, 3);
g1.addEdge(7, 2, 1);

assert.deepEqual(g1.dijkstra(5, 4), [
    { from: 5, to: 6 },
    { from: 6, to: 1 },
    { from: 1, to: 4 }
]);

assert.deepEqual(g1.bfs(5, 4), [
    { from: 5, to: 6 },
    { from: 6, to: 1 },
    { from: 1, to: 4 }
]);

assert.deepEqual(g1.topo(), [ 5, 6, 7, 1, 2, 3, 4 ]);

const g2 = new Graph();
g2.addEdge(2, 4, 1);
g2.addEdge(2, 5, 1);
g2.addEdge(1, 4, 1);

assert.deepEqual(g2.dijkstra(1, 5), []);

assert.deepEqual(g2.bfs(1, 5), []);

assert.deepEqual(g2.topo(), [1, 2, 4, 5]);
