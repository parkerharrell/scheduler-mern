"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var serviceCtrl = _interopRequireWildcard(require("../controllers/service.controller"));

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
 *   - name: services
 *     description: Service operations
 */

/**
 * @swagger
 * definitions:
 *   Service:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific service
 *         example: 2
 *       title:
 *         type: string
 *         description: title
 *         example: Timilsina
 *       description:
 *         type: string
 *         description: description
 *         example: Krishna
 *       min_from_now:
 *         type: integer
 *         description: Timestamp for min available time
 *         example: 10800
 *       max_from_now:
 *         type: integer
 *         description: Timestamp for max available time
 *         example: 10800
 *       min_cancel:
 *         type: integer
 *         description: Timestamp for min available time
 *         example: 10800
 *       allow_queue:
 *         type: integer
 *         description: flag number
 *         example: "1"
 *       pack_only:
 *         type: integer
 *         description: flag number
 *         example: "1"
 *       class_type:
 *         type: int
 *         description: flag number
 *         example: "1"
 *       duration:
 *         type: integer
 *         description: duration
 *         example: "14344453"
 *       until_closed:
 *         type: integer
 *         description: flag number
 *         example: "1"
 *       lead_in:
 *         type: integer
 *         description: flag number
 *         example: "1"
 *       lead_out:
 *         type: integer
 *         description: flag number
 *         example: "1"
 *       price:
 *         type: string
 *         description: price
 *         example: "1"
 *       recur_total:
 *         type: integer
 *         description: flag number
 *         example: "1"
 *       recur_options:
 *         type: string
 *         description: flag number
 *         example: "1"
 *       show_order:
 *         type: integer
 *         description: flag number
 *         example: "1"
 *       return_url:
 *         type: string
 *         description: URL string
 *         example: "https://example.com"
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
 * /services:
 *   post:
 *     tags:
 *       - service
 *     summary: "Create a new service"
 *     security:
 *        - Bearer: []
 *     operationId: storeService
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Created service object
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Service"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Service"
 *       403:
 *          description: Service not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */
.post((0, _joi.default)(_validator.default.storeService), function (req, res) {
  serviceCtrl.store(req, res);
})
/**
 * @swagger
 * /services:
 *   get:
 *     tags:
 *       - service
 *     summary: "List all services"
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
  serviceCtrl.findAll(req, res);
});
router.route('/:id')
/**
 * @swagger
 * /services/{id}:
 *   get:
 *     tags:
 *       - service
 *     summary: Find the service by ID
 *     operationId: findById
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of service that needs to be fetched
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Service"
 *       404:
 *          description: Service not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */
.get(function (req, res) {
  serviceCtrl.findById(req, res);
})
/**
 * @swagger
 * /services/{id}:
 *   put:
 *     tags:
 *       - service
 *     summary: "Update an existing service by ID"
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
 *         description: Updated service object
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Service"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Service"
 *       400:
 *         description: Invalid service
 */
// .put(isAuthenticated, (req, res) => {
//     serviceCtrl.update(req, res);
// })
.put(function (req, res) {
  serviceCtrl.update(req, res);
})
/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     tags:
 *       - service
 *     summary: Delete the service by ID
 *     security:
 *       - Bearer: []
 *     operationId: destroy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of service that needs to be deleted
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *          description: "Invalid ID"
 */
// .delete(isAuthenticated, (req, res) => {
//     serviceCtrl.destroy(req, res);
// });
.delete(function (req, res) {
  serviceCtrl.destroy(req, res);
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

  reactHotLoader.register(router, "router", "E:\\Scheduler_node_react\\server\\routes\\service.route.js");
  reactHotLoader.register(_default, "default", "E:\\Scheduler_node_react\\server\\routes\\service.route.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();