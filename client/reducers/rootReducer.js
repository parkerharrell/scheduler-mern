import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import { connectRouter } from 'connected-react-router'

// Import custom components
import authReducer from './authReducer';
import dataReducer from './dataReducer';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    form: formReducer, // ← redux-form
    data: dataReducer, 
});

export default rootReducer;