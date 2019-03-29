import history from '../utils/history';

/**
 * Import all httpService as an object.
 */
import * as httpService from '../services/httpService';


/**
 * CRUD actions for the application.
 * Every time an action that requires the API is called, it first dispatch an "apiRequest" action.
 *
 * file = 'Product', 'Employee', ...
 */
import {
	ENTITY_FAILURE,
	ENTITY_FETCH,
} from '../constants/actionType';

function failure(error) {
	return {
		type: ENTITY_FAILURE,
		error: error
	};
}

export function fetchById(id) {
	return function (dispatch) {
		return httpService.fetchEntityById('files', id).then((data) => {
			const linkSource = data;
			const downloadLink = document.createElement("a");
			const fileName = `${id}.xlsx`;
	
			downloadLink.href = linkSource;
			downloadLink.download = fileName;
			downloadLink.click();
		})
			.catch((error) => {
				dispatch(failure(error));
			});
	};
}
