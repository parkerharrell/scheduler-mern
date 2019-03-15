import history from '../utils/history';

/**
 * Import all httpSitting as an object.
 */
import * as httpSitting from '../services/httpService';


/**
 * CRUD actions for the application.
 * Every time an action that requires the API is called, it first dispatch an "apiRequest" action.
 *
 * sitting = 'Product', 'Employee', ...
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
		entity: 'sittings',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function update(data) {
	return {
		type: ENTITY_UPDATE,
		entity: 'sittings',
		data: data
	};
}

function fetch(entity, data) {
	return {
		type: ENTITY_FETCH,
		entity: entity,
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function destroy(id) {
	return {
		type: ENTITY_DELETE,
		entity: 'sittings',
		id: id
	};
}

function selectItem(data) {
	return {
		type: SELECT_ENTITY_ITEM,
		entity: 'selectedSitting',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function clearList(sitting) {
	return {
		type: CLEAR_ENTITY_LIST,
		entity: 'sittings'
	};
}

export function fetchAllResources(entity, data) {

	return function (dispatch) {
		return httpSitting.fetchEntityWithData('sittings', data).then((response) => {
			dispatch(fetch(entity, response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function fetchById(id) {
	return function (dispatch) {
		return httpSitting.fetchEntityById('sittings', id).then((response) => {
			dispatch(selectItem(response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
  
export function storeItem(data) {
	return function (dispatch) {
		return httpSitting.storeEntity('sittings', data).then(() => {
			history.goBack();
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function updateItem(id, data) {
	return function (dispatch) {
		return httpSitting.updateEntity('sittings', data, id).then(() => {
			history.goBack();
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function destroyItem(id) {
	return function (dispatch) {
		return httpSitting.destroyEntity('sittings', id).then(() => {
			dispatch(fetchAll());
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}