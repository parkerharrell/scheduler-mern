import express from 'express';
import * as eventCtrl from '../controllers/event.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: events
 *     description: Event operations
 */

/**
 * @swagger
 * definitions:
 *   Event:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific event
 *         example: 2
 *       summary:
 *         type: string
 *         description: Summary
 *         example: Photo View
 *       description:
 *         type: string
 *         description: description
 *         example: This is a service ...
 *       start:
 *         type: string
 *         description: event startDate
 *         format: date-time
 *         example: 2015-05-28T09:00:00-07:00
 *       end:
 *         type: string 
 *         description: event endDate
 *         format: date-time
 *         example: 2015-05-28T09:00:00-07:00
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
 * /events:
 *   post:
 *     tags:
 *       - event
 *     summary: "Create a new event"
 *     security:
 *        - Bearer: []
 *     operationId: storeEvent
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Created event object
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Event"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Event"
 *       403:
 *          description: Event not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */

	.post(validate(schema.storeEvent), (req, res) => {
		eventCtrl.store(req, res);
	})

/**
     * @swagger
     * /events:
     *   get:
     *     tags:
     *       - event
     *     summary: "List all events"
     *     operationId: findAll
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: date
     *         in: query
     *         description: "events by date"
     *         required: false
     *         schema:
     *           type: string
     *           format: date-time
     *       - name: location
     *         in: query
     *         description: "events by location"
     *         required: false
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *            type: object
     */

	.get( (req, res) => {
		eventCtrl.findAll(req, res);
	});


router.route('/:id')

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
		eventCtrl.destroy(req, res);
	});
  

export default router;