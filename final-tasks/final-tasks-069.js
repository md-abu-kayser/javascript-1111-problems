// task-->352
{
  //
  // final tasks-352 solved------------------------------>936
  // createWatermarkTracker
  // Requirement: Advance an event-time watermark from observed source timestamps while retaining out-of-order tolerance.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createWatermarkTracker(lateness) {
      let maxSeen = -Infinity;
      let watermark = -Infinity;
      return {
        observe(timestamp) {
          maxSeen = Math.max(maxSeen, timestamp);
          watermark = maxSeen - lateness;
          return watermark;
        },
        current: () => watermark,
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const wm = myTodos.createWatermarkTracker(5000);
  console.log(wm.observe(10000));
  console.log(wm.observe(14000));

  //
}

// task-->353
{
  //
  // final tasks-353 solved------------------------------>937
  // createEventTimeJoin
  // Requirement: Join two bounded event-time streams by key while expiring state behind the watermark.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createEventTimeJoin(windowMs) {
      const left = new Map();
      const right = new Map();
      const join = (store, event) => {
        if (!store.has(event.key)) store.set(event.key, []);
        store.get(event.key).push(event);
      };
      return {
        addLeft(event) {
          join(left, event);
        },
        addRight(event) {
          join(right, event);
        },
        match(key, time) {
          return (left.get(key) ?? []).flatMap((l) =>
            (right.get(key) ?? []).filter(
              (r) => Math.abs(l.time - r.time) <= windowMs,
            ),
          );
        },
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const join = myTodos.createEventTimeJoin(100);
  join.addLeft({ key: "a", time: 100 });
  join.addRight({ key: "a", time: 150, value: 2 });
  console.log(join.match("a", 150));

  //
}

// task-->354
{
  //
  // final tasks-354 solved------------------------------>938
  // createWatermarkWindow
  // Requirement: Emit a window only after its end timestamp is behind the current watermark.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createWatermarkWindow(size, lateness) {
      let watermark = -Infinity;
      const windows = new Map();
      return {
        observe(event) {
          watermark = Math.max(watermark, event.time - lateness);
          const id = Math.floor(event.time / size);
          if (!windows.has(id)) windows.set(id, []);
          windows.get(id).push(event);
          const ready = [];
          for (const [key, values] of windows) {
            if ((key + 1) * size <= watermark) {
              ready.push({ key, values: windows.get(key) });
              windows.delete(key);
            }
          }
          return ready;
        },
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const window = myTodos.createWatermarkWindow(1000, 100);
  console.log(window.observe({ time: 1200, value: 1 }));
  console.log(window.observe({ time: 2500, value: 2 }));

  //
}

// task-->355
{
  //
  // final tasks-355 solved------------------------------>939
  // createExactlyOnceAccumulator
  // Requirement: Apply each event id once to a running aggregate and ignore redeliveries.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createExactlyOnceAccumulator(reducer, initial) {
      const seen = new Set();
      let state = initial;
      return {
        apply(event) {
          if (seen.has(event.id)) return state;
          state = reducer(state, event);
          seen.add(event.id);
          return state;
        },
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const acc = myTodos.createExactlyOnceAccumulator(
    (sum, event) => sum + event.value,
    0,
  );
  acc.apply({ id: "1", value: 5 });
  console.log(acc.apply({ id: "1", value: 99 }));

  //
}

// task-->356
{
  //
  // final tasks-356 solved------------------------------>940
  // createStreamCompactor
  // Requirement: Collapse adjacent stream records for the same key while preserving the final semantic value.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createStreamCompactor(events) {
      const result = [];
      for (const event of events) {
        const previous = result.at(-1);
        if (previous?.key === event.key) {
          result[result.length - 1] = event;
        } else {
          result.push(event);
        }
      }
      return result;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.createStreamCompactor([
      { key: "a", value: 1 },
      { key: "a", value: 2 },
      { key: "b", value: 3 },
    ]),
  );

  //
}

// ------------------Finished 940-js-problem-solves----------------------------->
