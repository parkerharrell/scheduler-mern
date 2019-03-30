import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {withStyles} from '@material-ui/core/styles';
import {Card, CardHeader, CardContent} from '@material-ui/core';
import Button from '@material-ui/core/Button';

// Import custom components
import renderText from '../common/form/renderText';
import CustomizedSnackbar from '../common/snakebar/CustomizedSnackbar';

const styles = theme => ({
	root: {
		minWidth: 320,
		maxWidth: 400,
		height: 'auto',
		position: 'absolute',
		top: 200,
		left: 0,
		right: 0,
		margin: 'auto',
	},
	card: {
		padding: 20,
		overflow: 'auto',
		boxShadow: 'none',
		[theme.breakpoints.down('sm')]: {
			padding: 5,
		},
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
});

const LoginForm = props => {

	const {handleSubmit, onSubmit, classes, errorMessage, onSignup} = props;

	return (
		<div className={classes.root} >
			<Card className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title="Login"
				/>
				{errorMessage  &&
          <CustomizedSnackbar
          	variant="error"
          	className={classes.margin}
          	message={ errorMessage }
          />
				}
				<CardContent>
					<form method="post" onSubmit={handleSubmit(onSubmit)}>
						<Field
							type="text"
							name="username"
							component={renderText}
							label="Username"
						/>
						<br />
						<Field
							type="password"
							name="password"
							component={renderText}
							label="Password"

						/>
						<br />
						<div className={classes.btnDiv}>
							<Button className={classes.btn} type="submit" variant="contained" color="primary">Login</Button>
							{onSignup !== undefined &&
								<p>Don&rsquo;t have an account? <a href="#" onClick={onSignup}>Create one</a>.</p>
							}
							{onSignup === undefined &&
								<p>Don&rsquo;t have an account? <Link to={'/signup'}>Create one</Link>.</p>
							}
						</div>
					</form>
				</CardContent>

			</Card>
		</div>
	);
};

const validateLogin = values => {
	const errors = {};

	const requiredFields = [
		'username',
		'password'
	];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '(The ' + field + ' field is required.)';
		}
	});

	return errors;
};

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func,
	errorMessage: PropTypes.string,
	onSignup: PropTypes.func,
};

export default reduxForm({
	form: 'LoginForm', // a unique identifier for this form
	validate: validateLogin // ←Callback function for client-side validation
})(withStyles(styles)(LoginForm));
