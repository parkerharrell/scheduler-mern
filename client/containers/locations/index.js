import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { isUndefined } from 'lodash';
import ArrowUpIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownIcon from '@material-ui/icons/ArrowDownwardRounded';
import Modal from 'react-awesome-modal';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { fetchAll, destroyItem, updateItem } from '../../actions/locationAction';


const styles = {
	table: {
		tableLayout: 'fixed',
    width: '100%',
		textAlign: 'left',
		maxWidth: 1200,
		borderCollapse: 'collapse',
	},
	th: {
		color: '#a9a9a9',
		borderBottom: '1px solid #17acb3',
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 10,
	},
	oddTr: {
		background: '#fafdff',
	},
	arrowUp: {
		cursor: 'pointer',
    color: 'green',
		fontSize: 22,
	},
	arrowDown: {
		cursor: 'pointer',
		color: 'orangered',
		fontSize: 22,
	}
}

class LocationsContainer extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			deleteLocationId: null,
			rowData: [],
		};
	}

	componentDidMount() {
		const { fetchAll } = this.props;
		fetchAll();
	}

	componentWillReceiveProps(nextProps) {
		const { locations } = nextProps;
		console.log(' ---------- locations:', locations);
		if (!isUndefined(locations)) {
			this.setState({ rowData: locations });
		}
	}

	changeOrder = (id, arrowType) => {
		const { locations, updateLocation } = this.props;
		for (let index = 0; index < locations.length; index ++) {
			const location = locations[index];
			if (location.id === id) {
				const source = location;
				let target;
				if (arrowType === 'up') {
					// Move up event
					target = locations[index - 1];
				} else {
					// Move down event
					target = locations[index + 1];
				}
				updateLocation(source.id, {show_order: target.show_order});
				updateLocation(target.id, {show_order: source.show_order});
				break;
			}
		};
	}

	// Modal APIs
	openModal = (id) => {
		this.setState({
			visible : true,
			deleteLocationId: id,
		});
	}

	closeModal = () => {
		this.setState({
			visible : false,
			deleteLocationId: null,
		});
	}

	confirmModal() {
		const { deleteLocationId } = this.state;
		const { deleteLocation } = this.props;
		deleteLocation(deleteLocationId);
		this.setState({
			visible: false,
			deleteLocationId: null,
		});
	}


	render() {
		const { visible, rowData } = this.state;


		return (
			<div>
				<Grid
					container
					justify="space-between"
					alignItems="center"
				>
					<Grid item>
						<h1>Locations</h1>
					</Grid>
					<Grid item>
						<Link to='/admin/locations/new'><Button variant="contained" color="primary">Add Location</Button></Link>
					</Grid>
				</Grid>
				<br/><br/>
				<table key={rowData} style={styles.table}>
					<thead>
						<tr>
							<th style={styles.th}>Name</th>
							<th style={styles.th}>Contact Email</th>
							<th style={styles.th} width="150">Phone Number</th>
							<th style={styles.th} width="80">&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						{rowData.map((data, index) => (
							<tr key={index} style={index % 2 === 0 ? styles.oddTr : {}}>
								<td>
									<div>{data.title}</div>
									<div><Link to={`/admin/locations/${data.id}`}>Details</Link>&nbsp;|&nbsp;
									<a onClick={() => this.openModal(data.id)}>Remove</a></div>
								</td>
								<td>{data.email}</td>
								<td>{data.phone}</td>
								<td align="right">
									<IconButton style={{ padding: 5 }}>
										<ArrowUpIcon onClick={() => this.changeOrder(data.id, 'up')}  style={styles.arrowUp} />
									</IconButton>
									<IconButton style={{ padding: 5 }}>
										<ArrowDownIcon onClick={() => this.changeOrder(data.id, 'down')} style={styles.arrowDown} />
									</IconButton>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Modal visible={visible} width="480" height="200" effect="fadeInUp" onClickAway={() => this.closeModal()}>
  				<div style={{ padding: 20 }}>
  					<Grid container alignItems="flex-end">
  						<Grid item xs={12} style={{ textAlign: 'right' }}>
  							<CloseIcon onClick={() => this.closeModal()} />
  						</Grid>
  						<br/>
  						<Grid item xs={12} style={{ fontSize: '1.4em', fontWeight: 500, padding: '20px 0' }}>
                  Do you really want to delete the location? 
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
	deleteLocation: bindActionCreators(destroyItem, dispatch),
	updateLocation: bindActionCreators(updateItem, dispatch),
});

LocationsContainer.propTypes = {
	locations: PropTypes.array,
	fetchAll: PropTypes.func,
	updateLocation: PropTypes.func,
	deleteLocation: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsContainer);
