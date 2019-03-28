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

class AddSitting extends Component {
	state = {
		serviceList: [],
		locationList: [],
	}

	componentWillReceiveProps(nextProps) {
		const { services, locations } = nextProps;
	}

	onSubmit = (formProps) => {
		const { createSitting } = this.props;
		const result = cloneDeep(formProps);
		createSitting(result);
	}

	render() {
		const { handleSubmit } = this.props;
		// const { serviceList, locationList } = this.state;
		
		return (
			<form method="post" onSubmit={handleSubmit(this.onSubmit)} >
				<Link to='/admin/sittings'><span>sittings</span></Link> / <span>new</span>
				<br/><br/>
				<Grid
					container
					alignItems="center"
					spacing={24}
				>
					<Grid item xs={6}>
						<h1>Add Sitting</h1>
					</Grid>
					<Grid item xs={6}>
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
					{/* <Grid item xs={2}>
						<Field
							name="service"
							label="Service"
							data={serviceList}
							component={renderSelect}
							fullWidth={false}
							type="select"
						/>
					</Grid>
					<Grid item xs={2}>
						<Field
							name="location"
							label="Location"
							data={locationList}
							component={renderSelect}
							fullWidth={false}
							type="select"
						/>
					</Grid> */}
				</Grid>
				<br/><br/>
				<Grid container justify="center">
					<Button type="submit" variant="raised" color="primary">Create</Button>
				</Grid>
			</form>
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
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	createSitting: bindActionCreators(storeItem, dispatch),
});

AddSitting.propTypes = {
	handleSubmit: PropTypes.func,
	createSitting: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(reduxForm({
	form: 'AddSittingForm',
	validate: validateAddSitting
})(AddSitting));
