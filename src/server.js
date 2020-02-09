const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const Application = require("./application");

var app = new Application();
const server = express();

const BUILDPATH = "../frontend/build";
const PORT = process.env.PORT || 3030;

const logger = (req, res, next) => {
  app.logReq(req);
  next();
};

server.use(logger);
server.use(cors());
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, BUILDPATH)));

server.get("/ping", (req, res) => {
  res.send(Application.ping());
});

server.get("/api/revision", (req, res) => {
  res.send(Application.revision());
});

server.get("/api/logs", (req, res, next) => {
  res.send(app.getLogs());
});

server.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, BUILDPATH, "index.html"));
});

server.use((err, req, res, next) => {
  var statusCode = err.status || 500;
  res.end(res.writeHead(statusCode, err.message));
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
