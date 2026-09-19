// task-->152
{
  //
  // final tasks-152 solved------------------------------>736
  // createGCounter
  // Requirement: Implement a grow-only distributed counter that merges replica state monotonically.
  class TodoApp {
    constructor(replicaId) {
      this.todos = [];
      this.replicaId = replicaId;
      this.counts = new Map();
      this.counts.set(replicaId, 0);
    }

    createGCounter() {
      return {
        increment: (amount = 1) => {
          this.counts.set(
            this.replicaId,
            this.counts.get(this.replicaId) + amount
          );
        },

        value: () =>
          [...this.counts.values()].reduce(
            (sum, value) => sum + value,
            0
          ),

        merge: (remote) => {
          for (const [id, value] of remote) {
            this.counts.set(
              id,
              Math.max(
                this.counts.get(id) ?? 0,
                value
              )
            );
          }
        },

        state: () => new Map(this.counts),
      };
    }
  }

  // Example
  const myTodos = new TodoApp("A");
  const counter = myTodos.createGCounter();

  counter.increment(3);
  counter.merge(
    new Map([
      ["B", 5],
    ])
  );

  console.log(counter.value());

  //
}

// task-->153
{
  //
  // final tasks-153 solved------------------------------>737
  // createLwwRegister
  // Requirement: Resolve replicated writes using timestamp ordering with deterministic replica tie-breaking.
  class TodoApp {
    constructor(replicaId) {
      this.todos = [];
      this.replicaId = replicaId;
      this.register = null;
    }

    createLwwRegister() {
      const write = (value, timestamp) => {
        const candidate = {
          value,
          timestamp,
          replicaId: this.replicaId,
        };

        if (
          !this.register ||
          candidate.timestamp >
            this.register.timestamp ||
          (
            candidate.timestamp ===
              this.register.timestamp &&
            candidate.replicaId >
              this.register.replicaId
          )
        ) {
          this.register = candidate;
        }
      };

      return {
        write,
        read: () =>
          this.register
            ? this.register.value
            : undefined,
        merge: (remote) => {
          write.call(
            {
              register: this.register,
            },
            remote.value,
            remote.timestamp
          );

          if (
            !this.register ||
            remote.timestamp >
              this.register.timestamp
          ) {
            this.register = remote;
          }
        },
      };
    }
  }

  // Example
  const myTodos = new TodoApp("node-A");
  const register = myTodos.createLwwRegister();

  register.write("v1", 10);
  register.merge({
    value: "v2",
    timestamp: 12,
    replicaId: "node-B",
  });

  console.log(register.read());

  //
}

// task-->154
{
  //
  // final tasks-154 solved------------------------------>738
  // createGSet
  // Requirement: Build a grow-only set CRDT with idempotent merges.
  class TodoApp {
    constructor() {
      this.todos = [];
      this.items = new Set();
    }

    createGSet() {
      return {
        add: (value) => this.items.add(value),

        has: (value) =>
          this.items.has(value),

        merge: (remote) => {
          for (const value of remote) {
            this.items.add(value);
          }
        },

        values: () => [...this.items],
      };
    }
  }

  // Example
  const myTodos = new TodoApp();
  const set = myTodos.createGSet();

  set.add("js");
  set.merge(
    new Set(["node", "postgres"])
  );

  console.log(set.values());

  //
}

// task-->155
{
  //
  // final tasks-155 solved------------------------------>739
  // createTwoPhaseSet
  // Requirement: Implement an add/remove CRDT where removed items can never become active again.
  class TodoApp {
    constructor() {
      this.todos = [];
      this.added = new Set();
      this.removed = new Set();
    }

    createTwoPhaseSet() {
      return {
        add: (value) => {
          if (!this.removed.has(value)) {
            this.added.add(value);
          }
        },

        remove: (value) => {
          if (this.added.has(value)) {
            this.removed.add(value);
          }
        },

        has: (value) =>
          this.added.has(value) &&
          !this.removed.has(value),

        merge: (remote) => {
          for (const value of remote.added) {
            this.added.add(value);
          }

          for (const value of remote.removed) {
            this.removed.add(value);
          }
        },
      };
    }
  }

  // Example
  const myTodos = new TodoApp();
  const set = myTodos.createTwoPhaseSet();

  set.add("task-A");
  set.remove("task-A");
  set.add("task-A");

  console.log(set.has("task-A"));

  //
}

// task-->156
{
  //
  // final tasks-156 solved------------------------------>740
  // createObservedRemoveSet
  // Requirement: Allow concurrent add/remove operations while preserving causally newer add tags.
  class TodoApp {
    constructor(replicaId) {
      this.todos = [];
      this.replicaId = replicaId;
      this.adds = new Map();
      this.removes = new Set();
      this.sequence = 0;
    }

    createObservedRemoveSet() {
      const add = (value) => {
        const tag =
          `${this.replicaId}:${++this.sequence}`;

        if (!this.adds.has(value)) {
          this.adds.set(value, new Set());
        }

        this.adds.get(value).add(tag);
        return tag;
      };

      const remove = (value) => {
        for (const tag of this.adds.get(value) ?? []) {
          this.removes.add(tag);
        }
      };

      const has = (value) =>
        [...(this.adds.get(value) ?? [])].some(
          (tag) => !this.removes.has(tag)
        );

      const merge = (remote) => {
        for (const [value, tags] of remote.adds) {
          if (!this.adds.has(value)) {
            this.adds.set(value, new Set());
          }

          for (const tag of tags) {
            this.adds.get(value).add(tag);
          }
        }

        for (const tag of remote.removes) {
          this.removes.add(tag);
        }
      };

      return {
        add,
        remove,
        has,
        merge,
      };
    }
  }

  // Example
  const myTodos = new TodoApp("A");
  const set = myTodos.createObservedRemoveSet();

  set.add("distributed-task");
  set.remove("distributed-task");

  console.log(set.has("distributed-task"));

  //
}

// ------------------Finished 740-js-problem-solves----------------------------->