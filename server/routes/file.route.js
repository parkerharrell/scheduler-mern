import express from 'express';
import * as fileCtrl from '../controllers/file.controller';
import isAuthenticated from '../middlewares/authenticate';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: files
 *     description: File operations
 */



router.route('/:filename')

/**
     * @swagger
     * /files/{filename}:
     *   put:
     *     tags:
     *       - file
     *     summary: "Update an existing file by ID"
     *     security:
     *       - Bearer: []
     *     operationId: update
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: filename
     *         in: path
     *         description: id that need to be updated
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
     *           schema:
     *             type: string
     *             format: binary
     *       400:
     *         description: Invalid file
     */
    // .get(isAuthenticated, (req, res) => {

	.get((req, res) => {
		fileCtrl.get(req, res);
	});
  

export default router;