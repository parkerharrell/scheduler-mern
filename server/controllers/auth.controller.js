import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import logger from '../config/winston';

/**
 * Returns jwt token if valid username and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function login(req, res) {
	const {username, password} = req.body;
	User.query({
		where: {username: username},
	}).fetch().then(user => {
		if (user) {
			if (bcrypt.compareSync(password, user.get('password'))) {

				const token = jwt.sign({
					id: user.get('id'),
					username: user.get('username')
				}, process.env.TOKEN_SECRET_KEY);

				res.json({
					success: true,
					token,
					username:  user.get('username'),
					email: user.get('email'),
				});
			} else {
				logger.log('error', 'Authentication failed. Invalid password.');

				res.status(HttpStatus.UNAUTHORIZED).json({
					success: false,
					message: 'Authentication failed. Invalid password.'
				});
			}
		} else {
			logger.log('error', 'Invalid username or password.');

			res.status(HttpStatus.UNAUTHORIZED).json({
				success: false, message: 'Invalid username or password.'
			});
		}
	});
}