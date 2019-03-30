import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import EmailSettingForm from '../../components/settings/Email';
import { updateItem, fetchAll } from '../../actions/settingAction';


function TabContainer(props) {
	return (
		<div style={styles.mainPadding}>
			{props.children}
		</div>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

const styles = {
	tab: {
		padding: 0,
    minWidth: 0,
    fontSize: '0.7em',
	},
	mainPadding: {
		padding: '0 48px',
	}
}

const classOptions = [
	{ value: 'emails', label: 'Emails' },
	{ value: 'date_time', label: 'Date and Time' },
	{ value: 'appointment_flow', label: 'Appointment Flow' },
	{ value: 'notifications', label: 'Notifications' },
	{ value: 'terminology', label: 'Terminology' },
	{ value: 'reminders', label: 'Reminders' },
	{ value: 'currency', label: 'Currency' },
	{ value: 'payment_gateways', label: 'Payment Gateways' },
	{ value: 'languages', label: 'Languages' },
	{ value: 'themes', label: 'Themes' },
	{ value: 'plugins', label: 'Plugins' },
	{ value: 'misc', label: 'Misc' },
	{ value: 'info', label: 'Info' },
	{ value: 'backUp', label: 'BackUp' },
];

class SettingsContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: 0,
		}
		const { getSettings } = this.props;
		getSettings({ email: true });
	}

  handleChange = (event, value) => {
		this.setState({ value });
		const { getSettings } = this.props;
		getSettings({ class: classOptions[value] });
	};

	onEmailSettingSubmit = (formProps) => {
		const { updateSetting } = this.props;
		updateSetting( classOptions[0].value, formProps);
	}

	render() {
		const { value } = this.state;
		const { currentSetting } = this.props;
		return (
			<div style={{ margin: '0 -24px'}}>
				<h1 style={styles.mainPadding}>Settings</h1>
				<div>
					<Tabs
						value={value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						style={styles.tabs}
					>
						{classOptions.map(classOption =>
							<Tab label={classOption.label} style={styles.tab} key={classOption.value}/>
						)}
					</Tabs>
					<TabContainer>
					
					{value === 0 &&
						<>
							<EmailSettingForm onSubmit={this.onEmailSettingSubmit} initialValues={currentSetting.email}/>
						</>
					}
					</TabContainer>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentSetting: state.data.settings,
});


const mapDispatchToProps = dispatch => ({
	updateSetting: bindActionCreators(updateItem, dispatch),
	getSettings: bindActionCreators(fetchAll, dispatch),
});

SettingsContainer.propTypes = {
	currentSetting: PropTypes.object,
	getSettings: PropTypes.func,
	updateSetting: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
