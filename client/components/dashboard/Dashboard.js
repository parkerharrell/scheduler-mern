import React, {Component} from 'react';
import PropTypes from 'prop-types';

const Dashboard = props => {

    return (
        <div>
            <h2 style={{paddingBottom: '15px'}}>Dashboard</h2>
        </div>
    )
};

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Dashboard