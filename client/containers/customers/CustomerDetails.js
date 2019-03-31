import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';

import Grid from '@material-ui/core/Grid';
import { isEmpty } from 'lodash';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { fetchById, updateItem, destroyItem } from '../../actions/userAction';
import renderText from '../../components/common/form/renderText';
import renderCheckbox from '../../components/common/form/renderCheckbox';
import renderTextarea from '../../components/common/form/renderTextarea';
import renderSelect from '../../components/common/form/renderSelect';
import renderPassword from '../../components/common/form/renderPassword';
import USAStateList from '../../utils/us-states.list';
import styles from './AddCustomer.style.js';


class UserDetails extends Component {

	constructor(props) {
		super(props);
		const { match, getUserInfo } = props;
		const userId = match.params.id;
		this.state = {
			userId,
			paymenttype: 'cash',
			passwordValue: null,
			showPassword: false,
		};
		getUserInfo(userId);
	}

  onSubmit = (formProps) => {
    const { createCustomer } = this.props;
    const result = cloneDeep(formProps);
    result.created = moment().unix();
    delete result.confirm_password;
    createCustomer(result);
  }

  handlePaymentType = event => {
    this.setState({ paymenttype: event.target.value });
    const { updateAppointmentOpen, appointmentdata } = this.props;
    const data = Object.assign({}, appointmentdata.openBook);
    data.paymenttype = event.target.value;
    updateAppointmentOpen(data);
  };

  generateRandomPassword = () => {
    this.setState({ passwordValue: Math.random().toString(36).slice(-8) });
  }

  handlePaymentTypeClick (e) {
    e.stopPropagation();
  }

  handlePasswordChange = (e) => {
    this.setState({
      passwordValue: e.target.value,
    })
  }

  handleShowPasswordChange = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
    })
  }

	render() {
		const { currentUser, handleSubmit } = this.props;
		const { paymenttype, passwordValue, showPassword } = this.state;

		if (isEmpty(currentUser)) {
			return (
				<div>
          Loading ...      
				</div>
			);
		}
		
		return (
			<form key={currentUser} method="post"  onSubmit={handleSubmit(this.onSubmit)} >
				<Link to='/admin/customers'><span>customers</span></Link> / <span>{currentUser.id}</span>
				<br/><br/>
				<Grid
					container
					alignItems="center"
					spacing={24}
				>
					<Grid item xs={6}>
						<h1>Customer Details</h1>
					</Grid>
					<Grid item xs={6} style={{ textAlign: 'right' }}>
					</Grid>
				</Grid>
				<br/>
				<Grid container spacing={24}>
					<Grid item md={7} xs={12}>
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
				</Grid>
				<Grid container spacing={24}>
					<Grid item md={6} xs={12}>
						<Field
							type="text"
							name="phone"
							component={renderText}
							label="Contact Phone *"
						/>
					</Grid>
					<Grid item md={6} xs={12}>
						<Field
							type="text"
							name="alternate_phone"
							component={renderText}
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
					<Grid item md={6} xs={6}>
						<br/>
						<h1 style={{fontSize: '1.3em'}}>Password</h1>
						<div>
							<Field
								name="password"
								component={renderPassword}
								label="Password *"
								initialValue={passwordValue}
								showPassword={showPassword}
								handleClickShowPassword={this.handleShowPasswordChange}
							/>
						</div>
						<div>
							<Field
								type="password"
								name="confirm_password"
								component={renderText}
								label="Confirm Password *"
							/>
						</div>
						<br/>
					</Grid>
					<Grid item md={6} xs={6} ></Grid>
					<Grid item md={12} xs={12}>
						<h1 style={{fontSize: '1.3em'}}>Open Appointment Payment</h1>
						<br/>
						<RadioGroup
							name="paymenttype"
							value={paymenttype}
							onChange={this.handlePaymentType}
							onClick={this.handlePaymentTypeClick}
							style={styles.radiogroup}
						>
							<FormControlLabel
								value="cash"
								control={<Radio color="primary" />}
								style={styles.label}
								label="Cash"
							/>
							<FormControlLabel
								value="credit"
								control={<Radio color="primary" />}
								style={styles.label}
								label="Credit Card"
							/>
						</RadioGroup>
					</Grid>
					<Grid item md={12} xs={12}>
					</Grid>
				</Grid>
				<div style={{padding: '50px 0'}}>
					<Button type="submit" variant="contained" color="primary">Update</Button>&nbsp;&nbsp;
					<Link to="/admin/locations"><Button variant="contained" color="primary">Cancel</Button></Link>
				</div>
			</form>
		);
	}
}


/**
 * Map the actions to props.
 */
const mapStateToProps = state => ({
	currentUser: state.data.selectedUser,
	initialValues: state.data.selectedUser,
});


const mapDispatchToProps = dispatch => ({
	getUserInfo: bindActionCreators(fetchById, dispatch),
	updateUserInfo: bindActionCreators(updateItem, dispatch),
	deleteUserInfo: bindActionCreators(destroyItem, dispatch),
});

UserDetails.propTypes = {
	currentUser: PropTypes.object,
	getUserInfo: PropTypes.func,
	match: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'EditUserForm',
	enableReinitialize : true,
})(UserDetails));
