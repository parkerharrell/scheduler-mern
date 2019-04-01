import HttpStatus from 'http-status-codes';
import User from '../models/user.model';
import Admin from '../models/admin.model';

/**
 * Find all the emails
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
  const { subject, message } = req.body;
  
}
