// task-->267
{
  //
  // final tasks-267 solved------------------------------>851
  // createFixedWindowLimiter
  // Requirement: Limit requests within fixed time buckets and reset the bucket atomically.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createFixedWindowLimiter(limit, windowMs) {
      let bucket = Math.floor(Date.now() / windowMs);

      let count = 0;

      return () => {
        const currentBucket = Math.floor(Date.now() / windowMs);

        if (currentBucket !== bucket) {
          bucket = currentBucket;
          count = 0;
        }

        if (count >= limit) {
          return false;
        }

        count++;
        return true;
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const limiter = myTodos.createFixedWindowLimiter(2, 1000);

  console.log(limiter());
  console.log(limiter());
  console.log(limiter());

  //
}

// task-->268
{
  //
  // final tasks-268 solved------------------------------>852
  // createSlidingLogLimiter
  // Requirement: Enforce request limits using exact request timestamps rather than coarse buckets.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createSlidingLogLimiter(limit, windowMs) {
      const timestamps = [];

      return () => {
        const now = Date.now();

        while (timestamps.length && timestamps[0] <= now - windowMs) {
          timestamps.shift();
        }

        if (timestamps.length >= limit) {
          return false;
        }

        timestamps.push(now);

        return true;
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const limiter = myTodos.createSlidingLogLimiter(3, 1000);

  console.log(limiter());
  console.log(limiter());
  console.log(limiter());
  console.log(limiter());

  //
}

// task-->269
{
  //
  // final tasks-269 solved------------------------------>853
  // createConcurrencyLimiter
  // Requirement: Restrict simultaneously executing async operations independent of request rate.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createConcurrencyLimiter(limit) {
      let active = 0;
      const queue = [];

      const drain = () => {
        while (active < limit && queue.length) {
          const job = queue.shift();
          active++;

          Promise.resolve()
            .then(job.task)
            .then(job.resolve, job.reject)
            .finally(() => {
              active--;
              drain();
            });
        }
      };

      return {
        run(task) {
          return new Promise((resolve, reject) => {
            queue.push({
              task,
              resolve,
              reject,
            });

            drain();
          });
        },
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const limit = myTodos.createConcurrencyLimiter(2);

  Promise.all([1, 2, 3].map((id) => limit.run(async () => `done-${id}`))).then(
    console.log,
  );

  //
}

// task-->270
{
  //
  // final tasks-270 solved------------------------------>854
  // createAdaptiveRateLimiter
  // Requirement: Increase allowed throughput after healthy periods and reduce it after overload signals.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createAdaptiveRateLimiter(initialLimit, min, max) {
      let limit = initialLimit;
      let used = 0;

      return {
        allow() {
          if (used >= limit) {
            return false;
          }

          used++;
          return true;
        },

        feedback(success) {
          if (success) {
            limit = Math.min(max, limit + 1);
          } else {
            limit = Math.max(min, Math.floor(limit / 2));
          }

          used = 0;
        },

        current: () => limit,
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const limiter = myTodos.createAdaptiveRateLimiter(4, 1, 10);

  console.log(limiter.current());
  limiter.feedback(false);
  console.log(limiter.current());

  //
}

// task-->271
{
  //
  // final tasks-271 solved------------------------------>855
  // createQuotaAggregator
  // Requirement: Aggregate usage from multiple dimensions without allowing any individual dimension to exceed its quota.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createQuotaAggregator(quotas) {
      const usage = new Map();

      return {
        consume(dimensions) {
          for (const [dimension, amount] of Object.entries(dimensions)) {
            const current = usage.get(dimension) ?? 0;

            if (current + amount > (quotas[dimension] ?? Infinity)) {
              return false;
            }
          }

          for (const [dimension, amount] of Object.entries(dimensions)) {
            usage.set(dimension, (usage.get(dimension) ?? 0) + amount);
          }

          return true;
        },
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const quota = myTodos.createQuotaAggregator({
    requests: 10,
    compute: 100,
  });

  console.log(
    quota.consume({
      requests: 2,
      compute: 40,
    }),
  );

  console.log(
    quota.consume({
      requests: 9,
      compute: 20,
    }),
  );

  //
}

// ------------------Finished 855-js-problem-solves----------------------------->
