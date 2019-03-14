/* eslint-disable no-mixed-spaces-and-tabs */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { resetEventData } from '../../actions/eventAction';

class ConfirmPage extends Component {
	componentDidMount() {
		const { resetEvent } = this.props;
		resetEvent();
	}

	render() {
		return (
			<div>
				<br/>
				<h1>Your Appointment Approved</h1>
				<br/>
				<p>Hi, this is Andrae Michaels Portrait Studio. This email is in regards to your Photo Sitting.</p> 

				<p>Before your appointment, here’s a few reminders…</p>

				<p>If you have invested in a promotional package from the mall: Please remember to bring in your certificate, and $10 sitting fee. The sitting fee is not per person, and covers up to 18 people. We recommend that you color coordinate your clothing and avoid bold logos or patterns. Pets are welcome in your session! When you come in we will take a variety of poses for you. You will be able to look at everything directly after, pick out all of your favorite shots, and which one pose you like for your promotional package. Be prepared to love all of them, and want more! We will go over all of our custom packages and pricing, and everything you order additionally will need to be purchased at that time. We accept credit, debit, and cash.</p> 

				<p>If you are a Studio Member: <br/>
				There is no sitting fee! Pets are welcome! We recommend that you color coordinate clothing and avoid bold logos or patterns. We will take a variety of poses for you, and upload them to your personal Flashop webpage.</p>

				<p>If you have any questions, or need directions to our studio, don’t hesitate to give us a call! Thank you so much, and we look forward to seeing you and your family!</p>

				<p>Thank you so much and we look forward to seeing you and your family.</p>
			</div>
		);
	}
}

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	resetEvent: bindActionCreators(resetEventData, dispatch),
});

ConfirmPage.propTypes = {
	resetEvent: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(ConfirmPage);