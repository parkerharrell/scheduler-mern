"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

/**
 * Swagger definition.
 */
var swaggerDefinition = {
  info: {
    title: 'Express React Boilerplate',
    version: '1.0.0',
    description: 'RESTful API description with Swagger'
  },
  host: 'localhost:3000',
  basePath: '/api'
};
/**
 * Options for the swagger docs.
 */

var swaggerOptions = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: [_path.default.join(__dirname, '/../routes/*.js')]
};
/**
 * Initialize swagger-jsdoc.
 */

var swagger = (0, _swaggerJsdoc.default)(swaggerOptions);
var _default = swagger;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(swaggerDefinition, "swaggerDefinition", "E:\\scheduler_react\\server\\config\\swagger.js");
  reactHotLoader.register(swaggerOptions, "swaggerOptions", "E:\\scheduler_react\\server\\config\\swagger.js");
  reactHotLoader.register(swagger, "swagger", "E:\\scheduler_react\\server\\config\\swagger.js");
  reactHotLoader.register(_default, "default", "E:\\scheduler_react\\server\\config\\swagger.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();