// task-->272
{
  //
  // final tasks-272 solved------------------------------>856
  // parseCIDR
  // Requirement: Convert an IPv4 CIDR block into network address, broadcast address and host capacity.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    parseCIDR(cidr) {
      const [ip, prefixRaw] = cidr.split("/");

      const prefix = Number(prefixRaw);

      const parts = ip.split(".").map(Number);

      const value =
        ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>>
        0;

      const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;

      const network = (value & mask) >>> 0;

      const broadcast = (network | (~mask >>> 0)) >>> 0;

      const toIp = (number) =>
        [
          number >>> 24,
          (number >>> 16) & 255,
          (number >>> 8) & 255,
          number & 255,
        ].join(".");

      return {
        network: toIp(network),
        broadcast: toIp(broadcast),
        hosts: Math.max(0, broadcast - network - 1),
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.parseCIDR("192.168.10.0/24"));

  //
}

// task-->273
{
  //
  // final tasks-273 solved------------------------------>857
  // ipRangeToInteger
  // Requirement: Convert valid IPv4 addresses into unsigned integers for efficient range comparisons.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    ipRangeToInteger(ip) {
      const parts = ip.split(".").map(Number);

      if (
        parts.length !== 4 ||
        parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)
      ) {
        throw new Error("Invalid IPv4 address");
      }

      return (
        parts[0] * 2 ** 24 + parts[1] * 2 ** 16 + parts[2] * 2 ** 8 + parts[3]
      );
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.ipRangeToInteger("10.0.0.1"));

  //
}

// task-->274
{
  //
  // final tasks-274 solved------------------------------>858
  // encodeBinaryPacket
  // Requirement: Encode packet metadata and payload into a fixed binary header plus payload format.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    encodeBinaryPacket({ version, flags, payload }) {
      const body = new TextEncoder().encode(payload);

      const packet = new Uint8Array(6 + body.length);

      const view = new DataView(packet.buffer);

      view.setUint8(0, version);
      view.setUint8(1, flags);
      view.setUint32(2, body.length);

      packet.set(body, 6);

      return packet;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(
    myTodos.encodeBinaryPacket({
      version: 1,
      flags: 3,
      payload: "todo-packet",
    }),
  );

  //
}

// task-->275
{
  //
  // final tasks-275 solved------------------------------>859
  // createInternetChecksum
  // Requirement: Compute the one's-complement checksum used by classic network packet validation.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createInternetChecksum(bytes) {
      let sum = 0;

      for (let i = 0; i < bytes.length; i += 2) {
        const word = (bytes[i] << 8) | (bytes[i + 1] ?? 0);

        sum += word;

        while (sum > 0xffff) {
          sum = (sum & 0xffff) + (sum >>> 16);
        }
      }

      return ~sum & 0xffff;
    }
  }

  // Example
  const myTodos = new TodoApp();

  console.log(myTodos.createInternetChecksum(Uint8Array.from([1, 2, 3, 4])));

  //
}

// task-->276
{
  //
  // final tasks-276 solved------------------------------>860
  // createLongestPrefixRouter
  // Requirement: Route an IP address to the most specific matching CIDR prefix.
  class TodoApp {
    constructor() {
      this.todos = [];
    }

    createLongestPrefixRouter(routes) {
      const toInt = (ip) =>
        ip.split(".").reduce((value, part) => value * 256 + Number(part), 0);

      return (ip) => {
        const value = toInt(ip);
        let best = null;

        for (const route of routes) {
          const network = toInt(route.network);

          const mask =
            route.prefix === 0 ? 0 : (0xffffffff << (32 - route.prefix)) >>> 0;

          if ((value & mask) >>> 0 === (network & mask) >>> 0) {
            if (!best || route.prefix > best.prefix) {
              best = route;
            }
          }
        }

        return best;
      };
    }
  }

  // Example
  const myTodos = new TodoApp();

  const router = myTodos.createLongestPrefixRouter([
    {
      network: "10.0.0.0",
      prefix: 8,
      target: "A",
    },
    {
      network: "10.2.0.0",
      prefix: 16,
      target: "B",
    },
  ]);

  console.log(router("10.2.5.9"));

  //
}

// ------------------Finished 860-js-problem-solves----------------------------->
