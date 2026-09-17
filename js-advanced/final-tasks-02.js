// task-->17
{
  //
  // final tasks-17 solved------------------------------>601
  // executeAsync
  // Requirement: Execute an async function for every todo with a concurrency limit.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    addTodo(name, category, time) {
      this.todos.push({
        name,
        category,
        time,
        completed: false,
      });
    }

    async executeAsync(asyncFn, concurrency = 2) {
      if (typeof asyncFn !== "function") {
        throw new TypeError("asyncFn must be a function");
      }

      if (!Number.isInteger(concurrency) || concurrency < 1) {
        throw new RangeError("concurrency must be a positive integer");
      }

      const results = new Array(this.todos.length);
      let nextIndex = 0;

      const worker = async () => {
        while (true) {
          const currentIndex = nextIndex++;

          if (currentIndex >= this.todos.length) {
            break;
          }

          results[currentIndex] = await asyncFn(
            this.todos[currentIndex],
            currentIndex
          );
        }
      };

      const workerCount = Math.min(concurrency, this.todos.length);

      await Promise.all(
        Array.from({ length: workerCount }, () => worker())
      );

      return results;
    }
  }

  // Example
  const myTodos = new TodoApp();
  myTodos.addTodo("Learn JavaScript", "Learning", "3 hours");
  myTodos.addTodo("Build API", "Learning", "4 hours");
  myTodos.addTodo("Read Book", "Study", "2 hours");
  myTodos.addTodo("Exercise", "Health", "1 hour");

  myTodos
    .executeAsync(
      async (todo, index) => {
        await new Promise((resolve) =>
          setTimeout(resolve, 200)
        );

        return {
          index,
          name: todo.name,
          processed: true,
        };
      },
      2
    )
    .then(console.log);

  //
}

// task-->18
{
  //
  // final tasks-18 solved------------------------------>602
  // retryTodoOperation
  // Requirement: Retry an async todo operation with exponential backoff.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    addTodo(name, category, time) {
      this.todos.push({
        name,
        category,
        time,
        completed: false,
      });
    }

    async retryTodoOperation(
      name,
      asyncFn,
      maxRetries = 3,
      baseDelay = 100
    ) {
      const todo = this.todos.find((t) => t.name === name);

      if (!todo) {
        return {
          success: false,
          attempts: 0,
          error: new Error("Todo not found"),
        };
      }

      let attempts = 0;
      let lastError;

      while (attempts <= maxRetries) {
        attempts++;

        try {
          const result = await asyncFn(todo, attempts);

          return {
            success: true,
            attempts,
            result,
          };
        } catch (error) {
          lastError = error;

          if (attempts > maxRetries) {
            break;
          }

          const delay = baseDelay * 2 ** (attempts - 1);

          await new Promise((resolve) =>
            setTimeout(resolve, delay)
          );
        }
      }

      return {
        success: false,
        attempts,
        error: lastError,
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  myTodos.addTodo(
    "Upload Project",
    "Learning",
    "2 hours"
  );

  let failureCount = 0;

  myTodos
    .retryTodoOperation(
      "Upload Project",
      async (todo) => {
        failureCount++;

        if (failureCount < 3) {
          throw new Error("Temporary failure");
        }

        return `Operation completed for ${todo.name}`;
      },
      4,
      100
    )
    .then(console.log);

  //
}

// task-->19
{
  //
  // final tasks-19 solved------------------------------>603
  // createSnapshot
  // Requirement: Create an immutable snapshot of the current todo state and restore it later.
  class TodoApp {
    constructor() {
      this.todos = [];
      this.snapshots = new Map();
      this.snapshotCounter = 0;
    }

    addTodo(name, category, time) {
      this.todos.push({
        name,
        category,
        time,
        completed: false,
      });
    }

    completeTodo(name) {
      const todo = this.todos.find((t) => t.name === name);

      if (!todo) {
        return false;
      }

      todo.completed = true;
      return true;
    }

    createSnapshot() {
      const id = ++this.snapshotCounter;

      const snapshot = structuredClone(this.todos);

      this.snapshots.set(
        id,
        Object.freeze(snapshot)
      );

      return id;
    }

    restoreSnapshot(id) {
      if (!this.snapshots.has(id)) {
        return false;
      }

      this.todos = structuredClone(
        this.snapshots.get(id)
      );

      return true;
    }
  }

  // Example
  const myTodos = new TodoApp();

  myTodos.addTodo(
    "Learn TypeScript",
    "Learning",
    "4 hours"
  );

  const snapshotId = myTodos.createSnapshot();

  myTodos.completeTodo("Learn TypeScript");

  console.log("Before restore:", myTodos.todos);

  myTodos.restoreSnapshot(snapshotId);

  console.log("After restore:", myTodos.todos);

  //
}

// task-->20
{
  //
  // final tasks-20 solved------------------------------>604
  // memoizedTodoSearch
  // Requirement: Search todos using a memoized function so repeated queries reuse cached results.
  class TodoApp {
    constructor() {
      this.todos = [];
      this.searchCache = new Map();
    }

    addTodo(name, category, time) {
      this.todos.push({
        name,
        category,
        time,
        completed: false,
      });

      this.searchCache.clear();
    }

    memoizedTodoSearch(query) {
      if (this.searchCache.has(query)) {
        return this.searchCache.get(query);
      }

      const normalizedQuery = String(query)
        .trim()
        .toLowerCase();

      const result = this.todos.filter((todo) => {
        const name = todo.name.toLowerCase();
        const category = todo.category.toLowerCase();

        return (
          name.includes(normalizedQuery) ||
          category.includes(normalizedQuery)
        );
      });

      const frozenResult = Object.freeze(
        structuredClone(result)
      );

      this.searchCache.set(query, frozenResult);

      return frozenResult;
    }
  }

  // Example
  const myTodos = new TodoApp();

  myTodos.addTodo(
    "Learn JavaScript",
    "Learning",
    "3 hours"
  );

  myTodos.addTodo(
    "JavaScript Project",
    "Learning",
    "5 hours"
  );

  console.log(
    myTodos.memoizedTodoSearch("javascript")
  );

  console.log(
    myTodos.memoizedTodoSearch("javascript")
  );

  //
}

// task-->21
{
  //
  // final tasks-21 solved------------------------------>605
  // createEventSystem
  // Requirement: Create a custom event system with on, once, off and emit methods.
  class TodoApp {
    constructor() {
      this.todos = [];
      this.events = new Map();
    }

    addTodo(name, category, time) {
      const todo = {
        name,
        category,
        time,
        completed: false,
      };

      this.todos.push(todo);

      this.emit("todoAdded", todo);

      return todo;
    }

    on(eventName, listener) {
      if (typeof listener !== "function") {
        throw new TypeError("Listener must be a function");
      }

      if (!this.events.has(eventName)) {
        this.events.set(eventName, new Set());
      }

      this.events.get(eventName).add(listener);

      return () => this.off(eventName, listener);
    }

    once(eventName, listener) {
      const wrapper = (...args) => {
        this.off(eventName, wrapper);
        listener(...args);
      };

      return this.on(eventName, wrapper);
    }

    off(eventName, listener) {
      const listeners = this.events.get(eventName);

      if (!listeners) {
        return false;
      }

      const removed = listeners.delete(listener);

      if (listeners.size === 0) {
        this.events.delete(eventName);
      }

      return removed;
    }

    emit(eventName, ...args) {
      const listeners = this.events.get(eventName);

      if (!listeners) {
        return false;
      }

      for (const listener of [...listeners]) {
        listener(...args);
      }

      return true;
    }
  }

  // Example
  const myTodos = new TodoApp();

  myTodos.on("todoAdded", (todo) => {
    console.log("Todo added:", todo.name);
  });

  myTodos.once("todoAdded", () => {
    console.log("This runs only once");
  });

  myTodos.addTodo(
    "Study Node.js",
    "Learning",
    "3 hours"
  );

  myTodos.addTodo(
    "Build Express API",
    "Learning",
    "5 hours"
  );

  //
}