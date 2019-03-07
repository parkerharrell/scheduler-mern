"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAll = findAll;
exports.findById = findById;
exports.store = store;
exports.update = update;
exports.destroy = destroy;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

/**
 * Find all the users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
function findAll(req, res) {
  _user.default.forge().fetchAll().then(function (user) {
    return res.json({
      error: false,
      data: user.toJSON()
    });
  }).catch(function (err) {
    return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
      error: err
    });
  });
}
/**
 *  Find user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */


function findById(req, res) {
  _user.default.forge({
    id: req.params.id
  }).fetch().then(function (user) {
    if (!user) {
      res.status(_httpStatusCodes.default.NOT_FOUND).json({
        error: true,
        data: {}
      });
    } else {
      res.json({
        error: false,
        data: user.toJSON()
      });
    }
  }).catch(function (err) {
    return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
      error: err
    });
  });
}
/**
 * store new user
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */


function store(req, res) {
  var _req$body = req.body,
      first_name = _req$body.first_name,
      last_name = _req$body.last_name,
      email = _req$body.email,
      username = _req$body.username,
      created = _req$body.created;

  var password = _bcrypt.default.hashSync(req.body.password, 10);

  _user.default.forge({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    username: username,
    created: created
  }, {
    hasTimestamps: false
  }).save().then(function (user) {
    return res.json({
      success: true,
      data: user.toJSON()
    });
  }).catch(function (err) {
    return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
      error: err
    });
  });
}
/**
 * Update user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */


function update(req, res) {
  _user.default.forge({
    id: req.params.id
  }).fetch({
    require: true
  }).then(function (user) {
    return user.save({
      first_name: req.body.first_name || user.get('first_name'),
      last_name: req.body.last_name || user.get('last_name'),
      email: req.body.email || user.get('email')
    }).then(function () {
      return res.json({
        error: false,
        data: user.toJSON()
      });
    }).catch(function (err) {
      return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
        error: true,
        data: {
          message: err.message
        }
      });
    });
  }).catch(function (err) {
    return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
      error: err
    });
  });
}
/**
 * Destroy user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */


function destroy(req, res) {
  _user.default.forge({
    id: req.params.id
  }).fetch({
    require: true
  }).then(function (user) {
    return user.destroy().then(function () {
      return res.json({
        error: false,
        data: {
          message: 'User deleted successfully.'
        }
      });
    }).catch(function (err) {
      return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
        error: true,
        data: {
          message: err.message
        }
      });
    });
  }).catch(function (err) {
    return res.status(_httpStatusCodes.default.INTERNAL_SERVER_ERROR).json({
      error: err
    });
  });
}

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(findAll, "findAll", "E:\\scheduler_react\\server\\controllers\\user.controller.js");
  reactHotLoader.register(findById, "findById", "E:\\scheduler_react\\server\\controllers\\user.controller.js");
  reactHotLoader.register(store, "store", "E:\\scheduler_react\\server\\controllers\\user.controller.js");
  reactHotLoader.register(update, "update", "E:\\scheduler_react\\server\\controllers\\user.controller.js");
  reactHotLoader.register(destroy, "destroy", "E:\\scheduler_react\\server\\controllers\\user.controller.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();