// task-->137
{
  //
  // final tasks-137 solved------------------------------>721
  // constantFoldAst
  // Requirement: Simplify constant arithmetic AST branches at build time without changing semantics.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    constantFoldAst(node) {
      if (node.type === "Literal") {
        return node;
      }

      const left = this.constantFoldAst(node.left);

      const right = this.constantFoldAst(node.right);

      if (left.type === "Literal" && right.type === "Literal") {
        const value = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
          "*": (a, b) => a * b,
          "/": (a, b) => a / b,
        }[node.operator](left.value, right.value);

        return {
          type: "Literal",
          value,
        };
      }

      return {
        ...node,
        left,
        right,
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.constantFoldAst({
      type: "BinaryExpression",
      operator: "*",
      left: {
        type: "Literal",
        value: 2,
      },
      right: {
        type: "BinaryExpression",
        operator: "+",
        left: {
          type: "Literal",
          value: 3,
        },
        right: {
          type: "Literal",
          value: 4,
        },
      },
    }),
  );

  //
}

// task-->138
{
  //
  // final tasks-138 solved------------------------------>722
  // analyzeModuleDependencies
  // Requirement: Build a module dependency graph from import records and report entry-reachable and orphan modules.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    analyzeModuleDependencies(modules) {
      const graph = new Map();

      for (const module of modules) {
        graph.set(module.name, module.imports);
      }

      const reachable = new Set();

      const visit = (name) => {
        if (reachable.has(name)) return;
        reachable.add(name);

        for (const dependency of graph.get(name) ?? []) {
          visit(dependency);
        }
      };

      visit("entry");

      return {
        reachable: [...reachable],
        orphaned: modules
          .map((module) => module.name)
          .filter((name) => !reachable.has(name)),
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.analyzeModuleDependencies([
      { name: "entry", imports: ["a"] },
      { name: "a", imports: ["b"] },
      { name: "b", imports: [] },
      { name: "unused", imports: [] },
    ]),
  );

  //
}

// task-->139
{
  //
  // final tasks-139 solved------------------------------>723
  // eliminatePureBranches
  // Requirement: Remove statically unreachable conditional branches from an AST marked with compile-time constants.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    eliminatePureBranches(node) {
      if (node.type !== "IfStatement") {
        return node;
      }

      if (node.test.type === "Literal") {
        return node.test.value
          ? node.consequent
          : (node.alternate ?? {
              type: "EmptyStatement",
            });
      }

      return {
        ...node,
        consequent: this.eliminatePureBranches(node.consequent),
        alternate: node.alternate
          ? this.eliminatePureBranches(node.alternate)
          : null,
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.eliminatePureBranches({
      type: "IfStatement",
      test: {
        type: "Literal",
        value: false,
      },
      consequent: {
        type: "ReturnStatement",
        value: 1,
      },
      alternate: {
        type: "ReturnStatement",
        value: 2,
      },
    }),
  );

  //
}

// task-->140
{
  //
  // final tasks-140 solved------------------------------>724
  // createSourceMapSegments
  // Requirement: Map generated line/column ranges back to original source ranges using compact segment tables.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createSourceMapSegments(segments) {
      const lookup = (line, column) => {
        const candidates = segments[line] ?? [];

        let best = null;

        for (const segment of candidates) {
          if (segment.generated <= column) {
            best = segment;
          } else {
            break;
          }
        }

        return best
          ? {
              line: best.sourceLine,
              column: best.sourceColumn + (column - best.generated),
            }
          : null;
      };

      return { lookup };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const maps = myTodos.createSourceMapSegments({
    1: [
      {
        generated: 0,
        sourceLine: 10,
        sourceColumn: 2,
      },
      {
        generated: 10,
        sourceLine: 10,
        sourceColumn: 12,
      },
    ],
  });

  console.log(maps.lookup(1, 14));

  //
}

// task-->141
{
  //
  // final tasks-141 solved------------------------------>725
  // prettyPrintAst
  // Requirement: Render a nested AST into deterministic readable source while controlling indentation.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    prettyPrintAst(node, level = 0) {
      const indent = "  ".repeat(level);

      if (node.type === "Literal") {
        return `${indent}${node.value}`;
      }

      if (node.type === "BinaryExpression") {
        return [
          `${indent}(`,
          this.prettyPrintAst(node.left, level + 1),
          `${"  ".repeat(level + 1)}${node.operator}`,
          this.prettyPrintAst(node.right, level + 1),
          `${indent})`,
        ].join("\n");
      }

      throw new Error(`Unknown node: ${node.type}`);
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.prettyPrintAst({
      type: "BinaryExpression",
      operator: "+",
      left: {
        type: "Literal",
        value: 3,
      },
      right: {
        type: "Literal",
        value: 4,
      },
    }),
  );

  //
}

// ------------------Finished 725-js-problem-solves----------------------------->
