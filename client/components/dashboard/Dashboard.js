import React from 'react';
import PropTypes from 'prop-types';
import {cyan, pink, purple, orange} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import {AddShoppingCart, ThumbUp, Assessment, Face} from '@material-ui/icons';

import SummaryBox from './SummaryBox';

const Dashboard = () => {

	return (
		<div>
			<h2 style={{paddingBottom: '15px'}}>Dashboard</h2>

			<Grid container spacing={24}>
				<Grid item xs>
					<SummaryBox Icon={AddShoppingCart}
						color={pink[600]}
						title="Services"
						value="10"
					/>
				</Grid>

				<Grid item xs>
					<SummaryBox Icon={ThumbUp}
						color={cyan[600]}
						title="Locations"
						value="20"
					/>
				</Grid>

				<Grid item xs>
					<SummaryBox Icon={Assessment}
						color={purple[600]}
						title="Appointments"
						value="0"
					/>
				</Grid>

				<Grid item xs>
					<SummaryBox Icon={Face}
						color={orange[600]}
						title="Customers"
						value="248"
					/>
				</Grid>

			</Grid>

		</div>
	);
};

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Dashboard;
