const { expect } = require("chai");
const Application = require("./application");

var app = new Application();

describe("ping Route", () => {
  it("ping pong", () => {
    expect(Application.ping()).to.equal("pong");
  });
});

describe("revision Route", () => {
  var result = Application.revision();
  it("Has proper keys", () => {
    expect(result).to.have.all.keys(["version", "hash"]);
  });
  it("Find version", () => {
    expect(result.version).to.not.contain("version");
  });
  it("Find hash", () => {
    expect(result.hash).to.not.contain("hash");
  });
});
