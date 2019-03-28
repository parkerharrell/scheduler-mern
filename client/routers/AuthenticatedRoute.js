import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

import {getToken} from '../utils/storageUtil';

const isAuthenticated = () => {
	return !!getToken();
};

const AuthenticatedRoute = ({component: Component, ...rest}) => (
	<Route {...rest} render={props => (
		isAuthenticated() ? (
			<Component {...props}/>
		) : (
			<Redirect to={{
				pathname: '/login',
				state: {from: props.location}
			}}/>
		)
	)}/>
);

AuthenticatedRoute.propTypes = {
	location: PropTypes.object,
	component: PropTypes.any,
};

export default AuthenticatedRoute;