import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

// Import custom components
import authReducer from './authReducer';
import servicesReducer from './servicesReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer, // ← redux-form
    service: servicesReducer, 
});

export default rootReducer;