import Joi from 'joi';

export default {
    storeUser: {
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
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
            notes: Joi.string()
        }
    },

    updateUser: {
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
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
            recur_total: Joi.string(),
            recur_options: Joi.string(),
        }
    },

    updateService: {
        body: {
            title: Joi.string(),
            description: Joi.string(),
            min_from_now: Joi.number(),
            max_from_now: Joi.number(),
            min_cancel: Joi.number(),
            allow_queue: Joi.number(),
            pack_only: Joi.number(),
            class_type: Joi.number(),
            duration: Joi.string(),
            until_closed: Joi.string(),
            lead_in: Joi.string(),
            lead_out: Joi.string(),
            price: Joi.string(),
            recur_total: Joi.string(),
            recur_options: Joi.string(),
            show_order: Joi.string(),
            return_url: Joi.string(),
        },
        params: {
            id: Joi.string().hex().required()
        }
    },
};