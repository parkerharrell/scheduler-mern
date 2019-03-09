import React, {Component} from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import Grid from '@material-ui/core/Grid';

// a localizer for BigCalendar
BigCalendar.momentLocalizer(moment);

// this weird syntax is just a shorthand way of specifying loaders
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class ServicesContainer extends Component {

	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div>
				<Grid
					container
					justify="space-between"
					alignItems="center"
				>
					<Grid item>
						<h1>Appointments</h1>
					</Grid>
					<Grid item>
					</Grid>
				</Grid>
				<div
					className="ag-theme-balham"
				>
					<BigCalendar
						localizer={localizer}
						events={[]}
						startAccessor="start"
						endAccessor="end"
					/>
				</div>
			</div>
		);
	}

}

export default ServicesContainer;