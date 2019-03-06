"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _winston = _interopRequireWildcard(require("winston"));

require("winston-daily-rotate-file");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var LOG_DIR = process.env.LOG_DIR || 'logs';
var LOG_LEVEL = process.env.LOG_LEVEL || 'info'; // Create logs directory if it does not exist

if (!_fs.default.existsSync(LOG_DIR)) {
  _fs.default.mkdirSync(LOG_DIR);
}

var logger = _winston.default.createLogger({
  transports: [new _winston.default.transports.Console({
    format: _winston.format.combine(_winston.format.colorize(), _winston.format.simple()),
    level: LOG_LEVEL
  }), new _winston.default.transports.DailyRotateFile({
    format: _winston.format.combine(_winston.format.timestamp(), _winston.format.json()),
    maxFiles: '14d',
    dirname: LOG_DIR,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    filename: '%DATE%-log.log',
    level: LOG_LEVEL
  })]
});

var _default = logger;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(LOG_DIR, "LOG_DIR", "E:\\Scheduler_node_react\\server\\config\\winston.js");
  reactHotLoader.register(LOG_LEVEL, "LOG_LEVEL", "E:\\Scheduler_node_react\\server\\config\\winston.js");
  reactHotLoader.register(logger, "logger", "E:\\Scheduler_node_react\\server\\config\\winston.js");
  reactHotLoader.register(_default, "default", "E:\\Scheduler_node_react\\server\\config\\winston.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();