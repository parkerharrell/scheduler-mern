/* eslint-disable no-mixed-spaces-and-tabs */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { storeItem } from '../../actions/eventAction';
import Button from '@material-ui/core/Button';

import { resetEventData } from '../../actions/eventAction';
import moment from 'moment';

class ConfirmPage extends Component {
	state = {
		visible: false,
		openBooked: undefined,
	};

	componentDidMount() {
		const { appointmentdata } = this.props;
		const openBooked = localStorage.getItem(`openBooked_+ ${appointmentdata.location.id}`);
		if (!openBooked)
			this.createSchedule();
		else {
			this.setState({ openBooked });
			console.log('---- Create open Appointment!');
		}
	}

	createSchedule = () => {
		const { createEvent, appointmentdata, useremail } = this.props;
		const event = {};
		event.summary = appointmentdata.service.title;
		event.start = moment(appointmentdata.startDate).format();
		event.end = moment(appointmentdata.startDate).add(appointmentdata.service.duration, 'seconds').format();
		event.location = `${appointmentdata.location.street}, ${appointmentdata.location.city}, ${appointmentdata.location.state} ${appointmentdata.location.zipcode}`;
		event.description = appointmentdata.service.description;
		event.email = useremail || 'admin@test.com';
		createEvent(event);
	}

	render() {
		const { appointmentdata, event_created_success } = this.props;
		const { openBooked } = this.state;
		return (
			<div style={{ padding: '24px 80px' }}>
				{!openBooked && !event_created_success &&
					<div>Loading ...</div>
				}
				{openBooked &&
					<React.Fragment>
						<br/>
						<h2>Your Open Appointment Approved</h2>
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
						<br/><br/>
						<a href="/" ><Button variant="outlined" size="small" color="primary" >Continue</Button></a>
					</React.Fragment>
				}
				{!openBooked && event_created_success &&
					<React.Fragment>
						<br/>
						<h2>Your Appointment Approved</h2>
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
						<br/><br/>
						<a href="/" ><Button variant="outlined" size="small" color="primary" >Continue</Button></a>
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
	useremail: state.auth.useremail,
	event_created_success: state.data.event_created_success,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	createEvent: bindActionCreators(storeItem, dispatch),
	resetEvent: bindActionCreators(resetEventData, dispatch),
});

ConfirmPage.propTypes = {
	createEvent: PropTypes.func,
	resetEvent: PropTypes.func,
	appointmentdata: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPage);