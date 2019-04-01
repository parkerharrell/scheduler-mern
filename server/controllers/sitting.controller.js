import HttpStatus from 'http-status-codes';
import * as _ from 'lodash';

import sitting from '../models/sitting.model';
import serviceModel from '../models/service.model';

/**
 * Find all the sittings
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
	const query = _.pickBy(req.query, _.identity);
	console.log('query:', query);
	sitting.where({ ...query, status: 1 })
		.query('orderBy', 'show_order', 'asc')
		.fetchAll()
		.then(sittings => {
			if (query.location) {
				const sittingIds = sittings.map(sitting => sitting.get('service'));
				return serviceModel.where('id', 'IN', sittingIds)
				.fetchAll();
			}
			if (query.service) {
				const locationIds = sittings.map(sitting => sitting.get('location'));
				return locationModel.where('id', 'IN', locationIds)
				.fetchAll();
			}
			return sittings;
		})
		.then(result => res.json({
			error: false,
			data: result.toJSON()
		})
		)
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 *  Find sitting by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
	sitting.forge({id: req.params.id})
		.fetch()
		.then(sitting => {
			if (!sitting) {
				res.status(HttpStatus.NOT_FOUND).json({
					error: true, data: {}
				});
			}
			else {
				res.json({
					error: false,
					data: sitting.toJSON()
				});
			}
		})
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 * store new sitting
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
	sitting
		.query('orderBy', 'show_order', 'asc')
		.fetchAll()
		.then(sittings => {
			const params = Object.assign({}, req.body);
			params.show_order = sittings.length;
			return Service.forge({
				...params
			}, {hasTimestamps: false}).save()
		})
		.then(sitting => res.json({
			success: true,
			data: sitting.toJSON()
		})
		)
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 * Update sitting by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
	sitting.forge({id: req.params.id})
		.fetch({require: true})
		.then(sitting => sitting.save({ ...req.body })
			.then(() => res.json({
				error: false,
				data: sitting.toJSON()
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
 * Destroy sitting by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
	sitting.forge({id: req.params.id})
		.fetch({require: true})
		.then(sitting => sitting.destroy()
			.then(() => res.json({
				error: false,
				data: {message: 'Sitting deleted successfully.'}
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