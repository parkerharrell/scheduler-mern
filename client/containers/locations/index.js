import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { isUndefined } from 'lodash';

import { fetchAll } from '../../actions/locationAction';

class ActionsCellRenderer extends Component {
	render() {
		// put in render logic
		const { data } = this.props;
		
		return (
			<React.Fragment>
				<Link to={`/admin/locations/${data.id}`}>Edit</Link>&nbsp;&nbsp;
			</React.Fragment>
		);
	}
}

ActionsCellRenderer.propTypes = {
	data: PropTypes.object,
};

const columnDefs = [
	{
		headerName: '',
		field: 'actions',
		width: 50,
		cellRendererFramework: ActionsCellRenderer,
        
	},
	{headerName: 'Id', field: 'id',  width: 100, minWidth: 80, maxWidth: 200 },
	{headerName: 'Title', field: 'title', minWidth: 200},
	{headerName: 'Description', field: 'description', width: 400, minwidth: 400 },
];


class LocationsContainer extends Component {

	componentDidMount() {
		const { fetchAll } = this.props;
		fetchAll();
	}

	render() {
		const { locations } = this.props;
		let rowData = [];
		if (!isUndefined(locations)) {
			rowData = locations;
		}

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
						<Link to='/admin/locations/new'><button>Add Location</button></Link>
					</Grid>
				</Grid>
				<div
					className="ag-theme-balham"
				>
					<AgGridReact
						enableSorting={true}
						pagination={true}
						defaultColDef={{ resizable: true }}
						columnDefs={columnDefs}
						rowData={rowData}>
					</AgGridReact>
				</div>
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
});

LocationsContainer.propTypes = {
	locations: PropTypes.array,
	fetchAll: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsContainer);
