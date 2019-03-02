import {
    ENTITY_CREATE,
    ENTITY_UPDATE,
    ENTITY_FETCH,
    SELECT_ENTITY_ITEM,
    ENTITY_DELETE,
    CLEAR_ENTITY_LIST
} from '../constants/actionType';
const moment = require('moment-timezone');

/**
 * A reducer takes two arguments, the current state and an action.
 */
export default function (state, action) {
    let initialState = {
        services: [],
        selectedService: {},
        locations: [],
        selectedLocation: {},
    };

    state = state || initialState;
    let newState = Object.assign({}, state);

    switch (action.type) {
        case ENTITY_CREATE:
            newState[action.entity] = Object.assign({}, state, action.data);
            return newState;

        case ENTITY_UPDATE:
            newState[action.entity] = Object.assign({}, action.data);
            return newState;

        case ENTITY_FETCH:
            const apiData = action.data.slice();
            let result = [];
            if(action.entity === 'services') {
                const tz = moment.tz.guess();
                result = apiData.map(data => {
                    data.startdate = moment(data.min_from_now * 1000).tz(tz).format('YYYY/MM/DD');
                    data.enddate = moment(data.max_from_now * 1000).tz(tz).format('YYYY/MM/DD');
                    return data;
                });
            }
            if (action.entity === 'locations') {
                result = apiData;
            }
            newState[action.entity] = result;
            return newState;

        case ENTITY_DELETE:
            newState[action.entity] = state[action.entity].filter(item => item.id !== action.id);
            return newState;

        case SELECT_ENTITY_ITEM:
            const data = Object.assign({}, action.data);
            if(action.entity === 'selectedService') {
                const tz1 = moment.tz.guess();
                data.startdate = moment(data.min_from_now * 1000).tz(tz1).format('YYYY-MM-DD');
                data.enddate = moment(data.max_from_now * 1000).tz(tz1).format('YYYY-MM-DD');
            }
            if (action.entity === 'selectedLocation') {

            }
            newState[action.entity] = Object.assign({}, data);
            return newState;

        case CLEAR_ENTITY_LIST:
            newState[action.entity] = {};
            return newState;

        default:
            return state;
    }
}