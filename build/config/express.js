"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _compression = _interopRequireDefault(require("compression"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _directory = _interopRequireDefault(require("../config/directory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var app = (0, _express.default)();

if (process.env.NODE_ENV == 'development') {
  require('dotenv').config({
    path: '.env.development'
  });
} else {
  require('dotenv').config();
}

app.set('port', process.env.PORT || process.env.APP_PORT);
app.set('host', process.env.APP_HOST);
app.use(_express.default.static(_directory.default.distDir));
app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use((0, _compression.default)());
app.use((0, _methodOverride.default)());
app.use(_bodyParser.default.json());
app.use((0, _morgan.default)('dev'));
app.use(_express.default.static(_directory.default.assetsDir));
var _default = app;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(app, "app", "E:\\Scheduler_node_react\\server\\config\\express.js");
  reactHotLoader.register(_default, "default", "E:\\Scheduler_node_react\\server\\config\\express.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();