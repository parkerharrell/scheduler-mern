"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("./config/express"));

var _index = _interopRequireDefault(require("./routes/index.route"));

var _swagger = _interopRequireDefault(require("./config/swagger"));

var errorHandler = _interopRequireWildcard(require("./middlewares/errorHandler"));

var _joiErrorHandler = _interopRequireDefault(require("./middlewares/joiErrorHandler"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

var _webpackConfig = _interopRequireDefault(require("../webpack/webpack.config.dev"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

if (process.env.NODE_ENV === 'development') {
  var compiler = (0, _webpack.default)(_webpackConfig.default);

  _express.default.use((0, _webpackDevMiddleware.default)(compiler, {
    noInfo: true,
    publicPath: _webpackConfig.default.output.publicPath
  }));

  _express.default.use((0, _webpackHotMiddleware.default)(compiler));
} // Swagger API documentation


_express.default.get('/swagger.json', function (req, res) {
  res.json(_swagger.default);
}); // Router


_express.default.use('/api', _index.default); // Landing page


_express.default.get('*', function (req, res) {
  res.sendFile(_path.default.join(__dirname, '../public/index.html'));
}); // Joi Error Handler


_express.default.use(_joiErrorHandler.default); // Error Handler


_express.default.use(errorHandler.notFoundErrorHandler);

_express.default.use(errorHandler.errorHandler);

_express.default.listen(_express.default.get('port'), function () {
  console.log("Server running at ".concat(_express.default.get('host'), ":").concat(_express.default.get('port')));
});

var _default = _express.default;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "E:\\scheduler_react\\server\\app.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();