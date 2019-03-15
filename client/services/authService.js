import axios from 'axios';

// Import custom actionType
import * as AuthAction from '../actions/authAction';
import history from '../utils/history';

import { API_URL } from '../config/config';
import {setToken, clearToken} from '../utils/storageUtil';

export function login({username, password}) {

	return function (dispatch) {
		axios.post(API_URL + 'auth/login', {username, password}).then((response) => {

			dispatch(AuthAction.loginSuccess(response.data));

			setToken(response.data.token);

			history.push('/admin');
			// window.location.href = BASE_URL + 'dashboard';
		})
			.catch((error) => {
				dispatch(AuthAction.loginFailure(error.response.data));
			});
	};
}

export function noredirect({username, password}) {

	return function (dispatch) {
		axios.post(API_URL + 'auth/login', {username, password}).then((response) => {

			dispatch(AuthAction.loginSuccess(response.data));

			setToken(response.data.token);

			// window.location.href = BASE_URL + 'dashboard';
		})
			.catch((error) => {
				dispatch(AuthAction.loginFailure(error.response.data));
			});
	};
}

export function logout() {
	return function (dispatch) {

		clearToken();

		dispatch(AuthAction.logoutSuccess());

		history.push('/');
		// window.location.href = BASE_URL;
		return false;
	};
}