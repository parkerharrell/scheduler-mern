import bookshelf from '../config/bookshelf';

/**
 * User model.
 */
class Location extends bookshelf.Model {
    
    get tableName() {
        return 'ha45_locations';
    }

    get hasTimestamps() {
        return false;
    }

}

export default Location;
