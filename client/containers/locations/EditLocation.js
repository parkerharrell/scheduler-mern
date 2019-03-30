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
import ArrowUpIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownIcon from '@material-ui/icons/ArrowDownwardRounded';
import Modal from 'react-awesome-modal';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { updateItem, fetchById, destroyItem } from '../../actions/locationAction';
import renderText from '../../components/common/form/renderText';


const styles = {
	table: {
		tableLayout: 'fixed',
    width: '100%',
		textAlign: 'left',
		maxWidth: 1200,
		borderCollapse: 'collapse',
	},
	th: {
		color: '#a9a9a9',
		borderBottom: '1px solid #17acb3',
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 10,
	},
	oddTr: {
		background: '#fafdff',
	},
	arrowUp: {
		cursor: 'pointer',
    color: 'green',
		fontSize: 22,
	},
	arrowDown: {
		cursor: 'pointer',
		color: 'orangered',
		fontSize: 22,
	}
}


class EditLocation extends Component {

	constructor(props) {
		super(props);
		const { match, getLocationInfo } = props;
		const locationId = match.params.id;
		this.state = {
			locationId,
			isDetails: true,
			isAppointments: false,
			visible: false,
		};
		getLocationInfo(locationId);
	}

    onSubmit = (formProps) => {
    	const { updateLocation } = this.props;
    	const { locationId } = this.state;
    	const result = cloneDeep(formProps);
			updateLocation(locationId, result);
			this.props.history.goBack();
    }

    onDelete = () => {
    	const { deleteLocation } = this.props;
    	const { locationId } = this.state;
    	deleteLocation(locationId);
    	this.props.history.push('/admin/locations');
		}
		
		showDetails = () => {
			this.setState({ isDetails: true, isAppointments: false });
		}

		showAppointments = () => {
			this.setState({ isAppointments: true, isDetails: false });
		}

		changeOrder = (id, arrowType) => {
			const { locations, updateLocation } = this.props;
			for (let index = 0; index < locations.length; index ++) {
				const location = locations[index];
				if (location.id === id) {
					const source = location;
					let target;
					if (arrowType === 'up') {
						// Move up event
						target = locations[index - 1];
					} else {
						// Move down event
						target = locations[index + 1];
					}
					// updateLocation(source.id, {show_order: target.show_order});
					// updateLocation(target.id, {show_order: source.show_order});
					break;
				}
			};
		}

		// Modal APIs
		openModal = (id) => {
			this.setState({
				visible : true,
				deleteLocationId: id,
			});
		}

		closeModal = () => {
			this.setState({
				visible : false,
				deleteLocationId: null,
			});
		}

		confirmModal() {
			const { deleteLocationId } = this.state;
			const { deleteLocation } = this.props;
			deleteLocation(deleteLocationId);
			this.setState({
				visible: false,
				deleteLocationId: null,
			});
		}

    render() {
			const { handleSubmit, currentLocation, appointments } = this.props;
			const rowData = [];
			const { isDetails, isAppointments, visible } = this.state;
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
							<Button variant="contained" color="primary" onClick={this.showDetails}>Browse</Button>&nbsp;&nbsp;
							<Button variant="contained" color="primary" onClick={this.showAppointments}>List Appointments</Button>&nbsp;&nbsp;
    					<Button variant="contained" color="secondary" onClick={this.onDelete}>Delete</Button>
    				</Grid>
    				<br/>
					</Grid>
					<Grid
						container
						alignItems="center"
						spacing={24}
					>
						{isDetails &&
							<>
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
										component={renderText}
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
								<br/><br/>
								<Grid container justify="flex-end">
									<Button type="submit" variant="contained" color="primary">Update</Button>&nbsp;&nbsp;
									<Link to="/admin/locations"><Button variant="contained" color="primary">Cancel</Button></Link>
								</Grid>
							</>
						}
						{isAppointments &&
							<>
								<table key={rowData} style={styles.table}>
									<thead>
										<tr>
											<th style={styles.th}>AppointmentId</th>
											<th style={styles.th}>Service</th>
											<th style={styles.th}>Location</th>
											<th style={styles.th}>Customer</th>
											<th style={styles.th}>StartAt</th>
											<th style={styles.th}>Duration</th>
											<th style={styles.th}>Status</th>
										</tr>
									</thead>
									<tbody>
										{rowData.length == 0 &&
											<tr>
												<td colspan={7} align="center">No Data to show.</td>
											</tr>
										}
										{rowData.map((data, index) => (
											<tr key={index} style={index % 2 === 0 ? styles.oddTr : {}}>
												<td>
													<div>{data.title}</div>
													<div><Link to={`/admin/locations/${data.id}`}>Details</Link>&nbsp;|&nbsp;
													<a onClick={() => this.openModal(data.id)}>Remove</a></div>
												</td>
												<td>{data.email}</td>
												<td>{data.phone}</td>
												<td align="right">
													<IconButton style={{ padding: 5 }} onClick={() => this.changeOrder(data.id, 'up')}>
														<ArrowUpIcon style={styles.arrowUp} />
													</IconButton>
													<IconButton style={{ padding: 5 }} onClick={() => this.changeOrder(data.id, 'down')}>
														<ArrowDownIcon style={styles.arrowDown} />
													</IconButton>
												</td>
											</tr>
										))}
									</tbody>
								</table>
								<Modal visible={visible} width="480" height="200" effect="fadeInUp" onClickAway={() => this.closeModal()}>
									<div style={{ padding: 20 }}>
										<Grid container alignItems="flex-end">
											<Grid item xs={12} style={{ textAlign: 'right' }}>
												<CloseIcon onClick={() => this.closeModal()} />
											</Grid>
											<br/>
											<Grid item xs={12} style={{ fontSize: '1.4em', fontWeight: 500, padding: '20px 0' }}>
													Do you really want to delete the location? 
											</Grid>
											<br/>
											<Grid item xs={12} style={{ textAlign: 'right', paddingTop: 20 }}>
												<Button variant="contained" color="primary" onClick={() => this.confirmModal()} >
														Yes
												</Button>
													&nbsp;&nbsp;&nbsp;
												<Button variant="contained" color="secondary" onClick={() => this.closeModal()} >
														No
												</Button>
											</Grid>
										</Grid>
									</div>
								</Modal>
							</>
						}
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
