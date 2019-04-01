import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import {Field, reduxForm} from 'redux-form';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import renderTextarea from '../../components/common/form/renderTextarea';
import renderText from '../../components/common/form/renderText';

import { fetchAll as fetchAllCustomers } from '../../actions/userAction';
import { fetchAll as fetchAllAdmins } from '../../actions/adminAction';
import { storeItem as sendMessage } from '../../actions/emailAction';

class Newsletter extends Component {
  state = {
    isCustomer: 'false',
  }

  onSubmit = (formProps) => {
    const { createCustomer } = this.props;
    const { subject, message } = formProps;
    const { isCustomer } = this.state;
    sendMessage(isCustomer === 'true' ? 'admins' : 'customers', subject, message);
  }

  handleRadiogroup = event => {
    this.setState({ isCustomer: event.target.value });
  };

  handleRadiogroupClick (e) {
    e.stopPropagation();
  }


  render() {
    const { customers, admins, handleSubmit } = this.props;
    const { isCustomer } = this.state;
    
    return (
      <form method="post" onSubmit={handleSubmit(this.onSubmit)} >
        <Grid
          container
          alignItems="center"
          spacing={24}
          style={{
            maxWidth: 900,
          }}
        >
          <Grid item md={12} xs={12}>
            <h2>Newsletter</h2>
          </Grid>
          <Grid item md={12} xs={12}>
            <RadioGroup
              value={isCustomer}
              onChange={this.handleRadiogroup}
              onClick={this.handleRadiogroupClick}
              style={{
                display: 'inline-block',
              }}
            >
              <FormControlLabel
                value={'true'}
                control={<Radio color="primary" />}
                label="Customers"
              />
              <FormControlLabel
                value={'false'}
                control={<Radio color="primary" />}
                label="Admins"
              />
            </RadioGroup>
          </Grid>
          <Grid item md={12} xs={12}>
            <Field
              type="text"
              name="subject"
              component={renderText}
              label="Subject *"
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Field
              name="message"
              component={renderTextarea}
              label="Message *"
            />
          </Grid>
          <div style={{padding: '50px 0'}}>
            <Button type="submit" variant="contained" color="primary">Send Email</Button>
          </div>
        </Grid>
      </form>
    );
  }
}

const validateNewsletter = values => {
	const errors = {};
	const requiredFields = [
    'message',
    'subject',
  ];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '' + field + ' field is required';
    }
  });
	return errors;
};


const mapStateToProps = state => ({
	customers: state.data.users,
  admins: state.data.admins,
});

const mapDispatchToProps = dispatch => ({
  getCustomers: bindActionCreators(fetchAllCustomers, dispatch),
  getAdmins: bindActionCreators(fetchAllAdmins, dispatch),
  sendMessage: bindActionCreators(sendMessage, dispatch),
});

Newsletter.propTypes = {
  sendMessage: PropTypes.func,
  customers: PropTypes.array,
  admins: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'NewsletterForm',
  validate: validateNewsletter,
})(Newsletter));

