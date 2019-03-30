import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { cloneDeep } from 'lodash';
import Button from '@material-ui/core/Button';
import {Field, reduxForm} from 'redux-form';

import { storeItem } from '../../actions/sittingAction';
import renderText from '../../components/common/form/renderText';
import renderTextarea from '../../components/common/form/renderTextarea';
import renderSelect from '../../components/common/form/renderSelect';

import { fetchAll as fetchLocationsAction } from '../../actions/locationAction';
import { fetchAll as fetchServicesAction } from '../../actions/serviceAction';

const styles = {
	container: {
		maxWidth: 800,
	}
}

class AddSitting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			serviceList: [],
			locationList: [],
		};
		const { fetchServices, fetchLocations } = this.props;
		fetchServices();
		fetchLocations();
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
		this.setState({
			serviceList: serviceArr,
			locationList: locationArr,
		});
	}

	onSubmit = (formProps) => {
		const { createSitting } = this.props;
		const result = cloneDeep(formProps);
		createSitting(result);
	}

	render() {
		const { handleSubmit } = this.props;
		const { serviceList, locationList } = this.state;
		
		return (
			<div style={styles.container}>
				<form method="post" onSubmit={handleSubmit(this.onSubmit)} >
					<Link to='/admin/sittings'><span>sittings</span></Link> / <span>new</span>
					<br/><br/>
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
								data={serviceList}
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
								data={locationList}
								component={renderSelect}
								fullWidth={false}
								type="select"
							/>
						</Grid>
					</Grid>
					<br/><br/>
					<Grid container justify="center">
						<Button type="submit" variant="contained" color="primary">Create</Button>
					</Grid>
				</form>
			</div>
		);
	}
}


const validateAddSitting = values => {
	const errors = {};
	const requiredFields = [
		'title',
		'description',
	];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '' + field + ' field is required';
		}
	});

	return errors;
};


/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
	locations: state.data.locations,
	services: state.data.services,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	createSitting: bindActionCreators(storeItem, dispatch),
	fetchServices: bindActionCreators(fetchServicesAction, dispatch),
	fetchLocations: bindActionCreators(fetchLocationsAction, dispatch),
});

AddSitting.propTypes = {
	handleSubmit: PropTypes.func,
	createSitting: PropTypes.func,
	fetchServices: PropTypes.func,
	fetchLocations: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'AddSittingForm',
	validate: validateAddSitting
})(AddSitting));
