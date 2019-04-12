import history from '../utils/history';
import { pickBy } from 'lodash';
/**
 * Import all httpService as an object.
 */
import * as httpService from '../services/httpService';


/**
 * CRUD actions for the application.
 * Every time an action that requires the API is called, it first dispatch an "apiRequest" action.
 *
 * appointment = 'Product', 'Employee', ...
 */
import {
	ENTITY_FAILURE,
	ENTITY_CREATE,
	ENTITY_UPDATE,
	ENTITY_FETCH,
	ENTITY_DELETE,
	SELECT_ENTITY_ITEM,
	CLEAR_ENTITY_LIST,
	USERS_INITIALVALUES_UPDATE,
	UPDATE_VERIFY_STATUS,
} from '../constants/actionType';

function failure(error) {
	return {
		type: ENTITY_FAILURE,
		error: error
	};
}

// eslint-disable-next-line no-unused-vars
function add(data) {
	return {
		type: ENTITY_CREATE,
		entity: 'appointments',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function update(id, data) {
	return {
		type: ENTITY_UPDATE,
		entity: 'appointments',
		data: data,
		id: id,
	};
}

function updatePassword(data) {
	return {
		type: USERS_INITIALVALUES_UPDATE,
		data: data,
	};
}

function fetch(data, total) {
	console.log('=-=====: da:', data, total);
	return {
		type: ENTITY_FETCH,
		entity: 'appointments',
		data: data,
		total: total,
	};
}

// eslint-disable-next-line no-unused-vars
function destroy(id) {
	return {
		type: ENTITY_DELETE,
		entity: 'appointments',
		id: id
	};
}

function selectItem(data) {
	return {
		type: SELECT_ENTITY_ITEM,
		entity: 'selectedAppointment',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function clearList(appointment) {
	return {
		type: CLEAR_ENTITY_LIST,
		entity: 'appointments'
	};
}

export function fetchAll(params) {
	const data = pickBy(params, _.identity);
	return function (dispatch) {
		return httpService.fetchEntityWithData('appointments', data).then((response) => {
			dispatch(fetch(response['data']['data'].data, response['data']['data'].total));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function fetchById(id) {
	return function (dispatch) {
		return httpService.fetchEntityById('appointments', id).then((response) => {
			dispatch(selectItem(response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
  
export function storeItem(params) {
	const data = pickBy(params, _.identity);

	return function (dispatch) {
		return httpService.storeEntity('appointments', data).then(() => {
			history.goBack();
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function updateAppointment(id, params) {
	const data = pickBy(params, _.identity);
	return function (dispatch) {
		return httpService.updateEntity('appointments', data, id).then(() => {
			dispatch(update(id, res['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function destroyAppointment(id) {
	return function (dispatch) {
		return httpService.destroyEntity('appointments', id).then(() => {
			dispatch(fetchAll());
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

