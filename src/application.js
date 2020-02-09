const childProcess = require("child_process");

class App {
  constructor() {
    this.logs = [];
  }

  logReq(req) {
    const { date, method, path, query, body } = req;

    if (
      path.startsWith("/media") ||
      path.startsWith("/static") ||
      path.startsWith("/favicon")
    ) {
      return;
    }

    const log = {
      date,
      method,
      path,
      query,
      body
    };
    this.logs.push(log);
  }

  static ping() {
    return "pong";
  }

  static revision() {
    const version =
      process.env.npm_package_version || "No package version available";

    var hash;
    try {
      hash =
        process.env.SOURCE_VERSION ||
        childProcess
          .execSync("git rev-parse HEAD")
          .toString()
          .trim();
    } catch (e) {
      hash = "Cannot find latest git hash";
    }

    return { version, hash };
  }

  getLogs() {
    return this.logs;
  }
}

module.exports = App;
