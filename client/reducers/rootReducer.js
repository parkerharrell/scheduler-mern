import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

// Import custom components
import authReducer from './authReducer';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer, // ← redux-form
    data: dataReducer, 
});

export default rootReducer;