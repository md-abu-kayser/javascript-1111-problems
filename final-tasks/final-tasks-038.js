// task-->197
{
  //
  // final tasks-197 solved------------------------------>781
  // bellmanFord
  // Requirement: Find shortest paths even when graph edges may have negative weights.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    bellmanFord(vertices, edges, source) {
      const distance = Object.fromEntries(vertices.map((v) => [v, Infinity]));

      distance[source] = 0;

      for (let i = 1; i < vertices.length; i++) {
        let changed = false;

        for (const [from, to, weight] of edges) {
          if (
            distance[from] !== Infinity &&
            distance[to] > distance[from] + weight
          ) {
            distance[to] = distance[from] + weight;
            changed = true;
          }
        }

        if (!changed) break;
      }

      for (const [from, to, weight] of edges) {
        if (
          distance[from] !== Infinity &&
          distance[to] > distance[from] + weight
        ) {
          throw new Error("Negative cycle detected");
        }
      }

      return distance;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.bellmanFord(
      ["A", "B", "C"],
      [
        ["A", "B", 4],
        ["B", "C", -2],
        ["A", "C", 5],
      ],
      "A",
    ),
  );

  //
}

// task-->198
{
  //
  // final tasks-198 solved------------------------------>782
  // floydWarshall
  // Requirement: Compute shortest paths between every pair of nodes.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    floydWarshall(nodes, edges) {
      const distance = {};

      for (const a of nodes) {
        distance[a] = {};

        for (const b of nodes) {
          distance[a][b] = a === b ? 0 : Infinity;
        }
      }

      for (const [a, b, weight] of edges) {
        distance[a][b] = Math.min(distance[a][b], weight);
      }

      for (const k of nodes) {
        for (const i of nodes) {
          for (const j of nodes) {
            distance[i][j] = Math.min(
              distance[i][j],
              distance[i][k] + distance[k][j],
            );
          }
        }
      }

      return distance;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.floydWarshall(
      ["A", "B", "C"],
      [
        ["A", "B", 2],
        ["B", "C", 3],
        ["A", "C", 10],
      ],
    ),
  );

  //
}

// task-->199
{
  //
  // final tasks-199 solved------------------------------>783
  // findArticulationPoints
  // Requirement: Find graph vertices whose removal disconnects one or more parts of the dependency network.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    findArticulationPoints(graph) {
      let time = 0;
      const discovery = new Map();
      const low = new Map();
      const parent = new Map();
      const result = new Set();

      const dfs = (node) => {
        discovery.set(node, ++time);
        low.set(node, discovery.get(node));

        let children = 0;

        for (const next of graph[node] ?? []) {
          if (!discovery.has(next)) {
            children++;

            parent.set(next, node);
            dfs(next);

            low.set(node, Math.min(low.get(node), low.get(next)));

            if (!parent.has(node) && children > 1) {
              result.add(node);
            }

            if (parent.has(node) && low.get(next) >= discovery.get(node)) {
              result.add(node);
            }
          } else if (next !== parent.get(node)) {
            low.set(node, Math.min(low.get(node), discovery.get(next)));
          }
        }
      };

      Object.keys(graph).forEach((node) => {
        if (!discovery.has(node)) {
          dfs(node);
        }
      });

      return [...result];
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.findArticulationPoints({
      A: ["B"],
      B: ["A", "C", "D"],
      C: ["B", "D"],
      D: ["B", "C"],
    }),
  );

  //
}

// task-->200
{
  //
  // final tasks-200 solved------------------------------>784
  // findBridges
  // Requirement: Identify graph edges whose removal disconnects the dependency graph.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    findBridges(graph) {
      let time = 0;
      const tin = new Map();
      const low = new Map();
      const parent = new Map();
      const bridges = [];

      const dfs = (node) => {
        tin.set(node, ++time);
        low.set(node, tin.get(node));

        for (const next of graph[node] ?? []) {
          if (next === parent.get(node)) continue;

          if (!tin.has(next)) {
            parent.set(next, node);
            dfs(next);

            low.set(node, Math.min(low.get(node), low.get(next)));

            if (low.get(next) > tin.get(node)) {
              bridges.push([node, next]);
            }
          } else {
            low.set(node, Math.min(low.get(node), tin.get(next)));
          }
        }
      };

      Object.keys(graph).forEach((node) => {
        if (!tin.has(node)) dfs(node);
      });

      return bridges;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.findBridges({
      A: ["B"],
      B: ["A", "C"],
      C: ["B"],
    }),
  );

  //
}

// task-->201
{
  //
  // final tasks-201 solved------------------------------>785
  // kruskalMinimumSpanningTree
  // Requirement: Connect all worker nodes with minimum total link cost using Kruskal's algorithm.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    kruskalMinimumSpanningTree(vertices, edges) {
      const parent = new Map(vertices.map((v) => [v, v]));

      const find = (x) => {
        if (parent.get(x) !== x) {
          parent.set(x, find(parent.get(x)));
        }

        return parent.get(x);
      };

      const union = (a, b) => {
        const ra = find(a);
        const rb = find(b);

        if (ra === rb) return false;

        parent.set(rb, ra);
        return true;
      };

      const result = [];
      let cost = 0;

      for (const edge of [...edges].sort((a, b) => a[2] - b[2])) {
        const [a, b, weight] = edge;

        if (union(a, b)) {
          result.push(edge);
          cost += weight;
        }
      }

      return {
        cost,
        edges: result,
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.kruskalMinimumSpanningTree(
      ["A", "B", "C"],
      [
        ["A", "B", 4],
        ["B", "C", 2],
        ["A", "C", 5],
      ],
    ),
  );

  //
}

// ------------------Finished 785-js-problem-solves----------------------------->
