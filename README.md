# JavaScript — 1111+ Problems Solved

# JavaScript Problem Solving

<p align="center">
  <strong>Practical JavaScript Exercises, Language Fundamentals & Advanced Engineering Concepts</strong>
</p>

<p align="center">
  A focused collection of JavaScript implementations designed to develop problem-solving ability, strengthen language fundamentals, and understand JavaScript runtime behavior.
</p>

<p align="center">
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
    <img src="https://img.shields.io/badge/JavaScript-ES5%2FES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111827" alt="JavaScript" />
  </a>
  <a href="https://nodejs.org/docs/latest/api/">
    <img src="https://img.shields.io/badge/Runtime-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  </a>
  <a href="https://tc39.es/ecma262/">
    <img src="https://img.shields.io/badge/Specification-ECMAScript-7A0BC0?style=for-the-badge" alt="ECMAScript" />
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-16A34A?style=for-the-badge" alt="MIT License" />
  </a>
</p>

---

## Overview

This repository is a structured JavaScript learning and problem-solving workspace.

It focuses on two complementary areas:

- **JavaScript Fundamentals:** Language syntax, data structures, functions, control flow, and core programming concepts.
- **Advanced JavaScript:** Closures, asynchronous execution, prototypes, iterators, generators, runtime behavior, and performance considerations.

The objective is to develop the ability to understand a problem, implement a correct solution, evaluate edge cases, and explain the underlying JavaScript behavior.

## Repository Structure

```text
javascript-1111-problems/
│
├── js-basic/
│   ├── README.md
│   ├── array.js
│   ├── function.js
│   ├── loops.js
│   └── ...
│
├── js-advanced/
│   ├── README.md
│   ├── async-await.js
│   ├── closures.js
│   ├── event-loop.js
│   ├── prototypes.js
│   └── ...
│
├── LICENSE
└── README.md
```

Each directory has a distinct learning objective. Examples should be organized by concept rather than accumulated without a clear structure.

## JavaScript Fundamentals

The `js-basic/` directory develops a strong understanding of the language's core features.

| Category     | Concepts                                   |
| ------------ | ------------------------------------------ |
| Variables    | `var`, `let`, `const`                      |
| Data Types   | Primitive and reference types              |
| Operators    | Arithmetic, comparison, logical            |
| Control Flow | Conditions and switch statements           |
| Loops        | `for`, `while`, `for...of`, `for...in`     |
| Functions    | Declarations, expressions, arrow functions |
| Arrays       | Iteration, transformation, searching       |
| Objects      | Properties, methods, object operations     |
| Scope        | Global, function, block, lexical scope     |
| Strings      | Manipulation, searching, formatting        |

**Learning objective:** Understand how JavaScript works before relying on abstractions or frameworks.

## Advanced JavaScript

The `js-advanced/` directory explores deeper language behavior and practical programming patterns.

| Category                | Concepts                                        |
| ----------------------- | ----------------------------------------------- |
| Functions               | Higher-order functions, currying, composition   |
| Closures                | Lexical environments and encapsulation          |
| Asynchronous JavaScript | Promises, `async/await`, concurrency            |
| Event Loop              | Call stack, tasks, microtasks                   |
| Prototypes              | Prototype chains, inheritance, delegation       |
| Iterators               | Iteration protocols and custom iterators        |
| Generators              | Lazy evaluation and incremental processing      |
| Modules                 | ESM and CommonJS                                |
| Memory                  | Allocation, references, memory behavior         |
| Performance             | Time complexity, space complexity, benchmarking |

**Learning objective:** Understand JavaScript beyond syntax, including execution behavior, architectural choices, and engineering trade-offs.

## Problem-Solving Approach

Every problem should encourage a structured approach to implementation.

```text
Understand the Problem
        |
        v
Identify Requirements
        |
        v
Analyze Edge Cases
        |
        v
Design the Solution
        |
        v
Implement
        |
        v
Test and Verify
        |
        v
Analyze Complexity
        |
        v
Explain the Solution
```

The emphasis is on understanding why a solution works rather than simply reaching the expected output.

## Code Quality Standards

Solutions should follow consistent engineering principles.

- **Correctness:** Handle the intended requirements and relevant edge cases.
- **Readability:** Prefer clear names and straightforward implementations.
- **Single Responsibility:** Keep examples focused on their primary concept.
- **Maintainability:** Avoid unnecessary complexity and duplication.
- **Reusability:** Extract reusable logic when it improves clarity.
- **Consistency:** Follow established naming and formatting conventions.
- **Testability:** Make expected behavior easy to verify.

### Example

A simple problem should have a clear implementation:

```javascript
function findMaximum(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new TypeError("Expected a non-empty array.");
  }

  return numbers.reduce((maximum, current) => {
    return current > maximum ? current : maximum;
  });
}

console.log(findMaximum([12, 45, 8, 67, 23]));
// 67
```

The goal is not to make simple solutions unnecessarily complicated.

## Edge Case Considerations

Problem implementations should consider relevant boundary conditions.

| Category              | Examples                              |
| --------------------- | ------------------------------------- |
| Empty input           | `""`, `[]`, `{}`                      |
| Nullish values        | `null`, `undefined`                   |
| Numeric boundaries    | `0`, `-1`, `Number.MAX_SAFE_INTEGER`  |
| Invalid input         | Unexpected types and malformed values |
| Collections           | Duplicate values and large datasets   |
| Asynchronous behavior | Rejections, timeouts, cancellation    |

Not every problem requires every edge case. Testing should reflect the actual requirements.

## Performance & Complexity

Performance should be evaluated using appropriate measurements and complexity analysis.

Important considerations:

- Time complexity.
- Space complexity.
- Input size.
- Memory allocation.
- Algorithmic trade-offs.
- Runtime environment.
- Benchmark methodology.

Example:

```text
Linear Search       O(n)

Binary Search       O(log n)

Nested Traversal    O(n²)
```

Complexity analysis should explain how an implementation scales as input size increases.

Performance claims should be supported by reproducible measurements rather than assumptions.

## Running Examples

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

### Clone the Repository

```bash
git clone https://github.com/md-abu-kayser/javascript-1111-problems.git

cd javascript-1111-problems
```

### Execute a Fundamental Example

```bash
cd js-basic

node array.js
```

### Execute an Advanced Example

```bash
cd ../js-advanced

node async-await.js
```

Replace the example filenames with files available in the respective directories.

## Testing Philosophy

Solutions should be verified against expected behavior.

For reusable functions, prioritize:

1. Normal input.
2. Empty input.
3. Boundary conditions.
4. Invalid input.
5. Unexpected behavior.

The native Node.js test runner is a suitable option for automated tests.

Documentation: https://nodejs.org/api/test.html

## Learning Methodology

Use the following workflow when studying an example:

1. **Read:** Understand the problem and implementation.
2. **Predict:** Determine the expected output before execution.
3. **Execute:** Run the code using Node.js.
4. **Investigate:** Understand unexpected results.
5. **Modify:** Experiment with different inputs.
6. **Reimplement:** Solve the problem independently.
7. **Explain:** Describe the implementation and its trade-offs.

Being able to independently reproduce and explain a solution is more meaningful than simply recognizing it.

## Contribution Guidelines

Contributions should improve the repository's technical or educational value.

### Standards

- Keep examples focused on one primary concept.
- Use descriptive `kebab-case` filenames.
- Prefer native JavaScript for language fundamentals.
- Include meaningful comments where necessary.
- Verify the expected output.
- Consider relevant edge cases.
- Avoid duplicated or unnecessarily complicated implementations.

### Pull Request Checklist

- [ ] The problem has a clear objective.
- [ ] The implementation is correct.
- [ ] The code is readable and maintainable.
- [ ] Relevant edge cases are considered.
- [ ] The example executes successfully.
- [ ] No unnecessary dependencies are introduced.
- [ ] Documentation is updated when necessary.

## Official Learning Resources

| Resource                                                                  | Purpose                         |
| ------------------------------------------------------------------------- | ------------------------------- |
| [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | Language documentation          |
| [ECMAScript Specification](https://tc39.es/ecma262/)                      | Official language specification |
| [Node.js Documentation](https://nodejs.org/docs/latest/api/)              | Runtime documentation           |
| [JavaScript.info](https://javascript.info/)                               | Structured JavaScript learning  |
| [V8 Documentation](https://v8.dev/docs)                                   | JavaScript engine concepts      |

## License

This project is licensed under the [MIT License](./LICENSE).

## Maintainer

<p align="center">
  <strong>Md Abu Kayser</strong>
  <br />
  Full-Stack Engineer
  <br /><br />
  <a href="https://github.com/md-abu-kayser">GitHub</a>
  ·
  <a href="mailto:abu.kayser.official@gmail.com">Email</a>
</p>

---

<p align="center">
  <strong>Understand deeply. Solve thoughtfully. Write better JavaScript.</strong>
</p>
