import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';

import * as _ from 'lodash';

/**
 * Find all the users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
	const { page, limit, sort } = req.query;
	const sortBy = sort ? sort : 'email';
	let users = [];
	User
		.query('orderBy', sortBy, 'asc')
		.simplePaginate({ page, limit })
		.then(user => {
			users = user;
		})
		.then(() => User.count('id'))
		.then(total => res.json({
				error: false,
				data: {
					...users,
					total: total,
				}
			}))
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 *  Find user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
	User.forge({id: req.params.id})
		.fetch()
		.then(user => {
			if (!user) {
				res.status(HttpStatus.NOT_FOUND).json({
					error: true, data: {}
				});
			}
			else {
				res.json({
					error: false,
					data: user.toJSON()
				});
			}
		})
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 * store new user
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
	// let cryptedPassword;
	// if (req.body.password) {
	// 	cryptedPassword = bcrypt.hashSync(req.body.password, 10);
	// }
	const params = _.assign({}, req.body);

	User.forge({
		...params,
	}, {hasTimestamps: false}).save()
		.then(user => {
			const token = jwt.sign({
				id: user.get('id'),
				username: user.get('username')
			}, process.env.TOKEN_SECRET_KEY);

			return res.json({
				success: true,
				token,
				username:  user.get('username'),
				email: user.get('email'),
			});
		})
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: err
		})
		);
}

/**
 * Update user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
	User.forge({id: req.params.id})
		.fetch({require: true})
		.then(user => user.save({
			first_name: req.body.first_name || user.get('first_name'),
			last_name: req.body.last_name || user.get('last_name'),
			email: req.body.email || user.get('email')
		})
			.then(() => res.json({
				error: false,
				data: user.toJSON()
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
 * Destroy user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
	User.forge({id: req.params.id})
		.fetch({require: true})
		.then(user => user.destroy()
			.then(() => res.json({
				error: false,
				data: {message: 'User deleted successfully.'}
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