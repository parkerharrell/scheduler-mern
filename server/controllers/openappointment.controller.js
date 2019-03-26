import HttpStatus from 'http-status-codes';
import OpenAppointment from '../models/openappointment.model';

/**
 * Find all the OpenAppointments
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
	OpenAppointment.forge()
		.fetchAll()
		.then(openappointment => res.json({
			error: false,
			data: openappointment.toJSON()
		})
		)
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 *  Find openappointment by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
	OpenAppointment.forge({id: req.params.id})
		.fetch()
		.then(openappointment => {
			if (!openappointment) {
				res.status(HttpStatus.NOT_FOUND).json({
					error: true, data: {}
				});
			}
			else {
				res.json({
					error: false,
					data: openappointment.toJSON()
				});
			}
		})
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 * store new OpenAppointment
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
	OpenAppointment.forge({
				...req.body,
			}, {hasTimestamps: false})
		.save()
		.then(openappointment => res.json({
			success: true,
			data: openappointment.toJSON()
		})
		)
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 * Update openappointment by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
	OpenAppointment.forge({id: req.params.id})
		.fetch({require: true})
		.then(openappointment => openappointment.save({ ...req.body })
			.then(() => res.json({
				error: false,
				data: openappointment.toJSON()
			})
			)
			.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				error: true,
				data: {message: err.message}
			})
			)
		)
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 * Destroy OpenAppointment by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
	OpenAppointment.forge({id: req.params.id})
		.fetch({require: true})
		.then(openappointment => openappointment.destroy()
			.then(() => res.json({
				error: false,
				data: {message: 'openappointment deleted successfully.'}
			})
			)
			.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				error: true,
				data: {message: err.message}
			})
			)
		)
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}