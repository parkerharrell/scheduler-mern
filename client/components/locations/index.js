/* eslint-disable no-mixed-spaces-and-tabs */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Grid from '@material-ui/core/Grid';
import { isUndefined } from 'lodash';
import AddIcon from '@material-ui/icons/AddRounded';

import { fetchAll, updateAppointmentLocation } from '../../actions/locationAction';
import './locations.css';


const Item = ({ data, onclick, active }) => {
	let showLogo = false;
	let title = data.title;
	if (data.title.indexOf('Andrae Michaels Studio') > -1) {
		showLogo = true;
		title = data.title.split('-').pop();
	}
	return (
		<div className="locations__card" onClick={onclick}>
			<div className='logo-wrapper'>
				{ showLogo && 
					<img src="/img/amstudio.png" className="logo" />
				}
				<span className={showLogo ? 'title-with-logo' : 'title' }>{title}</span>
			</div>
			<p>
				<span className="availability">Location:</span>&nbsp;&nbsp;{data.street}, {data.city}, {data.state} {data.zipcode}
			</p>
			<p>
				<span className="availability">Phone:</span>&nbsp;&nbsp;{data.phone}<br/>
			</p>
			<p>
				<span className="availability">Email:</span>&nbsp;&nbsp;{data.email}
			</p>
			<div className={`overlay ${active ? 'active' : ''}`}>
				<AddIcon className="checkbox"  />
			</div>
		</div>
	);
}

Item.propTypes = {
	data: PropTypes.object,
	onclick: PropTypes.func,
	active: PropTypes.bool,
};

class Locations extends Component {
    state = {
    	active: undefined,
    }

    componentDidMount() {
    	const { fetchAll } = this.props;
    	fetchAll();
    }

    setLocation = (index) => {
    	const { goToNextStep, updateAppointmentLocation, locations } = this.props;
		this.setState({ active: index });
		updateAppointmentLocation(locations[index]);
    	setTimeout(() => {
    		goToNextStep();
    	}, 600);
    }

    render() {
    	const { locations } = this.props;
    	const { active } =  this.state;
    	let rowData = [];
    	if (!isUndefined(locations)) {
    		rowData = locations;
    	}

    	return (
    		<div className="locations__container">
    			<Grid container spacing={24}>
    				{rowData.map((item, index) =>
    					<Grid item lg={4} md={6} xs={12} sm={6} key={index} >
    						<Item data={item} active={active === index} onclick={() => this.setLocation(index)}/>
    					</Grid>
    				)}
    			</Grid>
    		</div>
    	);
    }
}


/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
	locations: state.data.locations,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	fetchAll: bindActionCreators(fetchAll, dispatch),
	updateAppointmentLocation: bindActionCreators(updateAppointmentLocation, dispatch),
});

Locations.propTypes = {
	locations: PropTypes.array,
	fetchAll: PropTypes.func,
	goToNextStep: PropTypes.func,
	updateAppointmentLocation: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
