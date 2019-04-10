import bookshelf from '../config/bookshelf';

/**
 * OpenAppointment model.
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
