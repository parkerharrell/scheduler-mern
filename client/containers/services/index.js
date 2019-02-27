import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


class ServicesContainer extends Component {
    state = {
        columnDefs: [
            {headerName: "No", field: "id"},
            {headerName: "Title", field: "title"},
            {headerName: "Description", field: "description"},
            {headerName: "Order", field: "show_order"}

        ],
        rowData: [
            {id: "1", title: "Celica", description: 35000, show_order: 1 },
            {id: "2", title: "Selica", description: 15000, show_order: 3 },
            {id: "3", title: "TCelica", description: 225000, show_order: 2 }
        ]
    }

    render() {
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
                        <button>Add Service</button>
                    </Grid>
                </Grid>
                <div
                    className="ag-theme-balham"
                >
                    <AgGridReact
                        enableFilter={true}
                        enableSorting={true}
                        pagination={true}
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                </div>
            </div>
        )
    }

}

export default ServicesContainer