// task-->287
{
  //
  // final tasks-287 solved------------------------------>871
  // createKMeans
  // Requirement: Cluster numeric todo feature vectors using iterative centroid updates.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createKMeans(points, k, iterations = 10) {
      let centroids = points.slice(0, k).map((point) => [...point]);

      const distance = (a, b) =>
        Math.sqrt(
          a.reduce((sum, value, index) => sum + (value - b[index]) ** 2, 0),
        );

      let assignments = [];

      for (let step = 0; step < iterations; step++) {
        assignments = points.map((point) => {
          let best = 0;
          let bestDistance = Infinity;

          centroids.forEach((centroid, index) => {
            const value = distance(point, centroid);

            if (value < bestDistance) {
              bestDistance = value;
              best = index;
            }
          });

          return best;
        });

        centroids = centroids.map((_, cluster) => {
          const members = points.filter(
            (_, index) => assignments[index] === cluster,
          );

          if (!members.length) {
            return centroids[cluster];
          }

          return members[0].map(
            (_, dimension) =>
              members.reduce((sum, point) => sum + point[dimension], 0) /
              members.length,
          );
        });
      }

      return {
        centroids,
        assignments,
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.createKMeans(
      [
        [1, 1],
        [1, 2],
        [8, 8],
        [9, 8],
      ],
      2,
    ),
  );

  //
}

// task-->288
{
  //
  // final tasks-288 solved------------------------------>872
  // createKNearestNeighbors
  // Requirement: Classify a point using majority labels among its nearest feature vectors.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createKNearestNeighbors(samples, k) {
      return (point) => {
        const distance = (a, b) =>
          Math.sqrt(
            a.reduce((sum, value, index) => sum + (value - b[index]) ** 2, 0),
          );

        const nearest = [...samples]
          .sort(
            (a, b) => distance(point, a.features) - distance(point, b.features),
          )
          .slice(0, k);

        const votes = new Map();

        nearest.forEach((sample) => {
          votes.set(sample.label, (votes.get(sample.label) ?? 0) + 1);
        });

        return [...votes.entries()].sort((a, b) => b[1] - a[1])[0][0];
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const classify = myTodos.createKNearestNeighbors(
    [
      {
        features: [1, 1],
        label: "easy",
      },
      {
        features: [2, 2],
        label: "easy",
      },
      {
        features: [9, 9],
        label: "hard",
      },
    ],
    2,
  );

  console.log(classify([1.5, 1.5]));

  //
}

// task-->289
{
  //
  // final tasks-289 solved------------------------------>873
  // createNaiveBayes
  // Requirement: Train a multinomial Naive Bayes classifier over tokenized documents.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createNaiveBayes(documents) {
      const classes = new Map();
      const vocabulary = new Set();

      for (const document of documents) {
        const tokens = document.text.split(/\s+/);
        vocabulary.add(...tokens);

        if (!classes.has(document.label)) {
          classes.set(document.label, {
            count: 0,
            tokens: new Map(),
            total: 0,
          });
        }

        const data = classes.get(document.label);

        data.count++;

        for (const token of tokens) {
          data.tokens.set(token, (data.tokens.get(token) ?? 0) + 1);

          data.total++;
        }
      }

      return (text) => {
        const tokens = text.split(/\s+/);
        let best = null;
        let bestScore = -Infinity;

        for (const [label, data] of classes) {
          let score = Math.log(data.count / documents.length);

          for (const token of tokens) {
            score += Math.log(
              ((data.tokens.get(token) ?? 0) + 1) /
                (data.total + vocabulary.size),
            );
          }

          if (score > bestScore) {
            bestScore = score;
            best = label;
          }
        }

        return best;
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const classify = myTodos.createNaiveBayes([
    {
      label: "backend",
      text: "node api database",
    },
    {
      label: "frontend",
      text: "react ui browser",
    },
  ]);

  console.log(classify("node database"));

  //
}

// task-->290
{
  //
  // final tasks-290 solved------------------------------>874
  // createPerceptron
  // Requirement: Train a binary perceptron on labeled numerical feature vectors.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createPerceptron(samples, epochs = 20) {
      const weights = new Array(samples[0].features.length).fill(0);

      let bias = 0;

      for (let epoch = 0; epoch < epochs; epoch++) {
        for (const sample of samples) {
          const score = weights.reduce(
            (sum, weight, index) => sum + weight * sample.features[index],
            bias,
          );

          const prediction = score >= 0 ? 1 : -1;

          if (prediction !== sample.label) {
            sample.features.forEach((value, index) => {
              weights[index] += sample.label * value;
            });

            bias += sample.label;
          }
        }
      }

      return (features) =>
        weights.reduce(
          (sum, weight, index) => sum + weight * features[index],
          bias,
        ) >= 0
          ? 1
          : -1;
    }
  }

  // Example
  const myTodos = new TodoApp();

  const classify = myTodos.createPerceptron([
    {
      features: [0, 0],
      label: -1,
    },
    {
      features: [0, 1],
      label: -1,
    },
    {
      features: [1, 0],
      label: -1,
    },
    {
      features: [1, 1],
      label: 1,
    },
  ]);

  console.log(classify([1, 1]));

  //
}

// task-->291
{
  //
  // final tasks-291 solved------------------------------>875
  // createLogisticRegressionStep
  // Requirement: Perform one gradient-descent training pass for a logistic regression model.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createLogisticRegressionStep(weights, bias, samples, learningRate) {
      const sigmoid = (x) => 1 / (1 + Math.exp(-x));

      const gradients = new Array(weights.length).fill(0);

      let biasGradient = 0;

      for (const sample of samples) {
        const score = weights.reduce(
          (sum, weight, index) => sum + weight * sample.features[index],
          bias,
        );

        const prediction = sigmoid(score);

        const error = prediction - sample.label;

        sample.features.forEach((value, index) => {
          gradients[index] += error * value;
        });

        biasGradient += error;
      }

      return {
        weights: weights.map(
          (weight, index) =>
            weight - (learningRate * gradients[index]) / samples.length,
        ),
        bias: bias - (learningRate * biasGradient) / samples.length,
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.createLogisticRegressionStep(
      [0, 0],
      0,
      [
        {
          features: [1, 2],
          label: 1,
        },
        {
          features: [2, 1],
          label: 0,
        },
      ],
      0.1,
    ),
  );

  //
}

// ------------------Finished 875-js-problem-solves----------------------------->
