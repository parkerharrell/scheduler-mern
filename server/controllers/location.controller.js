import HttpStatus from 'http-status-codes';
import location from '../models/location.model';

/**
 * Find all the locations
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
	location
		.query('orderBy', 'show_order', 'asc')
		.fetchAll()
		.then(location => res.json({
			error: false,
			data: location.toJSON()
		})
		)
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 *  Find location by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
	location.forge({id: req.params.id})
		.fetch()
		.then(location => {
			if (!location) {
				res.status(HttpStatus.NOT_FOUND).json({
					error: true, data: {}
				});
			}
			else {
				res.json({
					error: false,
					data: location.toJSON()
				});
			}
		})
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 * store new location
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
	location
		.query('orderBy', 'show_order', 'asc')
		.fetchAll()
		.then(locations => {
			const params = Object.assign({}, req.body);
			params.show_order = locations.length;
			return location.forge({
				...params
			}, {hasTimestamps: false}).save();
		})
		.then(location => res.json({
			success: true,
			data: location.toJSON()
		})
		)
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 * Update location by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
	location.forge({id: req.params.id})
		.fetch({require: true})
		.then(location => location.save({ ...req.body })
			.then(() => res.json({
				error: false,
				data: location.toJSON()
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
 * Destroy location by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
	location.forge({id: req.params.id})
		.fetch({require: true})
		.then(location => location.destroy()
			.then(() => res.json({
				error: false,
				data: {message: 'location deleted successfully.'}
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