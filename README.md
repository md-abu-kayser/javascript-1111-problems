# JavaScript — 1111+ Problems Solved

<p align="center">
  <strong>600+ JavaScript Problems • Fundamentals to Advanced Patterns • Runnable Learning Examples</strong>
</p>

<p align="center">
  A structured JavaScript problem-solving repository covering foundational language concepts,
  advanced runtime behavior, practical programming patterns, and performance-aware implementations.
</p>

<p align="center">
  Built for <strong>deliberate practice, technical interview preparation, code review,
  and long-term JavaScript mastery</strong>.
</p>

<p align="center">

  <a href="#problem-solving-challenges">
    <img src="https://img.shields.io/badge/Problems-600%2B-2563EB?style=for-the-badge" alt="600+ Problems" />
  </a>

  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
    <img src="https://img.shields.io/badge/JavaScript-ES5%2FES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111827" alt="JavaScript ES5 ES6+ Documentation" />
  </a>

  <a href="https://tc39.es/ecma262/" target="_blank">
    <img src="https://img.shields.io/badge/ECMAScript-262-7A0BC0?style=for-the-badge" alt="ECMAScript 262 Specification" />
  </a>

  <a href="https://nodejs.org/docs/latest/api/" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-LTS-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js LTS Documentation" />
  </a>

  <a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting" target="_blank">
    <img src="https://img.shields.io/badge/Learning-Problem%20Solving-0F766E?style=for-the-badge" alt="JavaScript Problem Solving" />
  </a>

  <a href="https://opensource.org/license/mit" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-16A34A?style=for-the-badge" alt="MIT License" />
  </a>

</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#repository-structure">Structure</a> •
  <a href="#js-basic">JS Basic</a> •
  <a href="#js-advanced">JS Advanced</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#learning-methodology">Methodology</a> •
  <a href="#contributing">Contributing</a>
</p>

---

# Overview

This repository contains **600+ JavaScript problems, exercises, and focused examples** organized into two learning workspaces:

```text
javascript-600-problems/
│
├── js-basic/
│   └── Foundational JavaScript concepts and exercises
│
└── js-advanced/
    └── Advanced language behavior and practical patterns
```

The repository is intentionally organized as a progression:

```text
JavaScript Fundamentals
        ↓
Core Language Patterns
        ↓
Problem Solving
        ↓
Advanced Language Behavior
        ↓
Runtime Understanding
        ↓
Performance & Engineering Judgment
```

Rather than presenting JavaScript as a collection of syntax rules, this repository uses small executable examples to encourage developers to **read, run, modify, debug, and explain** code.

---

# Repository Purpose

This repository serves three primary purposes.

## 1. Deliberate Practice

Build JavaScript proficiency through repeated implementation.

## 2. Technical Reference

Provide small examples that can be opened and executed independently.

## 3. Engineering Demonstration

Show how JavaScript knowledge can progress from basic syntax toward deeper runtime behavior, performance awareness, and maintainable programming patterns.

---

# Why 600+ Problems?

The problem count is useful, but it is not the primary goal.

The real goal is to build a progression from:

```text
Knowing Syntax
      ↓
Understanding Behavior
      ↓
Solving Problems
      ↓
Recognizing Patterns
      ↓
Explaining Trade-offs
      ↓
Making Better Engineering Decisions
```

A large collection becomes valuable when the examples remain:

- Focused
- Readable
- Runnable
- Understandable
- Consistent

---

# Learning Philosophy

This repository follows a **learn-by-doing** workflow.

```text
Read
 ↓
Predict
 ↓
Run
 ↓
Observe
 ↓
Modify
 ↓
Break
 ↓
Debug
 ↓
Rewrite
 ↓
Explain
```

The goal is not to memorize the implementation.

The goal is to understand the behavior well enough to recreate it independently.

---

# Repository Architecture

The collection is split into two levels.

```text
                     JavaScript
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
         JS Basic                JS Advanced
             │                       │
             ▼                       ▼
       Language Core          Runtime & Patterns
             │                       │
             └───────────┬───────────┘
                         ▼
                 Stronger JavaScript
                   Fundamentals
```

---

# JS Basic

## Purpose

`js-basic` focuses on the core JavaScript language.

It is intended for:

- Beginners building fundamentals
- Developers refreshing JavaScript knowledge
- Interview preparation
- Developers transitioning toward React/Node.js/TypeScript

---

## Core Topics

### Variables & Data Types

- `var`
- `let`
- `const`
- Strings
- Numbers
- Booleans
- `null`
- `undefined`
- Objects
- Arrays
- Primitive vs reference behavior

---

### Operators & Expressions

Examples explore:

- Arithmetic operators
- Comparison operators
- Logical operators
- Assignment operators
- Ternary expressions
- Truthy/falsy values

---

### Control Flow

Examples include:

```text
if
if / else
else if
switch
```

The goal is to understand control flow rather than simply memorize syntax.

---

### Loops

Common iteration patterns include:

```text
for
for...of
for...in
while
do...while
```

---

### Functions

Examples cover:

- Function declarations
- Function expressions
- Arrow functions
- Parameters
- Return values
- Function scope
- Reusable functions

---

### Arrays

Examples explore common array operations including:

```text
map
filter
reduce
find
forEach
includes
indexOf
push
pop
```

The collection encourages understanding the difference between:

```text
Mutation
   vs
Transformation
```

---

### Objects

Examples cover:

- Property access
- Property assignment
- Property deletion
- Object iteration
- `Object.keys()`
- `Object.values()`
- `Object.entries()`
- `for...in`

---

### Scope & Closures

The foundational collection introduces:

```text
Global Scope
     ↓
Function Scope
     ↓
Block Scope
     ↓
Lexical Scope
```

These concepts provide the basis for understanding closures and more advanced JavaScript behavior.

---

# JS Advanced

## Purpose

`js-advanced` moves from language fundamentals toward deeper runtime behavior and practical engineering patterns.

It is intended for developers who want to understand JavaScript beyond basic syntax.

---

## Advanced Topics

### Advanced Functions

Examples can explore:

- Higher-order functions
- Currying
- Partial application
- Function composition
- Decorator-like patterns
- Closures

---

### Asynchronous JavaScript

Topics include:

- Promises
- `async/await`
- Sequential execution
- Parallel execution
- Concurrency control
- Cancellation concepts
- Scheduling

Conceptual comparison:

```text
Sequential

A → B → C


Parallel

A ─┐
B ─┼──→ Complete
C ─┘


Limited Concurrency

A ─┐
B ─┘
    ↓
C ─┐
D ─┘
```

The focus is on understanding both behavior and trade-offs.

---

### Event Loop

Advanced examples can demonstrate:

- Call stack
- Tasks
- Microtasks
- Timers
- Promise callbacks
- Scheduling order

Conceptually:

```text
JavaScript
     ↓
Call Stack
     ↓
Runtime APIs
     ↓
Microtask Queue
     ↓
Task Queue
     ↓
Event Loop
```

The goal is to make asynchronous behavior observable rather than purely theoretical.

---

### Prototypes

Examples explore JavaScript's object model:

```text
Object
  ↓
Prototype
  ↓
Prototype
  ↓
null
```

Topics include:

- Prototype chains
- Inheritance
- Delegation
- Classes
- Method lookup

---

### Generators & Iterators

Examples demonstrate:

- Iterators
- Generator functions
- Lazy evaluation
- Incremental processing
- Memory-aware iteration

Instead of:

```text
Create everything
       ↓
Store everything
       ↓
Process
```

lazy evaluation can use:

```text
Produce
  ↓
Process
  ↓
Produce next
  ↓
Process next
```

---

### Memory & Performance

Performance-oriented examples focus on:

- Time complexity
- Space complexity
- Allocation behavior
- Lazy data processing
- Algorithmic trade-offs
- Runtime observations

Where appropriate:

```text
O(n)
vs
O(n²)
```

is discussed in the context of input size and workload.

---

### Modules

Advanced examples may examine:

- ESM
- CommonJS
- Import/export boundaries
- Module organization
- Bundling concepts
- Tree-shaking implications

---

# Problem Design Philosophy

Every example should ideally answer:

```text
What is the problem?
        ↓
What is the expected behavior?
        ↓
What is the simplest correct solution?
        ↓
Why does it work?
        ↓
What are the trade-offs?
```

---

# One Concept Per File

The repository favors small, focused files.

Instead of:

```text
all-javascript-topics.js
```

prefer:

```text
array-map.js
function-return.js
closure-counter.js
event-loop.js
async-concurrency.js
```

This makes examples:

- Easier to understand
- Easier to run
- Easier to review
- Easier to test
- Easier to reference later

---

# File Naming Convention

Use descriptive **kebab-case** names.

Examples:

```text
array-push-pop.js
array-map.js
function-return.js
for-of-loop.js
object-entries.js
closure-counter.js
async-await.js
async-concurrency.js
event-loop-microtasks.js
generator-lazy-iteration.js
```

Avoid ambiguous names:

```text
test.js
example2.js
new.js
final.js
temp.js
```

---

# Runnable Example Model

A typical file should be executable directly with Node.js.

Example:

```js
function add(a, b) {
  return a + b;
}

const result = add(10, 20);

console.log(result);
```

Run it:

```bash
node example.js
```

The simplicity is intentional.

---

# Engineering Contract

The repository follows a lightweight contract.

## Inputs

Examples may:

- Accept function arguments
- Define local values
- Read small fixtures
- Demonstrate runtime behavior

## Outputs

Examples may:

- Return values
- Print console output
- Demonstrate language behavior

## Guarantees

Examples should prioritize:

```text
Correctness
    >
Readability
    >
Cleverness
```

Unless performance itself is the subject of the example.

---

# Edge Cases

When modifying problems, consider:

### Empty Input

```text
""
[]
{}
```

### Nullish Input

```text
null
undefined
```

### Boundary Values

```text
0
1
-1
```

### Large Input

Consider how the solution scales.

### Errors

For advanced examples:

```text
Synchronous errors
+
Promise rejection
+
Cancellation
+
Cleanup
```

should be considered where relevant.

---

# Performance Awareness

Performance claims should not be made purely from intuition.

When comparing implementations, document:

- Input size
- Runtime
- Environment
- Measurement method
- Number of iterations
- Relevant memory considerations

Example:

```text
Environment:
Node.js LTS

Dataset:
100,000 elements

Comparison:
O(n) vs O(n²)

Metric:
Average execution time
```

---

# Code Quality Standards

The repository aims to maintain:

```text
✓ Meaningful names
✓ Small functions
✓ Focused examples
✓ Minimal dependencies
✓ Clear comments
✓ Predictable output
✓ Isolated side effects
✓ Explicit trade-offs
✓ Readable implementation
```

---

# Comments & Documentation

Comments should explain **why**, not simply repeat the code.

Avoid:

```js
// Loop through array
for (...) {
}
```

Prefer:

```js
// Process the collection once to keep the traversal linear.
for (...) {
}
```

---

# Dependency Philosophy

Core JavaScript concepts should generally be demonstrated using native JavaScript.

Avoid adding external libraries when:

```text
Native JavaScript
```

is sufficient.

When a dependency is genuinely necessary, document:

- Why it is needed
- What problem it solves
- Why a native implementation was not preferred

---

# Getting Started

## Prerequisites

Recommended:

- Node.js LTS
- npm
- Git
- VS Code or another modern editor

No frontend framework is required to execute the example files.

---

# Clone the Repository

```bash
git clone https://github.com/md-abu-kayser/javascript-600-problems.git
```

Navigate into the repository:

```bash
cd javascript-600-problems
```

---

# Run JS Basic

```bash
cd js-basic
```

Run an example:

```bash
node array.js
```

Another example:

```bash
node function-return.js
```

---

# Run JS Advanced

Return to the repository root:

```bash
cd ..
cd js-advanced
```

Then execute an example:

```bash
node async-await.js
```

or:

```bash
node event-loop.js
```

Replace the filename with any example available in the directory.

---

# Recommended Learning Workflow

## Phase 1 — Read

Open the example and understand:

- Inputs
- Variables
- Functions
- Control flow
- Expected output

## Phase 2 — Predict

Before running the code, predict the result.

## Phase 3 — Execute

```bash
node example.js
```

## Phase 4 — Experiment

Change:

- Inputs
- Values
- Conditions
- Loop behavior
- Async timing

## Phase 5 — Reimplement

Create your own version without looking at the original.

## Phase 6 — Explain

Be able to answer:

```text
Why does this work?
What assumptions are being made?
What happens at the boundaries?
What is the complexity?
Could this be implemented differently?
```

---

# Showcase Examples

For a quick introduction to the repository, start with examples such as:

```text
js-basic/
├── array.js
├── function-return.js
└── for-loop.js

js-advanced/
├── async-await.js
├── async-concurrency.js
└── event-loop.js
```

These examples represent the intended progression from fundamentals toward advanced runtime concepts.

> Filenames should be updated here whenever the actual repository structure changes.

---

# Repository Structure

```text
javascript-600-problems/
│
├── js-basic/
│   ├── README.md
│   │
│   ├── array.js
│   ├── array-push-pop.js
│   ├── array-include-indexOf.js
│   │
│   ├── function.js
│   ├── function-return.js
│   ├── function-parameter.js
│   │
│   ├── for-loop.js
│   ├── for-of-loop.js
│   ├── while-loop.js
│   │
│   └── ...
│
├── js-advanced/
│   ├── README.md
│   │
│   ├── async-await.js
│   ├── async-concurrency.js
│   ├── event-loop.js
│   ├── generators.js
│   ├── prototypes.js
│   │
│   └── ...
│
├── LICENSE
└── README.md
```

---

# Repository-Level Navigation

The two directories have distinct learning responsibilities.

| Directory      | Focus                                            |
| -------------- | ------------------------------------------------ |
| `js-basic/`    | Core JavaScript fundamentals                     |
| `js-advanced/` | Runtime behavior, advanced patterns, performance |

This allows users to choose the appropriate depth without mixing beginner exercises with advanced runtime demonstrations.

---

# Interview Preparation

This repository is suitable for structured interview preparation.

## Fundamental Questions

Examples can prepare you to discuss:

- Variables
- Types
- Functions
- Arrays
- Objects
- Scope
- Loops
- Modern syntax

## Advanced Questions

The advanced collection can support discussion around:

- Closures
- Event loop
- Promises
- Async scheduling
- Concurrency
- Prototypes
- Generators
- Memory
- Performance
- Modules

---

# Interview Practice Method

For each example:

```text
1. Explain the code.
2. Predict the output.
3. Explain why the output occurs.
4. Identify edge cases.
5. Discuss complexity.
6. Suggest an alternative approach.
7. Explain when you would use it in production.
```

This shifts preparation from memorizing answers toward demonstrating engineering reasoning.

---

# Testing Strategy

The repository keeps the examples lightweight by default.

Most examples can be validated through:

```bash
node example.js
```

For reusable pure functions, automated tests can be introduced without changing the learning model.

Recommended options:

- Node.js built-in test runner
- Vitest
- Jest

---

# Testable Example Design

Prefer:

```js
export function solve(input) {
  return /* result */;
}
```

with a separate example runner:

```js
console.log(solve(input));
```

This separation makes the core function easier to:

- Test
- Benchmark
- Reuse
- Review

---

# Recommended Test Cases

For a pure function:

```text
Happy Path
    +
Boundary Case
    +
Invalid / Failure Case
```

For async examples:

```text
Success
    +
Rejection
    +
Timeout
    +
Cancellation
    +
Cleanup
```

where applicable.

---

# CI / Automation Direction

As the repository becomes more mature, automated validation can be introduced.

Recommended workflow:

```text
Pull Request
     ↓
Install
     ↓
Type / Static Checks
     ↓
Tests
     ↓
Run Examples
     ↓
Validation
```

A future GitHub Actions workflow could validate the repository automatically.

---

# Example CI Direction

```yaml
name: JavaScript Repository Validation

on:
  push:
  pull_request:

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: npm

      - run: npm ci

      - run: npm test
```

Only add this once the repository has the corresponding package configuration and test command.

---

# Performance Engineering

The advanced collection should distinguish between:

```text
Algorithmic Complexity
        +
Runtime Performance
        +
Memory Behavior
        +
Workload
```

For example, a theoretically better algorithm may not always win on tiny datasets because constant factors can dominate.

Performance examples should therefore explain trade-offs instead of simply declaring one implementation “faster.”

---

# Memory-Aware Programming

When working with large data, consider:

```text
Materialize Everything
        vs
Process Incrementally
```

Generators and iterators can provide useful alternatives when the full dataset does not need to exist in memory simultaneously.

---

# Async Engineering

Asynchronous examples should consider:

```text
Concurrency
Scheduling
Errors
Cancellation
Cleanup
```

A good asynchronous implementation is not simply one that uses `async/await`.

It should also define what happens when operations:

- Fail
- Timeout
- Overlap
- Get cancelled
- Return unexpected results

---

# Security Principles

Examples involving potentially dangerous JavaScript behavior should be written carefully.

Never execute arbitrary untrusted strings with dynamic evaluation.

Avoid unsafe patterns such as:

```js
eval(untrustedInput);
```

unless the example exists specifically to demonstrate the security implications.

For filesystem or network examples:

```text
Validate
 ↓
Execute
 ↓
Handle Errors
 ↓
Cleanup
```

---

# Maintainability

As the repository grows, maintainability becomes increasingly important.

The collection should avoid turning into:

```text
600 files
+
600 different styles
+
600 naming conventions
```

Instead, it should preserve:

```text
Consistent Naming
+
Consistent File Structure
+
Consistent Output Style
+
Consistent Documentation
```

---

# Contribution Guidelines

Contributions are welcome.

A contribution should improve the repository's educational or engineering value.

## Add Focused Examples

One primary concept per file.

## Follow Naming Conventions

Use kebab-case.

## Provide Context

Add a short header explaining:

- Goal
- Expected behavior
- Important trade-offs
- Complexity, where relevant

## Keep Examples Runnable

The example should work independently whenever practical.

## Avoid Unnecessary Dependencies

Use native JavaScript for language fundamentals.

---

# Contribution Workflow

Create a branch:

```bash
git checkout -b feature/add-array-examples
```

Add or modify examples.

Run them:

```bash
node js-basic/array-new-example.js
```

Then commit:

```bash
git add .
git commit -m "feat(js-basic): add array iteration examples"
```

Push:

```bash
git push origin feature/add-array-examples
```

Open a Pull Request with a concise explanation of the change.

---

# Pull Request Checklist

```text
[ ] Example focuses on one primary concept
[ ] Filename uses kebab-case
[ ] Code is readable
[ ] Example executes successfully
[ ] Output is understandable
[ ] Edge cases considered
[ ] No unnecessary dependency added
[ ] Comments explain non-obvious behavior
[ ] Complexity documented where relevant
[ ] Existing examples remain unaffected
```

---

# Commit Convention

Use Conventional Commit-style messages.

Examples:

```text
feat(js-basic): add array transformation problems
feat(js-advanced): add promise concurrency examples
fix(js-basic): correct object iteration example
fix(js-advanced): handle rejected promise
refactor(js-basic): simplify function examples
test(js-advanced): add event loop assertions
docs(js-advanced): improve async patterns guide
perf(js-advanced): benchmark array traversal
chore: reorganize JavaScript examples
```

---

# Roadmap

## Core JavaScript

```text
[x] Variables
[x] Data types
[x] Functions
[x] Arrays
[x] Objects
[x] Loops
[x] Control flow

[ ] Deeper `this` behavior
[ ] Prototypes
[ ] Property descriptors
[ ] Symbols
```

## Advanced JavaScript

```text
[x] Closures
[x] Async patterns
[x] Event loop concepts
[x] Generators
[x] Performance concepts

[ ] Deeper Promise internals
[ ] Cancellation patterns
[ ] AbortController
[ ] Backpressure
[ ] Advanced module behavior
```

## Engineering

```text
[ ] Automated test suite
[ ] Repository-level linting
[ ] CI with GitHub Actions
[ ] Benchmark suite
[ ] Complexity metadata
[ ] Problem index
[ ] Searchable topic catalog
```

---

# Long-Term Vision

The repository can eventually evolve from a collection of solved problems into a structured JavaScript learning platform.

```text
600+ Examples
      ↓
Categorized Problem Library
      ↓
Difficulty Levels
      ↓
Complexity Metadata
      ↓
Automated Tests
      ↓
Interactive Practice
      ↓
Progress Tracking
      ↓
Personalized Learning
```

---

# Recommended Future Structure

If the repository continues growing significantly, it can evolve toward:

```text
javascript-600-problems/
│
├── fundamentals/
│   ├── variables/
│   ├── operators/
│   ├── control-flow/
│   └── loops/
│
├── functions/
│   ├── basics/
│   ├── closures/
│   └── advanced/
│
├── arrays/
├── objects/
├── strings/
├── async/
├── event-loop/
├── prototypes/
├── modules/
├── generators/
├── performance/
│
├── tests/
├── benchmarks/
├── docs/
└── README.md
```

This should be adopted only when the collection's size makes the additional hierarchy useful.

---

# Project Quality Model

A high-quality example should satisfy:

```text
Correct
  +
Readable
  +
Runnable
  +
Testable
  +
Explainable
```

For advanced examples:

```text
Correct
  +
Readable
  +
Runnable
  +
Testable
  +
Explainable
  +
Measured
```

when performance is part of the subject.

---

# What This Repository Demonstrates

From a portfolio perspective, this repository demonstrates more than the number of solved problems.

## JavaScript Fundamentals

Strong understanding of the core language.

## Problem Solving

Ability to turn requirements into executable implementations.

## Runtime Understanding

Knowledge of asynchronous execution, event-loop behavior, and JavaScript internals.

## Performance Awareness

Understanding of complexity, memory, and workload trade-offs.

## Code Quality

Preference for readable, maintainable implementations.

## Engineering Judgment

Ability to choose appropriate solutions rather than unnecessarily complex ones.

---

# Why This Repository Is Valuable

The repository provides a progression:

```text
Syntax
  ↓
Concept
  ↓
Problem
  ↓
Implementation
  ↓
Experimentation
  ↓
Runtime Behavior
  ↓
Trade-offs
  ↓
Engineering Judgment
```

That progression is more valuable than a collection of disconnected code snippets.

---

# Current Scope

This repository is primarily a **JavaScript learning and problem-solving collection**.

The examples are intentionally lightweight and should not be interpreted as complete production implementations.

Production systems may require additional:

- Validation
- Testing
- Security controls
- Logging
- Monitoring
- Error recovery
- Resource management
- Operational tooling

The purpose of this repository is to build the knowledge necessary to make those production decisions intelligently.

---

# Final Engineering Principle

> **Master the fundamentals before optimizing the abstraction.**

The repository follows a progression from simple problems to deeper runtime concepts:

```text
Understand
   ↓
Practice
   ↓
Experiment
   ↓
Measure
   ↓
Explain
   ↓
Apply
```

The ultimate goal is not simply to solve 600+ JavaScript problems.

It is to become capable of **reasoning clearly about JavaScript systems and making better engineering decisions**.

---

# License

This project is licensed under the **MIT License**.

See the [`LICENSE`](./LICENSE) file for the complete license text.

---

# Maintainer

<p align="center">
  <strong>Md Abu Kayser</strong>
</p>

<p align="center">
  Full-Stack Enginner
</p>

<p align="center">
  <a href="https://github.com/md-abu-kayser">
    GitHub
  </a>
  •
  <a href="mailto:abu.kayser.official@gmail.com">
    Email
  </a>
</p>

For collaboration, technical discussions, portfolio reviews, or professional opportunities, please reach out through GitHub or email.

---

# Repository Information

| Property           | Details                                   |
| ------------------ | ----------------------------------------- |
| Repository         | `javascript-600-problems`                 |
| Problem Count      | 600+                                      |
| Primary Language   | JavaScript                                |
| Standard           | ECMAScript                                |
| Runtime            | Node.js                                   |
| Basic Workspace    | `js-basic/`                               |
| Advanced Workspace | `js-advanced/`                            |
| Primary Use        | Learning, practice, interview preparation |
| License            | MIT                                       |
| Maintainer         | Md Abu Kayser                             |

---

<p align="center">
  <a href="#javascript--600-problems-solved">⬆ Back to top</a>
</p>

<p align="center">
  <strong>Practice deliberately. Understand deeply. Engineer thoughtfully.</strong>
</p>

<p align="center">
  Built with JavaScript and a commitment to mastering the language from fundamentals to advanced runtime behavior.
</p>
