import React from 'react';
import TimezonePicker from 'react-timezone';
import InputLabel from '@material-ui/core/InputLabel';

export default ({input, className, label}) => (
  <>
    <InputLabel
      htmlFor="custom-timezone-standard-input"
      style={{
        fontSize: 12,
      }}
    >
      {label}
    </InputLabel>
    <TimezonePicker
      id='custom-timezone-standard-input'
      value="Asia/Yerevan"
      className={className}
      inputProps={{
        placeholder: 'Select Timezone...',
        name: 'timezone',
      }}
      {...input}
    />
  </>
);