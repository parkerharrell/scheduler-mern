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

import { updateItem, fetchById, destroyItem } from '../../actions/sittingAction';
import { fetchAll as fetchLocationsAction } from '../../actions/locationAction';
import { fetchAll as fetchServicesAction } from '../../actions/serviceAction';

import renderText from '../../components/common/form/renderText';
import renderTextarea from '../../components/common/form/renderTextarea';
import renderSelect from '../../components/common/form/renderSelect';

const TabPane = Tabs.TabPane;

class EditSitting extends Component {

	constructor(props) {
		super(props);
		const { match, getSittingInfo } = props;
		const sittingId = match.params.id;
		this.state = {
			sittingId,
			serviceList: [],
			locationList: [],
		};
		const { fetchServices, fetchLocations } = this.props;
		fetchServices();
		fetchLocations();
		getSittingInfo(sittingId);
	}

	componentWillReceiveProps(nextProps) {
		const { services, locations } = nextProps;
		const serviceArr = services.map(service => ({
			value: service.id,
			label: service.title,
		}));

		const locationArr = locations.map(location => ({
			value: location.id,
			label: location.title,
		}));
		console.log('---------- service, location', serviceArr, locationArr);
		this.setState({
			serviceList: serviceArr,
			locationList: locationArr,
		});
	}


	onSubmit = (formProps) => {
		const { updateSitting } = this.props;
		const { sittingId } = this.state;
		const result = cloneDeep(formProps);
		updateSitting(sittingId, result);
	}

	onDelete = () => {
		const { deleteSitting } = this.props;
		const { sittingId } = this.state;
		deleteSitting(sittingId);
		this.props.history.push('/admin/sittings');
	}

	render() {
		const { handleSubmit, currentSitting } = this.props;
		if (isEmpty(currentSitting)) {
			return (
				<div>
					Loading ...      
				</div>
			);
		}
		const { serviceList, locationList } = this.state;
		
		return (
			<>
				<Link to='/admin/sittings'><span>sittings</span></Link> / <span>{currentSitting.id}</span>
				<br/><br/>
				<Grid
					container
					alignItems="center"
					spacing={24}
				>
					<Grid item xs={12} style={{ textAlign: 'right' }}>
						<Button variant="contained" color="secondary" onClick={this.onDelete}>Delete</Button>
					</Grid>
					<br/>
					<Tabs defaultActiveKey="1" onChange={this.handleChange}>
						<TabPane tab="Edit" key="1">
							<form key={currentSitting} method="post" onSubmit={handleSubmit(this.onSubmit)} >
								<Grid
									container
									alignItems="center"
									spacing={24}
								>
									<Grid item xs={12}>
									</Grid>
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
									<Grid item xs={6}>
										<Field
											name="service"
											label="Service"
											data={serviceList || []}
											key={serviceList}
											component={renderSelect}
											fullWidth={false}
											type="select"
										/>
									</Grid>
									<Grid item xs={6}>
										<Field
											name="location"
											label="Location"
											key={locationList}
											data={locationList || []}
											component={renderSelect}
											fullWidth={false}
											type="select"
										/>
									</Grid>
								</Grid>
								<br/><br/>
								<Grid container justify="center">
									<Grid item xs={3}></Grid>
									<Grid item xs={3} style={{ textAlign: 'center' }}>
										<Button type="submit" variant="contained" color="primary">Update</Button>
									</Grid>
									<Grid item xs={3} style={{ textAlign: 'center' }}>
										<Link to="/admin/sittings"><Button variant="contained" color="primary">Cancel</Button></Link>
									</Grid>
									<Grid item xs={3}></Grid>
								</Grid>
							</form>
						</TabPane>
						<TabPane tab="Appointments" key="2">
							<>
								<h3>List Appointments</h3>
							</>
						</TabPane>
						<TabPane tab="Administrators" key="3">
							<>
								<h3>List Administrators</h3>
							</>
						</TabPane>
					</Tabs>
				</Grid>
			</>
		);
	}
}


const validateEditSitting = values => {
	const errors = {};
	const requiredFields = [
		'title',
		'description',
		'location',
		'service',
	];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '' + field + ' field is required';
		}
	});

	return errors;
};

/**
 * Map the actions to props.
 */
const mapStateToProps = state => ({
	currentSitting: state.data.selectedSitting,
	initialValues: state.data.selectedSitting,
	locations: state.data.locations,
	services: state.data.services,
});


const mapDispatchToProps = dispatch => ({
	getSittingInfo: bindActionCreators(fetchById, dispatch),
	updateSitting: bindActionCreators(updateItem, dispatch),
	deleteSitting: bindActionCreators(destroyItem, dispatch),
	fetchServices: bindActionCreators(fetchServicesAction, dispatch),
	fetchLocations: bindActionCreators(fetchLocationsAction, dispatch),
});

EditSitting.propTypes = {
	handleSubmit: PropTypes.func,
	getSittingInfo: PropTypes.func,
	match: PropTypes.object,
	history: PropTypes.object,
	currentSitting: PropTypes.object,
	updateSitting: PropTypes.func,
	deleteSitting: PropTypes.func,
	fetchServices: PropTypes.func,
	fetchLocations: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'EditSittingForm',
	validate: validateEditSitting,
	enableReinitialize : true,
})(EditSitting));
