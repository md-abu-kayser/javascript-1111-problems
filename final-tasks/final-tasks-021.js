// task-->112
{
  //
  // final tasks-112 solved------------------------------>696
  // createPriorityQueue
  // Requirement: Implement a stable binary heap priority queue where equal-priority items preserve insertion order.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createPriorityQueue() {
      const heap = [];
      let sequence = 0;

      const higher = (a, b) =>
        a.priority > b.priority ||
        (a.priority === b.priority &&
          a.sequence < b.sequence);

      const push = (value, priority) => {
        heap.push({
          value,
          priority,
          sequence: sequence++,
        });

        let i = heap.length - 1;

        while (i > 0) {
          const p = Math.floor((i - 1) / 2);

          if (higher(heap[p], heap[i])) break;

          [heap[p], heap[i]] = [heap[i], heap[p]];
          i = p;
        }
      };

      const pop = () => {
        if (!heap.length) return undefined;

        const root = heap[0];
        const last = heap.pop();

        if (heap.length) {
          heap[0] = last;

          let i = 0;

          while (true) {
            const left = i * 2 + 1;
            const right = left + 1;
            let best = i;

            if (
              left < heap.length &&
              higher(heap[left], heap[best])
            ) {
              best = left;
            }

            if (
              right < heap.length &&
              higher(heap[right], heap[best])
            ) {
              best = right;
            }

            if (best === i) break;

            [heap[i], heap[best]] = [heap[best], heap[i]];
            i = best;
          }
        }

        return root.value;
      };

      return { push, pop };
    }
  }

  // Example
  const myTodos = new TodoApp();
  const queue = myTodos.createPriorityQueue();

  queue.push("Normal", 1);
  queue.push("Critical", 10);
  queue.push("Critical-2", 10);

  console.log(queue.pop());
  console.log(queue.pop());
  console.log(queue.pop());

  //
}

// task-->113
{
  //
  // final tasks-113 solved------------------------------>697
  // createIntervalTree
  // Requirement: Store numeric intervals and return every interval intersecting a query range.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createIntervalTree(intervals) {
      const build = (items) => {
        if (!items.length) return null;

        const sorted = [...items].sort(
          (a, b) => a.start - b.start
        );

        const mid = Math.floor(sorted.length / 2);

        const node = {
          interval: sorted[mid],
          maxEnd: Math.max(
            ...sorted.map((item) => item.end)
          ),
          left: build(sorted.slice(0, mid)),
          right: build(sorted.slice(mid + 1)),
        };

        return node;
      };

      const root = build(intervals);

      const search = (queryStart, queryEnd) => {
        const result = [];

        const visit = (node) => {
          if (!node) return;

          const { start, end } = node.interval;

          if (
            start <= queryEnd &&
            end >= queryStart
          ) {
            result.push(node.interval);
          }

          if (
            node.left &&
            node.left.maxEnd >= queryStart
          ) {
            visit(node.left);
          }

          if (
            node.right &&
            start <= queryEnd
          ) {
            visit(node.right);
          }
        };

        visit(root);
        return result;
      };

      return { search };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const tree = myTodos.createIntervalTree([
    { start: 1, end: 5, name: "A" },
    { start: 8, end: 12, name: "B" },
    { start: 4, end: 9, name: "C" },
  ]);

  console.log(tree.search(6, 10));

  //
}

// task-->114
{
  //
  // final tasks-114 solved------------------------------>698
  // createMonotonicDeadlineStack
  // Requirement: Find the next todo deadline that is strictly smaller than the current deadline for every item.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createMonotonicDeadlineStack(deadlines) {
      const result = new Array(deadlines.length).fill(-1);
      const stack = [];

      for (let i = 0; i < deadlines.length; i++) {
        while (
          stack.length &&
          deadlines[stack.at(-1)] > deadlines[i]
        ) {
          result[stack.pop()] = deadlines[i];
        }

        stack.push(i);
      }

      return result;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.createMonotonicDeadlineStack([
      10, 14, 8, 20, 5,
    ])
  );

  //
}

// task-->115
{
  //
  // final tasks-115 solved------------------------------>699
  // createSegmentTree
  // Requirement: Support logarithmic range-sum queries and point updates over todo effort values.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createSegmentTree(values) {
      let size = 1;

      while (size < values.length) {
        size *= 2;
      }

      const tree = new Array(size * 2).fill(0);

      values.forEach((value, index) => {
        tree[size + index] = value;
      });

      for (let i = size - 1; i > 0; i--) {
        tree[i] = tree[i * 2] + tree[i * 2 + 1];
      }

      const update = (index, value) => {
        let position = size + index;
        tree[position] = value;

        while (position > 1) {
          position = Math.floor(position / 2);
          tree[position] =
            tree[position * 2] +
            tree[position * 2 + 1];
        }
      };

      const query = (left, right) => {
        let l = left + size;
        let r = right + size;
        let sum = 0;

        while (l <= r) {
          if (l % 2 === 1) sum += tree[l++];
          if (r % 2 === 0) sum += tree[r--];

          l = Math.floor(l / 2);
          r = Math.floor(r / 2);
        }

        return sum;
      };

      return { update, query };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const tree = myTodos.createSegmentTree([
    2, 4, 6, 8, 10,
  ]);

  console.log(tree.query(1, 3));
  tree.update(2, 20);
  console.log(tree.query(1, 3));

  //
}

// task-->116
{
  //
  // final tasks-116 solved------------------------------>700
  // createFenwickTree
  // Requirement: Implement a Fenwick tree supporting prefix sums and point updates.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createFenwickTree(values) {
      const tree = new Array(
        values.length + 1
      ).fill(0);

      const update = (index, delta) => {
        for (
          let i = index + 1;
          i < tree.length;
          i += i & -i
        ) {
          tree[i] += delta;
        }
      };

      const prefixSum = (index) => {
        let sum = 0;

        for (
          let i = index + 1;
          i > 0;
          i -= i & -i
        ) {
          sum += tree[i];
        }

        return sum;
      };

      values.forEach((value, index) =>
        update(index, value)
      );

      return {
        update,
        prefixSum,
        rangeSum: (left, right) =>
          prefixSum(right) -
          (left > 0
            ? prefixSum(left - 1)
            : 0),
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const tree = myTodos.createFenwickTree([
    5, 3, 7, 2,
  ]);

  console.log(tree.prefixSum(2));
  console.log(tree.rangeSum(1, 3));

  //
}

// ------------------Finished 700-js-problem-solves----------------------------->