// task-->27
{
  //
  // final tasks-27 solved------------------------------>611
  // createTrieIndex
  // Requirement: Build a Trie from todo names and support prefix-based lookup without scanning every todo.
  class TodoApp {
    constructor() {
      this.todos = [];
      this.trie = {
        children: new Map(),
        indexes: new Set(),
      };
    }

    addTodo(name, category, time) {
      const todo = {
        name,
        category,
        time,
        completed: false,
      };

      const index = this.todos.push(todo) - 1;
      let node = this.trie;

      for (const char of name.toLowerCase()) {
        if (!node.children.has(char)) {
          node.children.set(char, {
            children: new Map(),
            indexes: new Set(),
          });
        }

        node = node.children.get(char);
        node.indexes.add(index);
      }
    }

    searchByPrefix(prefix) {
      let node = this.trie;

      for (const char of prefix.toLowerCase()) {
        node = node.children.get(char);

        if (!node) {
          return [];
        }
      }

      return [...node.indexes].map(
        (index) => this.todos[index]
      );
    }
  }

  // Example
  const myTodos = new TodoApp();

  myTodos.addTodo(
    "JavaScript Architecture",
    "Learning",
    "4 hours"
  );

  myTodos.addTodo(
    "JavaScript Algorithms",
    "Learning",
    "5 hours"
  );

  myTodos.addTodo(
    "JavaScript Testing",
    "Learning",
    "3 hours"
  );

  console.log(
    myTodos.searchByPrefix("javascript a")
  );

  //
}

// task-->28
{
  //
  // final tasks-28 solved------------------------------>612
  // mergeTimeIntervals
  // Requirement: Merge overlapping todo time intervals and return the minimal non-overlapping schedule.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    addTodo(
      name,
      category,
      start,
      end
    ) {
      this.todos.push({
        name,
        category,
        start,
        end,
        completed: false,
      });
    }

    mergeTimeIntervals() {
      const intervals = this.todos
        .map((todo) => ({
          name: todo.name,
          start: todo.start,
          end: todo.end,
        }))
        .sort((a, b) => a.start - b.start);

      const merged = [];

      for (const current of intervals) {
        const last = merged.at(-1);

        if (!last || current.start > last.end) {
          merged.push({ ...current });
          continue;
        }

        last.end = Math.max(
          last.end,
          current.end
        );

        last.name = `${last.name} + ${current.name}`;
      }

      return merged;
    }
  }

  // Example
  const myTodos = new TodoApp();

  myTodos.addTodo(
    "Study",
    "Learning",
    9,
    11
  );

  myTodos.addTodo(
    "Code",
    "Learning",
    10,
    13
  );

  myTodos.addTodo(
    "Exercise",
    "Health",
    14,
    15
  );

  myTodos.addTodo(
    "Read",
    "Study",
    14.5,
    16
  );

  console.log(
    myTodos.mergeTimeIntervals()
  );

  //
}

// task-->29
{
  //
  // final tasks-29 solved------------------------------>613
  // createMinHeapScheduler
  // Requirement: Schedule incomplete todos by minimum execution time using a binary min-heap.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    addTodo(name, category, time) {
      this.todos.push({
        name,
        category,
        time: Number(time),
        completed: false,
      });
    }

    createMinHeapScheduler() {
      const heap = [];

      const push = (todo) => {
        heap.push(todo);

        let index = heap.length - 1;

        while (index > 0) {
          const parent = Math.floor(
            (index - 1) / 2
          );

          if (
            heap[parent].time <=
            heap[index].time
          ) {
            break;
          }

          [heap[parent], heap[index]] = [
            heap[index],
            heap[parent],
          ];

          index = parent;
        }
      };

      const pop = () => {
        if (!heap.length) {
          return undefined;
        }

        const root = heap[0];
        const last = heap.pop();

        if (heap.length) {
          heap[0] = last;

          let index = 0;

          while (true) {
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            let smallest = index;

            if (
              left < heap.length &&
              heap[left].time <
                heap[smallest].time
            ) {
              smallest = left;
            }

            if (
              right < heap.length &&
              heap[right].time <
                heap[smallest].time
            ) {
              smallest = right;
            }

            if (smallest === index) {
              break;
            }

            [heap[index], heap[smallest]] = [
              heap[smallest],
              heap[index],
            ];

            index = smallest;
          }
        }

        return root;
      };

      this.todos
        .filter((todo) => !todo.completed)
        .forEach(push);

      const result = [];

      while (heap.length) {
        result.push(pop());
      }

      return result;
    }
  }

  // Example
  const myTodos = new TodoApp();

  myTodos.addTodo(
    "Long Project",
    "Learning",
    8
  );

  myTodos.addTodo(
    "Quick Fix",
    "Personal",
    1
  );

  myTodos.addTodo(
    "Documentation",
    "Learning",
    3
  );

  console.log(
    myTodos.createMinHeapScheduler()
  );

  //
}

// task-->30
{
  //
  // final tasks-30 solved------------------------------>614
  // unionTodoGroups
  // Requirement: Group todos connected through shared dependencies using a disjoint-set union structure.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    addTodo(name, category, time) {
      this.todos.push({
        name,
        category,
        time,
        dependencies: [],
        completed: false,
      });
    }

    addDependency(name, dependency) {
      const todo = this.todos.find(
        (item) => item.name === name
      );

      if (todo) {
        todo.dependencies.push(dependency);
      }
    }

    unionTodoGroups() {
      const parent = new Map();

      const find = (name) => {
        if (parent.get(name) !== name) {
          parent.set(
            name,
            find(parent.get(name))
          );
        }

        return parent.get(name);
      };

      const union = (a, b) => {
        const rootA = find(a);
        const rootB = find(b);

        if (rootA !== rootB) {
          parent.set(rootB, rootA);
        }
      };

      for (const todo of this.todos) {
        parent.set(todo.name, todo.name);
      }

      for (const todo of this.todos) {
        for (const dependency of todo.dependencies) {
          if (parent.has(dependency)) {
            union(todo.name, dependency);
          }
        }
      }

      const groups = new Map();

      for (const todo of this.todos) {
        const root = find(todo.name);

        if (!groups.has(root)) {
          groups.set(root, []);
        }

        groups.get(root).push(todo.name);
      }

      return [...groups.values()];
    }
  }

  // Example
  const myTodos = new TodoApp();

  myTodos.addTodo(
    "API Design",
    "Learning",
    "3 hours"
  );

  myTodos.addTodo(
    "Database Design",
    "Learning",
    "4 hours"
  );

  myTodos.addTodo(
    "API Implementation",
    "Learning",
    "6 hours"
  );

  myTodos.addDependency(
    "API Implementation",
    "API Design"
  );

  myTodos.addDependency(
    "API Implementation",
    "Database Design"
  );

  console.log(
    myTodos.unionTodoGroups()
  );

  //
}

// task-->31
{
  //
  // final tasks-31 solved------------------------------>615
  // evaluateExpression
  // Requirement: Parse and evaluate arithmetic expressions without using eval or Function constructors.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    evaluateExpression(expression) {
      const tokens = expression.match(
        /\d+(?:\.\d+)?|[()+\-*/]/g
      );

      if (!tokens) {
        throw new Error("Invalid expression");
      }

      let position = 0;

      const parseExpression = () => {
        let value = parseTerm();

        while (
          tokens[position] === "+" ||
          tokens[position] === "-"
        ) {
          const operator = tokens[position++];
          const right = parseTerm();

          value =
            operator === "+"
              ? value + right
              : value - right;
        }

        return value;
      };

      const parseTerm = () => {
        let value = parseFactor();

        while (
          tokens[position] === "*" ||
          tokens[position] === "/"
        ) {
          const operator = tokens[position++];
          const right = parseFactor();

          value =
            operator === "*"
              ? value * right
              : value / right;
        }

        return value;
      };

      const parseFactor = () => {
        const token = tokens[position++];

        if (token === "(") {
          const value = parseExpression();

          if (tokens[position++] !== ")") {
            throw new Error(
              "Missing closing parenthesis"
            );
          }

          return value;
        }

        const number = Number(token);

        if (Number.isNaN(number)) {
          throw new Error(
            `Unexpected token: ${token}`
          );
        }

        return number;
      };

      const result = parseExpression();

      if (position !== tokens.length) {
        throw new Error("Unexpected token");
      }

      return result;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.evaluateExpression(
      "10 + 4 * (8 - 3) / 2"
    )
  );

  //
}

// ------------------Finished 615-js-problem-solves----------------------------->