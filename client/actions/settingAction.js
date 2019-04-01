import history from '../utils/history';
import { pickBy } from 'lodash';

/**
 * Import all httpSetting as an object.
 */
import * as httpSetting from '../services/httpService';


/**
 * CRUD actions for the application.
 * Every time an action that requires the API is called, it first dispatch an "apiRequest" action.
 *
 * setting = 'Product', 'Employee', ...
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
		entity: 'settings',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function update(data) {
	return {
		type: ENTITY_UPDATE,
		entity: 'settings',
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
		entity: 'settings',
		id: id
	};
}

function selectItem(data) {
	return {
		type: SELECT_ENTITY_ITEM,
		entity: 'selectedSetting',
		data: data
	};
}

// eslint-disable-next-line no-unused-vars
function clearList(setting) {
	return {
		type: CLEAR_ENTITY_LIST,
		entity: 'settings'
	};
}

export function fetchAll(data) {

	return function (dispatch) {
		return httpSetting.fetchEntityWithData('settings', data).then((response) => {
			dispatch(fetch('settings', response['data'].data));
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}


export function fetchById(id) {
	return function (dispatch) {
		return httpSetting.fetchEntityById('settings', id).then((response) => {
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
		return httpSetting.storeEntity('settings', data).then(() => {
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
		return httpSetting.updateEntity('settings', data, id).then(() => {
			history.goBack();
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}

export function destroyItem(id) {
	return function (dispatch) {
		return httpSetting.destroyEntity('settings', id).then(() => {
			dispatch(fetchAll());
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
