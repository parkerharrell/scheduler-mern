import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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

ActionsCellRenderer.propTypes = {
	data: PropTypes.object,
};

export default ActionsCellRenderer;
