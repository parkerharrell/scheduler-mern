import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const renderPassword = ({ input, label, showPassword, handleClickShowPassword, meta: {touched, error, invalid}}) => (
  <>
    <TextField
      id="adornment-password"
      type={showPassword ? 'text' : 'password'}
      {...input}
      error={touched && invalid}
      label={label}
      fullWidth={true}
      helperText={touched && error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  </>
);


export default renderPassword;
