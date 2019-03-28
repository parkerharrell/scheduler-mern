import Joi from 'joi';

export default {
	storeUser: {
		body: {
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
			username: Joi.string(),
			email: Joi.string().email().required(),
			password: Joi.string(),
			created: Joi.number().required(),
			confirm_password: Joi.string(),
			contact_phone: Joi.string(),
			alternate_phone: Joi.string(),
			street_address: Joi.string(),
			address_2: Joi.string(),
			city: Joi.string(),
			state: Joi.string(),
			zipcode: Joi.string().required(),
			ex_customer: Joi.boolean(),
			preseller_initials: Joi.string(),
			notes: Joi.string(),
			paymenttype: Joi.string(),
		}
	},

	updateUser: {
		body: {
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().min(6).required(),
			paymenttype: Joi.string(),
		},
		params: {
			userId: Joi.string().hex().required()
		}
	},

	login: {
		body: {
			username: Joi.string().required(),
			password: Joi.string().required()
		}
	},
	storeService: {
		body: {
			title: Joi.string().required(),
			description: Joi.string().required(),
			min_from_now: Joi.number().required(),
			max_from_now: Joi.number().required(),
			price: Joi.number(),
			duration: Joi.number().required(),
			recur_total: Joi.string(),
			recur_options: Joi.string(),
			lead_in: Joi.number(),
			lead_out: Joi.number(),
			min_cancel: Joi.number(),
			return_url: Joi.string(),
			nonuser_permission: Joi.string(),
			user_permission: Joi.string(),
			payment: Joi.string(),
		}
	},

	updateService: {
		body: {
			title: Joi.string().required(),
			description: Joi.string().required(),
			min_from_now: Joi.number().required(),
			max_from_now: Joi.number().required(),
			price: Joi.number(),
			recur_total: Joi.string(),
			recur_options: Joi.string(),
			duration: Joi.number(),
			lead_in: Joi.number(),
			lead_out: Joi.number(),
			min_cancel: Joi.number(),
			return_url: Joi.string(),
			nonuser_permission: Joi.string(),
			user_permission: Joi.string(),
			payment: Joi.string(),
		},
		params: {
			id: Joi.string().hex().required()
		}
	},
	storeLocation: {
		body: {
			title: Joi.string().required(),
			email: Joi.string().email().required(),
			phone: Joi.string().required(),
			street: Joi.string().required(),
			city: Joi.string().required(),
			state: Joi.string().required(),
			zipcode: Joi.string().required(),
		}
	},

	updateLocation: {
		body: {
			title: Joi.string().required(),
			email: Joi.string().email().required(),
			phone: Joi.string().required(),
			street: Joi.string().required(),
			city: Joi.string().required(),
			state: Joi.string().required(),
			zipcode: Joi.string().required(),
		},
		params: {
			id: Joi.string().hex().required()
		}
	},
	storeEvent: {
		body: {
			summary: Joi.string(),
			start: Joi.string(),
			end: Joi.string(),
			email: Joi.string().email(),
			description: Joi.string(),
			location: Joi.string(),
		}
	},
	updateSetting: {
		body: {
			meta_value: Joi.string().required(),
		},
		params: {
			class: Joi.string().required(),
		}
	},
	storeOpenAppointment: {
		body: {
			location: Joi.number(),
			service: Joi.number(),
			customer: Joi.number(),
			payment: Joi.string(),
		}
	},

	storeSitting: {
		body: {
			title: Joi.string().required(),
			location: Joi.number().required(),
			service: Joi.number().required(),
		}
	},

	updateSitting: {
		body: {
			title: Joi.string().required(),
			location: Joi.number().required(),
			service: Joi.number().required(),
			status: Joi.number().required(),
			show_order: Joi.number().required(),
		},
		params: {
			id: Joi.string().hex().required()
		}
	},
};