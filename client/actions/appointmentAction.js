import history from '../utils/history';
import { pickBy } from 'lodash';
/**
 * Import all httpAppointment as an object.
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
		id: id,
		data: data
	};
}

function fetch(data) {
	return {
		type: ENTITY_FETCH,
		entity: 'appointments',
		data: data
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

function selectAppointment(data) {
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

export function fetchAll() {
	return function (dispatch) {
		return httpService.fetchEntity('appointments').then((response) => {
			dispatch(fetch(response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function fetchById(id) {
	return function (dispatch) {
		return httpService.fetchEntityById('appointments', id).then((response) => {
			dispatch(selectAppointment(response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
  
export function storeAppointment(params) {
	// const data = pickBy(params, _.identity);
	return function (dispatch) {
		return httpService.storeEntity('appointments', params).then(() => {
			dispatch(success());
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function updateAppointment(id, params) {
	// const data = pickBy(params, _.identity);

	return function (dispatch) {
		return httpService.updateEntity('appointments', params, id).then((res) => {
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
