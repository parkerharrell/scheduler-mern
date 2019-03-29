import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Modal from 'react-awesome-modal';
import CloseIcon from '@material-ui/icons/Close';
import { isUndefined } from 'lodash';
import Button from '@material-ui/core/Button';
import { Checkbox, Pagination, Select } from 'antd';

import { fetchAll, destroyItem, updateItem } from '../../actions/userAction';
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

const PAGE_SIZE = 3;
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
	checkboxChange = (index, id) => {
		
	}

	onPagiationChanged = (pageNumber) => {
		this.setState({
			pageNumber,
		});
		const { fetchAll } = this.props;
		const { sortByOption } = this.state;
		fetchAll({ page: pageNumber, limit: PAGE_SIZE, sort: sortByOption });
	}

	sortByOptionChange = (value) => {
		this.setState({
			sortByOption: value,
		});
		const { pageNumber } = this.state;
		const { fetchAll } = this.props;
		fetchAll({ page: pageNumber, limit: PAGE_SIZE, sort: value });
	}


	render() {
		const { visible, rowData, pageNumber, totalUsersNumber, sortByOption } = this.state;
		return (
			<div>
				<Grid
					container
					justify="space-between"
					alignItems="center"
				>
					<Grid item>
						<h1>Customer</h1>
					</Grid>
					<Grid item>
						<Link to='/admin/users/new'><Button variant="contained" color="primary">Create New</Button></Link>
					</Grid>
				</Grid>
				<br/>
				<div className="customers__pagination">
					<Pagination
						total={totalUsersNumber}
						showTotal={(total, range) => `[${range[0]}-${range[1]} of ${total}]`}
						pageSize={PAGE_SIZE}
						onChange={this.onPagiationChanged}
						defaultCurrent={pageNumber}
					/>
					<Select
						style={{ width: 200 }}
						placeholder="Sort By"
						onChange={this.sortByOptionChange}
						defaultValue={sortByOption}
					>
						<Option value="email">Email</Option>
						<Option value="first_name">First Name</Option>
						<Option value="last_name">Last Name</Option>
					</Select>
				</div>
				<br/>
				<table key={rowData} style={styles.table}>
					<thead>
						<tr>
							<th style={{...styles.th, width: 30 }}><Checkbox onChange={() => this.checkboxChange()}></Checkbox></th>
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
									<Checkbox onChange={() => this.checkboxChange(index, data.id)}></Checkbox>
								</td>
								<td>
									<div style={{ textTransform: 'captialize' }}>{`${data.first_name} ${data.last_name}`}</div>
									<div><Link to={`/admin/users/${data.id}`}>Details</Link>&nbsp;|&nbsp;
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
});

UsersContainer.propTypes = {
	users: PropTypes.array,
	fetchAll: PropTypes.func,
	deleteUser: PropTypes.func,
	updateUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
