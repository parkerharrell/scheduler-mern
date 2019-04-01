import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const renderSelect = ({input, label, data, meta: {touched, error, invalid} }) => (
	<TextField
		select
		label={label}
		margin="normal"
		error={touched && invalid}
		helperText={touched && error}
		fullWidth={true}
		{...input}
	>
		{data.map((option, index) => (
			<MenuItem key={index} value={option.value}>
				{option.label}
			</MenuItem>
		))}
	</TextField>
);

renderSelect.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	meta: PropTypes.object,
	data: PropTypes.array,
};

export default renderSelect;
