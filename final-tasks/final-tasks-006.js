// task-->37
{
  //
  // final tasks-37 solved------------------------------>621
  // createLazyTodoSequence
  // Requirement: Build a lazy iterable pipeline that maps, filters and limits todos without eagerly creating intermediate arrays.
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

    *createLazyTodoSequence(
      mapper = (todo) => todo,
      predicate = () => true,
      limit = Infinity,
    ) {
      let emitted = 0;

      for (const todo of this.todos) {
        if (!predicate(todo)) {
          continue;
        }

        if (emitted >= limit) {
          return;
        }

        yield mapper(todo);
        emitted++;
      }
    }
  }

  // Example
  const myTodos = new TodoApp();

  myTodos.addTodo("Learn JS", "Learning", "3 hours");

  myTodos.addTodo("Learn Go", "Learning", "4 hours");

  myTodos.addTodo("Gym", "Health", "1 hour");

  console.log([
    ...myTodos.createLazyTodoSequence(
      (todo) => ({
        name: todo.name,
        duration: todo.time,
      }),
      (todo) => todo.category === "Learning",
      1,
    ),
  ]);

  //
}

// task-->38
{
  //
  // final tasks-38 solved------------------------------>622
  // deepStructuralEqual
  // Requirement: Compare arbitrarily nested todo metadata including cyclic object graphs without infinite recursion.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    deepStructuralEqual(a, b) {
      const visited = new WeakMap();

      const compare = (left, right) => {
        if (Object.is(left, right)) {
          return true;
        }

        if (
          left === null ||
          right === null ||
          typeof left !== "object" ||
          typeof right !== "object"
        ) {
          return false;
        }

        if (visited.has(left) && visited.get(left) === right) {
          return true;
        }

        visited.set(left, right);

        const leftKeys = Reflect.ownKeys(left);
        const rightKeys = Reflect.ownKeys(right);

        if (leftKeys.length !== rightKeys.length) {
          return false;
        }

        for (const key of leftKeys) {
          if (!rightKeys.includes(key) || !compare(left[key], right[key])) {
            return false;
          }
        }

        return true;
      };

      return compare(a, b);
    }
  }

  // Example
  const myTodos = new TodoApp();

  const first = {
    name: "Project",
    meta: {
      priority: "high",
    },
  };

  const second = {
    name: "Project",
    meta: {
      priority: "high",
    },
  };

  first.self = first;
  second.self = second;

  console.log(myTodos.deepStructuralEqual(first, second));

  //
}

// task-->39
{
  //
  // final tasks-39 solved------------------------------>623
  // createPersistentTodoState
  // Requirement: Create immutable versions of todo state where updates share unchanged structure.
  class TodoApp {
    constructor(todos = []) {
      this.todos = todos;
    }

    createPersistentTodoState(updateFn) {
      const previous = this.todos;

      const draft = previous.map((todo) => ({
        ...todo,
      }));

      updateFn(draft);

      this.todos = Object.freeze(draft);

      return {
        previous,
        current: this.todos,
      };
    }
  }

  // Example
  const myTodos = new TodoApp([
    {
      name: "Learn JS",
      category: "Learning",
      time: "3 hours",
      completed: false,
    },
    {
      name: "Exercise",
      category: "Health",
      time: "1 hour",
      completed: false,
    },
  ]);

  const version = myTodos.createPersistentTodoState((draft) => {
    draft[0] = {
      ...draft[0],
      completed: true,
    };
  });

  console.log("Previous:", version.previous);

  console.log("Current:", version.current);

  //
}

// task-->40
{
  //
  // final tasks-40 solved------------------------------>624
  // createTransducer
  // Requirement: Compose mapping and filtering operations into one reducing pass over todos.
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

    createTransducer(predicate, mapper) {
      return (reducer) => (accumulator, value) => {
        if (!predicate(value)) {
          return accumulator;
        }

        return reducer(accumulator, mapper(value));
      };
    }

    runTransducer(transducer, reducer, initial) {
      const composed = transducer(reducer);

      let accumulator = initial;

      for (const todo of this.todos) {
        accumulator = composed(accumulator, todo);
      }

      return accumulator;
    }
  }

  // Example
  const myTodos = new TodoApp();

  myTodos.addTodo("Learn React", "Learning", "4 hours");

  myTodos.addTodo("Gym", "Health", "1 hour");

  myTodos.addTodo("Learn Node", "Learning", "5 hours");

  const transducer = myTodos.createTransducer(
    (todo) => todo.category === "Learning",
    (todo) => ({
      name: todo.name,
      hours: Number.parseInt(todo.time),
    }),
  );

  const result = myTodos.runTransducer(
    transducer,
    (acc, item) => {
      acc.push(item);
      return acc;
    },
    [],
  );

  console.log(result);

  //
}

// task-->41
{
  //
  // final tasks-41 solved------------------------------>625
  // createLens
  // Requirement: Create composable getter/setter lenses for safely updating deeply nested todo configuration.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createLens(getter, setter) {
      return {
        get: getter,
        set: setter,

        compose(nextLens) {
          return this.createNestedLens(getter, setter, nextLens);
        },
      };
    }

    createNestedLens(outerGetter, outerSetter, innerLens) {
      return {
        get: (source) => innerLens.get(outerGetter(source)),

        set: (source, value) => {
          const outerValue = structuredClone(outerGetter(source));

          const updated = innerLens.set(outerValue, value);

          return outerSetter(source, updated);
        },
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const todo = {
    name: "Architecture",
    metadata: {
      scheduling: {
        priority: 10,
      },
    },
  };

  const metadataLens = myTodos.createLens(
    (source) => source.metadata,
    (source, value) => ({
      ...source,
      metadata: value,
    }),
  );

  const schedulingLens = myTodos.createLens(
    (source) => source.scheduling,
    (source, value) => ({
      ...source,
      scheduling: value,
    }),
  );

  const priorityLens = myTodos.createLens(
    (source) => source.priority,
    (source, value) => ({
      ...source,
      priority: value,
    }),
  );

  const composed = myTodos.createNestedLens(
    (source) => source.metadata,
    (source, value) => ({
      ...source,
      metadata: value,
    }),
    schedulingLens,
  );

  const updated = myTodos
    .createNestedLens(composed.get, composed.set, priorityLens)
    .set(todo, 99);

  console.log(updated);

  //
}

// ------------------Finished 625-js-problem-solves----------------------------->
