import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import SittingsIcon from '@material-ui/icons/DashboardOutlined';
import ServicesIcon from '@material-ui/icons/ClassOutlined';
import LocationOnIcon from '@material-ui/icons/PlaceOutlined';
import ManagerIcon from '@material-ui/icons/AccountBoxOutlined';
import BookIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import styled from 'styled-components';

const CustomListItem = styled(ListItem)`
    padding: 16px !important;
`;

const drawerWidth = 250;

const styles = theme => ({
	drawerPaper: {
		position: 'relative',
		height: '100%',
		minHeight: '100vh',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		width: 60,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	drawerInner: {
		// Make the items inside not wrap when transitioning:
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		height: 56,
		[theme.breakpoints.up('sm')]: {
			height: 64,
		},
	},
	avatar: {
		margin: 10,
	},
	bigAvatar: {
		width: 60,
		height: 60,
	},
});

const MiniDrawer = (props) => {

	let {navDrawerOpen} = props;
	const classes = props.classes;

	return (
		<Drawer
			variant="permanent"
			classes={{
				paper: classNames(classes.drawerPaper, !navDrawerOpen && classes.drawerPaperClose),
			}}
			open={navDrawerOpen}
		>
			<div className={classes.drawerHeader}/>
			<Divider />

			<List>
				<Link to={'/admin/appointments'}>
					<CustomListItem button>
						<ListItemIcon>
							<BookIcon />
						</ListItemIcon>
						<ListItemText primary="Appointments"/>
					</CustomListItem>
				</Link>
				<Link to={'/admin/customers'}>
					<CustomListItem button>
						<ListItemIcon>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText primary="Customers"/>
					</CustomListItem>
				</Link>
				<Link to={'/admin/sittings'}>
					<CustomListItem button>
						<ListItemIcon>
							<SittingsIcon />
						</ListItemIcon>
						<ListItemText primary="Sittings"/>
					</CustomListItem>
				</Link>
				<Link to={'/admin/services'}>
					<CustomListItem button>
						<ListItemIcon>
							<ServicesIcon />
						</ListItemIcon>
						<ListItemText primary="Services"/>
					</CustomListItem>
				</Link>
				<Link to={'/admin/locations'}>
					<CustomListItem button>
						<ListItemIcon>
							<LocationOnIcon />
						</ListItemIcon>
						<ListItemText primary="Locations"/>
					</CustomListItem>
				</Link>
				<Link to={'/admin/administrators'}>
					<CustomListItem button>
						<ListItemIcon>
							<ManagerIcon />
						</ListItemIcon>
						<ListItemText primary="Administrators"/>
					</CustomListItem>
				</Link>
				<Link to={'/admin/settings'}>
					<CustomListItem button>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary="Settings"/>
					</CustomListItem>
				</Link>
			</List>
		</Drawer>
	);
};

MiniDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	navDrawerOpen: PropTypes.bool
};

export default withStyles(styles)(MiniDrawer);
