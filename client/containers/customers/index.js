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

import { fetchAll } from '../../actions/userAction';


ActionsCellRenderer.propTypes = {
	data: PropTypes.object,
};

class ActionsCellRenderer extends Component {
	render() {
		// put in render logic
		const { data } = this.props;
		
		return (
			<React.Fragment>
				<Link to={`/admin/customers/${data.id}`}>Show</Link>&nbsp;&nbsp;
			</React.Fragment>
		);
	}
}

const columnDefs = [
	{
		headerName: '',
		field: 'actions',
		width: 50,
		cellRendererFramework: ActionsCellRenderer,
        
	},
	{headerName: 'Id', field: 'id',  width: 100, minWidth: 80, maxWidth: 200 },
	{headerName: 'Username', field: 'username', minWidth: 200},
	{headerName: 'Email', field: 'email', minWidth: 300},
	{headerName: 'First Name', field: 'first_name', minWidth: 200},
	{headerName: 'Last Name', field: 'last_name', minWidth: 200},
	{headerName: 'Created', field: 'createdAt', minWidth: 200},
];


class UsersContainer extends Component {

	componentDidMount() {
		const { fetchAll } = this.props;
		fetchAll();
	}

	render() {
		const { users } = this.props;
		let rowData = [];
		if (!isUndefined(users)) {
			rowData = users;
		}

		return (
			<div>
				<Grid
					container
					justify="space-between"
					alignItems="center"
				>
					<Grid item>
						<h1>Customers</h1>
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
						rowData={rowData}
						paginationPageSize={20}
					>
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
	users: state.data.users,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	fetchAll: bindActionCreators(fetchAll, dispatch),
});

UsersContainer.propTypes = {
	fetchAll: PropTypes.func,
	users: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
