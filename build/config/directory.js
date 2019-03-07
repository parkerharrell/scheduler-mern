"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var path = require('path');

var rootPath = path.normalize(__dirname + '/../..');
var directory = {
  root: rootPath,
  distDir: rootPath + '/dist',
  assetsDir: rootPath + '/public'
};
var _default = directory;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(rootPath, "rootPath", "E:\\scheduler_react\\server\\config\\directory.js");
  reactHotLoader.register(directory, "directory", "E:\\scheduler_react\\server\\config\\directory.js");
  reactHotLoader.register(_default, "default", "E:\\scheduler_react\\server\\config\\directory.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();