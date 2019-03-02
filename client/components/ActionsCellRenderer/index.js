import React, {Component} from 'react';

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