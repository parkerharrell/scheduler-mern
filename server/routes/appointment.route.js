import express from 'express';
import * as appointmentCtrl from '../controllers/appointment.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: appointments
 *     description: Appointment operations
 */

/**
 * @swagger
 * definitions:
 *   Appointment:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific appointment
 *         example: 2
 *       service:
 *         type: integer
 *         description: Service Id
 *         example: 1
 *       location:
 *         type: integer
 *         description: Location Id
 *         example: 1
 *       customer:
 *         type: integer
 *         description: Customer Id
 *         example: 1
 *       openBook:
 *         type: bool
 *         description: Book Type
 *         example: false
 *       confirmed:
 *         type: bool
 *         description: Book Approved or not
 *         example: false
 *       cancelled:
 *         type: bool
 *         description: Book Cancelled or not
 *         example: false
 *       no_show:
 *         type: bool
 *         description: Now show
 *         example: false
 *       startAt:
 *         type: string
 *         description: Appointment StartTime
 *         example: "2019-01-20T00:00:00-05:00"
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
 * /appointments:
 *   post:
 *     tags:
 *       - appointment
 *     summary: "Create a new appointment"
 *     security:
 *        - Bearer: []
 *     operationId: storeAppointment
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Created appointment object
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Appointment"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Appointment"
 *       403:
 *          description: Appointment not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */

	.post(validate(schema.storeAppointment), (req, res) => {
		appointmentCtrl.store(req, res);
	})

/**
     * @swagger
     * /appointments:
     *   get:
     *     tags:
     *       - appointment
     *     summary: "List all appointments"
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
		appointmentCtrl.findAll(req, res);
	});


router.route('/:id')

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     tags:
 *       - appointment
 *     summary: Find the appointment by ID
 *     operationId: findById
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of appointment that needs to be fetched
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Appointment"
 *       404:
 *          description: Appointment not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */

	.get( (req, res) => {
		appointmentCtrl.findById(req, res);
	})

/**
     * @swagger
     * /appointments/{id}:
     *   put:
     *     tags:
     *       - appointment
     *     summary: "Update an existing appointment by ID"
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
     *         description: Updated appointment object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Appointment"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Appointment"
     *       400:
     *         description: Invalid appointment
     */

	.put(isAuthenticated, (req, res) => {
		appointmentCtrl.update(req, res);
	})

/**
     * @swagger
     * /appointments/{id}:
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
		appointmentCtrl.destroy(req, res);
	});
  

export default router;