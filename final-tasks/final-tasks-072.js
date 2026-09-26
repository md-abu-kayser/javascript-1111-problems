// task-->367
{
  //
  // final tasks-367 solved------------------------------>951
  // createJohnsonReweighting
  // Requirement: Reweight graph edges so Dijkstra can be used on graphs with negative but cycle-free edges.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createJohnsonReweighting(edges, potential) {
      return edges.map(([from, to, weight]) => [
        from,
        to,
        weight + potential[from] - potential[to],
      ]);
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.createJohnsonReweighting([["a", "b", -2]], { a: 3, b: 1 }),
  );

  //
}

// task-->368
{
  //
  // final tasks-368 solved------------------------------>952
  // createTopologicalLevels
  // Requirement: Assign each DAG node the earliest dependency depth.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createTopologicalLevels(graph) {
      const memo = new Map();
      const visit = (node) => {
        if (memo.has(node)) return memo.get(node);
        const depth = (graph[node] ?? []).length
          ? 1 + Math.max(...graph[node].map(visit))
          : 0;
        memo.set(node, depth);
        return depth;
      };
      Object.keys(graph).forEach(visit);
      return Object.fromEntries(memo);
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.createTopologicalLevels({
      a: [],
      b: ["a"],
      c: ["a", "b"],
    }),
  );

  //
}

// task-->369
{
  //
  // final tasks-369 solved------------------------------>953
  // createReachabilityIndex
  // Requirement: Precompute transitive reachability using bitset-style integer sets for compact graph queries.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createReachabilityIndex(graph) {
      const nodes = Object.keys(graph);
      const ids = new Map(nodes.map((n, i) => [n, i]));
      const reach = new Array(nodes.length).fill(0);
      for (let i = nodes.length - 1; i >= 0; i--) {
        let mask = 0;
        for (const next of graph[nodes[i]] ?? []) {
          mask |= 1 << ids.get(next);
          mask |= reach[ids.get(next)];
        }
        reach[i] = mask;
      }
      return {
        canReach(from, to) {
          return Boolean(reach[ids.get(from)] & (1 << ids.get(to)));
        },
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const reach = myTodos.createReachabilityIndex({
    a: ["b"],
    b: ["c"],
    c: [],
  });
  console.log(reach.canReach("a", "c"));

  //
}

// task-->370
{
  //
  // final tasks-370 solved------------------------------>954
  // createGraphContraction
  // Requirement: Contract connected node pairs while preserving aggregate edge weights.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createGraphContraction(edges, pair) {
      const [a, b] = pair;
      return edges
        .map(([from, to, weight]) => [
          from === b ? a : from,
          to === b ? a : to,
          weight,
        ])
        .filter(([from, to]) => from !== to);
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.createGraphContraction(
      [
        ["a", "b", 4],
        ["b", "c", 2],
      ],
      ["a", "b"],
    ),
  );

  //
}

// task-->371
{
  //
  // final tasks-371 solved------------------------------>955
  // createGraphCutEstimate
  // Requirement: Estimate a randomized cut of a graph by sampling a partition and measuring crossing weight.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createGraphCutEstimate(edges, random = Math.random) {
      const side = new Map();
      for (const [from, to] of edges) {
        if (!side.has(from)) side.set(from, random() < 0.5 ? 0 : 1);
        if (!side.has(to)) side.set(to, random() < 0.5 ? 0 : 1);
      }
      return edges.reduce(
        (sum, [from, to, weight = 1]) =>
          sum + (side.get(from) !== side.get(to) ? weight : 0),
        0,
      );
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.createGraphCutEstimate(
      [
        ["a", "b", 3],
        ["b", "c", 2],
      ],
      () => 0.6,
    ),
  );

  //
}

// ------------------Finished 955-js-problem-solves----------------------------->
