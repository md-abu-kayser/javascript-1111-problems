// task-->277
{
  //
  // final tasks-277 solved------------------------------>861
  // createInvertedIndex
  // Requirement: Build a token-to-document inverted index for fast full-text retrieval.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createInvertedIndex(documents) {
      const index = new Map();

      documents.forEach((document, id) => {
        const tokens = new Set(
          document.toLowerCase().match(/[a-z0-9]+/g) ?? [],
        );

        for (const token of tokens) {
          if (!index.has(token)) {
            index.set(token, new Set());
          }

          index.get(token).add(id);
        }
      });

      return index;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.createInvertedIndex([
      "JavaScript runtime",
      "Node JavaScript",
      "Go runtime",
    ]),
  );

  //
}

// task-->278
{
  //
  // final tasks-278 solved------------------------------>862
  // calculateBm25Score
  // Requirement: Rank documents using BM25-style term frequency, document frequency and length normalization.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    calculateBm25Score({
      termFrequency,
      documentFrequency,
      totalDocuments,
      documentLength,
      averageLength,
      k1 = 1.2,
      b = 0.75,
    }) {
      const idf = Math.log(
        1 +
          (totalDocuments - documentFrequency + 0.5) /
            (documentFrequency + 0.5),
      );

      const normalization = k1 * (1 - b + b * (documentLength / averageLength));

      return (
        idf * ((termFrequency * (k1 + 1)) / (termFrequency + normalization))
      );
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.calculateBm25Score({
      termFrequency: 4,
      documentFrequency: 100,
      totalDocuments: 10000,
      documentLength: 80,
      averageLength: 120,
    }),
  );

  //
}

// task-->279
{
  //
  // final tasks-279 solved------------------------------>863
  // createTrigramIndex
  // Requirement: Support fuzzy string retrieval using character trigram overlap.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createTrigramIndex(values) {
      const index = new Map();

      const trigrams = (value) => {
        const normalized = value.toLowerCase();

        const result = new Set();

        for (let i = 0; i < normalized.length - 2; i++) {
          result.add(normalized.slice(i, i + 3));
        }

        return result;
      };

      values.forEach((value) => {
        for (const gram of trigrams(value)) {
          if (!index.has(gram)) {
            index.set(gram, new Set());
          }

          index.get(gram).add(value);
        }
      });

      return {
        search(query) {
          const grams = trigrams(query);
          const scores = new Map();

          for (const gram of grams) {
            for (const value of index.get(gram) ?? []) {
              scores.set(value, (scores.get(value) ?? 0) + 1);
            }
          }

          return [...scores.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([value]) => value);
        },
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const index = myTodos.createTrigramIndex([
    "javascript",
    "java",
    "typescript",
    "javascript engine",
  ]);

  console.log(index.search("javascrip"));

  //
}

// task-->280
{
  //
  // final tasks-280 solved------------------------------>864
  // createFuzzyRanker
  // Requirement: Rank candidate strings by normalized edit similarity.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createFuzzyRanker(query, candidates) {
      const distance = (a, b) => {
        const dp = Array.from({ length: a.length + 1 }, (_, i) => {
          const row = new Array(b.length + 1).fill(0);

          row[0] = i;
          return row;
        });

        for (let j = 0; j <= b.length; j++) {
          dp[0][j] = j;
        }

        for (let i = 1; i <= a.length; i++) {
          for (let j = 1; j <= b.length; j++) {
            dp[i][j] =
              a[i - 1] === b[j - 1]
                ? dp[i - 1][j - 1]
                : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
          }
        }

        return dp[a.length][b.length];
      };

      return [...candidates]
        .map((candidate) => ({
          candidate,
          score:
            1 -
            distance(query, candidate) /
              Math.max(query.length, candidate.length, 1),
        }))
        .sort((a, b) => b.score - a.score);
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.createFuzzyRanker("javascript", [
      "javascrip",
      "typescript",
      "java",
    ]),
  );

  //
}

// task-->281
{
  //
  // final tasks-281 solved------------------------------>865
  // createBooleanSearchEvaluator
  // Requirement: Evaluate a parsed boolean search tree against an inverted index.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createBooleanSearchEvaluator(index, totalDocuments) {
      const all = new Set(
        Array.from({ length: totalDocuments }, (_, index) => index),
      );

      const evaluate = (node) => {
        if (node.type === "TERM") {
          return new Set(index.get(node.value) ?? []);
        }

        if (node.type === "NOT") {
          const values = evaluate(node.value);

          return new Set([...all].filter((id) => !values.has(id)));
        }

        const left = evaluate(node.left);

        const right = evaluate(node.right);

        if (node.type === "AND") {
          return new Set([...left].filter((id) => right.has(id)));
        }

        return new Set([...left, ...right]);
      };

      return evaluate;
    }
  }

  // Example
  const myTodos = new TodoApp();

  const index = new Map([
    ["javascript", new Set([0, 1])],
    ["node", new Set([1])],
  ]);

  const evaluate = myTodos.createBooleanSearchEvaluator(index, 3);

  console.log([
    ...evaluate({
      type: "AND",
      left: {
        type: "TERM",
        value: "javascript",
      },
      right: {
        type: "TERM",
        value: "node",
      },
    }),
  ]);

  //
}

// ------------------Finished 865-js-problem-solves----------------------------->
