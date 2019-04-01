import history from '../utils/history';
import { pickBy } from 'lodash';
/**
 * Import all httpLocation as an object.
 */
import * as httpLocation from '../services/httpService';


/**
 * CRUD actions for the application.
 * Every time an action that requires the API is called, it first dispatch an "apiRequest" action.
 *
 * location = 'Product', 'Employee', ...
 */
import {
	ENTITY_FAILURE,
	ENTITY_CREATE,
	ENTITY_UPDATE,
	ENTITY_FETCH,
	ENTITY_DELETE,
	SELECT_ENTITY_ITEM,
	CLEAR_ENTITY_LIST,
	APPOINTMENT_UPDATE
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
		entity: 'locations',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function update(id, data) {
	return {
		type: ENTITY_UPDATE,
		entity: 'locations',
		id: id,
		data: data
	};
}

function fetch(data) {
	return {
		type: ENTITY_FETCH,
		entity: 'locations',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function destroy(id) {
	return {
		type: ENTITY_DELETE,
		entity: 'locations',
		id: id
	};
}

function selectItem(data) {
	return {
		type: SELECT_ENTITY_ITEM,
		entity: 'selectedLocation',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function clearList(location) {
	return {
		type: CLEAR_ENTITY_LIST,
		entity: 'locations'
	};
}

export function updateAppointmentLocation(data) {
	return {
		type: APPOINTMENT_UPDATE,
		entity: 'location',
		data: data
	};
}

export function fetchAll() {
	return function (dispatch) {
		return httpLocation.fetchEntity('locations').then((response) => {
			dispatch(fetch(response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function fetchById(id) {
	return function (dispatch) {
		return httpLocation.fetchEntityById('locations', id).then((response) => {
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
		return httpLocation.storeEntity('locations', data).then(() => {
			history.goBack();
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function updateItem(id, params) {
	const data = pickBy(params, _.identity);

	return function (dispatch) {
		return httpLocation.updateEntity('locations', data, id).then((res) => {
			dispatch(update(id, res['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function destroyItem(id) {
	return function (dispatch) {
		return httpLocation.destroyEntity('locations', id).then(() => {
			dispatch(fetchAll());
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
