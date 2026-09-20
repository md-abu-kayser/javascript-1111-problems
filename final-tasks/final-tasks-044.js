// task-->227
{
  //
  // final tasks-227 solved------------------------------>811
  // parseHttpHeaders
  // Requirement: Parse raw HTTP header lines while combining repeated headers according to field semantics.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    parseHttpHeaders(raw) {
      const result = new Map();

      for (const line of raw.split(/\r?\n/)) {
        if (!line.trim()) continue;

        const index = line.indexOf(":");

        if (index <= 0) {
          throw new Error(`Invalid header: ${line}`);
        }

        const name = line.slice(0, index).trim().toLowerCase();

        const value = line.slice(index + 1).trim();

        if (result.has(name)) {
          result.set(name, `${result.get(name)}, ${value}`);
        } else {
          result.set(name, value);
        }
      }

      return result;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.parseHttpHeaders(`
      Content-Type: application/json
      X-Request-ID: 123
      X-Request-ID: 456
    `),
  );

  //
}

// task-->228
{
  //
  // final tasks-228 solved------------------------------>812
  // parseSetCookie
  // Requirement: Parse Set-Cookie attributes into a normalized structured representation.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    parseSetCookie(header) {
      const parts = header.split(";").map((part) => part.trim());

      const [name, value] = parts[0].split("=");

      const cookie = {
        name,
        value,
        attributes: {},
      };

      for (const part of parts.slice(1)) {
        const index = part.indexOf("=");

        if (index === -1) {
          cookie.attributes[part.toLowerCase()] = true;
        } else {
          cookie.attributes[part.slice(0, index).toLowerCase()] = part.slice(
            index + 1,
          );
        }
      }

      return cookie;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.parseSetCookie(
      "session=abc; Path=/; HttpOnly; Secure; Max-Age=3600",
    ),
  );

  //
}

// task-->229
{
  //
  // final tasks-229 solved------------------------------>813
  // parseCacheControl
  // Requirement: Parse Cache-Control directives into typed normalized options.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    parseCacheControl(header) {
      const directives = {};

      for (const token of header.split(",")) {
        const [rawKey, rawValue] = token.trim().split("=");

        const key = rawKey.toLowerCase();

        directives[key] =
          rawValue == null
            ? true
            : Number.isFinite(Number(rawValue))
              ? Number(rawValue)
              : rawValue.replace(/^"|"$/g, "");
      }

      return directives;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.parseCacheControl(
      'max-age=300, public, stale-while-revalidate="30"',
    ),
  );

  //
}

// task-->230
{
  //
  // final tasks-230 solved------------------------------>814
  // parseRangeHeader
  // Requirement: Parse byte range headers into normalized start/end pairs.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    parseRangeHeader(header, size) {
      const match = header.match(/^bytes=(.+)$/);

      if (!match) {
        throw new Error("Unsupported range");
      }

      return match[1].split(",").map((part) => {
        const [startRaw, endRaw] = part.trim().split("-");

        const start =
          startRaw === ""
            ? Math.max(0, size - Number(endRaw))
            : Number(startRaw);

        const end = endRaw === "" ? size - 1 : Number(endRaw);

        if (start < 0 || start > end || start >= size) {
          throw new Error("Invalid range");
        }

        return {
          start,
          end: Math.min(end, size - 1),
        };
      });
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.parseRangeHeader("bytes=0-99,200-", 1000));

  //
}

// task-->231
{
  //
  // final tasks-231 solved------------------------------>815
  // negotiateContentType
  // Requirement: Select the highest-quality supported media type from an Accept header.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    negotiateContentType(acceptHeader, supported) {
      const preferences = acceptHeader
        .split(",")
        .map((part) => {
          const [type, ...params] = part.trim().split(";");

          const qualityParam = params.find((p) => p.trim().startsWith("q="));

          return {
            type: type.trim(),
            quality: qualityParam ? Number(qualityParam.trim().slice(2)) : 1,
          };
        })
        .sort((a, b) => b.quality - a.quality);

      for (const preference of preferences) {
        const match = supported.find(
          (type) => preference.type === "*/*" || type === preference.type,
        );

        if (match) return match;
      }

      return null;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.negotiateContentType("application/json;q=0.9, text/plain;q=0.5", [
      "text/plain",
      "application/json",
    ]),
  );

  //
}

// ------------------Finished 815-js-problem-solves----------------------------->
