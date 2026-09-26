// task-->372
{
  //
  // final tasks-372 solved------------------------------>956
  // createAhoCorasickMatcher
  // Requirement: Match many patterns in one text using a trie with fallback links.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createAhoCorasickMatcher(patterns) {
      const root = { next: new Map(), fail: null, out: [] };
      for (const pattern of patterns) {
        let node = root;
        for (const char of pattern) {
          if (!node.next.has(char)) {
            node.next.set(char, { next: new Map(), fail: root, out: [] });
          }
          node = node.next.get(char);
        }
        node.out.push(pattern);
      }
      const queue = [];
      for (const child of root.next.values()) {
        child.fail = root;
        queue.push(child);
      }
      while (queue.length) {
        const node = queue.shift();
        for (const [char, child] of node.next) {
          let fallback = node.fail;
          while (fallback !== root && !fallback.next.has(char)) {
            fallback = fallback.fail;
          }
          if (fallback.next.has(char) && fallback.next.get(char) !== child) {
            child.fail = fallback.next.get(char);
          } else {
            child.fail = root;
          }
          child.out.push(...child.fail.out);
          queue.push(child);
        }
      }
      return (text) => {
        const matches = [];
        let node = root;
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          while (node !== root && !node.next.has(char)) node = node.fail;
          if (node.next.has(char)) node = node.next.get(char);
          for (const pattern of node.out) {
            matches.push({ pattern, index: i - pattern.length + 1 });
          }
        }
        return matches;
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const match = myTodos.createAhoCorasickMatcher(["he", "she", "his", "hers"]);
  console.log(match("ushers"));

  //
}

// task-->373
{
  //
  // final tasks-373 solved------------------------------>957
  // createSuffixAutomatonStates
  // Requirement: Construct a suffix automaton state table for fast substring existence queries.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createSuffixAutomatonStates(text) {
      const states = [{ next: new Map(), link: -1, len: 0 }];
      let last = 0;
      for (const char of text) {
        let current = states.length;
        states.push({ next: new Map(), link: 0, len: states[last].len + 1 });
        let p = last;
        while (p !== -1 && !states[p].next.has(char)) {
          states[p].next.set(char, current);
          p = states[p].link;
        }
        if (p === -1) {
          states[current].link = 0;
        } else {
          const q = states[p].next.get(char);
          if (states[p].len + 1 === states[q].len) {
            states[current].link = q;
          } else {
            const clone = states.length;
            states.push({
              next: new Map(states[q].next),
              link: states[q].link,
              len: states[p].len + 1,
            });
            while (p !== -1 && states[p].next.get(char) === q) {
              states[p].next.set(char, clone);
              p = states[p].link;
            }
            states[q].link = states[current].link = clone;
          }
        }
        last = current;
      }
      return states;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.createSuffixAutomatonStates("ababa").length);

  //
}

// task-->374
{
  //
  // final tasks-374 solved------------------------------>958
  // createUnicodeGraphemeCounter
  // Requirement: Count user-perceived characters rather than UTF-16 code units.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createUnicodeGraphemeCounter(value) {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter(undefined, {
          granularity: "grapheme",
        });
        return [...segmenter.segment(value)].length;
      }
      return [...value].length;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.createUnicodeGraphemeCounter("man"));

  //
}

// task-->375
{
  //
  // final tasks-375 solved------------------------------>959
  // normalizeUnicodeText
  // Requirement: Normalize text for deterministic search keys while preserving a canonical Unicode form.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    normalizeUnicodeText(value) {
      return value.normalize("NFKC").trim().toLocaleLowerCase();
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.normalizeUnicodeText("javascript"));

  //
}

// task-->376
{
  //
  // final tasks-376 solved------------------------------>960
  // createTokenBudget
  // Requirement: Approximate token usage and enforce a maximum budget using a configurable token estimator.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createTokenBudget(
      text,
      maxTokens,
      estimate = (value) => value.trim().split(/\s+/).filter(Boolean).length,
    ) {
      const used = estimate(text);
      return {
        used,
        remaining: Math.max(0, maxTokens - used),
        allowed: used <= maxTokens,
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.createTokenBudget("build a scalable event processor", 5));

  //
}

// ------------------Finished 960-js-problem-solves----------------------------->
