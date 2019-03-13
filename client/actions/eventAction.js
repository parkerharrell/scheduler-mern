import history from '../utils/history';

/**
 * Import all httpEvent as an object.
 */
import * as httpEvent from '../services/httpService';


/**
 * CRUD actions for the application.
 * Every time an action that requires the API is called, it first dispatch an "apiRequest" action.
 *
 * event = 'Product', 'Employee', ...
 */
import {
	ENTITY_FAILURE,
	ENTITY_FETCH,
	EVENT_CREATE_SUCCESS,
	RESET_EVENT,
} from '../constants/actionType';

function failure(error) {
	return {
		type: ENTITY_FAILURE,
		error: error
	};
}

function success() {
	return {
		type: EVENT_CREATE_SUCCESS,
	};
}

function reset() {
	return {
		type: RESET_EVENT,
	};
}


function fetch(data) {
	return {
		type: ENTITY_FETCH,
		entity: 'events',
		data: data
	};
}

export function fetchAll(date) {
	return function (dispatch) {
		return httpEvent.fetchEntityWithData('events', { date: date }).then((response) => {
			dispatch(fetch(response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
  
export function storeItem(data) {
	return function (dispatch) {
		return httpEvent.storeEntity('events', data).then(() => {
			dispatch(success());
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function resetEventData() {
	return function (dispatch) {
		dispatch(reset());
	};
}