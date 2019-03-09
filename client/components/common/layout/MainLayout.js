import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Import custom components
import Header from '../header/Header';
import MiniDrawer from '../drawer/MiniDrawer';

const styles = theme => ({
	root: {
		width: '100%',
		height: 'auto',
		zIndex: 1,
		overflow: 'hidden',
	},
	appFrame: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: '100%',
	},
	content: {
		width: 'calc(100% - 250px)',
		flexGrow: 1,
		padding: 24,
		height: 'calc(100% - 56px)',
		marginTop: 56,
		boxSizing: 'border-box',
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100% - 64px)',
			marginTop: 64,
		},
	},
	collapsed: {
		width: 'calc(100% - 60px)',
	}
});

class MainLayout extends Component {

	constructor(props) {
		super(props);
		this.state = {open: true};
	}

	handleToggle = () => this.setState({open: !this.state.open});

	render() {
		let {open} = this.state;
		const classes = this.props.classes;

		return (
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<Header navDrawerOpen={open} handleToggleDrawer={this.handleToggle}/>
					<MiniDrawer navDrawerOpen={open}/>
					<main className={`${classes.content} ${open ? '' : classes.collapsed}`}>
						{this.props.children}
					</main>
				</div>
			</div>
		);
	}

}

MainLayout.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.element
};

export default withStyles(styles)(MainLayout);
