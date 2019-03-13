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
        Confirm Page
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