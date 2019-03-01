import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form'
import {withStyles} from '@material-ui/core/styles';
import {Card, CardHeader, CardContent} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import * as moment from 'moment-timezone';
import Grid from '@material-ui/core/Grid';

// Import custom components
import renderText from '../common/form/renderText';
import renderCheckbox from '../common/form/renderCheckbox';
import renderTextarea from '../common/form/renderTextarea';

const styles = {
    root: {
        minWidth: 320,
        maxWidth: 800,
        height: 'auto',
        position: 'absolute',
        top: '15%',
        left: 0,
        right: 0,
        margin: 'auto'
    },
    card: {
        padding: 20,
        overflow: 'auto'
    },
    cardHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    btnDiv: {
        textAlign: 'center'
    },
    btn: {
        marginTop: 21,
    }
};

const getTimeZoneDetail = (tz) => {
	const dtobj = moment().tz(tz);
    const offset = moment(dtobj).utcOffset();
    let offsetString = 'GMT';
    offsetString += (offset >= 0) ? '+' : '';
    offsetString = offsetString + (offset/60);
    return {
        label: tz + ' (' + offsetString + ')',
        value: tz
    };
}

const SignUpForm = props => {

    const {handleSubmit, onSubmit, classes} = props;
    const timezoneList = moment.tz.names();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHeader}
                    title="Register"
                />
                <CardContent>
                    <form method="post" onSubmit={handleSubmit(onSubmit)}>
                        
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Field
                                    type="text"
                                    name="email"
                                    component={renderText}
                                    label="Email *"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    type="text"
                                    name="first_name"
                                    component={renderText}
                                    label="First Name *"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    type="text"
                                    name="last_name"
                                    component={renderText}
                                    label="Last Name *"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    type="text"
                                    name="contact_phone"
                                    component={renderText}
                                    label="Contact Phone *"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    type="text"
                                    name="alternate_phone"
                                    component={renderText}
                                    label="Alternate Phone"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    type="text"
                                    name="street_address"
                                    component={renderText}
                                    label="Street Address"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    type="text"
                                    name="address_2"
                                    component={renderText}
                                    label="Address 2 (Apt/Suite)"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    type="text"
                                    name="city"
                                    component={renderText}
                                    label="City"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    type="text"
                                    name="state"
                                    component={renderText}
                                    label="State"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    type="text"
                                    name="zipcode"
                                    component={renderText}
                                    label="Zipcode *"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    type="checkbox"
                                    name="ex_customer"
                                    component={renderCheckbox}
                                    label="Existing Customer"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    type="text"
                                    name="preseller_initials"
                                    component={renderText}
                                    label="Preseller Initials *"
                                />
                                <i>If this doesn't apply, just enter in "N/A"</i>
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="notes"
                                    component={renderTextarea}
                                    label="Notes"
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <br/><br/><br/>
                                <h1 style={{fontSize: '1.3em'}}>Login Details</h1>
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    type="text"
                                    name="username"
                                    component={renderText}
                                    label="Desired Username *"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    type="password"
                                    name="password"
                                    component={renderText}
                                    label="Password *"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    type="password"
                                    name="confirm_password"
                                    component={renderText}
                                    label="Confirm Password *"
                                />
                            </Grid>   
                        </Grid>
                        
                        <div className={classes.btnDiv}>
                            <Button className={classes.btn} type="submit" variant="raised" color="primary">Create New
                                Account</Button>
                            <p>Already have an account? <Link to={'/'}>Login</Link>.</p>
                        </div>
                    </form>
                </CardContent>

            </Card>
        </div>
    )
};

const validateSignUp = values => {
    const errors = {};

    const requiredFields = [
        'first_name',
        'last_name',
        'email',
        'contact_phone',
        'zipcode',
        'preseller_initials',
        'password',
        'confirm_password',
        'username',
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '(The ' + field + ' field is required.)';
        }
        if (values['password'] !== values['confirm_password']) {
            errors['password'] = '';
            errors['confirm_password'] = '(Password fields does not match.)';
        }
    });

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = '(Invalid email address.)';
    }
    return errors
};

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default reduxForm({
    form: 'SignUpForm', // a unique identifier for this form
    validate: validateSignUp // ←Callback function for client-side validation
})(withStyles(styles)(SignUpForm))