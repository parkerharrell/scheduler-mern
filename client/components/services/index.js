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

import { fetchAll } from '../../actions/serviceAction';
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
		
		.overlay {
			position: absolute;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.5);
			width: 100%;
			height: 100%;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.checkbox {
					font-size: 3em;
					font-weight: 900;
			}

			&.active .checkbox {
					font-size: 8em;
					transition: all .4s;
			}
		}
	}
`;

const Item = ({ data, onclick, active }) => (
	<DetailLI style={styles.card}>
		<span className="title">{data.title}</span>
		<p>
			<Truncate lines={4} ellipsis={<span>...</span>}>
				{data.description}
			</Truncate>
		</p>
		<div className={`overlay ${active ? 'active' : ''}`} onClick={onclick}>
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
    }

    componentDidMount() {
			const { fetchAllResources, appointmentdata, fetchAll } = this.props;
			if (appointmentdata.location)
	    	fetchAllResources('services', { location: appointmentdata.location });
			else
				fetchAll();
		}

    setService = (index) => {
    	const { goToNextStep } = this.props;
    	this.setState({ active: index });
    	setTimeout(() => {
    		goToNextStep();
    	}, 600);
    }

    render() {
    	const { services } = this.props;
    	const { active } =  this.state;
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
});

Services.propTypes = {
	fetchAllResources: PropTypes.func,
	fetchAll: PropTypes.func,
	services: PropTypes.array,
	appointmentdata: PropTypes.object,
	goToNextStep: PropTypes.func,
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
	}
};
