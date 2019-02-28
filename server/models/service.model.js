import bookshelf from '../config/bookshelf';

/**
 * User model.
 */
class Service extends bookshelf.Model {
    
    get tableName() {
        return 'ha45_services';
    }

    get hasTimestamps() {
        return false;
    }

}

export default Service;
