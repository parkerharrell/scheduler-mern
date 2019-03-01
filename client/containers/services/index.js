import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { isUndefined } from 'lodash';

import { fetchAll } from '../../actions/serviceAction';

class ServicesContainer extends Component {
    state = {
        columnDefs: [
            {headerName: "Id", field: "id"},
            {headerName: "Title", field: "title"},
            {headerName: "Description", field: "description"},
            {headerName: "Min from Now", field: "min_from_now"},
            {headerName: "Max from Now", field: "max_from_now"},
            {headerName: "Price", field: "price"},            
            {headerName: "Recur Total", field: "recur_total"},
            {headerName: "Recur Options", field: "recur_options"},
        ]
    }

    componentDidMount() {
        const { fetchAll } = this.props;
        fetchAll();
    }

    getRowData = () => {
        const columns = Object.keys(services[0]);
    }

    render() {
        const { services } = this.props;
        let rowData = [];
        if (!isUndefined(services)) {
            rowData = services;
        }

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
                        <Link to='/admin/services/new'><button>Add Service</button></Link>
                    </Grid>
                </Grid>
                <div
                    className="ag-theme-balham"
                >
                    <AgGridReact
                        enableSorting={true}
                        pagination={true}
                        columnDefs={this.state.columnDefs}
                        rowData={rowData}>
                    </AgGridReact>
                </div>
            </div>
        )
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesContainer)