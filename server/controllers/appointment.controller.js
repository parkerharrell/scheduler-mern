import HttpStatus from 'http-status-codes';
import Appointment from '../models/appointment.model';

/**
 * Find all the appointments
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
	const { page, limit, sort } = req.query;
	const sortBy = sort ? sort : 'id';
	let appointments = [];
	Appointment
		.query('orderBy', sortBy, 'asc')
		.simplePaginate({ page, limit })
		.then(appointment => {
			appointments = appointment;
		})
		.then(() => Appointment.count('id'))
		.then(total => res.json({
				error: false,
				data: {
					...appointments,
					total: total,
				}
			}))
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 *  Find appointment by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
	Appointment.forge({id: req.params.id})
		.fetch()
		.then(appointment => {
			if (!appointment) {
				res.status(HttpStatus.NOT_FOUND).json({
					error: true, data: {}
				});
			}
			else {
				res.json({
					error: false,
					data: appointment.toJSON()
				});
			}
		})
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 * store new appointment
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
	Appointment
		.forge({
				...req.body
			}, {hasTimestamps: false}).save()
		.then(appointment => res.json({
			success: true,
			data: appointment.toJSON()
		})
		)
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 * Update appointment by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
	Appointment.forge({id: req.params.id})
		.fetch({require: true})
		.then(appointment => appointment.save({ ...req.body })
			.then(() => res.json({
				error: false,
				data: appointment.toJSON()
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
 * Destroy appointment by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
	Appointment.forge({id: req.params.id})
		.fetch({require: true})
		.then(appointment => appointment.destroy()
			.then(() => res.json({
				error: false,
				data: {message: 'Appointment deleted successfully.'}
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