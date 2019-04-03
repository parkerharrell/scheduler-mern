import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as qs from 'query-string';

import { verifyEmail } from '../../actions/userAction';

class EmailVerify extends Component {

	constructor(props) {
		super(props);
		const { verifyEmail, location } = this.props;
		const { confirm_code: confirmCode } = qs.parse(location.search);
		verifyEmail(confirmCode);
	}

	render() {
		const { verifyStatus } = this.props;
		return (
			<>
				{verifyStatus &&
					<div>
						<h1>Your Email Address was verified successfully</h1>
					</div>
				}
				{!verifyStatus &&
					<div>
						<h1>Verifying Email Address</h1>
					</div>
				}
			</>
		);
	}
}

const mapStateToProps = state => ({
	verifyStatus: state.data.verifyStatus,
});

const mapDispatchToProps = dispatch => ({
  verifyEmail: bindActionCreators(verifyEmail, dispatch),
});

EmailVerify.propTypes = {
	verifyEmail: PropTypes.func,
	verifyStatus: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerify);
