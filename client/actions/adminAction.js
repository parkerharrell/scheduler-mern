import history from '../utils/history';

/**
 * Import all httpService as an object.
 */
import * as httpService from '../services/httpService';


/**
 * CRUD actions for the application.
 * Every time an action that requires the API is called, it first dispatch an "apiRequest" action.
 *
 * admin = 'Product', 'Employee', ...
 */
import {
	ENTITY_FAILURE,
	ENTITY_CREATE,
	ENTITY_UPDATE,
	ENTITY_FETCH,
	ENTITY_DELETE,
	SELECT_ENTITY_ITEM,
	CLEAR_ENTITY_LIST,
	USERS_INITIALVALUES_UPDATE
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
		entity: 'admins',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function update(id, data) {
	return {
		type: ENTITY_UPDATE,
		entity: 'admins',
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
	return {
		type: ENTITY_FETCH,
		entity: 'admins',
		data: data,
		total: total,
	};
}

// eslint-disable-next-line no-unused-vars
function destroy(id) {
	return {
		type: ENTITY_DELETE,
		entity: 'admins',
		id: id
	};
}

function selectItem(data) {
	return {
		type: SELECT_ENTITY_ITEM,
		entity: 'selectedAdmin',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function clearList(admin) {
	return {
		type: CLEAR_ENTITY_LIST,
		entity: 'admins'
	};
}

export function updateInitialValues(data) {
	return function (dispatch) {
		dispatch(updatePassword(data));
	};
}

export function fetchAll(data) {
	return function (dispatch) {
		return httpService.fetchEntityWithData('admins', data).then((response) => {
			dispatch(fetch(response['data']['data'].data, response['data']['data'].total));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function fetchById(id) {
	return function (dispatch) {
		return httpService.fetchEntityById('admins', id).then((response) => {
			dispatch(selectItem(response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
  
export function storeItem(data) {
	return function (dispatch) {
		return httpService.storeEntity('admins', data).then(() => {
			history.goBack();
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function updateItem(id, data) {
	return function (dispatch) {
		return httpService.updateEntity('admins', data, id).then(() => {
			dispatch(update(id, res['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function destroyItem(id) {
	return function (dispatch) {
		return httpService.destroyEntity('admins', id).then(() => {
			dispatch(fetchAll());
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
