import React from 'react';

// Import routing components
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import history from '../utils/history';

// Import custom components
import MainLayout from '../components/common/layout/MainLayout';
import NotFound from '../components/error/NotFound';
import LoginForm from '../containers/auth/LoginContainer';
import SignUpForm from '../containers/auth/SignUpContainer';
import Dashboard from '../containers/dashboard/DashboardContainer';
import Services from '../containers/services';
import Locations from '../containers/locations';
import Appointments from '../containers/appointments';
import Users from '../containers/users';
import Settings from '../containers/settings';
import AddService from '../containers/services/AddService';

import AuthenticatedRoute from './AuthenticatedRoute';
import Home from '../containers/Home';

const Router = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path="/"  component={Home}/>
            <Route exact path="/signup" component={SignUpForm}/>
            <Route exact path="/login" component={LoginForm}/>

            <MainLayout>
                <Switch>
                    <AuthenticatedRoute exact path="/admin" component={Dashboard}/>
                    <AuthenticatedRoute exact path="/admin/services" component={Services}/>
                    <AuthenticatedRoute exact path="/admin/services/new" component={AddService}/>
                    <AuthenticatedRoute exact path="/admin/locations" component={Locations}/>
                    <AuthenticatedRoute exact path="/admin/appointments" component={Appointments}/>
                    <AuthenticatedRoute exact path="/admin/users" component={Users}/>
                    <AuthenticatedRoute exact path="/admin/settings" component={Settings}/>
                </Switch>
            </MainLayout>

            <Route component={NotFound}/>
        </Switch>
    </ConnectedRouter>
);

export default Router;
