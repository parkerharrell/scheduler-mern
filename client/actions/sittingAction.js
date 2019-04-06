import history from '../utils/history';
import { pickBy } from 'lodash';

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
	SEND_API_REQUEST,
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
function update(id, data) {
	return {
		type: ENTITY_UPDATE,
		entity: 'sittings',
		data: data,
		id: id,
	};
}

function fetchByEntity(entity, data) {
	return {
		type: ENTITY_FETCH,
		entity: entity,
		data: data
	};
}

function fetch(data) {
	return {
		type: ENTITY_FETCH,
		entity: 'sittings',
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

function sendRequest() {
	return {
		type: SEND_API_REQUEST,
	}
}

export function fetchAllResources(entity, data) {

	return function (dispatch) {
		dispatch(sendRequest());

		return httpSitting.fetchEntityWithData('sittings', data).then((response) => {
			dispatch(fetchByEntity(entity, response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}


export function fetchAll() {

	return function (dispatch) {
		dispatch(sendRequest());

		return httpSitting.fetchEntity('sittings').then((response) => {
			dispatch(fetch(response['data'].data));
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
  
export function storeItem(params) {
	const data = pickBy(params, _.identity);

	return function (dispatch) {
		dispatch(sendRequest());

		return httpSitting.storeEntity('sittings', data).then(() => {
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
		dispatch(sendRequest());
		return httpSitting.updateEntity('sittings', data, id).then((res) => {
			dispatch(update(id, res['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function destroyItem(id) {
	return function (dispatch) {
	dispatch(sendRequest());

		return httpSitting.destroyEntity('sittings', id).then(() => {
			dispatch(fetchAll());
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
