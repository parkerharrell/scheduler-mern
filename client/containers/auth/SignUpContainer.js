import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as moment from 'moment';

import {USERS} from '../../constants/entity';
import * as crudAction from '../../actions/crudAction';

// Import custom components
import SignUpForm from '../../components/auth/SignUpForm';

class SignUpContainer extends Component {

	constructor(props) {
		super(props);

		this.submitForm = this.submitForm.bind(this);
	}

	/**
     * Submit the form.
     *
     * @param {object} formProps
     */
	submitForm(formProps) {
		formProps.created = moment.tz(formProps.tz).unix();
		this.props.actions.submitForm(USERS, formProps);
	}

	render() {

		return (
			<SignUpForm
				onSubmit={this.submitForm}
			/>
		);
	}

}

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(Object.assign({}, crudAction), dispatch)
});

SignUpContainer.propTypes = {
	actions: PropTypes.object,
};

export default connect(null, mapDispatchToProps)(SignUpContainer);