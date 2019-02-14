import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form'
import {withStyles} from '@material-ui/core/styles';
import {Card, CardHeader, CardContent} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import * as moment from 'moment-timezone';

// Import custom components
import renderText from '../common/form/renderText';
import renderSelect from '../common/form/renderSelect';

const styles = {
    root: {
        minWidth: 320,
        maxWidth: 400,
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
        textAlign: 'center'
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
    const timezones = timezoneList.map(tz => getTimeZoneDetail(tz));

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                    className={classes.cardHeader}
                    title="Sign Up"
                />
                <CardContent>
                    <form method="post" onSubmit={handleSubmit(onSubmit)}>
                        <Field
                            type="text"
                            name="email"
                            component={renderText}
                            label="Email *"
                        />
                        <br/>
                        <Field
                            type="text"
                            name="first_name"
                            component={renderText}
                            label="First Name *"

                        />
                        <br />
                        <Field
                            type="text"
                            name="last_name"
                            component={renderText}
                            label="Last Name *"

                        />
                        <br />
                        {/* Start My Timezone */}
                        <Field
                            name="timezone"
                            label="My Timezone"
                            component={renderSelect}
                            data={timezones}
                        >
                        </Field>
                        <br /><br /><br />
                        {/* End My Timezone */}
                        <Field
                            type="text"
                            name="username"
                            component={renderText}
                            label="Username *"
                        />
                        <br />
                        <Field
                            type="password"
                            name="password"
                            component={renderText}
                            label="Password *"

                        />
                        <br />
                        <Field
                            type="password"
                            name="confirm_password"
                            component={renderText}
                            label="Confirm Password *"
                        />
                        <br />
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