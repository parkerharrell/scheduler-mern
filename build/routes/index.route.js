"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("./auth.route"));

var _user = _interopRequireDefault(require("./user.route"));

var _service = _interopRequireDefault(require("./service.route"));

var _location = _interopRequireDefault(require("./location.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var router = _express.default.Router(); // mount auth routes at /auth


router.use('/auth', _auth.default); // mount user routes at /users

router.use('/users', _user.default);
router.use('/services', _service.default);
router.use('/locations', _location.default);
var _default = router;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "E:\\Scheduler_node_react\\server\\routes\\index.route.js");
  reactHotLoader.register(_default, "default", "E:\\Scheduler_node_react\\server\\routes\\index.route.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();