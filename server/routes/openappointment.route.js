import express from 'express';
import * as openappointmentCtrl from '../controllers/openappointment.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: openappointments
 *     description: OpenAppointment operations
 */

/**
 * @swagger
 * definitions:
 *   OpenAppointment:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific openappointment
 *         example: 2
 *       customer:
 *         type: string
 *         description: customer Id
 *         example: 12
 *       location:
 *         type: string
 *         description: Location Id
 *         example: 1
 *       service:
 *         type: string
 *         description: Service Id
 *         example: 1
 *       payment:
 *         type: string
 *         description: payment Type
 *         example: Cash
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
 * /openappointments:
 *   post:
 *     tags:
 *       - openappointment
 *     summary: "Create a new openappointment"
 *     security:
 *        - Bearer: []
 *     operationId: storeOpenAppointment
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Created openappointment object
 *         required: true
 *         schema:
 *           $ref: "#/definitions/OpenAppointment"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/OpenAppointment"
 *       403:
 *          description: OpenAppointment not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */

	.post(validate(schema.storeOpenAppointment), (req, res) => {
		openappointmentCtrl.store(req, res);
	})

/**
     * @swagger
     * /openappointments:
     *   get:
     *     tags:
     *       - openappointment
     *     summary: "List all openappointments"
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

	.get( (req, res) => {
		openappointmentCtrl.findAll(req, res);
	});


router.route('/:id')

/**
 * @swagger
 * /openappointments/{id}:
 *   get:
 *     tags:
 *       - openappointment
 *     summary: Find the openappointment by ID
 *     operationId: findById
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of openappointment that needs to be fetched
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/OpenAppointment"
 *       404:
 *          description: OpenAppointment not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */

	.get( (req, res) => {
		openappointmentCtrl.findById(req, res);
	})

/**
     * @swagger
     * /openappointments/{id}:
     *   put:
     *     tags:
     *       - openappointment
     *     summary: "Update an existing openappointment by ID"
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
     *         description: Updated openappointment object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/OpenAppointment"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/OpenAppointment"
     *       400:
     *         description: Invalid openappointment
     */

	.put(isAuthenticated, (req, res) => {
		openappointmentCtrl.update(req, res);
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

	.delete(isAuthenticated, (req, res) => {
		openappointmentCtrl.destroy(req, res);
	});
  

export default router;