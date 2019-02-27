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
    SERVICE_FAILURE,
    SERVICE_CREATE,
    SERVICE_UPDATE,
    SERVICE_FETCH,
    SERVICE_DELETE,
    SELECT_SERVICE_ITEM,
    CLEAR_SERVICE_LIST

} from '../constants/actionType';

function failure(error) {
    return {
        type: SERVICE_FAILURE,
        error: error
    }
}

function add(data) {
    return {
        type: SERVICE_CREATE,
        entity: 'services',
        data: data
    }
}

function update(data) {
    return {
        type: SERVICE_UPDATE,
        entity: 'services',
        data: data
    }
}

function fetch(data) {
    return {
        type: SERVICE_FETCH,
        entity: 'services',
        data: data
    }
}

function destroy(id) {
    return {
        type: SERVICE_DELETE,
        entity: 'services',
        id: id
    }
}

function selectItem(data) {
    return {
        type: SELECT_SERVICE_ITEM,
        entity: 'services',
        data: data
    }
}

function clearList(service) {
    return {
        type: CLEAR_SERVICE_LIST,
        entity: 'services'
    }
}

export function fetchAll() {
    return function (dispatch) {
        return httpService.fetchEntity('services').then((response) => {
            dispatch(fetch(response.data));
        })
            .catch((error) => {
                dispatch(failure(error));
            });
    };
}

export function fetchById(id) {
    return function (dispatch) {
        return httpService.fetchEntityById('services', id).then((response) => {
            dispatch(selectItem(response.data));
        })
            .catch((error) => {
                dispatch(failure(error));
            });
    };
}

export function storeItem(service, data) {
    return function (dispatch) {
        return httpService.storeservice('services', data).then((response) => {
            history.goBack();
        })
            .catch((error) => {
                dispatch(failure(error));
            });
    };
}

export function updateItem(service, data, id) {
    return function (dispatch) {
        return httpService.updateservice('services', data, id).then((response) => {
            history.goBack();
        })
            .catch((error) => {
                dispatch(failure(error));
            });
    };
}

export function destroyItem(service, id, data) {
    return function (dispatch) {
        return httpService.destroyservice('services', id).then((response) => {
            dispatch(fetchAll(data));
        })
            .catch((error) => {
                dispatch(failure(error));
            });
    };
}
