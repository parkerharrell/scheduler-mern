import React from 'react';

// Import routing components
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import history from '../utils/history';

// Import custom components
import MainLayout from '../components/common/layout/MainLayout';
import NotFound from '../components/error/NotFound';
import LoginForm from '../containers/auth/LoginContainer';
import SignUpForm from '../containers/auth/SignUpContainer';
import Dashboard from '../containers/dashboard/DashboardContainer';
import Services from '../containers/services';
import AddService from '../containers/services/AddService';
import EditService from '../containers/services/EditService';
import Locations from '../containers/locations';
import AddLocation from '../containers/locations/AddLocation';
import EditLocation from '../containers/locations/EditLocation';
import Sittings from '../containers/sittings';
import AddSitting from '../containers/sittings/AddSitting';
import EditSitting from '../containers/sittings/EditSitting';
import Customers from '../containers/customers';
import CustomerDetails from '../containers/customers/CustomerDetails';
import Newsletter from '../containers/customers/Newsletter';
import Administrators from '../containers/administrators';
import AdministratorDetails from '../containers/administrators/AdministratorDetails';
import Appointments from '../containers/appointments';
import AddAppointment from '../containers/appointments/AddAppointment';
import EditAppointment from '../containers/appointments/EditAppointment';
import Settings from '../containers/settings';
import AddCustomer from '../containers/customers/AddCustomer';
import EmailVerify from '../components/emailVerify';

import AuthenticatedRoute from './AuthenticatedRoute';
import Home from '../containers/Home';

const Router = () => (
	<ConnectedRouter history={history}>
		<Switch>
			<Route exact path="/"  component={Home}/>
			<Route exact path="/signup" component={SignUpForm}/>
			<Route exact path="/login" component={LoginForm}/>
			<Route exact path="/email-verify" component={EmailVerify}/>

			<MainLayout>
				<Switch>
					<AuthenticatedRoute exact path="/admin" component={Dashboard}/>
					<AuthenticatedRoute exact path="/admin/services" component={Services}/>
					<AuthenticatedRoute exact path="/admin/services/new" component={AddService}/>
					<AuthenticatedRoute exact path="/admin/services/:id" component={EditService}/>
					<AuthenticatedRoute exact path="/admin/locations" component={Locations}/>
					<AuthenticatedRoute exact path="/admin/locations/new" component={AddLocation}/>
					<AuthenticatedRoute exact path="/admin/locations/:id" component={EditLocation}/>
					<AuthenticatedRoute exact path="/admin/sittings" component={Sittings}/>
					<AuthenticatedRoute exact path="/admin/sittings/new" component={AddSitting}/>
					<AuthenticatedRoute exact path="/admin/sittings/:id" component={EditSitting}/>
					<AuthenticatedRoute exact path="/admin/customers" component={Customers}/>
					<AuthenticatedRoute exact path="/admin/customers/new" component={AddCustomer}/>
					<AuthenticatedRoute exact path="/admin/customers/newsletter" component={Newsletter}/>
					<AuthenticatedRoute exact path="/admin/customers/:id" component={CustomerDetails}/>
					<AuthenticatedRoute exact path="/admin/administrators" component={Administrators}/>
					<AuthenticatedRoute exact path="/admin/administrators/:id" component={AdministratorDetails}/>
					<AuthenticatedRoute exact path="/admin/appointments" component={Appointments}/>
					<AuthenticatedRoute exact path="/admin/appointments/new" component={AddAppointment}/>
					<AuthenticatedRoute exact path="/admin/appointments/:id" component={EditAppointment}/>
					<AuthenticatedRoute exact path="/admin/settings" component={Settings}/>
				</Switch>
			</MainLayout>

			<Route component={NotFound}/>
		</Switch>
	</ConnectedRouter>
);

export default Router;
