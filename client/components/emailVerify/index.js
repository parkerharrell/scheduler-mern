import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import * as qs from 'query-string';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import { verifyEmail } from '../../actions/userAction';
import HomeHeader from '../common/homeHeader';
import './emailVerify.style.css';

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
				<HomeHeader admin={false} />
				<div className="emailverify__container">
					{verifyStatus &&
						<>
							<h2>Your Email Address has been successfully verified</h2>
							<br/><br/>
							<Link to='/'><Button type="submit" variant="contained" color="primary">Go&nbsp;&nbsp;to&nbsp;&nbsp;&nbsp;<HomeIcon />&nbsp;Home</Button></Link>
						</>
					}
					{!verifyStatus &&
						<h2>Verifying Email Address</h2>
					}
				</div>
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
