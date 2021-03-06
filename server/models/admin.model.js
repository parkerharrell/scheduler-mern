import bookshelf from '../config/bookshelf';
bookshelf.plugin(require('bookshelf-simplepaginate'));

/**
 * Admin model.
 */
class Admin extends bookshelf.Model {
    
	get tableName() {
		return 'ha45_admins';
	}

	get hasTimestamps() {
		return false;
	}

	verifyPassword(password) {
		return this.get('password') === password;
	}
}

export default Admin;