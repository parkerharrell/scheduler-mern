/* eslint-disable no-mixed-spaces-and-tabs */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'styled-components';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import { isUndefined } from 'lodash';
import AddIcon from '@material-ui/icons/AddRounded';

import { fetchAll, updateAppointmentLocation } from '../../actions/locationAction';

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
	.logo {
    margin-right: 20px;
    width: 200px;
	}
	.logo-wrapper {
		display: flex;
		align-items: flex-end;
    width: 100%;
    margin: 15px 0;
	}
	.title {
		font-weight: 800;
		font-size: 1.4em;
		color: #639012;
	}

	.title-with-logo {
    color: orangered;
    margin: 0;
    margin-bottom: 2px;
    font-size: 1.4em;
    font-weight: 900;
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

const Item = ({ data, onclick, active }) => {
	let showLogo = false;
	let title = data.title;
	if (data.title.indexOf('Andrae Michaels Studio') > -1) {
		showLogo = true;
		title = data.title.split('-').pop();
	}
	return (
		<DetailLI style={styles.card} onClick={onclick}>
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
		</DetailLI>
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
    		<div style={styles.container}>
    			<Grid container spacing={24}>
    				{rowData.map((item, index) =>
    					<Grid item md={4} key={index} >
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
	}
};
