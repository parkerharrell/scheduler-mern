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

import { updateItem, fetchById, destroyItem } from '../../actions/locationAction';
import renderText from '../../components/common/form/renderText';
import renderTextarea from '../../components/common/form/renderTextarea';

class EditLocation extends Component {

	constructor(props) {
		super(props);
		const { match, getLocationInfo } = props;
		const locationId = match.params.id;
		this.state = {
			locationId,
		};
		getLocationInfo(locationId);
	}

    onSubmit = (formProps) => {
    	const { updateLocation } = this.props;
    	const { locationId } = this.state;
    	const result = cloneDeep(formProps);
    	updateLocation(locationId, result);
    }

    onDelete = () => {
    	const { deleteLocation } = this.props;
    	const { locationId } = this.state;
    	deleteLocation(locationId);
    	this.props.history.push('/admin/locations');
    }

    render() {
    	const { handleSubmit, currentLocation } = this.props;
    	if (isEmpty(currentLocation)) {
    		return (
    			<div>
          	Loading ...      
    			</div>
    		);
    	}
    	
    	return (
    		<form key={currentLocation} method="post" onSubmit={handleSubmit(this.onSubmit)} >
    			<Link to='/admin/locations'><span>locations</span></Link> / <span>{currentLocation.id}</span>
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
    					<Button variant="raised" color="secondary" onClick={this.onDelete}>Delete</Button>
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
    						placeholder="[ Street Address ]
[ City, State, Zipcode ]
[ Phone Number ]
[ Contact Email ]"
    					/>
    				</Grid>
    			</Grid>
    			<br/><br/>
    			<Grid container justify="center">
    				<Grid item xs={3}></Grid>
    				<Grid item xs={3} style={{ textAlign: 'center' }}>
    					<Button type="submit" variant="raised" color="primary">Update</Button>
    				</Grid>
    				<Grid item xs={3} style={{ textAlign: 'center' }}>
    					<Link to="/admin/locations"><Button variant="raised" color="primary">Cancel</Button></Link>
    				</Grid>
    				<Grid item xs={3}></Grid>
    			</Grid>
    		</form>
    	);
    }
}


const validateEditLocation = values => {
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
const mapStateToProps = state => ({
	currentLocation: state.data.selectedLocation,
	initialValues: state.data.selectedLocation,
});


const mapDispatchToProps = dispatch => ({
	getLocationInfo: bindActionCreators(fetchById, dispatch),
	updateLocation: bindActionCreators(updateItem, dispatch),
	deleteLocation: bindActionCreators(destroyItem, dispatch),
});

EditLocation.propTypes = {
	handleSubmit: PropTypes.func,
	getLocationInfo: PropTypes.func,
	match: PropTypes.object,
	history: PropTypes.object,
	currentLocation: PropTypes.object,
	updateLocation: PropTypes.func,
	deleteLocation: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'EditLocationForm',
	validate: validateEditLocation,
	enableReinitialize : true,
})(EditLocation));
