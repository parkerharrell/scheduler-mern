import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { cloneDeep } from 'lodash';
import Button from '@material-ui/core/Button';
import {Field, reduxForm} from 'redux-form';
import { isEmpty } from 'lodash';
import * as moment from 'moment';

import { updateItem, fetchById, destroyItem } from '../../actions/serviceAction';
import renderText from '../../components/common/form/renderText';
import renderTextarea from '../../components/common/form/renderTextarea';
import renderSelect from '../../components/common/form/renderSelect';


const durationData = [
	{
		value: 900,
		label: '15 mins'
	}, {
		value: 1800,
		label: '30 mins'
	}, {
		value: 2700,
		label: '45 mins'
	}, {
		value: 3600,
		label: '60 mins'
	}, , {
		value: 5400,
		label: '90 mins'
	}
];

const availableOptions = [
	{
		value: 60,
		label: 'mins'
	}, {
		value: 3600,
		label: 'hrs'
	}, {
		value: 86400,
		label: 'days'
	}, {
		value: 604800,
		label: 'weeks'
	},
];

class EditService extends Component {

	constructor(props) {
		super(props);
		const { match, getServiceInfo } = props;
		const serviceId = match.params.id;
		this.state = {
			serviceId,
		};
		getServiceInfo(serviceId);
	}

    onSubmit = (formProps) => {
    	const { updateService } = this.props;
    	const { serviceId } = this.state;
    	const result = cloneDeep(formProps);
    	result.min_from_now = formProps['minfromnow_number'] * formProps['minfromnow_options'];
			result.max_from_now = formProps['maxfromnow_number'] * formProps['maxfromnow_options'];
			delete result.minfromnow_number;
			delete result.minfromnow_options;
			delete result.maxfromnow_number;
			delete result.maxfromnow_options;
    	updateService(serviceId, result);
    }

    onDelete = () => {
    	const { deleteService } = this.props;
    	const { serviceId } = this.state;
    	deleteService(serviceId);
    	this.props.history.push('/admin/services');
    }

    render() {
    	const { handleSubmit, currentService } = this.props;
    	if (isEmpty(currentService)) {
    		return (
    			<div>
            Loading ...      
    			</div>
    		);
    	}
    	
    	return (
    		<form key={currentService} method="post" onSubmit={handleSubmit(this.onSubmit)} >
    			<Link to='/admin/services'><span>services</span></Link> / <span>{currentService.id}</span>
    			<br/><br/>
    			<Grid
    				container
    				alignItems="center"
    				spacing={24}
    			>
    				<Grid item xs={6}>
    					<h1>Edit</h1>
    				</Grid>
    				<Grid item xs={6} style={{ textAlign: 'right' }}>
    					<Button variant="contained" color="secondary" onClick={this.onDelete}>Delete</Button>
    				</Grid>
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
    				<Grid item xs={12}>
    					<Field
    						name="description"
    						component={renderTextarea}
    						label="Description *"
    					/>
    				</Grid>
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
    				<Grid item xs={3}>
    					<Field
    						type="text"
    						name="price"
    						component={renderText}
    						label="Price *"
    					/>
    				</Grid>
						<Grid item xs={3}>
							<Field
								name="duration"
								label="Duration *"
								data={durationData}
								component={renderSelect}
								type="date"
							/>
    				</Grid>
						<Grid item xs={6}></Grid>
    				<Grid item xs={3}>
    					<Field
    						type="text"
    						name="recur_total"
    						component={renderText}
    						label="Recurring Total"
    					/>
    				</Grid>
    				<Grid item xs={3}>
    					<Field
    						type="text"
    						name="recur_options"
    						component={renderText}
    						label="Recurring Options"
    					/>
    				</Grid>
    				<Grid item xs={6}>
    				</Grid>
    			</Grid>
    			<br/><br/>
    			<Grid container justify="center">
    				<Grid item xs={3}></Grid>
    				<Grid item xs={3} style={{ textAlign: 'center' }}>
    					<Button type="submit" variant="contained" color="primary">Update</Button>
    				</Grid>
    				<Grid item xs={3} style={{ textAlign: 'center' }}>
    					<Link to="/admin/services"><Button variant="contained" color="primary">Cancel</Button></Link>
    				</Grid>
    				<Grid item xs={3}></Grid>
    			</Grid>
    		</form>
    	);
    }
}


const validateEditService = values => {
	const errors = {};
	const requiredFields = [
		'title',
		'description',
		'minfromnow_number',
		'minfromnow_options',
		'maxfromnow_number',
		'maxfromnow_options',
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
const mapStateToProps = state => ({
	currentService: state.data.selectedService,
	initialValues: state.data.selectedService,
});


const mapDispatchToProps = dispatch => ({
	getServiceInfo: bindActionCreators(fetchById, dispatch),
	updateService: bindActionCreators(updateItem, dispatch),
	deleteService: bindActionCreators(destroyItem, dispatch),
});

EditService.propTypes = {
	createService: PropTypes.func,
	handleSubmit: PropTypes.func,
	getServiceInfo: PropTypes.func,
	currentService: PropTypes.object,
	deleteService: PropTypes.func,
	updateService: PropTypes.func,
	history: PropTypes.object,
	match: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'EditServiceForm',
	validate: validateEditService,
	enableReinitialize : true,
})(EditService));
