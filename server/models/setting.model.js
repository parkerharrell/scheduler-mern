import bookshelf from '../config/bookshelf';

/**
 * Setting model.
 */
class Setting extends bookshelf.Model {
    
	get tableName() {
		return 'ha45_settings';
	}

	get hasTimestamps() {
		return false;
	}

}

export default Setting;
