// task-->207
{
  //
  // final tasks-207 solved------------------------------>791
  // createKmpMatcher
  // Requirement: Find all occurrences of a pattern using the Knuth-Morris-Pratt prefix function.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createKmpMatcher(text, pattern) {
      const prefix = new Array(pattern.length).fill(0);

      for (let i = 1, j = 0; i < pattern.length; ) {
        if (pattern[i] === pattern[j]) {
          prefix[i++] = ++j;
        } else if (j) {
          j = prefix[j - 1];
        } else {
          prefix[i++] = 0;
        }
      }

      const matches = [];

      for (let i = 0, j = 0; i < text.length; ) {
        if (text[i] === pattern[j]) {
          i++;
          j++;

          if (j === pattern.length) {
            matches.push(i - j);
            j = prefix[j - 1];
          }
        } else if (j) {
          j = prefix[j - 1];
        } else {
          i++;
        }
      }

      return matches;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.createKmpMatcher("javascriptjavascript", "script"));

  //
}

// task-->208
{
  //
  // final tasks-208 solved------------------------------>792
  // createRabinKarpSearch
  // Requirement: Search multiple pattern occurrences using rolling hash with collision verification.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createRabinKarpSearch(text, pattern) {
      const base = 256;
      const mod = 1000003;
      const m = pattern.length;

      if (!m || m > text.length) {
        return [];
      }

      let patternHash = 0;
      let windowHash = 0;
      let power = 1;

      for (let i = 0; i < m; i++) {
        patternHash = (patternHash * base + pattern.charCodeAt(i)) % mod;

        windowHash = (windowHash * base + text.charCodeAt(i)) % mod;

        if (i < m - 1) {
          power = (power * base) % mod;
        }
      }

      const result = [];

      for (let i = 0; i <= text.length - m; i++) {
        if (patternHash === windowHash && text.slice(i, i + m) === pattern) {
          result.push(i);
        }

        if (i < text.length - m) {
          windowHash =
            ((windowHash - text.charCodeAt(i) * power) * base +
              text.charCodeAt(i + m)) %
            mod;

          if (windowHash < 0) {
            windowHash += mod;
          }
        }
      }

      return result;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.createRabinKarpSearch("abracadabra", "abra"));

  //
}

// task-->209
{
  //
  // final tasks-209 solved------------------------------>793
  // createZAlgorithm
  // Requirement: Find pattern matches using the Z-array in linear time.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createZAlgorithm(text, pattern) {
      const input = `${pattern}$${text}`;

      const z = new Array(input.length).fill(0);

      let left = 0;
      let right = 0;

      for (let i = 1; i < input.length; i++) {
        if (i <= right) {
          z[i] = Math.min(right - i + 1, z[i - left]);
        }

        while (i + z[i] < input.length && input[z[i]] === input[i + z[i]]) {
          z[i]++;
        }

        if (i + z[i] - 1 > right) {
          left = i;
          right = i + z[i] - 1;
        }
      }

      const matches = [];

      for (let i = 0; i < z.length; i++) {
        if (z[i] === pattern.length) {
          matches.push(i - pattern.length - 1);
        }
      }

      return matches;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.createZAlgorithm("bananaban", "ban"));

  //
}

// task-->210
{
  //
  // final tasks-210 solved------------------------------>794
  // createLevenshteinDistance
  // Requirement: Compute edit distance using only O(min(n,m)) memory.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createLevenshteinDistance(a, b) {
      if (a.length < b.length) {
        [a, b] = [b, a];
      }

      let previous = Array.from({ length: b.length + 1 }, (_, i) => i);

      for (let i = 1; i <= a.length; i++) {
        const current = [i];

        for (let j = 1; j <= b.length; j++) {
          current[j] =
            a[i - 1] === b[j - 1]
              ? previous[j - 1]
              : 1 + Math.min(previous[j], current[j - 1], previous[j - 1]);
        }

        previous = current;
      }

      return previous[b.length];
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.createLevenshteinDistance("kitten", "sitting"));

  //
}

// task-->211
{
  //
  // final tasks-211 solved------------------------------>795
  // createSuffixArray
  // Requirement: Build a suffix array for substring-oriented indexing.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createSuffixArray(text) {
      return Array.from({ length: text.length }, (_, index) => index).sort(
        (a, b) => text.slice(a).localeCompare(text.slice(b)),
      );
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.createSuffixArray("banana"));

  //
}

// ------------------Finished 795-js-problem-solves----------------------------->
