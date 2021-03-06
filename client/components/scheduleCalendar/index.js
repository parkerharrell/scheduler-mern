/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import styled from 'styled-components';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessIcon from '@material-ui/icons/ExpandLessRounded';

import { isNull, isUndefined } from 'lodash';

import { fetchAll, updateAppointmentDate } from '../../actions/eventAction';
import './schedule.style.css';

const moment = extendMoment(Moment);

const BookButton = styled(Button)`
	width: 100px;
	padding: 3px !important;
	cursor: pointer !important;
	color: rgb(102,106,115) !important;
	border-color: #c0d5e4 !important;

	&:hover {
		border-color: #2196f3 !important;
		color: #2196f3 !important;
	}
`;

const availableDateOptions = {
	60: 'mins',
	3600: 'hrs', 
	86400: 'days',
	604800: 'weeks',
}

class Selectable extends React.Component {
	static propTypes = {
		goToNextStep: PropTypes.func,
	}

	constructor(props) {
		super(props);
		const { fetchAll, appointmentdata } = props;
		// Min Date
		const minfromnow_number = appointmentdata.service.minfromnow_number;
		const minfromnow_options = availableDateOptions[appointmentdata.service.minfromnow_options];
		const minDate = moment(new Date()).add(minfromnow_number, minfromnow_options).toDate();

		// Calculate max date:
		const maxfromnow_number = appointmentdata.service.maxfromnow_number;
		const maxfromnow_options = availableDateOptions[appointmentdata.service.maxfromnow_options];
		const maxDate = moment(new Date()).add(maxfromnow_number, maxfromnow_options).toDate();

		fetchAll(moment(minDate).format(), appointmentdata.location.street);

		this.state = { 
			appointmentDate: minDate,
			visible: false,
			timeSlots: [],
			minDate: minDate,
			maxDate: maxDate,
			loading: false,
			expanded: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { events } = nextProps;
		if (!isUndefined(events)) {
			this.listAvailableTimeSlots(events);
		}
	}

	listAvailableTimeSlots = (eventList) => {
		const { appointmentdata } = this.props;
		const { appointmentDate } = this.state;
		const duration = appointmentdata.service.duration || 900;

		const result = [];
		for (let i = 0; i < 7; i++) {
			const date = moment(appointmentDate).add(i, 'days').toDate();
			const day_start = moment(date).startOf('day').hours(10);
			const day_end   = moment(date).startOf('day').hours(19);
			const day = moment.range(day_start, day_end);
			const time_slots = Array.from(day.by('seconds', {step: duration}));
			time_slots.pop();
			const timeSlots = [];
			time_slots.forEach(slot => {
				const res = eventList.filter(event => moment(event.start.dateTime).format('YYYY-MM-DD hh:mm a') === slot.format('YYYY-MM-DD hh:mm a'));
				if (res.length === 0) timeSlots.push(slot);
			});
			result.push({ date, data: timeSlots });
		}
		
		this.setState({
			timeSlots: result,
			loading: false,
		});
	}

  handleSelect = (start) => {
		const { updateAppointmentDate, goToNextStep } = this.props;
		updateAppointmentDate(moment(start).format());
		goToNextStep();
  }

  dateSelected = (date) => {
		this.setState({ appointmentDate: moment(date).toDate(), loading: true, expanded: false });
		const { fetchAll, appointmentdata } = this.props;
		fetchAll(moment(date).format(), appointmentdata.location.street);
	}
	
	expandedHandler = () => {
		const { expanded } = this.state;
		this.setState({ expanded: !expanded });
	}
	
  render() {
		const { appointmentDate, timeSlots, minDate, maxDate, loading, expanded} = this.state;

		return (
  		<React.Fragment>
  			<div className="schedule__container">
  				<div className={ !expanded ? 'schedule__daypicker__wrapper' : 'schedule__daypicker__wrapper open' }>
						{expanded &&
							<div className="expandedicon">
								<IconButton style={{ padding: 3 }} onClick={this.expandedHandler}>
									<ExpandMoreIcon style={{ fontSize: 36 }} />
								</IconButton>
							</div>
						}
						{!expanded &&
							<div className="expandedicon">
								<IconButton style={{ padding: 3 }} onClick={this.expandedHandler}>
									<ExpandLessIcon style={{ fontSize: 36 }} />
								</IconButton>
							</div>
						}
						<DayPicker
							key={appointmentDate && minDate && maxDate}
							numberOfMonths={2}
							onDayClick={this.dateSelected}
							selectedDays={[
								appointmentDate,
							]}			 
							disabledDays={[
								{
									before: minDate, 
									after: maxDate
								},
							]}
						/>
  				</div>
  				<div className="schedule__books__container">
						<Grid container spacing={16} className="schedule__books__grid">
							{timeSlots.map((timeSlot, slotId) => {
								return (
									<React.Fragment key={slotId}>
										<Grid item xs={12}>
											<h2 style={{ marginBottom: 0, marginTop: 10 }}>{moment(timeSlot.date).format('dddd, MM/DD/YYYY')}</h2>
										</Grid>
										{timeSlot.data.map((event, index) => (
											<Grid item key={`${slotId}-${index}`}>
												<BookButton variant="outlined" color="primary" onClick={() => this.handleSelect(event.format())}>
													{event.format('hh:mm a')}
												</BookButton>
											</Grid>
										))}
										<br/><br/>
										</React.Fragment>
								)}
							)}
						</Grid>
						{loading &&
							<LoadingOverlay>
								<img src="/img/loading.gif" width="100%"/>
							</LoadingOverlay>
						}
  				</div>
  			</div>
  			{/* <Modal visible={this.state.visible} width="400" height="200" effect="fadeInUp" onClickAway={() => this.closeModal()}>
  				<div style={{ padding: 20 }}>
  					<Grid container alignItems="flex-end">
  						<Grid item xs={12} style={{ textAlign: 'right' }}>
  							<CloseIcon onClick={() => this.closeModal()} />
  						</Grid>
  						<br/>
  						<Grid item xs={12} style={{ fontSize: '1.4em', fontWeight: 500, padding: '20px 0' }}>
                  Do you really want to add this event? 
  						</Grid>
  						<br/>
  						<Grid item xs={12} style={{ textAlign: 'right', paddingTop: 20 }}>
  							<Button variant="contained" color="primary" onClick={() => this.confirmModal()} >
                    Yes
  							</Button>
                  &nbsp;&nbsp;&nbsp;
  							<Button variant="contained" color="secondary" onClick={() => this.closeModal()} >
                     No
  							</Button>
  						</Grid>
  					</Grid>
  				</div>
  			</Modal> */}
  		</React.Fragment>
  	);
  }
}

function Event({ event }) {
	return (
		<span>
			<strong>{event.title}</strong>
			{event.desc && ':  ' + event.desc}
		</span>
	);
}

Event.propTypes = {
	event: PropTypes.object,
};

const LoadingOverlay = styled.div`
	position: absolute;
	top: 30vh;
	left: calc(50% - 100px);
	width: 200px;
	z-index: 1000;
`;

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
	events: state.data.events,
	appointmentdata: state.data.appointmentdata,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	fetchAll: bindActionCreators(fetchAll, dispatch),
	updateAppointmentDate: bindActionCreators(updateAppointmentDate, dispatch),
});

Selectable.propTypes = {
	events: PropTypes.array,
	fetchAll: PropTypes.func,
	goToNextStep: PropTypes.func,
	createEvent: PropTypes.func,
	appointmentdata: PropTypes.object,
	updateAppointmentDate: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Selectable);
