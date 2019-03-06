"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var locationCtrl = _interopRequireWildcard(require("../controllers/location.controller"));

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
 *   - name: locations
 *     description: Location operations
 */

/**
 * @swagger
 * definitions:
 *   Location:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific location
 *         example: 2
 *       title:
 *         type: string
 *         description: title
 *         example: Timilsina
 *       description:
 *         type: string
 *         description: description
 *         example: Krishna
 *   Error:
 *     type: object
 *     properties:
 *        message:
 *           type: string
 *        error:
 *           type: boolean
 *           default: true
 */


router.route('/')
/**
 * @swagger
 * /locations:
 *   post:
 *     tags:
 *       - location
 *     summary: "Create a new location"
 *     security:
 *        - Bearer: []
 *     operationId: storeLocation
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Created location object
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Location"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Location"
 *       403:
 *          description: Location not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */
.post((0, _joi.default)(_validator.default.storeLocation), function (req, res) {
  locationCtrl.store(req, res);
})
/**
 * @swagger
 * /locations:
 *   get:
 *     tags:
 *       - location
 *     summary: "List all locations"
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
  locationCtrl.findAll(req, res);
});
router.route('/:id')
/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     tags:
 *       - location
 *     summary: Find the location by ID
 *     operationId: findById
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of location that needs to be fetched
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Location"
 *       404:
 *          description: Location not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */
.get(function (req, res) {
  locationCtrl.findById(req, res);
})
/**
 * @swagger
 * /locations/{id}:
 *   put:
 *     tags:
 *       - location
 *     summary: "Update an existing location by ID"
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
 *         description: Updated location object
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Location"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Location"
 *       400:
 *         description: Invalid location
 */
// .put(isAuthenticated, (req, res) => {
//     locationCtrl.update(req, res);
// })
.put(function (req, res) {
  locationCtrl.update(req, res);
})
/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     tags:
 *       - location
 *     summary: Delete the location by ID
 *     security:
 *       - Bearer: []
 *     operationId: destroy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of location that needs to be deleted
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *          description: "Invalid ID"
 */
// .delete(isAuthenticated, (req, res) => {
//     locationCtrl.destroy(req, res);
// });
.delete(function (req, res) {
  locationCtrl.destroy(req, res);
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

  reactHotLoader.register(router, "router", "E:\\Scheduler_node_react\\server\\routes\\location.route.js");
  reactHotLoader.register(_default, "default", "E:\\Scheduler_node_react\\server\\routes\\location.route.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();