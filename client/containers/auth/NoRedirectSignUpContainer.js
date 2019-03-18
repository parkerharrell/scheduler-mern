import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as moment from 'moment';

import {USERS} from '../../constants/entity';
import * as crudAction from '../../actions/crudAction';

// Import custom components
import SignUpForm from '../../components/auth/SignUpForm';

class NoRedirectSignUpContainer extends Component {

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
		const { hideLoginDetails, onLogin } = this.props;
		return (
			<SignUpForm
				onSubmit={this.submitForm}
				hideLoginDetails={hideLoginDetails}
				onLogin={onLogin}
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

NoRedirectSignUpContainer.propTypes = {
	actions: PropTypes.object,
	onLogin: PropTypes.func,
	hideLoginDetails: PropTypes.bool,
};

export default connect(null, mapDispatchToProps)(NoRedirectSignUpContainer);