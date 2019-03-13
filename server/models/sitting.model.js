import bookshelf from '../config/bookshelf';

/**
 * User model.
 */
class Sitting extends bookshelf.Model {
    
	get tableName() {
		return 'ha45_resources';
	}

	get hasTimestamps() {
		return false;
	}

}

export default Sitting;
