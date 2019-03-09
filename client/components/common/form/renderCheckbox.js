import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const renderCheckbox = ({input, label, meta: {touched, error, invalid}}) => (
	<FormControlLabel
		control={
			<Checkbox
				error={touched && invalid}
				helperText={touched && error}
				margin="normal"
				fullWidth={true}
				{...input}
			/>
		} 
		label={label}
		labelPlacement="start"
		style={{ marginLeft: 0 }}
	/>
);

renderCheckbox.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	meta: PropTypes.object
};

export default renderCheckbox;