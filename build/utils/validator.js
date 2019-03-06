"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var _default = {
  storeUser: {
    body: {
      first_name: _joi.default.string().required(),
      last_name: _joi.default.string().required(),
      username: _joi.default.string().required(),
      email: _joi.default.string().email().required(),
      password: _joi.default.string().min(6).required(),
      created: _joi.default.number().required(),
      confirm_password: _joi.default.string(),
      contact_phone: _joi.default.string(),
      alternate_phone: _joi.default.string(),
      street_address: _joi.default.string(),
      address_2: _joi.default.string(),
      city: _joi.default.string(),
      state: _joi.default.string(),
      zipcode: _joi.default.string().required(),
      ex_customer: _joi.default.boolean(),
      preseller_initials: _joi.default.string(),
      notes: _joi.default.string()
    }
  },
  updateUser: {
    body: {
      first_name: _joi.default.string().required(),
      last_name: _joi.default.string().required(),
      email: _joi.default.string().email().required(),
      password: _joi.default.string().min(6).required()
    },
    params: {
      userId: _joi.default.string().hex().required()
    }
  },
  login: {
    body: {
      username: _joi.default.string().required(),
      password: _joi.default.string().required()
    }
  },
  storeService: {
    body: {
      title: _joi.default.string().required(),
      description: _joi.default.string().required(),
      min_from_now: _joi.default.number().required(),
      max_from_now: _joi.default.number().required(),
      price: _joi.default.number(),
      recur_total: _joi.default.string(),
      recur_options: _joi.default.string()
    }
  },
  updateService: {
    body: {
      title: _joi.default.string().required(),
      description: _joi.default.string().required(),
      min_from_now: _joi.default.number().required(),
      max_from_now: _joi.default.number().required(),
      price: _joi.default.number(),
      recur_total: _joi.default.string(),
      recur_options: _joi.default.string()
    },
    params: {
      id: _joi.default.string().hex().required()
    }
  },
  storeLocation: {
    body: {
      title: _joi.default.string().required(),
      description: _joi.default.string().required()
    }
  },
  updateLocation: {
    body: {
      title: _joi.default.string().required(),
      description: _joi.default.string().required()
    },
    params: {
      id: _joi.default.string().hex().required()
    }
  }
};
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "E:\\Scheduler_node_react\\server\\utils\\validator.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();