/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {connect} from 'react-redux';

import Locations from '../locations';
import Services from '../services';
import ScheduleCalendar from '../scheduleCalendar';
import ConfirmPage from '../confirm';
import NoRedirectLoginContainer from '../../containers/auth/NoRedirectLoginContainer';
import NoRedirectSignUpContainer from '../../containers/auth/NoRedirectSignUpContainer';


function TabContainer(props) {
	return (
		<div style={{ padding: 8 * 3 }}>
			{props.children}
		</div>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

const styles = theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		maxWidth: 1400,
		margin: 'auto',
		backgroundColor: theme.palette.background.paper,
	},
	tabcontainer: {
		padding: 0,
		[theme.breakpoints.down('xs')]: {
			paddingLeft: 'calc(50% - 180px + 10px)',
		}
	},
	tab: {
		[theme.breakpoints.down('xs')]: {
			fontSize: 11,
		},
	},
	activetab: {
		fontWeight: 'bold',
	}
});

class Home extends React.Component {
  state = {
		value: 0,
		showSignUp: true,
	};

  handleChange = (event, value) => {
  	this.setState({ value });
  };

  goToNextStep = (value) => {
  	this.setState({ value: value + 1});
	};
	
	onSignUp = () => {
		this.setState({ showSignUp: true });
	}

	onLogin = () => {
		this.setState({ showSignUp: false });
	}

	render() {
  	const { classes } = this.props;
  	const { value, showSignUp } = this.state;
		const { isAuthenticated } = this.props;

  	return (
  		<div className={classes.root}>
  			<Tabs
  				value={value}
  				onChange={this.handleChange}
  				indicatorColor="primary"
  				textColor="primary"
  				variant="scrollable"
					scrollButtons="auto"
					className={classes.tabcontainer}
  			>
  				<Tab classes={{ selected: classes.activetab, root: classes.tab }} label="Locations"  />
  				<Tab classes={{ selected: classes.activetab, root: classes.tab }} label="Services" disabled={value < 2} />
  				<Tab classes={{ selected: classes.activetab, root: classes.tab }} label="Date & Time"  disabled={value < 3}/>
  				<Tab classes={{ selected: classes.activetab, root: classes.tab }} label="Review"  disabled={value < 4}/>
  			</Tabs>
  			{value === 0 &&
          <TabContainer>
          	<Locations goToNextStep={() => this.goToNextStep(value)} />
          </TabContainer>
  			}
  			{value === 1 && 
          <TabContainer>
          	<Services goToNextStep={(step) => this.goToNextStep(value + step)} />
          </TabContainer>
  			}
  			{value === 2 &&
          <TabContainer>
          	<ScheduleCalendar goToNextStep={() => this.goToNextStep(value)} />
          </TabContainer>}
  			{value === 3 &&
					<TabContainer>
						{ isAuthenticated &&
							<ConfirmPage />
						}
						{ !isAuthenticated && !showSignUp &&
							<NoRedirectLoginContainer onSignup={this.onSignUp} />
						}
						{ !isAuthenticated && showSignUp &&
							<NoRedirectSignUpContainer onLogin={this.onLogin} hideLoginDetails />
						}
					</TabContainer>
			  }
  		</div>
  	);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});


export default withStyles(styles)(connect(mapStateToProps, null)(Home));
