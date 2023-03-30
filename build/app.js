"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _uuid = require("uuid");
var _getMessage = _interopRequireDefault(require("./getMessage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use(_express.default.json());
app.get("/", async (req, res) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("waiting...");
      resolve(true);
    }, 1000);
  });
  res.send({
    message: (0, _getMessage.default)()
  });
});
app.get("/ping", (req, res) => {
  res.send("pong");
});
app.get('/tasks', (req, res) => {
  res.json([]);
});
app.post('/tasks', (req, res) => {
  const {
    title,
    description
  } = req.body;
  if (!title || !description) return res.sendStatus(400);
  res.json({
    title,
    description,
    id: (0, _uuid.v4)()
  });
});
var _default = app;
exports.default = _default;