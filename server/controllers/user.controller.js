import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import * as _ from 'lodash';

import User from '../models/user.model';
import Meta from '../models/meta.model';
import { confirmEmail } from '../controllers/email.controller';


const CONFIRM_CODE = 'confirm_code';

function generate_random_string(string_length){
	let random_string = '';
	let random_ascii;
	let ascii_low = 65;
	let ascii_high = 90
	for(let i = 0; i < string_length; i++) {
			random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
			random_string += String.fromCharCode(random_ascii)
	}
	return random_string
}

/**
 * Find all the users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
	const { page, limit, sort, confirm_code } = req.query;
	if (confirm_code) {
		let meta = {};
		return Meta.forge({ meta_value: confirm_code, meta_name: CONFIRM_CODE })
			.fetch()
			.then(metadata => {
				meta = metadata;
				return metadata.get('obj_id');
			})
			.then((id) => User.forge({id: id})
				.fetch({require: true}))
			.then(user => user.save({
				email_confirmed: 1,
				status: 1,
			}))
			.then((user) => res.json({
				error: false,
				data: user.toJSON()
			}))
			.then(() => meta.destroy())
			.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				error: true,
				data: {message: err.message}
			}));
	}
	const sortBy = sort ? sort : 'email';
	let users = [];
	return User
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
	const params = _.assign({}, req.body);
	if (req.body.password) {
		const cryptedPassword = bcrypt.hashSync(req.body.password, 10);
		params.password = cryptedPassword;
	}
	let user = {};
	User.forge({
		...params,
	}, {hasTimestamps: false}).save()
		.then(resp => {
			user = resp;
			// Sending Confirm Email
			const verificationCode = generate_random_string(20);
			const verify_link = `${process.env.APP_HOST}:${process.env.APP_PORT}/email-verify?${CONFIRM_CODE}=${verificationCode}`;
			confirmEmail(user.get('email'), user.get('first_name'), user.get('last_name'), verify_link);
			return Meta.forge({
				obj_class: 'users',
				obj_id: user.get('id'),
				meta_name: CONFIRM_CODE,
				meta_value: verificationCode,
			}, {hasTimestamps: false}).save();
		})
		.then(() => {
			const token = jwt.sign({
				id: user.get('id'),
				username: user.get('username')
			}, process.env.TOKEN_SECRET_KEY);
				
			return res.json({
				success: true,
				token,
				username:  user.get('username'),
				email: user.get('email'),
			})
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
	const params = _.assign({}, req.body);
	if (req.body.password) {
		const cryptedPassword = bcrypt.hashSync(req.body.password, 10);
		params.password = cryptedPassword;
	}

	User.forge({id: req.params.id})
		.fetch({require: true})
		.then(user => user.save({
			...params,
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
		.then(user => user.destroy())
		.then(() => res.json({
			error: false,
			data: {message: 'User deleted successfully.'}
		}))
		.catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			error: true,
			data: {message: err.message}
		}))
}