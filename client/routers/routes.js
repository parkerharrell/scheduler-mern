import React from 'react';

// Import routing components
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import history from '../utils/history';

// Import custom components
import NotFound from '../components/error/NotFound';
import LoginForm from '../containers/auth/LoginContainer';
import SignUpForm from '../containers/auth/SignUpContainer';
import Dashboard from '../containers/dashboard/DashboardContainer';

const Router = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/signup" component={SignUpForm}/>
            <Route path="/login" component={LoginForm}/>
            <Route component={NotFound}/>
        </Switch>
    </ConnectedRouter>
);

export default Router;
