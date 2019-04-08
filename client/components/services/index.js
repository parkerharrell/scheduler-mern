/* eslint-disable no-mixed-spaces-and-tabs */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Truncate from 'react-truncate';

import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/AddRounded';
import Modal from 'react-awesome-modal';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import { fetchAll, updateAppointmentService, updateAppointmentOpen } from '../../actions/serviceAction';
import { fetchAllResources } from '../../actions/sittingAction';
import './services.style.css';
import { resetEventData } from '../../actions/eventAction';


const Item = ({ data, onclick, onMoreClick, active }) => (
	<div className="services__card"   onClick={onclick}>
		<span className="title">{data.title}</span>
		<p>
			<Truncate lines={4} ellipsis={<span>... <a className="more__link" onClick={onMoreClick}>More</a></span>}>
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
	onMoreClick: PropTypes.func,
	active: PropTypes.bool,
};

const openAppointmentTitle = 'Open Appointment';
const openAppointmentDesc = 'This appointment allows you to reserve without a specific day and time. We accept cash, credit and debit for any additional purchases. If you have questions or need directions to our studio, please give us a call.';

class Services extends Component {
    state = {
			active: undefined,
			paymenttype: undefined,
			visible: false,
			resource: {},
    }

    componentDidMount() {
			const { fetchAllResources, appointmentdata, fetchAll, resetEvent } = this.props;
			resetEvent();
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
			goToNextStep(1);
		}

		moreClickHandler = (e, index) => {
			e.stopPropagation();
			const { services } = this.props;
			this.openModal(services[index].title, services[index].description);
			return false;
		}

		moreClickHandlerOpen = (e, title, description) => {
			e.stopPropagation();
			this.openModal(title, description);
			return false;
		}

			// Modal APIs
		openModal = (title, description) => {
			this.setState({
				visible : true,
				resource: {
					title,
					description
				}
			});
		}

		closeModal = () => {
			this.setState({
				visible : false,
				resource: {},
			});
		}


    render() {
			const { services, loading } = this.props;
			const { active, resource } =  this.state;

    	return (
				<>
					<div className="services__container">
						<Grid container spacing={24}>
							{loading &&
								<div className="services__loading">
									<img src={'img/loading.gif'} height={100}/>
								</div>
							}
							{!loading && services.map((item, index) =>
								<Grid item md={4} key={index} className="services__griditem" >
									<Item data={item} active={active === index} onclick={() => this.setService(index)} onMoreClick={(e) => this.moreClickHandler(e, index)} />
								</Grid>
							)}
							{!loading &&
								<Grid item md={4} key={'open-appointment'} className="services__griditem">
									<div className="services__card"  onClick={this.showOpenAppointment}>
										<span className="title">{openAppointmentTitle}</span>
										<div style={{ fontSize: '0.9em' }}>
											<Truncate lines={4} ellipsis={<span>... <a className="more__link" onClick={(e) => this.moreClickHandlerOpen(e, openAppointmentTitle, openAppointmentDesc)}>More</a></span>}>
												{openAppointmentDesc}
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
					<div className="services__morelink__modal" >
						<Modal visible={this.state.visible} effect="fadeInUp" onClickAway={() => this.closeModal()}>
							<div style={{ padding: 20 }}>
								<Grid container alignItems="flex-end">
									<Grid item xs={9}>
										<h3 className="modal__title">{resource.title}</h3>
									</Grid>
									<Grid item xs={3} style={{ textAlign: 'right' }}>
										<CloseIcon onClick={() => this.closeModal()} />
									</Grid>
									<br/>
									<Grid item xs={12} style={{ fontSize: '1.2em', letterSpacing: 0.5, fontWeight: 300, padding: '20px 0' }}>
										{resource.description}
									</Grid>
									<br/>
									<Grid item xs={12} style={{ textAlign: 'right', paddingTop: 20 }}>
										<Button variant="contained" color="primary" onClick={() => this.closeModal()} >
												Close
										</Button>
									</Grid>
								</Grid>
							</div>
						</Modal>
					</div>
				</>
    	);
    }
}


/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
	services: state.data.services,
	loading: state.data.loading,
	appointmentdata: state.data.appointmentdata,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	fetchAllResources: bindActionCreators(fetchAllResources, dispatch),
	fetchAll: bindActionCreators(fetchAll, dispatch),
	resetEvent: bindActionCreators(resetEventData, dispatch),
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
	resetEvent: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
