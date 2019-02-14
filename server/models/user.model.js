import bookshelf from '../config/bookshelf';

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