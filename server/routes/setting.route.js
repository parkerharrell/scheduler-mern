import express from 'express';
import * as settingCtrl from '../controllers/setting.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: settings
 *     description: Setting operations
 */

/**
 * @swagger
 * definitions:
 *   Setting:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific setting
 *         example: 2
 *       class:
 *         type: string
 *         description: meta class name
 *         example: emails
 *       meta_name:
 *         type: string
 *         description: meta name
 *         example: Sender Email
 *       meta_value:
 *         type: string
 *         description: Meta value
 *         example: 2
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
     * /settings:
     *   get:
     *     tags:
     *       - setting
     *     summary: "List all settings"
     *     operationId: findAll
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: class
     *         in: query
     *         description: Fetch by location
     *         required: false
     *         type: string
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *            type: object
     */

	.get( (req, res) => {
		settingCtrl.findAll(req, res);
	});


router.route('/:class')

/**
     * @swagger
     * /settings/{class}:
     *   put:
     *     tags:
     *       - setting
     *     summary: "Update an existing setting by ID"
     *     security:
     *       - Bearer: []
     *     operationId: update
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: class
     *         in: path
     *         description: id that need to be updated
     *         required: true
     *         type: integer
     *       - name: body
     *         in: body
     *         description: Updated setting object
     *         required: true
     *         schema:
     *           $ref: "#/definitions/Setting"
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           $ref: "#/definitions/Setting"
     *       400:
     *         description: Invalid setting
     */

	.put(isAuthenticated, (req, res) => {
		settingCtrl.update(req, res);
	});
  

export default router;