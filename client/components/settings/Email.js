import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {Field, reduxForm} from 'redux-form';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import renderText from '../common/form/renderText';
import renderCheckbox from '../common/form/renderCheckbox';
import renderTextarea from '../common/form/renderTextarea';

const styles = {
	btnDiv: {
    textAlign: 'left',
    marginTop: 20,
    paddingLeft: 30,
	},
	btn: {
		marginTop: 21,
  },
  container: {
    paddingTop: 20,
    paddingLeft: 30,
  }
};

const EmailSettingForm = props => {
  const { handleSubmit, onSubmit, classes } = props;
  return (
    <>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={24} className={classes.container}>
          <br/><br/>
          <Grid item xs={6}>
            <Field
              type="text"
              name="sender_email"
              component={renderText}
              label="Sender Email *"
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Field
              type="text"
              name="sender_name"
              component={renderText}
              label="Sender Name *"
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={12}>
            <Field
              type="checkbox"
              name="email_test_mode"
              component={renderCheckbox}
              label="Email Test Mode: "
            /><br/>
            <em style={{ color: '#898989' }}>If set, email messages will be printed on screen rather than sent</em>
          </Grid>
          <Grid item xs={12}>
            <Field
              type="checkbox"
              name="email_disable"
              component={renderCheckbox}
              label="Email Disable: "
            />
          </Grid>
          <br/><br/>
          <Grid item xs={6}>
            <Field
              name="emails_header"
              component={renderTextarea}
              label="Header for All Emails"
            />
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <Field
              name="emails_footer"
              component={renderTextarea}
              label="Footer for All Emails"
            />
          </Grid>
          <Grid item xs={6} />
        </Grid>
        <div className={classes.btnDiv}>
          <Button className={classes.btn} type="submit" variant="contained" color="primary">Save</Button>
        </div>
      </form>
    </>
  );
}

const validateForm = values => {
	const errors = {};

	const requiredFields = [
		'sender_email',
		'sender_name',
	];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '(The ' + field + ' field is required.)';
		}
	});

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = '(Invalid email address.)';
	}
	
	return errors;
};


EmailSettingForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
};

export default reduxForm({
	form: 'EmailSettingForm', // a unique identifier for this form
	validate: validateForm, // ←Callback function for client-side validation
  enableReinitialize : true,
})(withStyles(styles)(EmailSettingForm));