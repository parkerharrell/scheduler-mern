import express from 'express';
import * as emailCtrl from '../controllers/email.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: emails
 *     description: Email operations
 */

/**
 * @swagger
 * definitions:
 *   Email:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier representing a specific email
 *         example: 2
 *       subject:
 *         type: string
 *         description: subject
 *         example: Timilsina
 *       message:
 *         type: string
 *         description: Message
 *         example: Krishna
 *       header:
 *         type: string
 *         description: Header
 *         example: Krishna
 *       footer:
 *         type: string
 *         description: Footer
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
 * /emails:
 *   post:
 *     tags:
 *       - email
 *     summary: "Create a new email"
 *     security:
 *        - Bearer: []
 *     operationId: storeEmail
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Created email object
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Email"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Email"
 *       403:
 *          description: Email not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */

	.post((req, res) => {
		emailCtrl.store(req, res);
	});

export default router;