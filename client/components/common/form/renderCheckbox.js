import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const renderCheckbox = ({input, labelPlacement, label, meta: {touched, error, invalid}}) => (
	<FormControlLabel
		control={
			<Checkbox
				margin="normal"
				{...input}
			/>
		} 
		label={label}
		labelPlacement={labelPlacement || 'start'}
		style={{ marginLeft: labelPlacement === 'start' ? 0 : -12 }}
	/>
);

renderCheckbox.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	meta: PropTypes.object
};

export default renderCheckbox;