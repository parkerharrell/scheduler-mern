/* eslint-disable no-mixed-spaces-and-tabs */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'styled-components';
import Truncate from 'react-truncate';

import Grid from '@material-ui/core/Grid';
import { isUndefined } from 'lodash';
import AddIcon from '@material-ui/icons/AddRounded';

import { fetchAll, updateAppointmentService, updateAppointmentOpen } from '../../actions/serviceAction';
import { fetchAllResources } from '../../actions/sittingAction';

const DetailLI = styled.div`
	cursor: pointer;
	min-height: 170px;
	max-height: 170px;
	overflow: hidden;
	display: flex;
	align-items: flex-start;
	flex-flow: column;
	justify-content: flex-start;
	transition: background .2s ease-out;

	.title {
		font-weight: 800;
		font-size: 1.4em;
		margin: 15px 0;
	}
	.availability {
		font-weight: 600;
	}
	& p {
		margin: 3px 0 3px;
		font-size: .9em;
	}
	.overlay {
		display: none;
	}
	&:hover {
		position: relative;
		box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 16px 1px !important;
		border: 1px solid transparent !important;
		background: rgba(0, 0, 0, 0.05);
		transition: background .2s ease-out;
	}
`;

const Item = ({ data, onclick, active }) => (
	<DetailLI style={styles.card}  onClick={onclick}>
		<span className="title">{data.title}</span>
		<p>
			<Truncate lines={4} ellipsis={<span>...</span>}>
				{data.description}
			</Truncate>
		</p>
		<div className={`overlay ${active ? 'active' : ''}`}>
			<AddIcon className="checkbox"  />
		</div>
	</DetailLI>
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
			const { active, paymenttype } =  this.state;
			const openBooked = localStorage.getItem(`openBooked_+ ${appointmentdata.location.id}`);
    	let rowData = [];
    	if (!isUndefined(services)) {
    		rowData = services;
    	}

    	return (
    		<div style={styles.container}>
    			<Grid container spacing={24}>
    				{rowData.map((item, index) =>
    					<Grid item md={4} key={index} >
    						<Item data={item} active={active === index} onclick={() => this.setService(index)}/>
    					</Grid>
						)}
						{rowData.length > 0 && !openBooked &&
							<Grid item md={4} key={'open-appointment'} >
								<DetailLI style={styles.card} onClick={this.showOpenAppointment}>
									<span className="title">Open Appointment</span>
									<div style={{ fontSize: '0.9em' }}>
										<Truncate lines={4} ellipsis={<span>...</span>}>
											{'This appointment allows you to reserve without a specific day and time. We accept cash, credit and debit for any additional purchases. If you have questions or need directions to our studio, please give us a call.'}
										</Truncate>
									</div>
									<div className={`overlay ${active ? 'active' : ''}`} onClick={onclick}>
										<AddIcon className="checkbox"  />
									</div>
								</DetailLI>
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
	updateAppointmentOpen: PropTypes.funcs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);

const styles = {
	container: {
		paddingTop: 30,
		paddingLeft: 50,
		paddingRight: 50,
	},
	card: {
		border: '1px solid #eee',
		boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
		transition: 0.3,
		padding: 20,
	},
	cardtitle: {
		fontSize: '1.6em',
		fontWeight: 'bold',
		margin: '1em 0 ',
	},
	label: {
		height: 30,
		margin: 0,
		fontSize: '0.9em',
		marginRight: 15,
	},
	radiogroup: {
		flexDirection: 'row',
		marginLeft: -12,
    zoom: 0.8,
		marginTop: 2,
		zIndex: 1000,
		position: 'relative',
	}
};
