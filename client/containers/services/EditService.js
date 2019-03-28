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
import { Tabs } from 'antd';
import 'antd/dist/antd.css';

import { updateItem, fetchById, destroyItem } from '../../actions/serviceAction';
import renderText from '../../components/common/form/renderText';
import renderTextarea from '../../components/common/form/renderTextarea';
import renderSelect from '../../components/common/form/renderSelect';
import history from '../../utils/history';
import { leadHrsOptions, leadMinsOptions, availableOptions, recurringOptions, paymentOptions, permissionOptions, durationData } from './service.fieldoptions';

const TabPane = Tabs.TabPane;


class EditService extends Component {

	constructor(props) {
		super(props);
		const { match, getServiceInfo } = props;
		const serviceId = match.params.id;
		this.state = {
			serviceId,
			value: 0,
		};
		getServiceInfo(serviceId);
	}

	onSubmit = (formProps) => {
		const { updateService } = this.props;
		const { serviceId } = this.state;
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
		updateService(serviceId, result);
		history.goBack();
	}

	onDelete = () => {
		const { deleteService } = this.props;
		const { serviceId } = this.state;
		deleteService(serviceId);
		this.props.history.push('/admin/services');
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { handleSubmit, currentService, classes } = this.props;
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
				<Grid
					container
					alignItems="center"
					spacing={24}
				>
					<Grid item xs={6}></Grid>
					<Grid item xs={6} style={{ textAlign: 'right' }}>
						<Button variant="raised" color="secondary" onClick={this.onDelete}>Delete</Button>
					</Grid>
				</Grid>
				<Tabs defaultActiveKey="1" onChange={this.handleChange}>
					<TabPane tab="Edit" key="1">
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
							<Grid item xs={8}>
								<Field
									type="url"
									name="return_url"
									component={renderText}
									label="URL to Return After Appointment Request"
								/>
							</Grid>
							<Grid item xs={4}></Grid>
						</Grid>
					</TabPane>
					<TabPane tab="Recurring" key="2">
						<Grid
							container
							alignItems="center"
							spacing={24}
						>
							<Grid item xs={5}>
								<Field
									name="recur_total"
									label="Max Number of Recurring"
									type="number"
									fullWidth={false}
									component={renderText}
								/>
							</Grid>
							<Grid item xs={7}></Grid>					
							<Grid item xs={5}>
								<Field
									name="recur_options"
									label="Recurring Options"
									data={recurringOptions}
									component={renderSelect}
									fullWidth={false}
									type="select"
								/>
							</Grid>
							<Grid item xs={7}></Grid>					
						</Grid>
					</TabPane>
					<TabPane tab="Permissions" key="3">
						<Grid
							container
							alignItems="center"
							spacing={24}
						>
							<Grid item xs={5}>
								<Field
									name="nonuser_permission"
									label="Non Registered Users"
									data={permissionOptions}
									component={renderSelect}
									fullWidth={false}
									type="select"
								/>
							</Grid>
							<Grid item xs={7}></Grid>
							<Grid item xs={5}>
								<Field
									name="user_permission"
									label="Registered Users"
									data={permissionOptions}
									component={renderSelect}
									fullWidth={false}
									type="select"
								/>
							</Grid>
							<Grid item xs={7}></Grid>
						</Grid>
					</TabPane>
					<TabPane tab="Payments" key="4">
						<Grid
							container
							alignItems="center"
							spacing={24}
						>
							<Grid item xs={5}>
								<Field
									name="payment"
									label="Payment Options"
									data={paymentOptions}
									component={renderSelect}
									fullWidth={false}
									type="select"
								/>
							</Grid>
						</Grid>
					</TabPane>
				</Tabs>
				<br/><br/>
				<Grid container justify="flex-end">
						<Button type="submit" variant="raised" color="primary">Update</Button>&nbsp;&nbsp;
						<Link to="/admin/services"><Button variant="raised" color="primary">Cancel</Button></Link>
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
