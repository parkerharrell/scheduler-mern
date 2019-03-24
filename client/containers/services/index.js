import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import ArrowUpIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownIcon from '@material-ui/icons/ArrowDownwardRounded';
import Modal from 'react-awesome-modal';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { isUndefined } from 'lodash';
import Button from '@material-ui/core/Button';
import Truncate from 'react-truncate';

import { fetchAll, destroyItem, updateItem } from '../../actions/serviceAction';

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

class ServicesContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			deleteServiceId: null,
			rowData: [],
		};
	}

	componentDidMount() {
		const { fetchAll } = this.props;
		fetchAll();
	}

	componentDidMount() {
		const { fetchAll } = this.props;
		fetchAll();
	}

	componentWillReceiveProps(nextProps) {
		const { services } = nextProps;
		console.log(' ---------- services:', services);
		if (!isUndefined(services)) {
			this.setState({ rowData: services });
		}
	}

	changeOrder = (id, arrowType) => {
		const { services, updateService } = this.props;
		for (let index = 0; index < services.length; index ++) {
			const service = services[index];
			if (service.id === id) {
				const source = service;
				let target;
				if (arrowType === 'up') {
					// Move up event
					target = services[index - 1];
				} else {
					// Move down event
					target = services[index + 1];
				}
				updateService(source.id, {show_order: target.show_order});
				updateService(target.id, {show_order: source.show_order});
				break;
			}
		};
	}

	// Modal APIs
	openModal = (id) => {
		this.setState({
			visible : true,
			deleteServiceId: id,
		});
	}

	closeModal = () => {
		this.setState({
			visible : false,
			deleteServiceId: null,
		});
	}

	confirmModal() {
		const { deleteServiceId } = this.state;
		const { deleteService } = this.props;
		deleteService(deleteServiceId);
		this.setState({
			visible: false,
			deleteServiceId: null,
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
						<h1>Services</h1>
					</Grid>
					<Grid item>
						<Link to='/admin/services/new'><Button variant="contained" color="primary">Add Service</Button></Link>
					</Grid>
				</Grid>
				<br/><br/>
				<table key={rowData} style={styles.table}>
					<thead>
						<tr>
							<th width="300" style={styles.th}>Name</th>
							<th style={styles.th}>Description</th>
							<th style={styles.th} width="150">Price</th>
							<th style={styles.th} width="80">&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						{rowData.map((data, index) => (
							<tr key={index} style={index % 2 === 0 ? styles.oddTr : {}}>
								<td>
									<div>{data.title}</div>
									<div><Link to={`/admin/services/${data.id}`}>Details</Link>&nbsp;|&nbsp;
									<a onClick={() => this.openModal(data.id)}>Remove</a></div>
								</td>
								<td>
									<Truncate lines={3} ellipsis={<span>...</span>}>
										{data.description}
									</Truncate>
								</td>
								<td>{data.price}</td>
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
                  Do you really want to delete the service? 
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
	services: state.data.services,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	fetchAll: bindActionCreators(fetchAll, dispatch),
	deleteService: bindActionCreators(destroyItem, dispatch),
	updateService: bindActionCreators(updateItem, dispatch),
});

ServicesContainer.propTypes = {
	services: PropTypes.array,
	fetchAll: PropTypes.func,
	updateService: PropTypes.func,
	deleteService: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesContainer);
