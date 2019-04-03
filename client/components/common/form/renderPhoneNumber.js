import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      format="###-###-####"
    />
  );
}

const renderPhoneNumber = ({input, label, className, meta: {touched, error, invalid}}) => (
  <TextField
    className={className}
    label={label}
		error={touched && invalid}
		helperText={touched && error}
    margin="normal"
    fullWidth={true}
    InputProps={{
      inputComponent: NumberFormatCustom,
    }}
    { ...input }
  />
);

renderPhoneNumber.propTypes = {
	input: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	meta: PropTypes.object,
	type: PropTypes.string,
	fullWidth: PropTypes.bool,
	className: PropTypes.object,
};

export default renderPhoneNumber;
