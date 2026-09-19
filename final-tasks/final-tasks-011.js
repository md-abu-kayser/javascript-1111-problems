// task-->62
{
  //
  // final tasks-62 solved------------------------------>646
  // dijkstraTodoGraph
  // Requirement: Find the minimum-cost dependency path between two todos using Dijkstra's algorithm.
  class TodoApp {
    constructor() {
      this.todos = [];
      this.graph = new Map();
    }

    addTodo(name, category, time) {
      this.todos.push({
        name,
        category,
        time,
        completed: false,
      });

      this.graph.set(
        name,
        []
      );
    }

    addDependency(
      from,
      to,
      cost = 1
    ) {
      this.graph
        .get(from)
        .push({
          to,
          cost,
        });
    }

    dijkstraTodoGraph(
      start,
      destination
    ) {
      const distances = new Map();
      const previous = new Map();
      const unvisited = new Set(
        this.graph.keys()
      );

      for (const name of unvisited) {
        distances.set(
          name,
          Infinity
        );
      }

      distances.set(start, 0);

      while (unvisited.size) {
        let current = null;

        for (const node of unvisited) {
          if (
            current === null ||
            distances.get(node) <
              distances.get(current)
          ) {
            current = node;
          }
        }

        if (
          current === null ||
          distances.get(current) === Infinity
        ) {
          break;
        }

        unvisited.delete(current);

        for (const edge of this.graph.get(
          current
        )) {
          const candidate =
            distances.get(current) +
            edge.cost;

          if (
            candidate <
            distances.get(edge.to)
          ) {
            distances.set(
              edge.to,
              candidate
            );

            previous.set(
              edge.to,
              current
            );
          }
        }
      }

      if (
        distances.get(destination) ===
        Infinity
      ) {
        return null;
      }

      const path = [];

      for (
        let current = destination;
        current;
        current = previous.get(current)
      ) {
        path.unshift(current);
      }

      return {
        cost: distances.get(
          destination
        ),
        path,
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  myTodos.addTodo(
    "Research",
    "Learning",
    "2 hours"
  );

  myTodos.addTodo(
    "Design",
    "Learning",
    "3 hours"
  );

  myTodos.addTodo(
    "Implement",
    "Learning",
    "5 hours"
  );

  myTodos.addDependency(
    "Research",
    "Design",
    2
  );

  myTodos.addDependency(
    "Research",
    "Implement",
    10
  );

  myTodos.addDependency(
    "Design",
    "Implement",
    3
  );

  console.log(
    myTodos.dijkstraTodoGraph(
      "Research",
      "Implement"
    )
  );

  //
}

// task-->63
{
  //
  // final tasks-63 solved------------------------------>647
  // createAStarScheduler
  // Requirement: Find an efficient path through todo states using A* with a heuristic function.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createAStarScheduler(
      start,
      goal,
      neighbors,
      heuristic
    ) {
      const open = new Set([start]);
      const cameFrom = new Map();

      const gScore = new Map([
        [start, 0],
      ]);

      const fScore = new Map([
        [start, heuristic(start, goal)],
      ]);

      while (open.size) {
        let current = null;

        for (const node of open) {
          if (
            current === null ||
            (fScore.get(node) ?? Infinity) <
              (fScore.get(current) ??
                Infinity)
          ) {
            current = node;
          }
        }

        if (current === goal) {
          const path = [];

          while (current !== undefined) {
            path.unshift(current);
            current =
              cameFrom.get(current);
          }

          return path;
        }

        open.delete(current);

        for (const {
          node,
          cost,
        } of neighbors(current)) {
          const tentative =
            (gScore.get(current) ??
              Infinity) + cost;

          if (
            tentative <
            (gScore.get(node) ??
              Infinity)
          ) {
            cameFrom.set(
              node,
              current
            );

            gScore.set(
              node,
              tentative
            );

            fScore.set(
              node,
              tentative +
                heuristic(
                  node,
                  goal
                )
            );

            open.add(node);
          }
        }
      }

      return null;
    }
  }

  // Example
  const myTodos = new TodoApp();

  const graph = {
    A: [
      { node: "B", cost: 1 },
      { node: "C", cost: 4 },
    ],
    B: [
      { node: "D", cost: 2 },
    ],
    C: [
      { node: "D", cost: 1 },
    ],
    D: [],
  };

  console.log(
    myTodos.createAStarScheduler(
      "A",
      "D",
      (node) => graph[node],
      (node, goal) =>
        Math.abs(
          node.charCodeAt(0) -
            goal.charCodeAt(0)
        )
    )
  );

  //
}

// task-->64
{
  //
  // final tasks-64 solved------------------------------>648
  // findStronglyConnectedComponents
  // Requirement: Detect strongly connected todo dependency groups using Tarjan's algorithm.
  class TodoApp {
    constructor() {
      this.graph = new Map();
    }

    addTodo(name) {
      this.graph.set(name, []);
    }

    addDependency(from, to) {
      this.graph.get(from).push(to);
    }

    findStronglyConnectedComponents() {
      let index = 0;

      const stack = [];
      const onStack = new Set();

      const indexes = new Map();
      const lowLinks = new Map();

      const components = [];

      const visit = (node) => {
        indexes.set(node, index);
        lowLinks.set(node, index);

        index++;

        stack.push(node);
        onStack.add(node);

        for (const next of this.graph.get(
          node
        )) {
          if (!indexes.has(next)) {
            visit(next);

            lowLinks.set(
              node,
              Math.min(
                lowLinks.get(node),
                lowLinks.get(next)
              )
            );
          } else if (
            onStack.has(next)
          ) {
            lowLinks.set(
              node,
              Math.min(
                lowLinks.get(node),
                indexes.get(next)
              )
            );
          }
        }

        if (
          lowLinks.get(node) ===
          indexes.get(node)
        ) {
          const component = [];

          let current;

          do {
            current = stack.pop();
            onStack.delete(current);
            component.push(current);
          } while (current !== node);

          components.push(component);
        }
      };

      for (const node of this.graph.keys()) {
        if (!indexes.has(node)) {
          visit(node);
        }
      }

      return components;
    }
  }

  // Example
  const myTodos =
    new TodoApp();

  for (const name of [
    "A",
    "B",
    "C",
    "D",
  ]) {
    myTodos.addTodo(name);
  }

  myTodos.addDependency("A", "B");
  myTodos.addDependency("B", "C");
  myTodos.addDependency("C", "A");
  myTodos.addDependency("C", "D");

  console.log(
    myTodos.findStronglyConnectedComponents()
  );

  //
}

// task-->65
{
  //
  // final tasks-65 solved------------------------------>649
  // createMaxFlow
  // Requirement: Calculate maximum parallel execution capacity between todo resources using the Edmonds-Karp algorithm.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createMaxFlow(
      capacityGraph,
      source,
      sink
    ) {
      const residual =
        structuredClone(capacityGraph);

      let maxFlow = 0;

      const bfs = () => {
        const parent = new Map([
          [source, null],
        ]);

        const queue = [source];

        while (queue.length) {
          const current = queue.shift();

          for (const neighbor of Object.keys(
            residual[current] ?? {}
          )) {
            if (
              !parent.has(neighbor) &&
              residual[current][neighbor] > 0
            ) {
              parent.set(
                neighbor,
                current
              );

              if (
                neighbor === sink
              ) {
                return parent;
              }

              queue.push(neighbor);
            }
          }
        }

        return null;
      };

      while (true) {
        const parent = bfs();

        if (!parent) {
          break;
        }

        let pathFlow = Infinity;

        for (
          let node = sink;
          node !== source;
          node = parent.get(node)
        ) {
          const previous =
            parent.get(node);

          pathFlow = Math.min(
            pathFlow,
            residual[previous][node]
          );
        }

        for (
          let node = sink;
          node !== source;
          node = parent.get(node)
        ) {
          const previous =
            parent.get(node);

          residual[previous][node] -=
            pathFlow;

          residual[node] ??= {};
          residual[node][previous] ??= 0;

          residual[node][previous] +=
            pathFlow;
        }

        maxFlow += pathFlow;
      }

      return maxFlow;
    }
  }

  // Example
  const myTodos = new TodoApp();

  const capacityGraph = {
    start: {
      A: 10,
      B: 5,
    },
    A: {
      B: 15,
      end: 10,
    },
    B: {
      end: 10,
    },
    end: {},
  };

  console.log(
    myTodos.createMaxFlow(
      capacityGraph,
      "start",
      "end"
    )
  );

  //
}

// task-->66
{
  //
  // final tasks-66 solved------------------------------>650
  // createBipartiteAssignment
  // Requirement: Find a maximum matching between todo workers and specialized tasks using augmenting paths.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createBipartiteAssignment(
      workers,
      taskMap
    ) {
      const assigned = new Map();

      const visit = (
        worker,
        seen
      ) => {
        for (const task of (
          taskMap[worker] ?? []
        )) {
          if (seen.has(task)) {
            continue;
          }

          seen.add(task);

          if (
            !assigned.has(task) ||
            visit(
              assigned.get(task),
              seen
            )
          ) {
            assigned.set(task, worker);
            return true;
          }
        }

        return false;
      };

      for (const worker of workers) {
        visit(worker, new Set());
      }

      return [...assigned].map(
        ([task, worker]) => ({
          worker,
          task,
        })
      );
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.createBipartiteAssignment(
      ["Alice", "Bob", "Cara"],
      {
        Alice: [
          "Testing",
          "Frontend",
        ],
        Bob: [
          "Frontend",
          "Backend",
        ],
        Cara: [
          "Backend",
        ],
      }
    )
  );

  //
}

// ------------------Finished 650-js-problem-solves----------------------------->