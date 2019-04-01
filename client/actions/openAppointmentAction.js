import history from '../utils/history';
import { pickBy } from 'lodash';
/**
 * Import all httpOpenAppointment as an object.
 */
import * as httpService from '../services/httpService';


/**
 * CRUD actions for the application.
 * Every time an action that requires the API is called, it first dispatch an "apiRequest" action.
 *
 * openAppointment = 'Product', 'Employee', ...
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
		entity: 'openAppointments',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function update(id, data) {
	return {
		type: ENTITY_UPDATE,
		entity: 'openAppointments',
		id: id,
		data: data
	};
}

function fetch(data) {
	return {
		type: ENTITY_FETCH,
		entity: 'openAppointments',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function destroy(id) {
	return {
		type: ENTITY_DELETE,
		entity: 'openAppointments',
		id: id
	};
}

function selectOpenAppointment(data) {
	return {
		type: SELECT_ENTITY_ITEM,
		entity: 'selectedOpenAppointment',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function clearList(openAppointment) {
	return {
		type: CLEAR_ENTITY_LIST,
		entity: 'openAppointments'
	};
}

export function fetchAll() {
	return function (dispatch) {
		return httpService.fetchEntity('openAppointments').then((response) => {
			dispatch(fetch(response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function fetchById(id) {
	return function (dispatch) {
		return httpService.fetchEntityById('openAppointments', id).then((response) => {
			dispatch(selectOpenAppointment(response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
  
export function storeOpenAppointment(params) {
	const data = pickBy(params, _.identity);
	return function (dispatch) {
		return httpService.storeEntity('openAppointments', data).then(() => {
			dispatch(success());
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function updateOpenAppointment(id, params) {
	const data = pickBy(params, _.identity);

	return function (dispatch) {
		return httpService.updateEntity('openAppointments', data, id).then((res) => {
			dispatch(update(id, res['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function destroyOpenAppointment(id) {
	return function (dispatch) {
		return httpService.destroyEntity('openAppointments', id).then(() => {
			dispatch(fetchAll());
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
