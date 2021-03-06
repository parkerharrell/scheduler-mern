/* eslint-disable newline-before-return */
import {
	ENTITY_CREATE,
	ENTITY_UPDATE,
	ENTITY_FETCH,
	SELECT_ENTITY_ITEM,
	ENTITY_DELETE,
	CLEAR_ENTITY_LIST,
	EVENT_CREATE_SUCCESS,
	RESET_EVENT,
	APPOINTMENT_UPDATE,
	USERS_INITIALVALUES_UPDATE,
	UPDATE_VERIFY_STATUS,
	SEND_API_REQUEST,
} from '../constants/actionType';
const moment = require('moment-timezone');
import * as _ from 'lodash';

/**
 * A reducer takes two arguments, the current state and an action.
 */

function fancyTimeFormat(time)
{   
		const weeks = ~~(time / 604800);
		const days = ~~(time / 86400);
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);

		if (weeks > 0 && time % 604800 === 0) {
			return {
				number: weeks,
				options: 604800,
			};
		}
		if (days > 0 && time % 86400 === 0) {
			return {
				number: days,
				options: 86400,
			};
		}
    if (hrs > 0 && time % 3600 === 0) {
			return {
				number: hrs,
				options: 3600,
			};
		}
		return {
			number: mins,
			options: 60,
		};
}

export default function (state, action) {
	let initialState = {
		services: [],
		selectedService: {},
		locations: [],
		selectedLocation: {},
		users: [],
		selectedUser: {},
		events: [],
		event_created_success: false,
		appointmentdata: {},
		sittings: [],
		selectedSitting: {},
		settings: {},
		total: 0,
		userInitialValues: {},
		admins: [],
		selectedAdmin: {},
		appointments: [],
		selectedAppointment: {},
		verifyStatus: false,
		loading: false,
	};

	state = state || initialState;
	let newState = Object.assign({}, state);
	newState.loading = false;

	switch (action.type) {
		case ENTITY_CREATE:
			newState[action.entity] = Object.assign({}, state, action.data);
			return newState;

		case ENTITY_UPDATE:
			if (action.id) {
				const entityArr = newState[action.entity].map(item => {
					if (parseInt(item.id, 10) === parseInt(action.id, 10)) {
						return action.data;
					}
					return item;
				});
				newState[action.entity] = _.orderBy(entityArr, ['show_order'],['asc']);
			} else {
				newState[action.entity] = action.data.slice();
			}
			return newState;

		case ENTITY_FETCH: {
			const apiData = action.data.slice();
			let result = apiData;
			const tz = moment.tz.guess();

			if(action.entity === 'services') {
				result = apiData.map(data => {
					const { options, number } = fancyTimeFormat(data.min_from_now);
					data.minfromnow_number = number;
					data.minfromnow_options = options;
					const { options: options1, number: number1 } = fancyTimeFormat(data.max_from_now);
					data.maxfromnow_number = number1;
					data.maxfromnow_options = options1;
					console.log('-------- maxfromnow options;', options1, number1);
					return data;
				});
			}
			if (action.entity === 'users') {
				result = apiData.map(data => {
					data.createdAt = moment(data.created * 1000).tz(tz).format('YYYY/MM/DD');
					return data;
				});
				newState['total'] = action.total;
			}
			if (action.entity === 'admins') {
				result = apiData.map(data => {
					data.createdAt = moment(data.created * 1000).tz(tz).format('YYYY/MM/DD');
					return data;
				});
				newState['total'] = action.total;
			}
			if (action.entity === 'appointments') {
				newState['total'] = action.total;
			}
			newState[action.entity] = result;
			return newState;
		}
		case ENTITY_DELETE:
			newState[action.entity] = state[action.entity].filter(item => item.id !== action.id);
			
			return newState;

		case SELECT_ENTITY_ITEM: {
			const data = Object.assign({}, action.data);
			const tz1 = moment.tz.guess();
			if(action.entity === 'selectedService') {
				const { options, number } = fancyTimeFormat(data.min_from_now);
				data.minfromnow_number = number;
				data.minfromnow_options = options;
				const { options: options1, number: number1 } = fancyTimeFormat(data.max_from_now);
				data.maxfromnow_number = number1;
				data.maxfromnow_options = options1;
				const { options: options2, number: number2 } = fancyTimeFormat(data.min_cancel);
				data.min_cancel_number = number2;
				data.min_cancel_options = options2;
				data.lead_in_hrs = ~~(data.lead_in / 3600);
				data.lead_in_mins = (data.lead_in % 3600) / 60;
				data.lead_out_hrs = ~~(data.lead_out / 3600);
				data.lead_out_mins = (data.lead_out % 3600) / 60;
			}
			if (action.entity === 'selectedUser') {
				data.createdAt = moment(data.created * 1000).tz(tz1).format('YYYY-MM-DD');
			}
			if (action.entity === 'selectedAdmin') {
				data.createdAt = moment(data.created * 1000).tz(tz1).format('YYYY-MM-DD');
			}
			newState[action.entity] = Object.assign({}, data);
			return newState;
		}
		case CLEAR_ENTITY_LIST:
			newState[action.entity] = {};
			return newState;

		case EVENT_CREATE_SUCCESS:
			newState.event_created_success = true;
			return newState;
			
		case RESET_EVENT:
			newState.event_created_success = false;
			newState.appointmentdata.openBook = false;
			return newState;
		case APPOINTMENT_UPDATE:
			newState.appointmentdata[action.entity] = action.data;
			return newState;
		case USERS_INITIALVALUES_UPDATE:
			newState.userInitialValues = action.data;
			return newState;
		case UPDATE_VERIFY_STATUS:
			newState.verifyStatus = action.data;
			return newState;
		case SEND_API_REQUEST:
			newState.loading = true;
			return newState;
		default:
			return state;
	}
}