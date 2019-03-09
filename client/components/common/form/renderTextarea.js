import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const renderText = ({input, label, type, placeholder, meta: {touched, error, invalid}}) => (

	<TextField
		type={type}
		label={label}
		error={touched && invalid}
		helperText={touched && error}
		margin="normal"
		fullWidth={true}
		multiline={true}
		rows={4}
		rowsMax={8}
		placeholder={placeholder}
		InputLabelProps={{
			shrink: true
		}}
		{...input}
	/>
);

renderText.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	meta: PropTypes.object,
	placeholder: PropTypes.string,
	type: PropTypes.string,
};

export default renderText;
