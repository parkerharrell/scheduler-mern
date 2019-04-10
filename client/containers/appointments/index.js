import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Modal from 'react-awesome-modal';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Checkbox, Pagination, Select, Icon, Button as AntdBtn, DatePicker } from 'antd';

import { fetchAll, destroyAppointment, updateAppointment } from '../../actions/appointmentAction';
import { fetchAll as fetchAllSittings } from '../../actions/sittingAction';
import { fetchAll as fetchAllLocations } from '../../actions/locationAction';
import { fetchAll as fetchAllServices } from '../../actions/serviceAction';
import { fetchAll as fetchCustomers } from '../../actions/userAction';

import './appointments.style.css';

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
const { RangePicker } = DatePicker;

class AppointmentsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			deleteAppointmentId: null,
			rowData: [],
			pageNumber: 1,
			totalAppointmentsNumber: 0,
			pageSize: PAGE_SIZE,
			sortByOption: 'email',
			isCheckAllClicked: false,
			selectedItems: [],
			filters: {
				status: null,
				email: null,
				first_name: null,
				last_name: null,
			},
			customers: [],
		};
		const { fetchAll, fetchAllLocations, fetchAllServices, fetchAllSittings } = this.props;
		fetchAll({ page: 1, limit: PAGE_SIZE });
		fetchAllLocations();
		fetchAllServices();
		fetchAllSittings();
	}

	componentWillReceiveProps(nextProps) {
		const { appointments, total } = nextProps;
		const totalAppointmentsNumber = total;
		this.setState({ rowData: appointments, totalAppointmentsNumber });
		if (appointments.length > 0 && customers.length === 0) {
			const customerIds = appointments.map(item => item.customer_id);
			const { fetchCustomers } = this.props;
			fetchCustomers({ users: customerIds });
		}

	}

	changeStatus = (id, status) => {
		const { updateAppointment } = this.props;
		updateAppointment(id, {status: 1 - status});
	}

	// Modal APIs
	openModal = (id) => {
		this.setState({
			visible : true,
			deleteAppointmentId: id,
		});
	}

	closeModal = () => {
		this.setState({
			visible : false,
			deleteAppointmentId: null,
		});
	}

	confirmModal() {
		const { deleteAppointmentId } = this.state;
		const { deleteAppointment } = this.props;
		deleteAppointment(deleteAppointmentId);
		this.setState({
			visible: false,
			deleteAppointmentId: null,
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
		downloadFile('appointments');
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
					const { deleteAppointment } = this.props;
					selectedItems.forEach(item => {
						deleteAppointment(item);
					});
					this.setState({ selectedItems: [], isCheckAllClicked: false });
				}
				break;
			case 'activate':
				{
					const { updateAppointment } = this.props;
					selectedItems.forEach(item => {
						updateAppointment(item, { status: 1 });
					});
					this.setState({ selectedItems: [], isCheckAllClicked: false });
				}
				break;
			case 'suspend':
				{
					const { updateAppointment } = this.props;
					selectedItems.forEach(item => {
						updateAppointment(item, { status: 0 });
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

	onDateFilterChange = (date, dateString) => {
		console.log('-------- date, dateStr: ', date, dateString);
	}
	
	render() {
		const { visible, rowData, pageNumber, totalAppointmentsNumber, isCheckAllClicked, statusOption,
			filters, services, locations, appointments,  } = this.state;
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
						<Link to='/admin/appointments/new'><Button variant="contained" size="small" color="primary">Create New</Button></Link>
					</Grid>
				</Grid>
				<br/>
				<div className="appointments__pagination">
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
						total={totalAppointmentsNumber}
						showTotal={(total, range) => `[${range[0]}-${range[1]} of ${total}]`}
						pageSize={PAGE_SIZE}
						onChange={this.onPagiationChanged}
						defaultCurrent={pageNumber}
					/>
				</div>
				<div className="appointments__pagination">
					<h3>Advanced Filter:</h3>
					<RangePicker onChange={this.onDateFilterChange} />
					<Select
						onChange={value => this.optionChange('sitting', value)}
						placeholder="Sitting"
					>
						<Option value="activate">Activate</Option>
					</Select>
					<Select
						onChange={value => this.optionChange('service', value)}
						placeholder="Service"
					>
						<Option value="activate">Activate</Option>
					</Select>
					<Select
						onChange={value => this.optionChange('location', value)}
						placeholder="Location"
					>
						<Option value="activate">Activate</Option>
					</Select>
					<Select
						onChange={value => this.optionChange('status', value)}
						placeholder="Status"
					>
						<Option value="confirmed">Confirmed</Option>
						<Option value="pending">Pending</Option>
						<Option value="no_show">No Show or missed</Option>
						<Option value="cancelled">Cancelled</Option>
					</Select>
					<AntdBtn onClick={this.runFilter}>Apply Filter</AntdBtn>
				</div>
				<br/>
				<table key={rowData} style={styles.table}>
					<thead>
						<tr>
							<th style={{...styles.th, width: 30 }}><Checkbox checked={isCheckAllClicked} onChange={() => this.checkAllItems()}></Checkbox></th>
							<th style={{...styles.th, width: 300 }}>Resource</th>
							<th style={styles.th}>Location</th>
							<th style={styles.th}>Service</th>
							<th style={styles.th}>Customer</th>
							<th style={styles.th}>StartAt</th>
							<th style={styles.th}>Duration</th>
							<th style={styles.th}>Price</th>
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
									<div style={{ textTransform: 'captialize' }}>{sittings[data.sitting_id].title}</div>
									<div><Link to={`/admin/appointments/${data.id}`}>Details</Link>&nbsp;|&nbsp;
									<Link to={`/admin/appointments?appointment=${data.id}`}>Appointments</Link>&nbsp;|&nbsp;
									<a onClick={() => this.openModal(data.id)}>Remove</a></div>
								</td>
								<td>
									{locations[data.location_id].title || ''}
								</td>
								<td>
									{services[data.service_id].title || ''}
								</td>
								<td>
									{`${customers[data.customer_id].first_name} ${customers[data.customer_id].last_name}` || ''}
								</td>
								<td>
									{services[data.service_id].startAt || ''}
								</td>
								<td>
									{services[data.service_id].duration || ''}
								</td>
								<td>
									{services[data.service_id].price || ''}
								</td>
								<td>
									{data.approved == 1 &&
										<Button variant="contained" size="small" style={styles.statusBtnNotConfirmed}>Approved</Button>
									}
									{data.no_show === 1 &&
										<Button variant="contained" size="small" color="primary" style={styles.statusBtnActive} onClick={() => this.changeStatus(data.id, data.status)}>No Show or Missed</Button>
									}
									{data.cancelled === 1 &&
										<Button variant="contained" size="small" color="secondary" style={styles.statusBtn} onClick={() => this.changeStatus(data.id, data.status)}>Cancelled</Button>
									}
									{data.approved !== 1 && data.no_show !== 1 && data.cancelled !== 1 &&
										<Button variant="contained" size="small" style={styles.statusBtnNotConfirmed}>Pending</Button>
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
                  Do you really want to delete the appointment? 
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
	appointments: state.data.appointments,
	services: state.data.services,
	locations: state.data.locations,
	sittings: state.data.sittings,
	customers: state.data.users,
	total: state.data.total,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	fetchAll: bindActionCreators(fetchAll, dispatch),
	deleteAppointment: bindActionCreators(destroyAppointment, dispatch),
	updateAppointment: bindActionCreators(updateAppointment, dispatch),
	fetchAllServices: bindActionCreators(fetchAllServices, dispatch),
	fetchAllLocations: bindActionCreators(fetchAllLocations, dispatch),
	fetchAllSittings: bindActionCreators(fetchAllSittings, dispatch),
	fetchCustomers: bindActionCreators(fetchCustomers, dispatch),
});

AppointmentsContainer.propTypes = {
	appointments: PropTypes.array,
	fetchAll: PropTypes.func,
	deleteAppointment: PropTypes.func,
	updateAppointment: PropTypes.func,
	fetchAllServices: PropTypes.func,
	fetchAllLocations: PropTypes.func,
	fetchAllSittings: PropTypes.func,
	fetchCustomer: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsContainer);
