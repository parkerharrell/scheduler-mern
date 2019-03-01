import express from 'express';
import * as locationCtrl from '../controllers/location.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

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

    .post(validate(schema.storeLocation), (req, res) => {
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

    .get( (req, res) => {
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

    .get( (req, res) => {
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
    .put((req, res) => {
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
    .delete((req, res) => {
        locationCtrl.destroy(req, res);
    });


export default router;