// Import custom components
import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_SUCCESS, SIGN_UP_SUCCESS } from '../constants/actionType';

var initialState = {
	token: null,
	isAuthenticated: false,
	isLoading: false,
	isAdmin: false,
	errorMessage: null,
	user: {},
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
export default function (state, action) {
	state = state || initialState;

	switch (action.type) {
	case LOG_IN_SUCCESS:
		return Object.assign({}, state, {
			isAuthenticated: true,
			isAdmin: true,
			isLoading: false,
			token: action.data.token,
			user: action.data.user,
			errorMessage: null,
		});

	case LOG_IN_FAILURE:
		return Object.assign({}, state, {
			isAuthenticated: false,
			isLoading: false,
			isAdmin: false,
			token: null,
			user: {},
			errorMessage: action.error.message || 'LogIn Failed.'
		});

	case LOG_OUT_SUCCESS:
		return Object.assign({}, state, {
			isAuthenticated: false,
			isLoading: false,
			isAdmin: false,
			token: null,
			errorMessage: null,
			user: {},
		});

	case SIGN_UP_SUCCESS:
		return Object.assign({}, state, {
			isAuthenticated: true,
			token: action.data.token,
			isLoading: false,
			errorMessage: null,
			user: action.data.user,
		});

	default:
		return state;
	}
}
