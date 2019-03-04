import {createStore, applyMiddleware, compose} from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import history from '../utils/history';
const middleware = routerMiddleware(history);

// Import custom components
import rootReducer from '../reducers/rootReducer';

/**
 * Create redux store that holds the app state.
 */
const store = createStore(rootReducer(history), compose(
    applyMiddleware(thunkMiddleware, middleware, logger)
));

export default store;