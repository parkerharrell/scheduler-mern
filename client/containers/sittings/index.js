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

import { fetchAll, destroyItem, updateItem } from '../../actions/sittingAction';

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
	},
	statusBtnActive: {
		backgroundColor: '#07b56f',
		fontSize: '0.7em',
	},
	statusBtn: {
		fontSize: '0.7em',
	}
}

class SittingsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			deleteSittingId: null,
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
		const { sittings } = nextProps;
		if (!isUndefined(sittings)) {
			this.setState({ rowData: sittings });
		}
	}

	changeOrder = (id, arrowType) => {
		const { sittings, updateSitting } = this.props;
		for (let index = 0; index < sittings.length; index ++) {
			const sitting = sittings[index];
			if (sitting.id === id) {
				const source = sitting;
				let target;
				if (arrowType === 'up') {
					// Move up event
					target = sittings[index - 1];
				} else {
					// Move down event
					target = sittings[index + 1];
				}
				updateSitting(source.id, {show_order: target.show_order});
				updateSitting(target.id, {show_order: source.show_order});
				break;
			}
		};
	}

	changeStatus = (id, status) => {
		const { updateSitting } = this.props;
		updateSitting(id, {status: 1 - status});
	}

	// Modal APIs
	openModal = (id) => {
		this.setState({
			visible : true,
			deleteSittingId: id,
		});
	}

	closeModal = () => {
		this.setState({
			visible : false,
			deleteSittingId: null,
		});
	}

	confirmModal() {
		const { deleteSittingId } = this.state;
		const { deleteSitting } = this.props;
		deleteSitting(deleteSittingId);
		this.setState({
			visible: false,
			deleteSittingId: null,
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
						<h1>Sittings</h1>
					</Grid>
					<Grid item>
						<Link to='/admin/sittings/new'><Button variant="contained" color="primary">Add Sitting</Button></Link>
					</Grid>
				</Grid>
				<br/><br/>
				<table key={rowData} style={styles.table}>
					<thead>
						<tr>
							<th style={styles.th}>Name</th>
							<th style={styles.th} width="150">Status</th>
							<th style={styles.th} width="80">&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						{rowData.map((data, index) => (
							<tr key={index} style={index % 2 === 0 ? styles.oddTr : {}}>
								<td>
									<div>{data.title}</div>
									<div><Link to={`/admin/sittings/${data.id}`}>Details</Link>&nbsp;|&nbsp;
									<a onClick={() => this.openModal(data.id)}>Remove</a></div>
								</td>
								<td>
									{data.status === 1 &&
										<Button variant="contained" size="small" color="primary" style={styles.statusBtnActive} onClick={() => this.changeStatus(data.id, data.status)}>Activate</Button>
									}
									{data.status !== 1 &&
										<Button variant="contained" size="small" color="secondary" style={styles.statusBtn} onClick={() => this.changeStatus(data.id, data.status)}>Suspend</Button>
									}
								</td>
								<td align="right">
									<IconButton style={{ padding: 5 }} onClick={() => this.changeOrder(data.id, 'up')}  >
										<ArrowUpIcon style={styles.arrowUp} />
									</IconButton>
									<IconButton style={{ padding: 5 }} onClick={() => this.changeOrder(data.id, 'down')} >
										<ArrowDownIcon style={styles.arrowDown} />
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
                  Do you really want to delete the sitting? 
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
	sittings: state.data.sittings,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
	fetchAll: bindActionCreators(fetchAll, dispatch),
	deleteSitting: bindActionCreators(destroyItem, dispatch),
	updateSitting: bindActionCreators(updateItem, dispatch),
});

SittingsContainer.propTypes = {
	sittings: PropTypes.array,
	fetchAll: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(SittingsContainer);
