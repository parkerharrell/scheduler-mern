import bookshelf from '../config/bookshelf';

/**
 * Appointment model.
 */
class Appointment extends bookshelf.Model {
    
	get tableName() {
		return 'ha45_appointments';
	}

	get hasTimestamps() {
		return false;
	}

}

export default Appointment;
