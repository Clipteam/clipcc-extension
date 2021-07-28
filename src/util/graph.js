const DUPLICATED_EDGE = 0x90;

const INF = 0x3f3f3f3f;

class Graph {
    constructor() {
        this.edge = {};
        this.node = [];
    }

    addNode(node) {
        if (!this.node.includes(node)) {
            this.node.push(node);
            this.edge[node] = {};
        }
    }

    addEdge(from, to, w, data) {
        this.addNode(from);
        this.addNode(to);
        if (this.edge[from][to]) throw DUPLICATED_EDGE;
        this.edge[from][to] = { w, data };
    }

    dijkstra(from, to) {
        const tmp = {};
        for (const node of this.node) {
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
            for (const node of this.node) {
                if (!tmp[node].vis && tmp[node].dis < min) {
                    min = tmp[node].dis;
                    idx = node;
                }
            }
            if (idx === null) return [];
            tmp[idx].vis = true;
            ++cnt;
            for (const node of this.node) {
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
            const cur = queue.pop();
            for (const node in this.edge[cur]) {
                if (path[node]) continue;
                path[node] = Object.assign([], path[cur]);
                path[node].push({ from: cur, to: node });
                queue.push(node);
            }
        }
        return path[to] || [];
    }
}

module.exports = { Graph, DUPLICATED_EDGE };
