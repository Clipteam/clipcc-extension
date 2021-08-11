const clone = require('./clone');

const ERROR_DUPLICATED_EDGE = 0x90;
const ERROR_NO_TOPO_ORDER = 0x91;

const INF = 0x3f3f3f3f;

class Graph {
    constructor() {
        this.edge = {};
        //this.node = [];
        this.node = {};
        this.nodeCount = 0;
    }

    addNode(node) {
        if (!this.node.hasOwnProperty(node)) {
            //this.node.push(node);
            this.node[node] = { in: 0, out: 0 };
            this.edge[node] = {};
            ++this.nodeCount;
        }
    }

    hasNode(node) {
        return this.node.hasOwnProperty(node);
    }

    addEdge(from, to, w, data) {
        this.addNode(from);
        this.addNode(to);
        if (this.edge[from][to]) throw DUPLICATED_EDGE;
        this.edge[from][to] = { w, data };
        ++this.node[from].out;
        ++this.node[to].in;
    }

    dijkstra(from, to) {
        const tmp = {};
        for (const node in this.node) {
            tmp[node] = {
                vis: false,
                dis: this.edge[from].hasOwnProperty(node)
                    ? this.edge[from][node].w : INF,
                path: this.edge[from].hasOwnProperty(node)
                    ? [{from, to: node}] : []
            };
        }
        tmp[from].dis = 0;
        tmp[from].vis = false;

        let cnt = 1;
        while (cnt !== this.node.length) {
            let idx = null, min = INF;
            for (const node in this.node) {
                if (!tmp[node].vis && tmp[node].dis < min) {
                    min = tmp[node].dis;
                    idx = node;
                }
            }
            if (idx === null) return [];
            tmp[idx].vis = true;
            ++cnt;
            for (const node in this.node) {
                if (!tmp[node].vis && this.edge[idx].hasOwnProperty(node) &&
                    (tmp[idx].dis + this.edge[idx][node].w < tmp[node].dis)
                ) {
                    tmp[node].dis = tmp[idx].dis + this.edge[idx][node].w;
                    tmp[node].path = Object.assign([], tmp[idx].path)
                    tmp[node].path.push({ from: idx, to: node });
                }
            }
        }

        return tmp[to].path;
    }

    bfs(from, to) {
        const queue = [];
        const path = {};
        queue.push(from);
        while (queue.length > 0) {
            const cur = queue.shift();
            for (const node in this.edge[cur]) {
                if (path[node]) continue;
                path[node] = Object.assign([], path[cur]);
                path[node].push({ from: cur, to: node });
                queue.push(node);
            }
        }
        return path[to] || [];
    }

    topo() {
        const queue = [];
        const res = [];
        const nodeClone = clone(this.node);
        for (const node in nodeClone) {
            if (nodeClone[node].in === 0) {
                queue.push(node);
            }
        }
        while (queue.length > 0) {
            const cur = queue.shift();
            res.push(cur);
            for (const node in this.edge[cur]) {
                --nodeClone[node].in;
                if (nodeClone[node].in === 0) {
                    queue.push(node);
                }
            }
        }
        if (res.length !== this.nodeCount) {
            throw ERROR_NO_TOPO_ORDER;
        }
        return res;
    }
}

module.exports = { Graph, ERROR_DUPLICATED_EDGE, ERROR_NO_TOPO_ORDER };
