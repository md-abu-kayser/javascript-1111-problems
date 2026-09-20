// task-->212
{
  //
  // final tasks-212 solved------------------------------>796
  // createWelfordStatistics
  // Requirement: Track streaming mean and variance without storing historical observations.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createWelfordStatistics() {
      let count = 0;
      let mean = 0;
      let m2 = 0;

      const observe = (value) => {
        count++;

        const delta = value - mean;
        mean += delta / count;
        const delta2 = value - mean;

        m2 += delta * delta2;
      };

      return {
        observe,
        report: () => ({
          count,
          mean,
          variance: count > 1 ? m2 / (count - 1) : 0,
        }),
      };
    }
  }

  // Example
  const myTodos = new TodoApp();
  const stats = myTodos.createWelfordStatistics();

  [2, 4, 6, 8].forEach(stats.observe);

  console.log(stats.report());

  //
}

// task-->213
{
  //
  // final tasks-213 solved------------------------------>797
  // createOnlineCovariance
  // Requirement: Calculate covariance between two streams incrementally using constant memory.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createOnlineCovariance() {
      let count = 0;
      let meanX = 0;
      let meanY = 0;
      let coMoment = 0;

      const observe = (x, y) => {
        count++;

        const dx = x - meanX;
        meanX += dx / count;

        const dy = y - meanY;
        meanY += dy / count;

        coMoment += dx * (y - meanY);
      };

      return {
        observe,
        covariance: () => (count > 1 ? coMoment / (count - 1) : 0),
      };
    }
  }

  // Example
  const myTodos = new TodoApp();
  const stats = myTodos.createOnlineCovariance();

  stats.observe(1, 2);
  stats.observe(2, 4);
  stats.observe(3, 6);

  console.log(stats.covariance());

  //
}

// task-->214
{
  //
  // final tasks-214 solved------------------------------>798
  // createLinearRegression
  // Requirement: Fit a simple least-squares regression line from streaming observations.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createLinearRegression() {
      let n = 0;
      let sumX = 0;
      let sumY = 0;
      let sumXY = 0;
      let sumXX = 0;

      return {
        observe(x, y) {
          n++;
          sumX += x;
          sumY += y;
          sumXY += x * y;
          sumXX += x * x;
        },

        predict(x) {
          const denominator = n * sumXX - sumX * sumX;

          if (!denominator) {
            return sumY / n;
          }

          const slope = (n * sumXY - sumX * sumY) / denominator;

          const intercept = (sumY - slope * sumX) / n;

          return intercept + slope * x;
        },
      };
    }
  }

  // Example
  const myTodos = new TodoApp();
  const model = myTodos.createLinearRegression();

  model.observe(1, 2);
  model.observe(2, 4);
  model.observe(3, 6);

  console.log(model.predict(4));

  //
}

// task-->215
{
  //
  // final tasks-215 solved------------------------------>799
  // createMovingMedian
  // Requirement: Maintain a sliding median using two heaps represented by sorted arrays.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createMovingMedian(windowSize, values) {
      const window = [];
      const result = [];

      for (const value of values) {
        window.push(value);
        window.sort((a, b) => a - b);

        if (window.length > windowSize) {
          window.shift();
        }

        const mid = Math.floor(window.length / 2);

        result.push(
          window.length % 2 ? window[mid] : (window[mid - 1] + window[mid]) / 2,
        );
      }

      return result;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.createMovingMedian(3, [5, 1, 9, 2, 7]));

  //
}

// task-->216
{
  //
  // final tasks-216 solved------------------------------>800
  // createQuantileEstimator
  // Requirement: Approximate a quantile using a compact reservoir sample rather than retaining the entire stream.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createQuantileEstimator(capacity = 100) {
      const sample = [];
      let count = 0;

      return {
        observe(value) {
          count++;

          if (sample.length < capacity) {
            sample.push(value);
            return;
          }

          const index = Math.floor(Math.random() * count);

          if (index < capacity) {
            sample[index] = value;
          }
        },

        quantile(p) {
          if (!sample.length) {
            return undefined;
          }

          const sorted = [...sample].sort((a, b) => a - b);

          return sorted[
            Math.min(sorted.length - 1, Math.floor(p * sorted.length))
          ];
        },
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const estimator = myTodos.createQuantileEstimator(5);

  [10, 20, 30, 40, 50, 60].forEach(estimator.observe);

  console.log(estimator.quantile(0.9));

  //
}

// ------------------Finished 800-js-problem-solves----------------------------->
