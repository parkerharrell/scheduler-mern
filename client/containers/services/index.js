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

class ActionsCellRenderer extends Component {
    render() {
        const { data } = this.props;
        return (
            <React.Fragment>
                <Link to={`/admin/services/${data.id}`}>Edit</Link>&nbsp;&nbsp;
            </React.Fragment>
        );
    }
}

const columnDefs = [
    {
        headerName: "",
        field: "actions",
        width: 50,
        cellRendererFramework: ActionsCellRenderer,
    },
    {headerName: "Id", field: "id",  width: 100},
    {headerName: "Title", field: "title"},
    {headerName: "Description", field: "description"},
    {headerName: "Start Date", field: "startdate"},
    {headerName: "Expire Date", field: "enddate"},
    {headerName: "Price", field: "price"},            
    {headerName: "Recur Total", field: "recur_total"},
    {headerName: "Recur Options", field: "recur_options"},
];


class ServicesContainer extends Component {

    componentDidMount() {
        const { fetchAll } = this.props;
        fetchAll();
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
                        resizable={true}
                        columnDefs={columnDefs}
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