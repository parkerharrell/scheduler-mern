import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { cloneDeep } from 'lodash';
import Button from '@material-ui/core/Button';
import {Field, reduxForm} from 'redux-form';

import { storeItem } from '../../actions/locationAction';
import renderText from '../../components/common/form/renderText';
import renderPhoneNumber from '../../components/common/form/renderPhoneNumber';

class AddLocation extends Component {

    onSubmit = (formProps) => {
    	const { createLocation } = this.props;
			const result = cloneDeep(formProps);
    	createLocation(result);
    }

    render() {
    	const { handleSubmit } = this.props;
    	
    	return (
    		<form method="post" onSubmit={handleSubmit(this.onSubmit)} >
    			<Link to='/admin/locations'><span>locations</span></Link> / <span>new</span>
    			<br/><br/>
    			<Grid
    				container
    				alignItems="center"
    				spacing={24}
    			>
    				<Grid item xs={6}>
    					<h1>Add Location</h1>
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
    				<Grid item xs={6}>
							<Field
								type="text"
								name="email"
								component={renderText}
								label="Contact Email *"
							/>
						</Grid>
						<Grid item xs={6}>
							<Field
								type="text"
								name="phone"
								component={renderPhoneNumber}
								label="Contact Phone *"
							/>
						</Grid>
						<Grid item xs={6}>
							<Field
								type="text"
								name="street"
								component={renderText}
								label="Street Address *"
							/>
						</Grid>
						<Grid item xs={2}>
							<Field
								type="text"
								name="city"
								component={renderText}
								label="City *"
							/>
						</Grid>
						<Grid item xs={1}>
							<Field
								type="text"
								name="state"
								component={renderText}
								label="State *"
							/>
						</Grid>
						<Grid item xs={3}>
							<Field
								type="text"
								name="zipcode"
								component={renderText}
								label="Zipcode *"
							/>
						</Grid>
					</Grid>
    			<br/><br/>
    			<Grid container justify="center">
    				<Button type="submit" variant="contained" color="primary">Create</Button>
    			</Grid>
    		</form>
    	);
    }
}


const validateAddLocation = values => {
	const errors = {};
	const requiredFields = [
		'title',
		'street',
		'email',
		'phone',
		'city',
		'state',
		'zipcode',
	];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '' + field + ' field is required';
		}
	});
	if (values['zipcode'] && values['zipcode'].length !== 5) {
    errors['zipcode'] = 'Zipcode is Invalid. The length should be 5.';
  }
	if (values.phone && !/^[1-9]\d\d-\d{3}-\d{4}$/i.test(values.phone)) {
		errors.phone = 'Phone number is invalid.';
	}
	if (values.alternate_phone && !/^[1-9]\d\d-\d{3}-\d{4}$/i.test(values.alternate_phone)) {
		errors.alternate_phone = 'Alternate Phone number is invalid.';
	}
	return errors;
};

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	createLocation: bindActionCreators(storeItem, dispatch),
});

AddLocation.propTypes = {
	handleSubmit: PropTypes.func,
	createLocation: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(reduxForm({
	form: 'AddLocationForm',
	validate: validateAddLocation
})(AddLocation));
