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
import { Tabs } from 'antd';
import ArrowUpIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownIcon from '@material-ui/icons/ArrowDownwardRounded';
import Modal from 'react-awesome-modal';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { fetchById, updateItem, destroyItem } from '../../actions/userAction';
import renderText from '../../components/common/form/renderText';
import renderCheckbox from '../../components/common/form/renderCheckbox';
import renderPassword from '../../components/common/form/renderPassword';
import renderTextarea from '../../components/common/form/renderTextarea';
import renderSelect from '../../components/common/form/renderSelect';
import USAStateList from '../../utils/us-states.list';
import styles from './AddCustomer.style.js';

const TabPane = Tabs.TabPane;

class UserDetails extends Component {

	constructor(props) {
		super(props);
		const { match, getUserInfo } = props;
		const userId = match.params.id;
		this.state = {
			userId,
			paymenttype: 'cash',
			showPassword: false,
			appointmentData: [],
			visible: false,
			deleteAppointmentId: null,
		};
		getUserInfo(userId);
	}

  onSubmit = (formProps) => {
		const { userId, paymenttype } = this.state;
		const { updateUserInfo } = this.props;
		const result = cloneDeep(formProps);
		result.created = moment().unix();
		result.paymenttype = paymenttype;
    delete result.confirm_password;
		updateUserInfo(userId, result);
		this.props.history.goBack();
  }

  handlePaymentType = event => {
    this.setState({ paymenttype: event.target.value });
  };

	handlePaymentTypeClick (e) {
    e.stopPropagation();
	}
	
	changeStatus = (status) => {
		const { userId } = this.state;
		updateUserInfo(userId, { status });
	}

	handleShowPasswordChange = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
    })
	}
	// Modal APIs
	openModal = (id) => {
		this.setState({
			visible : true,
			deleteAppointmentId: id,
		});
	}

	closeModal = () => {
		this.setState({
			visible : false,
			deleteAppointmentId: null,
		});
	}

	confirmModal() {
		const { deleteAppointmentId } = this.state;
		const { deleteAppointment } = this.props;
		deleteAppointment(deleteAppointmentId);
		this.setState({
			visible: false,
			deleteAppointmentId: null,
		});
	}

	onDelete = () => {
		const { deleteUserInfo } = this.props;
		const { userId } = this.state;
		deleteUserInfo(userId);
		this.props.history.push('/admin/customers');
	}

	render() {
		const { currentUser, handleSubmit } = this.props;
		const { paymenttype, appointmentData, visible, showPassword } = this.state;

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
						<Button variant="contained" color="secondary" onClick={this.onDelete}>Delete</Button>
					</Grid>
				</Grid>
				<br/>
				<Tabs defaultActiveKey="1" onChange={this.handleChange}>
					<TabPane tab="Edit" key="1">
						<Grid container spacing={24}>
							<Grid item md={7} xs={12}>
								<Field
									type="text"
									name="email"
									component={renderText}
									label="Email *"
								/>
							</Grid>
							<Grid item md={5} xs={12} style={styles.statusSection}>
								<b>Status:&nbsp;</b>
								{currentUser.email_confirmed == 0 &&
									<span>Not Confirmed</span>
								}
								{currentUser.status === 1 && currentUser.email_confirmed == 1 &&
									<span>Activated</span>
								}
								{currentUser.status !== 1 && currentUser.email_confirmed == 1 &&
									<span>Suspended</span>
								}
								&nbsp;&nbsp;&nbsp;&nbsp;
								{currentUser.status === 1 &&
									<Button variant="contained" size="small" color="secondary"  style={styles.statusBtnActive} onClick={() => this.changeStatus(0)}>Suspend</Button>
								}
								{currentUser.status !== 1 &&
									<Button variant="contained" size="small" color="primary" style={styles.statusBtn} onClick={() => this.changeStatus(1)} >Activate</Button>
								}
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
							<Link to="/admin/customers"><Button variant="contained" color="primary">Cancel</Button></Link>
						</div>
					</TabPane>
					<TabPane tab="List Appointments" key="2">
						<>
							<table key={appointmentData} style={styles.table}>
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
									{appointmentData.length == 0 &&
										<tr>
											<td colspan={7} align="center">No Data to show.</td>
										</tr>
									}
									{appointmentData.map((data, index) => (
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
					</TabPane>
					<TabPane tab="Change Password" key="3">
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
						<div style={{padding: '50px 0'}}>
							<Button type="submit" variant="contained" color="primary">Update</Button>&nbsp;&nbsp;
							<Link to="/admin/customers"><Button variant="contained" color="primary">Cancel</Button></Link>
						</div>
					</TabPane>
				</Tabs>

			</form>
		);
	}
}


const validateEditCustomer = values => {
	const errors = {};
	const requiredFields = [
    'email',
    'first_name',
    'last_name',
		'phone',
    'zipcode',
    'preseller_initials',
	];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '' + field + ' field is required';
    }
  });
  if (values['zipcode'] && values['zipcode'].length < 5) {
    errors['zipcode'] = 'zipcode is invalid';
  }
	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = '(Invalid email address.)';
	}
	return errors;
};

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
	deleteAppointment: bindActionCreators(destroyItem, dispatch),
});

UserDetails.propTypes = {
	currentUser: PropTypes.object,
	getUserInfo: PropTypes.func,
	match: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'EditUserForm',
	enableReinitialize : true,
	validate: validateEditCustomer,
})(UserDetails));
