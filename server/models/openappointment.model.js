import bookshelf from '../config/bookshelf';

/**
 * User model.
 */
class OpenAppointment extends bookshelf.Model {
    
	get tableName() {
		return 'ha45_openappointments';
	}

	get hasTimestamps() {
		return false;
	}

}

export default OpenAppointment;
