import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Field, reduxForm} from 'redux-form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import renderCheckbox from '../../components/common/form/renderCheckbox';
import renderTextarea from '../../components/common/form/renderTextarea';
import renderSelect from '../../components/common/form/renderSelect';
import renderPassword from '../../components/common/form/renderPassword';
import USAStateList from '../../utils/us-states.list';
import { storeItem, updateInitialValues } from '../../actions/appointmentAction';
import renderText from '../../components/common/form/renderText';
import renderPhoneNumber from '../../components/common/form/renderPhoneNumber';

import styles from './AddAppointment.style.js';
import renderTimezonebox from '../../components/common/form/renderTimezonebox';

class AddAppointment extends Component {
  state = {
    paymenttype: 'cash',
    showPassword: false,
  }

  onSubmit = (formProps) => {
    const { createAppointment } = this.props;
    const { paymenttype } = this.state;
    const result = cloneDeep(formProps);
    result.created = moment().unix();
    result.paymenttype = paymenttype;
    delete result.confirm_password;
    createAppointment(result);
  }

  handlePaymentType = event => {
    this.setState({ paymenttype: event.target.value });
  };

  generateRandomPassword = () => {
    const { updateAppointmentInitials } = this.props;
    const password = Math.random().toString(36).slice(-8);
    updateAppointmentInitials({ password, confirm_password: password });
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
      const { handleSubmit } = this.props;
      const { paymenttype, passwordValue, showPassword } = this.state;
    	
    	return (
    		<form method="post" onSubmit={handleSubmit(this.onSubmit)} >
    			<Link to='/admin/appointments'><span>appointments</span></Link> / <span>new</span>
    			<br/><br/>
    			<Grid
    				container
    				alignItems="center"
    				spacing={24}
    			>
    				<Grid item xs={6}>
    					<h1>Add Appointment</h1>
    				</Grid>
          </Grid>
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
                name="ex_appointment"
                component={renderCheckbox}
                label="Existing Appointment"
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
            <Grid item md={6} xs={12}>
              <br/>
              <Field
                name="timezone"
                component={renderTimezonebox}
                label="Timezone"
                className="timezone-selectbox"
              />
              <br/>
            </Grid>
            <Grid item md={12} xs={12}>
              <Field
                type="checkbox"
                name="can_notify"
                component={renderCheckbox}
                checked={true}
                labelPlacement={'end'}
                label="Notify Appointment on Account Creation"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <br/>
              <h1 style={{fontSize: '1.3em'}}>Password</h1>
              <div style={{ width: '50%' }}>
                <Field
                  name="password"
                  component={renderPassword}
                  label="Password *"
                  showPassword={showPassword}
                  handleClickShowPassword={this.handleShowPasswordChange}
                />
              </div>
              <div style={{ display: 'flex', width: '100%', alignItems: 'flex-end' }}>
                <div style={{ width: '50%' }}>
                  <Field
                    type="password"
                    name="confirm_password"
                    component={renderText}
                    label="Confirm Password *"
                  />
                </div>
                <div style={styles.passwordGenerateBtn}>
                  <Button variant="contained" size="small"  onClick={this.generateRandomPassword} >Generate password</Button>
                </div>
              </div>
              <br/>
            </Grid>
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
                  label="Cash"
                />
                <FormControlLabel
                  value="credit"
                  control={<Radio color="primary" />}
                  label="Credit Card"
                />
              </RadioGroup>
            </Grid>
            <Grid item md={12} xs={12}>
            </Grid>
          </Grid>
                      
          <div style={{padding: '50px 0'}}>
            <Button type="submit" variant="contained" color="primary">Create New Account</Button>
          </div>
    		</form>
    	);
    }
}


const validateAddAppointment = values => {
	const errors = {};
	const requiredFields = [
    'email',
    'first_name',
    'last_name',
		'phone',
    'zipcode',
    'password',
    'preseller_initials',
    'confirm_password',
  ];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '' + field + ' field is required';
    }
  });
  if (values['password'] !== values['confirm_password']) {
    errors['password'] = '';
    errors['confirm_password'] = '(Password fields does not match.)';
  }
  if (values['zipcode'] && values['zipcode'].length !== 5) {
    errors['zipcode'] = 'Zipcode is Invalid. The length should be 5.';
  }
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = '(Invalid email address.)';
  }
  if (values.phone && !/^[1-9]\d\d-\d{3}-\d{4}$/i.test(values.phone)) {
		errors.phone = 'Phone number is invalid.';
	}
	if (values.alternate_phone && !/^[1-9]\d\d-\d{3}-\d{4}$/i.test(values.alternate_phone)) {
		errors.alternate_phone = 'Alternate Phone number is invalid.';
	}
	return errors;
};


const mapStateToProps = state => ({
	initialValues: state.data.appointmentInitialValues,
});

const mapDispatchToProps = dispatch => ({
  createAppointment: bindActionCreators(storeItem, dispatch),
  updateAppointmentInitials: bindActionCreators(updateInitialValues, dispatch),
});

AddAppointment.propTypes = {
	handleSubmit: PropTypes.func,
	createAppointment: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'AddAppointmentForm',
  validate: validateAddAppointment,
  enableReinitialize : true,
})(AddAppointment));
