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
 * user = 'Product', 'Employee', ...
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
		entity: 'users',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function update(id, data) {
	return {
		type: ENTITY_UPDATE,
		entity: 'users',
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
		entity: 'users',
		data: data,
		total: total,
	};
}

// eslint-disable-next-line no-unused-vars
function destroy(id) {
	return {
		type: ENTITY_DELETE,
		entity: 'users',
		id: id
	};
}

function selectItem(data) {
	return {
		type: SELECT_ENTITY_ITEM,
		entity: 'selectedUser',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function clearList(user) {
	return {
		type: CLEAR_ENTITY_LIST,
		entity: 'users'
	};
}

function updateVerifyStatus() {
	return {
		type: UPDATE_VERIFY_STATUS,
		data: true,
	}
}

export function updateInitialValues(data) {
	return function (dispatch) {
		dispatch(updatePassword(data));
	};
}

export function fetchAll(params) {
	const data = pickBy(params, _.identity);
	return function (dispatch) {
		return httpService.fetchEntityWithData('users', data).then((response) => {
			dispatch(fetch(response['data']['data'].data, response['data']['data'].total));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function fetchById(id) {
	return function (dispatch) {
		return httpService.fetchEntityById('users', id).then((response) => {
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
		return httpService.storeEntity('users', data).then(() => {
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
		return httpService.updateEntity('users', data, id).then(() => {
			dispatch(update(id, res['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function destroyItem(id) {
	return function (dispatch) {
		return httpService.destroyEntity('users', id).then(() => {
			dispatch(fetchAll());
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function verifyEmail(params) {
	return function (dispatch) {
		return httpService.fetchEntityWithData('users', { confirm_code: params }).then((response) => {
			dispatch(updateVerifyStatus());
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
