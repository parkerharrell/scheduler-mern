import bookshelf from '../config/bookshelf';
bookshelf.plugin(require('bookshelf-simplepaginate'));

/**
 * User model.
 */
class User extends bookshelf.Model {
    
	get tableName() {
		return 'ha45_users';
	}

	get hasTimestamps() {
		return false;
	}

	verifyPassword(password) {
		return this.get('password') === password;
	}
}

export default User;