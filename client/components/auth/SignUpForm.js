import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {withStyles} from '@material-ui/core/styles';
import {Card, CardHeader, CardContent} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// Import custom components
import renderText from '../common/form/renderText';
import renderCheckbox from '../common/form/renderCheckbox';
import renderTextarea from '../common/form/renderTextarea';
import renderPhoneNumber from '../common/form/renderPhoneNumber';
import renderSelect from '../common/form/renderSelect';
import { updateAppointmentOpen } from '../../actions/serviceAction';
import USAStateList from '../../utils/us-states.list';

const styles = theme => ({
	root: {
		minWidth: 320,
		maxWidth: 800,
		height: 'auto',
		position: 'absolute',
		top: 100,
		left: 0,
		right: 0,
		margin: 'auto',
		marginBottom: 100,
		[theme.breakpoints.down('sm')]: {
			top: '100px !important',
		},
	},
	card: {
		padding: 20,
		overflow: 'auto',
		boxShadow: 'none',
		[theme.breakpoints.down('sm')]: {
			padding: 5,
		},
	},
	cardHeader: {
		textAlign: 'center',
		fontWeight: 'bold',
		[theme.breakpoints.down('sm')]: {
			paddingBottom: 0,
		},
	},
	btnDiv: {
		textAlign: 'center'
	},
	btn: {
		marginTop: 21,
	},
	radiogroup: {
		flexDirection: 'row',
		marginLeft: -12,
		marginTop: 2,
		zIndex: 1000,
		position: 'relative',
	},
	radiogrouplabel: {
		fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.6)',
	},
	label: {
		height: 30,
		margin: 0,
		fontSize: '1.2em',
		marginRight: 15,
	},
});

class SignUpForm extends Component {
	state = {
		paymenttype: 'cash',
	}

	handlePaymentType = event => {
		this.setState({ paymenttype: event.target.value });
	};

	handlePaymentTypeClick (e) {
		e.stopPropagation();
	}

	onDataSubmit = (formProps) => {
		const { onSubmit } = this.props;
		const { paymenttype } = this.state;
		const data = Object.assign({}, formProps);
		data.paymenttype = paymenttype;
		onSubmit(data);
	}

	render() {
		const {handleSubmit, classes, onLogin, hideLoginDetails, appointmentdata} = this.props;
		const { paymenttype } = this.state;
	
		return (
			<div className={classes.root} style={{ top: onLogin !== undefined ? 200 : 100 }}>
				<Card className={classes.card}>
					<CardHeader
						className={classes.cardHeader}
						title="Register"
					/>
					<CardContent>
						<form method="post" onSubmit={handleSubmit(this.onDataSubmit)}>
							<Grid container spacing={24}>
								<Grid item md={12} xs={12}>
									<Field
										type="text"
										name="email"
										component={renderText}
										label="Email *"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Field
										type="text"
										name="first_name"
										component={renderText}
										label="First Name *"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Field
										type="text"
										name="last_name"
										component={renderText}
										label="Last Name *"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Field
										type="text"
										name="phone"
										component={renderPhoneNumber}
										label="Contact Phone *"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Field
										type="text"
										name="alternate_phone"
										component={renderPhoneNumber}
										label="Alternate Phone"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Field
										type="text"
										name="street_address"
										component={renderText}
										label="Street Address"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Field
										type="text"
										name="address_2"
										component={renderText}
										label="Address 2 (Apt/Suite)"
									/>
								</Grid>
								<Grid item md={4} xs={12}>
									<Field
										type="text"
										name="city"
										component={renderText}
										label="City"
									/>
								</Grid>
								<Grid item md={4} xs={12}>
									<Field
										name="state"
										component={renderSelect}
										data={USAStateList}
										fullWidth={false}
										type="select"
										label="State"
									/>
								</Grid>
								<Grid item md={4} xs={12}>
									<Field
										type="text"
										name="zipcode"
										component={renderText}
										label="Zipcode *"
									/>
								</Grid>
								<Grid item md={12} xs={12}>
									<Field
										type="checkbox"
										name="ex_customer"
										component={renderCheckbox}
										label="Existing Customer"
									/>
								</Grid>
								<Grid item md={12} xs={12}>
									<Field
										type="text"
										name="preseller_initials"
										component={renderText}
										label="Preseller Initials *"
										className="presellerInput"
									/>
									<em>{`If this doesn't apply, just enter in "N/A"`}</em>
								</Grid>
								<Grid item md={12} xs={12}>
									<Field
										name="notes"
										component={renderTextarea}
										label="Notes"
									/>
								</Grid>
								{!hideLoginDetails &&
									<React.Fragment>
										<Grid item md={12} xs={12}>
											<br/><br/><br/>
											<h1 style={{fontSize: '1.3em'}}>Login Details</h1>
										</Grid>
										<Grid item md={12} xs={12}>
											<Field
												type="text"
												name="username"
												component={renderText}
												label="Desired Username *"
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<Field
												type="password"
												name="password"
												component={renderText}
												label="Password *"
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<Field
												type="password"
												name="confirm_password"
												component={renderText}
												label="Confirm Password *"
											/>
										</Grid>
									</React.Fragment>
								}
								<Grid item md={12} xs={12}>
									<br />
									<h4 className={classes.radiogrouplabel}>Payment Method</h4>
									<RadioGroup
										name="paymenttype"
										value={paymenttype}
										onChange={this.handlePaymentType}
										onClick={this.handlePaymentTypeClick}
										className={classes.radiogroup}
									>
										<FormControlLabel
											value="cash"
											control={<Radio color="primary" />}
											className={classes.label}
											label="Cash"
										/>
										<FormControlLabel
											value="credit"
											control={<Radio color="primary" />}
											className={classes.label}
											label="Credit Card"
										/>
									</RadioGroup>	
								</Grid>
								<Grid item md={12} xs={12}>
								</Grid>
							</Grid>
													
							<div className={classes.btnDiv}>
								<Button className={classes.btn} type="submit" variant="contained" color="primary">Create New
																	Account</Button>
								{onLogin !== undefined &&
									<p>Already have an account? <a  href="#" onClick={onLogin}>Login</a>.</p>
								}
								{onLogin === undefined &&
									<p>Already have an account? <Link to={'/login'}>Login</Link>.</p>
								}
							</div>
						</form>
					</CardContent>

				</Card>
			</div>
		);
	};

}

const validateSignUp = values => {
	const errors = {};

	const requiredFields = [
		'first_name',
		'last_name',
		'email',
		'zipcode',
		'phone',
		'preseller_initials',
	];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = field + ' field is required.';
		}
		// if (values['password'] !== values['confirm_password']) {
		// 	errors['password'] = '';
		// 	errors['confirm_password'] = '(Password fields does not match.)';
		// }
	});
  if (values['zipcode'] && values['zipcode'].length !== 5) {
    errors['zipcode'] = 'Zipcode is Invalid. The length should be 5.';
  }
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address.';
	}
	if (values.phone && !/^[1-9]\d\d-\d{3}-\d{4}$/i.test(values.phone)) {
		errors.phone = 'Phone number is invalid.';
	}
	if (values.alternate_phone && !/^[1-9]\d\d-\d{3}-\d{4}$/i.test(values.alternate_phone)) {
		errors.alternate_phone = 'Alternate Phone number is invalid.';
	}
	
	return errors;
};

SignUpForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func,
	onLogin: PropTypes.func,
	hideLoginDetails: PropTypes.bool,
	updateAppointmentOpen: PropTypes.func,
};

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
	appointmentdata: state.data.appointmentdata,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	updateAppointmentOpen: bindActionCreators(updateAppointmentOpen, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
	reduxForm({
	form: 'SignUpForm', // a unique identifier for this form
	validate: validateSignUp // ←Callback function for client-side validation
})(withStyles(styles)(SignUpForm)));
