/* eslint-disable no-mixed-spaces-and-tabs */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Truncate from 'react-truncate';

import Grid from '@material-ui/core/Grid';
import { isUndefined } from 'lodash';
import AddIcon from '@material-ui/icons/AddRounded';

import { fetchAll, updateAppointmentService, updateAppointmentOpen } from '../../actions/serviceAction';
import { fetchAllResources } from '../../actions/sittingAction';
import './services.style.css';

const Item = ({ data, onclick, active }) => (
	<div className="services__card"   onClick={onclick}>
		<span className="title">{data.title}</span>
		<p>
			<Truncate lines={4} ellipsis={<span>...</span>}>
				{data.description}
			</Truncate>
		</p>
		<div className={`overlay ${active ? 'active' : ''}`}>
			<AddIcon className="checkbox"  />
		</div>
	</div>
);

Item.propTypes = {
	data: PropTypes.object,
	onclick: PropTypes.func,
	active: PropTypes.bool,
};

class Services extends Component {
    state = {
			active: undefined,
			paymenttype: undefined,
    }

    componentDidMount() {
			const { fetchAllResources, appointmentdata, fetchAll } = this.props;
			if (appointmentdata.location)
	    	fetchAllResources('services', { location: appointmentdata.location.id });
			else
				fetchAll();
		}

    setService = (index) => {
    	const { goToNextStep, updateAppointmentService, services } = this.props;
			this.setState({ active: index });
			updateAppointmentService(services[index]);
    	setTimeout(() => {
    		goToNextStep(0);
    	}, 600);
		}
		
		showOpenAppointment = (e) => {
			e.stopPropagation();
			const { appointmentdata, updateAppointmentOpen } = this.props;
			const { goToNextStep } = this.props;
			updateAppointmentOpen(appointmentdata);
			localStorage.setItem(`openBooked_${appointmentdata.location.id}`, true);
			goToNextStep(1);
		}

    render() {
			const { services, appointmentdata } = this.props;
			const { active } =  this.state;
    	let rowData = [];
    	if (!isUndefined(services)) {
    		rowData = services;
    	}

    	return (
    		<div className="services__container">
    			<Grid container spacing={24}>
    				{rowData.map((item, index) =>
    					<Grid item md={4} key={index} className="services__griditem" >
    						<Item data={item} active={active === index} onclick={() => this.setService(index)}/>
    					</Grid>
						)}
						{rowData.length > 0 &&
							<Grid item md={4} key={'open-appointment'} className="services__griditem">
								<div className="services__card"  onClick={this.showOpenAppointment}>
									<span className="title">Open Appointment</span>
									<div style={{ fontSize: '0.9em' }}>
										<Truncate lines={4} ellipsis={<span>...</span>}>
											{'This appointment allows you to reserve without a specific day and time. We accept cash, credit and debit for any additional purchases. If you have questions or need directions to our studio, please give us a call.'}
										</Truncate>
									</div>
									<div className={`overlay ${active ? 'active' : ''}`} onClick={onclick}>
										<AddIcon className="checkbox"  />
									</div>
								</div>
							</Grid>
						}
    			</Grid>
    		</div>
    	);
    }
}


/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
	services: state.data.services,
	appointmentdata: state.data.appointmentdata,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	fetchAllResources: bindActionCreators(fetchAllResources, dispatch),
	fetchAll: bindActionCreators(fetchAll, dispatch),
	updateAppointmentService: bindActionCreators(updateAppointmentService, dispatch),
	updateAppointmentOpen: bindActionCreators(updateAppointmentOpen, dispatch),
});

Services.propTypes = {
	fetchAllResources: PropTypes.func,
	fetchAll: PropTypes.func,
	services: PropTypes.array,
	appointmentdata: PropTypes.object,
	goToNextStep: PropTypes.func,
	updateAppointmentService: PropTypes.func,
	updateAppointmentOpen: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
