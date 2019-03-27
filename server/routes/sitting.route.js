import express from 'express';
import * as sittingCtrl from '../controllers/sitting.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: sittings
 *     description: Sitting operations
 */

/**
 * @swagger
 * definitions:
 *   Sitting:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific sitting
 *         example: 2
 *       title:
 *         type: string
 *         description: title
 *         example: Timilsina
 *       description:
 *         type: string
 *         description: description
 *         example: Krishna
 *       service:
 *         type: integer
 *         description: Service Id
 *         example: 2
 *       location:
 *         type: integer
 *         description: Location Id
 *         example: 1
 *       status:
 *         type: integer
 *         description: Sitting Status
 *         example: 1
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
 * /sittings:
 *   post:
 *     tags:
 *       - sitting
 *     summary: "Create a new sitting"
 *     security:
 *        - Bearer: []
 *     operationId: storeSitting
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Created sitting object
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Sitting"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Sitting"
 *       403:
 *          description: Sitting not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */

	.post(validate(schema.storeSitting), (req, res) => {
		sittingCtrl.store(req, res);
	})

/**
     * @swagger
     * /sittings:
     *   get:
     *     tags:
     *       - sitting
     *     summary: "List all sittings"
     *     operationId: findAll
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: location
     *         in: query
     *         description: Fetch by location
     *         required: false
     *         type: integer
     *       - name: service
     *         in: query
     *         description: Fetch by service
     *         required: false
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *            type: object
     */

	.get( (req, res) => {
		sittingCtrl.findAll(req, res);
	});


router.route('/:id')

/**
 * @swagger
 * /sittings/{id}:
 *   get:
 *     tags:
 *       - sitting
 *     summary: Find the sitting by ID
 *     operationId: findById
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of sitting that needs to be fetched
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Sitting"
 *       404:
 *          description: Sitting not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */

	.get( (req, res) => {
		sittingCtrl.findById(req, res);
	})

/**
     * @swagger
     * /sittings/{id}:
     *   put:
     *     tags:
     *       - sitting
     *     summary: "Update an existing sitting by ID"
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
     *         description: Updated sitting object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Sitting"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Sitting"
     *       400:
     *         description: Invalid sitting
     */

	.put(isAuthenticated, (req, res) => {
		sittingCtrl.update(req, res);
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
		sittingCtrl.destroy(req, res);
	});
  

export default router;