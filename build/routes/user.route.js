"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var userCtrl = _interopRequireWildcard(require("../controllers/user.controller"));

var _authenticate = _interopRequireDefault(require("../middlewares/authenticate"));

var _joi = _interopRequireDefault(require("../config/joi.validate"));

var _validator = _interopRequireDefault(require("../utils/validator"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var router = _express.default.Router();
/**
 * @swagger
 * tags:
 *   - name: user
 *     description: User operations
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific user
 *         example: 2
*       username:
 *         type: string
 *         description: username
 *         example: Timilsina
 *       first_name:
 *         type: string
 *         description: first name of the user
 *         example: Krishna
 *       last_name:
 *         type: string
 *         description: last name of the user
 *         example: Timilsina
 *       email:
 *         type: string
 *         description: email of the user
 *         required: true
 *         example: test@gmail.com
 *       password:
 *         type: string
 *         description: password of the user
 *         required: true
 *         example: "1234"
 *       created:
 *         type: string
 *         format: date-time
 *         description: User creation datetime
 *   Error:
 *     type: object
 *     properties:
 *        message:
 *           type: string
 *        error:
 *           type: boolean
 *           default: true
 */

/**
 * @swagger
 * securityDefinitions:
 *   Bearer:
 *     description: |
 *            For accessing the API a valid JWT token must be passed in all the queries in
 *            the 'Authorization' header.
 *
 *
 *            A valid JWT token is generated by the API and returned as answer of a call
 *            to the route /auth/login giving a valid user & password.
 *
 *
 *            The following syntax must be used in the 'Authorization' header:
 *
 *            Bearer xxxxxx.yyyyyyy.zzzzzz
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *
 */


router.route('/')
/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - user
 *     summary: "Create a new user"
 *     security:
 *        - Bearer: []
 *     operationId: storeUser
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Created user object
 *         required: true
 *         schema:
 *           $ref: "#/definitions/User"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/User"
 *       403:
 *          description: User not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */
.post((0, _joi.default)(_validator.default.storeUser), function (req, res) {
  userCtrl.store(req, res);
})
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - user
 *     summary: "List all users"
 *     operationId: findAll
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *            type: object
 */
.get(function (req, res) {
  userCtrl.findAll(req, res);
});
router.route('/:id')
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - user
 *     summary: Find the user by ID
 *     operationId: findById
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of user that needs to be fetched
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/User"
 *       404:
 *          description: User not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */
.get(function (req, res) {
  userCtrl.findById(req, res);
})
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - user
 *     summary: "Update an existing user by ID"
 *     security:
 *       - Bearer: []
 *     operationId: update
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id that need to be updated
 *         required: true
 *         type: integer
 *       - name: body
 *         in: body
 *         description: Updated user object
 *         required: true
 *         schema:
 *           $ref: "#/definitions/User"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/User"
 *       400:
 *         description: Invalid user
 */
.put(_authenticate.default, function (req, res) {
  userCtrl.update(req, res);
})
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - user
 *     summary: Delete the user by ID
 *     security:
 *       - Bearer: []
 *     operationId: destroy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of user that needs to be deleted
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *          description: "Invalid ID"
 */
.delete(_authenticate.default, function (req, res) {
  userCtrl.destroy(req, res);
});
var _default = router;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "E:\\scheduler_react\\server\\routes\\user.route.js");
  reactHotLoader.register(_default, "default", "E:\\scheduler_react\\server\\routes\\user.route.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();