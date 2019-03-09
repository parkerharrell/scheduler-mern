import history from '../utils/history';

/**
 * Import all httpService as an object.
 */
import * as httpService from '../services/httpService';


/**
 * CRUD actions for the application.
 * Every time an action that requires the API is called, it first dispatch an "apiRequest" action.
 *
 * service = 'Product', 'Employee', ...
 */
import {
	ENTITY_FAILURE,
	ENTITY_CREATE,
	ENTITY_UPDATE,
	ENTITY_FETCH,
	ENTITY_DELETE,
	SELECT_ENTITY_ITEM,
	CLEAR_ENTITY_LIST

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
		entity: 'services',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function update(data) {
	return {
		type: ENTITY_UPDATE,
		entity: 'services',
		data: data
	};
}

function fetch(data) {
	return {
		type: ENTITY_FETCH,
		entity: 'services',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function destroy(id) {
	return {
		type: ENTITY_DELETE,
		entity: 'services',
		id: id
	};
}

function selectItem(data) {
	return {
		type: SELECT_ENTITY_ITEM,
		entity: 'selectedService',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function clearList(service) {
	return {
		type: CLEAR_ENTITY_LIST,
		entity: 'services'
	};
}

export function fetchAll() {
	return function (dispatch) {
		return httpService.fetchEntity('services').then((response) => {
			dispatch(fetch(response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function fetchById(id) {
	return function (dispatch) {
		return httpService.fetchEntityById('services', id).then((response) => {
			dispatch(selectItem(response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
  
export function storeItem(data) {
	return function (dispatch) {
		return httpService.storeEntity('services', data).then(() => {
			history.goBack();
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function updateItem(id, data) {
	return function (dispatch) {
		return httpService.updateEntity('services', data, id).then(() => {
			history.goBack();
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function destroyItem(id) {
	return function (dispatch) {
		return httpService.destroyEntity('services', id).then(() => {
			dispatch(fetchAll());
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
