import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const renderText = ({input, label, fullWidth, type, className, meta: {touched, error, invalid}}) => (

	<TextField
		type={type}
		label={label}
		error={touched && invalid}
		helperText={touched && error}
		margin="normal"
		className={className}
		fullWidth={fullWidth || true}
		{...input}
	/>

);

renderText.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	meta: PropTypes.object,
	type: PropTypes.string,
	fullWidth: PropTypes.bool,
	className: PropTypes.object,
};

export default renderText;
