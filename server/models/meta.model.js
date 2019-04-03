import bookshelf from '../config/bookshelf';

/**
 * Meta model.
 */
class Meta extends bookshelf.Model {
    
	get tableName() {
		return 'ha45_metas';
	}

	get hasTimestamps() {
		return false;
	}

}

export default Meta;
