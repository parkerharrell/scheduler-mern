import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {cyan, pink, purple, orange} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import {AddShoppingCart, ThumbUp, Assessment, Face} from '@material-ui/icons';

import SummaryBox from './SummaryBox';

const Dashboard = props => {

    const classes = props.classes;

    return (
        <div>
            <h2 style={{paddingBottom: '15px'}}>Dashboard</h2>

            <Grid container spacing={24}>
                <Grid item xs>
                    <SummaryBox Icon={AddShoppingCart}
                                color={pink[600]}
                                title="Total Services"
                                value="1500k"
                    />
                </Grid>

               <Grid item xs>
                    <SummaryBox Icon={ThumbUp}
                                color={cyan[600]}
                                title="Locations"
                                value="4231"
                    />
                </Grid>

               <Grid item xs>
                    <SummaryBox Icon={Assessment}
                                color={purple[600]}
                                title="Appointments"
                                value="460"
                    />
                </Grid>

                <Grid item xs>
                    <SummaryBox Icon={Face}
                                color={orange[600]}
                                title="Users"
                                value="248"
                    />
                </Grid>

            </Grid>

        </div>
    )
};

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Dashboard