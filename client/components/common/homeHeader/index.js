import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as authService from '../../../services/authService';

class HomeHeader extends Component {

	logOut(e) {
		e.preventDefault();
		this.props.actions.logout();
	}

	render() {
		const { isAuthenticated } = this.props;
		return (
			<div>
				<AppBar style={{ background: 'white' }}>
					<Toolbar style={{ justifyContent: 'flex-end' }}>
						<Link to='/admin'><Button>Admin</Button></Link>
						{isAuthenticated &&
							<Button onClick={this.logOut.bind(this)}>Logout</Button>
						}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

HomeHeader.propTypes = {
	classes: PropTypes.object,
	actions: PropTypes.object,
	navDrawerOpen: PropTypes.bool,
	handleToggleDrawer: PropTypes.func,
};

/**
 * Map the actions to props.
 */
const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(Object.assign({}, authService), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
