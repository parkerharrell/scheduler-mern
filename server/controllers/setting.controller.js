import HttpStatus from 'http-status-codes';
import * as _ from 'lodash';

import setting from '../models/setting.model';

/**
 * Find all the settings
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
	const query = _.pickBy(req.query, _.identity);
	console.log('------------query:', query);
	setting.where(query)
		.fetchAll()
		.then(result => res.json({
			error: false,
			data: JSON.parse(result),
		}))
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		}));
}

/**
 * Update setting by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
	const data = JSON.stringify(req.body);
	setting.forge({ class: req.params.class })
		.fetch({require: true})
		.then(setting => setting.save({ meta_value: data })
			.then(() => res.json({
				error: false,
				data: JSON.parse(data),
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
