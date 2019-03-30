import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { cloneDeep } from 'lodash';
import Button from '@material-ui/core/Button';
import {Field, reduxForm} from 'redux-form';
import * as moment from 'moment';

import { storeItem } from '../../actions/serviceAction';
import renderText from '../../components/common/form/renderText';
import renderTextarea from '../../components/common/form/renderTextarea';
import renderSelect from '../../components/common/form/renderSelect';

import { leadHrsOptions, leadMinsOptions, availableOptions, durationData } from './service.fieldoptions';

class AddService extends Component {

    onSubmit = (formProps) => {
    	const { createService } = this.props;
    	const result = cloneDeep(formProps);
    	result.min_from_now = formProps['minfromnow_number'] * formProps['minfromnow_options'];
			result.max_from_now = formProps['maxfromnow_number'] * formProps['maxfromnow_options'];
			result.min_cancel = formProps['min_cancel_number'] * formProps['min_cancel_options'];
			result.lead_in = formProps['lead_in_hrs'] * 3600 + formProps['lead_in_mins'] * 60;
			result.lead_out = formProps['lead_out_hrs'] * 3600 + formProps['lead_out_mins'] * 60;
			
			delete result.minfromnow_number;
			delete result.minfromnow_options;
			delete result.maxfromnow_number;
			delete result.maxfromnow_options;
			delete result.min_cancel_number;
			delete result.min_cancel_options;
			delete result.lead_in_hrs;
			delete result.lead_in_mins;
			delete result.lead_out_hrs;
			delete result.lead_out_mins;
    	createService(result);
    }

    render() {
    	const { handleSubmit } = this.props;
    	
    	return (
    		<form method="post" onSubmit={handleSubmit(this.onSubmit)} >
    			<Link to='/admin/services'><span>services</span></Link> / <span>new service</span>
    			<br/><br/>
    			<Grid
						container
						alignItems="center"
						spacing={24}
					>
						<br/>
						<Grid item xs={6}>
							<Field
								type="text"
								name="title"
								component={renderText}
								label="title *"
							/>
						</Grid>
						<Grid item xs={6}>
						</Grid>
						<Grid item xs={8}>
							<Field
								name="description"
								component={renderTextarea}
								label="Description *"
							/>
						</Grid>
						<Grid item xs={4}></Grid>
						<Grid item xs={2}>
							<Field
								name="minfromnow_number"
								label="Min Available *"
								type="number"
								fullWidth={false}
								component={renderText}
							/>
						</Grid>:
						<Grid item xs={2}>
							<Field
								name="minfromnow_options"
								label="Available Options *"
								type="select"
								fullWidth={false}
								data={availableOptions}
								component={renderSelect}
							/>
						</Grid>
						<Grid item xs={1}></Grid>
						<Grid item xs={2}>
							<Field
								name="maxfromnow_number"
								label="Max Available *"
								component={renderText}
								type="number"
								fullWidth={false}
							/>
						</Grid>:
						<Grid item xs={2}>
							<Field
								name="maxfromnow_options"
								label="Available Options *"
								data={availableOptions}
								component={renderSelect}
								fullWidth={false}
								type="date"
							/>
						</Grid>
						<Grid item xs={2}></Grid>
						{/* Lead In */}
						<Grid item xs={2}>
							<Field
								name="lead_in_hrs"
								label="Lead in Hrs"
								type="select"
								fullWidth={false}
								data={leadHrsOptions}
								component={renderSelect}
							/>
						</Grid>:
						<Grid item xs={2}>
							<Field
								name="lead_in_mins"
								label="Lead in Mins"
								type="select"
								fullWidth={false}
								data={leadMinsOptions}
								component={renderSelect}
							/>
						</Grid>
						<Grid item xs={1}></Grid>
						<Grid item xs={2}>
							<Field
								name="lead_out_hrs"
								label="Lead out Hrs"
								data={leadHrsOptions}
								component={renderSelect}
								fullWidth={false}
								type="select"
							/>
						</Grid>:
						<Grid item xs={2}>
							<Field
								name="lead_out_mins"
								label="Lead out Mins"
								data={leadMinsOptions}
								component={renderSelect}
								fullWidth={false}
								type="select"
							/>
						</Grid>
						<Grid item xs={1}></Grid>
						{/* Min Cancellation */}
						<Grid item xs={2}>
							<Field
								name="min_cancel_number"
								label="Cancel Deadline *"
								type="number"
								fullWidth={false}
								component={renderText}
							/>
						</Grid>:
						<Grid item xs={2}>
							<Field
								name="min_cancel_options"
								label="Options *"
								type="select"
								fullWidth={false}
								data={availableOptions}
								component={renderSelect}
							/>
						</Grid>
						<Grid item xs={1}></Grid>
						{/* Duration */}
						<Grid item xs={3}>
							<Field
								name="duration"
								label="Duration *"
								data={durationData}
								component={renderSelect}
								type="select"
							/>
						</Grid>
						<Grid item xs={3}></Grid>
						{/* Price */}
						<Grid item xs={3}>
							<Field
								type="text"
								name="price"
								component={renderText}
								label="Price *"
							/>
						</Grid>
						<Grid item xs={8}></Grid>
					</Grid>
    			<br/><br/>
    			<Grid container justify="center">
    				<Button type="submit" variant="contained" color="primary">Create</Button>
    			</Grid>
    		</form>
    	);
    }
}


const validateAddService = values => {
	const errors = {};
	const requiredFields = [
		'title',
		'description',
		'minfromnow_number',
		'minfromnow_options',
		'maxfromnow_number',
		'maxfromnow_options',
		'min_cancel_number',
		'min_cancel_options',
		'duration',
	];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '' + field + ' field is required';
		}
		if (values['minfromnow_number'] * values['minfromnow_options'] > values['maxfromnow_number'] * values['maxfromnow_options']) {
			errors['minfromnow_number'] = 'Max Available Booking should be bigger than Min Available Booking';
		}
	});

	return errors;
};

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	createService: bindActionCreators(storeItem, dispatch),
});

AddService.propTypes = {
	createService: PropTypes.func,
	handleSubmit: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(reduxForm({
	form: 'AddServiceForm',
	validate: validateAddService
})(AddService));
