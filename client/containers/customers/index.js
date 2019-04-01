import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Modal from 'react-awesome-modal';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Checkbox, Pagination, Select, Icon, Button as AntdBtn, Input } from 'antd';

import { fetchAll, destroyItem, updateItem } from '../../actions/userAction';
import { fetchById } from '../../actions/fileAction';
import './customers.style.css';

const styles = {
	table: {
		tableLayout: 'fixed',
    width: '100%',
		textAlign: 'left',
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
	},
	statusBtnActive: {
		backgroundColor: '#07b56f',
		fontSize: '0.7em',
	},
	statusBtn: {
		fontSize: '0.7em',
	},
	statusBtnNotConfirmed: {
		fontSize: '0.7em',
    background: '#f5cc05',
		pointerEvents: 'none',
		color: '#222',
	}
}

const PAGE_SIZE = 20;
const Option = Select.Option;

class UsersContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			deleteUserId: null,
			rowData: [],
			pageNumber: 1,
			totalUsersNumber: 0,
			pageSize: PAGE_SIZE,
			sortByOption: 'email',
			isCheckAllClicked: false,
			selectedItems: [],
			filters: {
				status: null,
				email: null,
				first_name: null,
				last_name: null,
			}
		};
		const { fetchAll } = this.props;
		fetchAll({ page: 1, limit: PAGE_SIZE });
	}

	componentWillReceiveProps(nextProps) {
		const { users, total } = nextProps;
		const totalUsersNumber = total ? total : 0;
		this.setState({ rowData: users, totalUsersNumber });
	}

	changeStatus = (id, status) => {
		const { updateUser } = this.props;
		updateUser(id, {status: 1 - status});
	}

	// Modal APIs
	openModal = (id) => {
		this.setState({
			visible : true,
			deleteUserId: id,
		});
	}

	closeModal = () => {
		this.setState({
			visible : false,
			deleteUserId: null,
		});
	}

	confirmModal() {
		const { deleteUserId } = this.state;
		const { deleteUser } = this.props;
		deleteUser(deleteUserId);
		this.setState({
			visible: false,
			deleteUserId: null,
		});
	}

	// Checkbox Change Handler
	checkboxChange = (id) => {
		const { selectedItems: itemList } = this.state;
		const index = itemList.indexOf(id);
		if (index > -1) {
			itemList.splice(index, 1);
		} else {
			itemList.push(id);
		}
		this.setState({ selectedItems: itemList });
	}

	onPagiationChanged = (pageNumber) => {
		this.setState({
			pageNumber,
			selectedItems: [],
			isCheckAllClicked: false,
		});
		const { fetchAll } = this.props;
		const { sortByOption } = this.state;
		fetchAll({ page: pageNumber, limit: PAGE_SIZE, sort: sortByOption });
	}

	sortByOptionChange = (value) => {
		this.setState({
			sortByOption: value,
			pageNumber: 1,
			selectedItems: [],
			isCheckAllClicked: false,
		});
		const { fetchAll } = this.props;
		fetchAll({ page: 1, limit: PAGE_SIZE, sort: value });
	}

	downloadExcel = () => {
		const { downloadFile } = this.props;
		downloadFile('customers');
	}

	bulkActionsChanged = (action) => {
		this.setState({ selectedBulkAction: action });
	
	}

	runBulkActions = () => {
		const { selectedBulkAction, selectedItems } = this.state;
		if (selectedItems.length === 0) {
			window.alert('No Item is selected!');
			return false;
		}
		switch (selectedBulkAction) {
			case 'delete':
				{
					const { deleteUser } = this.props;
					selectedItems.forEach(item => {
						deleteUser(item);
					});
					this.setState({ selectedItems: [], isCheckAllClicked: false });
				}
				break;
			case 'activate':
				{
					const { updateUser } = this.props;
					selectedItems.forEach(item => {
						updateUser(item, { status: 1 });
					});
					this.setState({ selectedItems: [], isCheckAllClicked: false });
				}
				break;
			case 'suspend':
				{
					const { updateUser } = this.props;
					selectedItems.forEach(item => {
						updateUser(item, { status: 0 });
					});
					this.setState({ selectedItems: [], isCheckAllClicked: false });
				}
				break;
			default:
		}
	}


	showCheckMark = (id) => {
		const { selectedItems } = this.state;
		return selectedItems.indexOf(id) > -1;
	}

	checkAllItems = () => {
		const { isCheckAllClicked, rowData } = this.state;
		const totalIdsCurrentPage = rowData.map(data => data.id);
		this.setState({
			isCheckAllClicked: !isCheckAllClicked,
			selectedItems: !isCheckAllClicked ? totalIdsCurrentPage : [],
		});
	}

	statusOptionChange = (value) => {
		const { filters } = this.state;
		const data = Object.clone({}, filters);
		data['status'] = value;
		this.setState({ filters: data });
	}

	runFilter = () => {
		const { filters, sortByOption } = this.state;
		const { fetchAll } = this.props;
		this.setState({ 
			pageNumber: 1,
			selectedItems: [],
			isCheckAllClicked: false,
		});
		fetchAll({ page: 1, limit: PAGE_SIZE, sort: sortByOption, filters });

	}

	changeFilterValue = (prop, value) => {
		const { filters } = this.state;
		const data = Object.clone({}, filters);
		data[prop] = value;
		this.setState({ filters: data });
	}
	

	render() {
		const { visible, rowData, pageNumber, totalUsersNumber, sortByOption, isCheckAllClicked, statusOption,
			filters } = this.state;
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
					<Grid item>
						<Link to='/admin/customers/new'><Button variant="contained" size="small" color="primary">Create New</Button></Link>&nbsp;&nbsp;&nbsp;
						<Link to='/admin/customers/newsletter'><Button variant="contained" size="small" color="primary">Newsletter</Button></Link>
					</Grid>
				</Grid>
				<br/>
				<div className="customers__pagination">
					{/* Bulk Actions */}
					<Select
						placeholder="Bulk Actions"
						onChange={this.bulkActionsChanged}
						style={{ marginLeft: 0 }}
					>
						<Option value="delete">Delete</Option>
						<Option value="activate">Activate</Option>
						<Option value="suspend">Suspend</Option>
					</Select>
					<AntdBtn onClick={this.runBulkActions}>Go</AntdBtn>
					&nbsp;
					<Pagination
						total={totalUsersNumber}
						showTotal={(total, range) => `[${range[0]}-${range[1]} of ${total}]`}
						pageSize={PAGE_SIZE}
						onChange={this.onPagiationChanged}
						defaultCurrent={pageNumber}
					/>
					<b>SortBy:&nbsp;</b>
					<Select
						style={{ width: 120 }}
						onChange={this.sortByOptionChange}
						defaultValue={sortByOption}
					>
						<Option value="email">Email</Option>
						<Option value="first_name">First Name</Option>
						<Option value="last_name">Last Name</Option>
					</Select>
					<Icon type="file-excel" style={{ fontSize: 20, marginLeft: 10, marginRight: 6 }} title={'Download Cutomers\' List'} onClick={this.downloadExcel} />
				</div>
				<div className="customers__pagination">
					<h3>Advanced Filter:</h3>
					<Input placeholder="Email" value={filters.email} onChange={value => this.changeFilterValue('email', value)} />
					<Input placeholder="First Name" value={filters.first_name} onChange={value => this.changeFilterValue('first_name', value)} />
					<Input placeholder="Last Name" value={filters.last_name} onChange={value => this.changeFilterValue('last_name', value)}/>
					<Select
						onChange={this.statusOptionChange}
						placeholder="Status"
					>
						<Option value="activate">Activate</Option>
						<Option value="suspend">Suspend</Option>
						<Option value="email_not_confirmed">Email Not Confirmed</Option>
					</Select>
					<AntdBtn onClick={this.runFilter}>Apply Filter</AntdBtn>
				</div>
				<br/>
				<table key={rowData} style={styles.table}>
					<thead>
						<tr>
							<th style={{...styles.th, width: 30 }}><Checkbox checked={isCheckAllClicked} onChange={() => this.checkAllItems()}></Checkbox></th>
							<th style={{...styles.th, width: 300 }}>Full Name</th>
							<th style={styles.th}>Email</th>
							<th style={styles.th}>Contact Phone</th>
							<th style={styles.th}>Address</th>
							<th style={styles.th} width="120">Status</th>
						</tr>
					</thead>
					<tbody>
						{rowData.map((data, index) => (
							<tr key={index} style={index % 2 === 0 ? styles.oddTr : {}}>
								<td>
									<Checkbox checked={this.showCheckMark(data.id)} onChange={() => this.checkboxChange(data.id)}></Checkbox>
								</td>
								<td>
									<div style={{ textTransform: 'captialize' }}>{`${data.first_name} ${data.last_name}`}</div>
									<div><Link to={`/admin/customers/${data.id}`}>Details</Link>&nbsp;|&nbsp;
									<Link to={`/admin/appointments?user=${data.id}`}>Appointments</Link>&nbsp;|&nbsp;
									<a onClick={() => this.openModal(data.id)}>Remove</a></div>
								</td>
								<td>
									{data.email}
								</td>
								<td>
									{data.phone}
								</td>
								<td>
									{`${data.street_address}, ${data.city}, ${data.state} ${data.zipcode}`}
								</td>
								<td>
									{data.email_confirmed == 0 &&
										<Button variant="contained" size="small" style={styles.statusBtnNotConfirmed}>Not Confirmed</Button>
									}
									{data.status === 1 && data.email_confirmed == 1 &&
										<Button variant="contained" size="small" color="primary" style={styles.statusBtnActive} onClick={() => this.changeStatus(data.id, data.status)}>Activate</Button>
									}
									{data.status !== 1 && data.email_confirmed == 1 &&
										<Button variant="contained" size="small" color="secondary" style={styles.statusBtn} onClick={() => this.changeStatus(data.id, data.status)}>Suspend</Button>
									}
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
                  Do you really want to delete the user? 
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
	users: state.data.users,
	total: state.data.total,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	fetchAll: bindActionCreators(fetchAll, dispatch),
	deleteUser: bindActionCreators(destroyItem, dispatch),
	updateUser: bindActionCreators(updateItem, dispatch),
	downloadFile: bindActionCreators(fetchById, dispatch),
});

UsersContainer.propTypes = {
	users: PropTypes.array,
	fetchAll: PropTypes.func,
	deleteUser: PropTypes.func,
	updateUser: PropTypes.func,
	downloadFile: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
