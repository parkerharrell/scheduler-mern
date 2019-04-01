import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import Admin from '../models/admin.model';
import jwt from 'jsonwebtoken';

import * as _ from 'lodash';

/**
 * Find all the admins
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
	const { page, limit, sort } = req.query;
	const sortBy = sort ? sort : 'email';
	let admins = [];
	Admin
		.query('orderBy', sortBy, 'asc')
		.simplePaginate({ page, limit })
		.then(admin => {
			admins = admin;
		})
		.then(() => Admin.count('id'))
		.then(total => res.json({
				error: false,
				data: {
					...admins,
					total: total,
				}
			}))
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 *  Find admin by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
	Admin.forge({id: req.params.id})
		.fetch()
		.then(admin => {
			if (!admin) {
				res.status(HttpStatus.NOT_FOUND).json({
					error: true, data: {}
				});
			}
			else {
				res.json({
					error: false,
					data: admin.toJSON()
				});
			}
		})
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 * store new admin
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
	const params = _.assign({}, req.body);
	if (req.body.password) {
		const cryptedPassword = bcrypt.hashSync(req.body.password, 10);
		params.password = cryptedPassword;
	}

	Admin.forge({
		...params,
	}, {hasTimestamps: false}).save()
		.then(admin => {
			const token = jwt.sign({
				id: admin.get('id'),
				adminname: admin.get('adminname')
			}, process.env.TOKEN_SECRET_KEY);

			return res.json({
				success: true,
				token,
				adminname:  admin.get('adminname'),
				email: admin.get('email'),
			});
		})
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 * Update admin by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
	const params = _.assign({}, req.body);
	if (req.body.password) {
		const cryptedPassword = bcrypt.hashSync(req.body.password, 10);
		params.password = cryptedPassword;
	}

	Admin.forge({id: req.params.id})
		.fetch({require: true})
		.then(admin => admin.save({
			...params,
		})
			.then(() => res.json({
				error: false,
				data: admin.toJSON()
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
 * Destroy admin by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
	Admin.forge({id: req.params.id})
		.fetch({require: true})
		.then(admin => admin.destroy())
		.then(() => res.json({
			error: false,
			data: {message: 'Admin deleted successfully.'}
		}))
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: true,
			data: {message: err.message}
		}))
}