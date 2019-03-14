/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BigCalendar from 'react-big-calendar';
import * as moment from 'moment';
import styled from 'styled-components';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Modal from 'react-awesome-modal';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { isNull, isUndefined } from 'lodash';
import { fetchAll, storeItem } from '../../actions/eventAction';

const localizer = BigCalendar.momentLocalizer(moment);
class Selectable extends React.Component {
	static propTypes = {
		goToNextStep: PropTypes.func,
	}

	constructor(...args) {
		super(...args);
		this.state = { 
			eventList: [],
			appointmentDate: moment(new Date()).add(1, 'days').toDate(),
			visible: false,
		};
		const { fetchAll } = this.props;
		fetchAll();
	}

	openModal() {
		this.setState({
			visible : true
		});
	}

	closeModal() {
		this.setState({
			visible : false,
			eventList: [],
		});
	}

	confirmModal() {
		const { createEvent, appointmentdata, services, locations } = this.props;
		this.setState({
			visible: false,
		});
		const { eventList } = this.state;
		const event = {};
		event.summary = 'Photo View';
		event.start = moment(eventList[0].start).format();
		event.end = moment(eventList[0].end).format();
		event.location = '4530 E Snider St, Springfield, MO 65803, USA';
		event.description = 'Photo View Description';
		createEvent(event);
	}

  handleSelect = ({ start, end }) => {
  	const { events } = this.props;
		const slotTime = moment(start).format('YYYY-MM-DD hh:mm a');
		const slotTimeHrs = parseInt(moment(start).format('hh'), 10);
		const slotTimeAM = moment(start).format('a');
  	if ((slotTimeHrs < 10  && slotTimeAM === 'am') || (slotTimeHrs === 12 && slotTimeAM === 'am') || (slotTimeHrs !== 12 && slotTimeHrs >= 6  && slotTimeAM === 'pm') || events.filter(event => moment(event.start.dateTime).format('YYYY-MM-DD hh:mm a') === slotTime).length > 0) {
  		return false;
  	}
  	const title = '';
  	this.setState({
  		eventList: [
  			...this.state.eventList,
  			{
  				start,
  				end,
  				title,
  			},
  		],
  	});
  	setTimeout(() => {
  		this.setState({ visible: true });
  	}, 500);
  }

  dateSelected = (date) => {
		this.setState({ appointmentDate: moment(date).toDate() });
		const { fetchAll } = this.props;
		fetchAll(moment(date).format());
  }
  
  customSlotPropGetter = date => {
		const { events } = this.props;
		const { appointmentDate } = this.state;
		if (isNull(appointmentDate)) {
			return {};
		}

		if (isUndefined(events)) events = [];

		const slotTime = moment(date).format('YYYY-MM-DD hh:mm a');
		const slotTimeHrs = parseInt(moment(date).format('hh'), 10);
		const slotTimeAM = moment(date).format('a');
  	if ((slotTimeHrs < 10  && slotTimeAM === 'am') || (slotTimeHrs === 12 && slotTimeAM === 'am') || (slotTimeHrs !== 12 && slotTimeHrs >= 6  && slotTimeAM === 'pm') || events.filter(event => moment(event.start.dateTime).format('YYYY-MM-DD hh:mm a') === slotTime).length > 0)
  	{return {
  		className: 'unavailable',
  	};}
  	else {return { className: 'available', };}
	};
	
  render() {
  	const today = new Date();
  	const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 177);
  	const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

		const { appointmentDate, eventList } = this.state;
		const { events, event_created_success, goToNextStep } = this.props;
		if (event_created_success) {
			goToNextStep();
		}
		if (isUndefined(events)) events = [];

  	return (
  		<React.Fragment>
  			<div style={{ display: 'flex' }}>
  				<div>
  					<InfiniteCalendar
  						width={400}
  						height={550}
  						selected={appointmentDate}
  						minDate={minDate}
  						maxDate={maxDate}
  						onSelect={this.dateSelected}
  					/>
  				</div>
  				<Container>
  					<BigCalendar
							key={events.length}
  						selectable
  						localizer={localizer}
  						step={15}
  						key={appointmentDate}
  						events={eventList}
  						slotPropGetter={this.customSlotPropGetter}
  						defaultDate={appointmentDate}
  						onSelectEvent={() => {}}
  						onSelectSlot={this.handleSelect}
  						defaultView={BigCalendar.Views.DAY}
  						views={{ day: true }}
  						components={{
  							event: Event,
  						}}
  					/>
  				</Container>
  			</div>
  			<Modal visible={this.state.visible} width="400" height="200" effect="fadeInUp" onClickAway={() => this.closeModal()}>
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
  			</Modal>
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

const Container = styled.div`
  flex: 1 1;
  padding-left: 30px;
  min-height: 400px;
  max-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
`;

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
	events: state.data.events,
	event_created_success: state.data.event_created_success,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	fetchAll: bindActionCreators(fetchAll, dispatch),
	createEvent: bindActionCreators(storeItem, dispatch),
});

Selectable.propTypes = {
	events: PropTypes.array,
	fetchAll: PropTypes.func,
	goToNextStep: PropTypes.func,
	createEvent: PropTypes.func,
	appointmentdata: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Selectable);
