import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as authService from '../../services/authService';

// Import custom components
import LoginForm from '../../components/auth/LoginForm';

class LoginContainer extends Component {

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
		this.props.actions.login(formProps);
	}

	render() {
		return (
			<LoginForm
				onSubmit={this.submitForm}
				errorMessage={this.props.errorMessage}
			/>
		);
	}

}

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
	token: state.auth.token,
	isAuthenticated: state.auth.isAuthenticated,
	errorMessage: state.auth.errorMessage
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(Object.assign({}, authService), dispatch)
});

LoginContainer.propTypes = {
	actions: PropTypes.object,
	errorMessage: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);