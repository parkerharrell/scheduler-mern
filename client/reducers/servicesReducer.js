import {
    SERVICE_CREATE,
    SERVICE_UPDATE,
    SERVICE_FETCH,
    SELECT_SERVICE_ITEM,
    SERVICE_DELETE,
    CLEAR_SERVICE_LIST
} from '../constants/actionType';


let initialState = {
    products: [],
    selectedItem: {
        product: {},
    }
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
export default function (state, action) {
    state = state || initialState;
    let newState;

    switch (action.type) {
        case SERVICE_CREATE:
            newState[action.entity] = Object.assign({}, state, action.data);
            return newState;

        case SERVICE_UPDATE:
            newState[action.entity] = Object.assign({}, state, action.data);
            return newState;

        case SERVICE_FETCH:
            newState[action.entity] = Object.assign({}, state, action.data);
            return newState;

        case SERVICE_DELETE:
            const data = Object.assign({}, state);
            newState[action.entity] = data.filter(data => data.id !== action.data.id);
            return newState;

        case SELECT_SERVICE_ITEM:
            newState.selectedItem[action.entity] = Object.assign({}, state, action.data);
            return newState;

        case CLEAR_SERVICE_LIST:
            newState[action.entity] = {};
            return newState;

        default:
            return state;
    }
}