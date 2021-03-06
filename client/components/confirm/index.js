/* eslint-disable no-mixed-spaces-and-tabs */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { storeItem } from '../../actions/eventAction';
import Button from '@material-ui/core/Button';

import { storeOpenAppointment } from '../../actions/openAppointmentAction';
import { storeAppointment } from '../../actions/appointmentAction';
import './confirm.style.css';
import moment from 'moment';

class ConfirmPage extends Component {
	state = {
		visible: false,
		openBooked: undefined,
		error: false,
	};

	componentDidMount() {
		const { appointmentdata, user, createAppointment } = this.props;
		const data = {};
		if (appointmentdata && user) {
			console.log('----------- datas: ', appointmentdata, user);
			data.location = appointmentdata.location.id;
			data.service = appointmentdata.service.id;
			data.customer = user.id;
			data.openBook = appointmentdata.openBook;
			if (!appointmentdata.openBook) {
				data.startAt = appointmentdata.startDate;
				createAppointment(data);
				this.createSchedule();
			} else {
				createAppointment(data);
				this.setState({ openBooked: true });
			}
		} else {
			this.setState({ error: true });
		}
	}

	createSchedule = () => {
		const { createEvent, appointmentdata, user } = this.props;
		const event = {};
		event.summary = appointmentdata.service.title;
		event.start = moment(appointmentdata.startDate).format();
		event.end = moment(appointmentdata.startDate).add(appointmentdata.service.duration, 'seconds').format();
		event.location = `${appointmentdata.location.street}, ${appointmentdata.location.city}, ${appointmentdata.location.state} ${appointmentdata.location.zipcode}`;
		event.description = appointmentdata.service.description;
		event.email = user.email;
		createEvent(event);
	}

	render() {
		const { appointmentdata, event_created_success } = this.props;
		const { openBooked, error } = this.state;
		return (
			<div className="confirm__container">
				{!openBooked && !event_created_success &&
					<div>Loading ...</div>
				}
				{error &&
					<>
						<div>Appointment Schedule Failed ... Please try to book again.</div><br/><br/>
						<a href="/" ><Button variant="contained" size="medium" color="primary" >Go to Home</Button></a>
					</>
				}
				{openBooked &&
					<React.Fragment>
						<br/>
						<div className="title__row">
							<h2>Your Open Appointment Approved</h2>
							<a href="/" ><Button variant="contained" size="medium" color="primary" >Continue</Button></a>
						</div>
						<br/>
						<p>Hi, this is Andrae Michaels Portrait Studio. This email is in regards to your Open Appointment.</p> 

						<p>If you have any questions, or need directions to our studio, don’t hesitate to give us a call! Thank you so much, and we look forward to seeing you and your family!</p>

						<p>Thank you so much and we look forward to seeing you and your family at any time when you need.</p>
						<br/>
						<p>
							<em>{appointmentdata.location.title }</em><br/>
							<em>{appointmentdata.location.street}</em><br/>
							<em>{appointmentdata.location.city}, {appointmentdata.location.state} {appointmentdata.location.zipcode}</em><br/>
							<em>{appointmentdata.location.phone}</em><br/>
							<em>{appointmentdata.location.email}</em>
						</p>
					</React.Fragment>
				}
				{!openBooked && event_created_success &&
					<React.Fragment>
						<br/>
						<div className="title__row">
							<h2>Your Appointment Approved</h2>
							<a href="/" ><Button variant="contained" size="medium" color="primary" >Continue</Button></a>
						</div>
						<br/>
						<p>Hi, this is Andrae Michaels Portrait Studio. This email is in regards to your Photo Sitting on {moment(appointmentdata.startDate).format('MM/DD/YYYY')} at {moment(appointmentdata.startDate).format('hh:mm a')}.</p> 

						<p>Before your appointment, here’s a few reminders…</p>

						<p>If you have invested in a promotional package from the mall: Please remember to bring in your certificate, and $10 sitting fee. The sitting fee is not per person, and covers up to 18 people. We recommend that you color coordinate your clothing and avoid bold logos or patterns. Pets are welcome in your session! When you come in we will take a variety of poses for you. You will be able to look at everything directly after, pick out all of your favorite shots, and which one pose you like for your promotional package. Be prepared to love all of them, and want more! We will go over all of our custom packages and pricing, and everything you order additionally will need to be purchased at that time. We accept credit, debit, and cash.</p> 

						<p>If you are a Studio Member: <br/>
						There is no sitting fee! Pets are welcome! We recommend that you color coordinate clothing and avoid bold logos or patterns. We will take a variety of poses for you, and upload them to your personal Flashop webpage.</p>

						<p>If you have any questions, or need directions to our studio, don’t hesitate to give us a call! Thank you so much, and we look forward to seeing you and your family!</p>

						<p>Thank you so much and we look forward to seeing you and your family on {moment(appointmentdata.startDate).format('MM/DD/YYYY')} at {moment(appointmentdata.startDate).format('hh:mm a')}.</p>

						<p>
							<em>{appointmentdata.location.title }</em><br/>
							<em>{appointmentdata.location.street}</em><br/>
							<em>{appointmentdata.location.city}, {appointmentdata.location.state} {appointmentdata.location.zipcode}</em><br/>
							<em>{appointmentdata.location.phone}</em><br/>
							<em>{appointmentdata.location.email}</em>
						</p>
					</React.Fragment>
				}
			</div>
		);
	}
}

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
	appointmentdata: state.data.appointmentdata,
	user: state.auth.user,
	event_created_success: state.data.event_created_success,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	createEvent: bindActionCreators(storeItem, dispatch),
	createOpenAppointment: bindActionCreators(storeOpenAppointment, dispatch),
	createAppointment: bindActionCreators(storeAppointment, dispatch),
});

ConfirmPage.propTypes = {
	createEvent: PropTypes.func,
	appointmentdata: PropTypes.object,
	createOpenAppointment: PropTypes.func,
	createAppointment: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPage);