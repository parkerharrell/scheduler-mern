import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const renderDate = ({input, label, type, meta: {touched, error, invalid}}) => (

    <TextField
        type="date"
        label={label}
        error={touched && invalid}
        helperText={touched && error}
        margin="normal"
        fullWidth={true}
        InputLabelProps={{
            shrink: true,
        }}
        {...input}
    />

);

renderDate.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.object
};

export default renderDate;