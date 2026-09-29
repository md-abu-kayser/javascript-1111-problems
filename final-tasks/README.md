# Advanced JavaScript Final Tasks

<p align="center">
	<strong>550 applied JavaScript challenges in one progressive task series</strong>
</p>

<p align="center">
	Async systems, algorithms, state management, caching, distributed concepts, and reliability patterns.
</p>

<p align="center">
	<img src="https://img.shields.io/badge/Tasks-550-2563EB?style=flat-square" alt="550 tasks" />
	<img src="https://img.shields.io/badge/Files-110-0F766E?style=flat-square" alt="110 JavaScript files" />
	<img src="https://img.shields.io/badge/Runtime-Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
	<a href="../LICENSE"><img src="https://img.shields.io/badge/License-MIT-16A34A?style=flat-square" alt="MIT License" /></a>
</p>

This directory contains a numbered collection of advanced JavaScript problems built around practical requirements. Instead of isolated syntax drills, the tasks ask you to implement behaviors such as bounded asynchronous work, dependency resolution, caching, event processing, state coordination, and graceful shutdown.

Most tasks use a small `TodoApp` model as their shared problem domain. That familiar context makes it easier to focus on the design challenge: each solution extends the model with a specific capability and includes an example that demonstrates how it behaves.

## Series at a Glance

| Measure | Range or count |
| --- | ---: |
| JavaScript files | 110 (`final-tasks-002.js` through `final-tasks-111.js`) |
| Tasks in this series | 550 (five per file) |
| Task identifiers | 017 through 566 |
| Solved identifiers | 601 through 1150 |
| External package installation | Not required for direct examples |

For the complete file-by-file mapping, see the [task manifest](./MANIFEST.md). It is the source of truth for task and solved-number ranges.

## What You Will Practice

The collection touches several areas of advanced programming and system design. The examples below are a sample, not an exhaustive topic index.

### Algorithms and Data Structures

- Topological sorting for dependency graphs in [final-tasks-003.js](./final-tasks-003.js)
- Prefix lookup with a Trie in [final-tasks-004.js](./final-tasks-004.js)
- Shortest paths with Dijkstra's algorithm in [final-tasks-011.js](./final-tasks-011.js)
- Stable priority queues and lazy iterable pipelines in later task files

### Asynchronous Control and Scheduling

- Bounded async execution in [final-tasks-002.js](./final-tasks-002.js)
- Retry with exponential backoff in [final-tasks-002.js](./final-tasks-002.js)
- Fair semaphores, cancellation, and ordered async-iterable processing across the series
- Deterministic virtual time for testing delayed behavior

### State, Caching, and Data Processing

- Reactive state and runtime schema validation
- Cache-aside behavior, stale values, and explicit invalidation
- Versioned state reads and writes, rolling metrics, and deterministic checksums
- Event recording and state changes designed to be published reliably

### Distributed and Reliability Patterns

- Vector clocks and replica coordination
- Transforming concurrent text operations so edits converge
- Replay protection for security-sensitive requests
- Simulated network failures, process supervision, and graceful shutdown

The examples provide compact ways to reason about these ideas in JavaScript. They are educational implementations, not substitutes for production-hardened libraries or full distributed systems.

## File and Task Organization

Each file contains five consecutive tasks. The task comments identify both the task number and its solved number. Task implementations are wrapped in block scopes, allowing repeated example names such as `TodoApp` to remain independent within the same file.

```text
final-tasks-002.js  tasks 017-021  solved 601-605
final-tasks-003.js  tasks 022-026  solved 606-610
...
final-tasks-111.js  tasks 562-566  solved 1146-1150
```

Use the manifest to find the file for a particular number rather than relying on memory or guessing the offset.

## Run an Example

### Requirements

- Node.js 18 or newer
- No `npm install` step is needed for these standalone examples

From the repository root, execute a complete task file:

```bash
node final-tasks/final-tasks-002.js
```

Or run it from this directory:

```bash
node final-tasks-002.js
```

For example, the first command runs all five task demonstrations in `final-tasks-002.js`. To focus on one task, locate its block in the file and run or adapt that implementation separately. Some examples use timers or asynchronous operations, so output can appear later than synchronous logs.

## Suggested Practice Workflow

1. **Read the requirement.** Restate the expected behavior and identify the inputs and outputs.
2. **Design before coding.** Decide what state or data structure is needed and consider invalid or boundary inputs.
3. **Predict the example.** Work out the expected result before running the script.
4. **Execute and inspect.** Run the file with Node.js and compare the output with your prediction.
5. **Probe edge cases.** Try empty collections, missing records, invalid options, failures, and concurrency boundaries where they apply.
6. **Explain the trade-offs.** Consider correctness, complexity, fairness, ordering, mutation, and failure behavior.
7. **Reimplement.** Solve the requirement independently, then compare the design rather than only comparing the final output.

For asynchronous tasks, pay particular attention to rejected promises, cancellation, ordering guarantees, and whether the concurrency limit is actually respected.

## Validation Notes

The task files are standalone scripts with embedded demonstrations. Running a file is a useful execution check, but it is not the same as a dedicated automated test suite: this directory does not provide a shared test runner or assertions for every edge case. When changing a task, verify its expected behavior and add focused tests if you are extending the collection into a reusable application.

Some tasks intentionally model complex ideas in a small amount of code. Treat those implementations as study material, and assess their assumptions before adapting them for production use.

## Explore the Repository

- [Task manifest](./MANIFEST.md)
- [Main project README](../README.md)
- [MIT License](../LICENSE)

<p align="center"><strong>Understand the requirement. Make the behavior explicit. Then test the edges.</strong></p>
