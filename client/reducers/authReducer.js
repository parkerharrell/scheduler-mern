// Import custom components
import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_SUCCESS, SIGN_UP_SUCCESS } from '../constants/actionType';

var initialState = {
	token: null,
	isAuthenticated: false,
	isLoading: false,
	isAdmin: false,
	errorMessage: null,
	useremail: '',
	username: '',
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
			useremail: action.data.email,
			username: action.data.username,
			user: action.data,
			errorMessage: null,
		});

	case LOG_IN_FAILURE:
		return Object.assign({}, state, {
			isAuthenticated: false,
			isLoading: false,
			isAdmin: false,
			token: null,
			errorMessage: action.error.message || 'LogIn Failed.'
		});

	case LOG_OUT_SUCCESS:
		return Object.assign({}, state, {
			isAuthenticated: false,
			isLoading: false,
			isAdmin: false,
			token: null,
			errorMessage: null,
		});

	case SIGN_UP_SUCCESS:
		return Object.assign({}, state, {
			isAuthenticated: true,
			isLoading: false,
			errorMessage: null,
		});

	default:
		return state;
	}
}
