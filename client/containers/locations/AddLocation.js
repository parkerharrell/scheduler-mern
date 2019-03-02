import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { cloneDeep } from 'lodash';
import Button from '@material-ui/core/Button';
import {Field, reduxForm} from 'redux-form'
import * as moment from 'moment';

import { storeItem } from '../../actions/locationAction';
import renderText from '../../components/common/form/renderText';
import renderTextarea from '../../components/common/form/renderTextarea';
import renderDate from '../../components/common/form/renderDate';

class AddLocation extends Component {

    onSubmit = (formProps) => {
        const { createLocation } = this.props;
        const result = cloneDeep(formProps);
        createLocation(result);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form method="post" onSubmit={handleSubmit(this.onSubmit)} >
                <Link to='/admin/locations'><span>locations</span></Link> / <span>new location</span>
                <br/><br/>
                <Grid
                    container
                    alignItems="center"
                    spacing={24}
                >
                    <Grid item xs={6}>
                        <h1>Add Location</h1>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <br/>
                    <Grid item xs={6}>
                        <Field
                            type="text"
                            name="title"
                            component={renderText}
                            label="title *"
                        />
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="description"
                            component={renderTextarea}
                            label="Description *"
                            placeholder="[ Street Address ]
[ City, State, Zipcode ]
[ Phone Number ]
[ Contact Email ]"
                        />
                    </Grid>
                </Grid>
                <br/><br/>
                <Grid container justify="center">
                    <Button type="submit" variant="raised" color="primary">Create</Button>
                </Grid>
            </form>
        )
    }
}


const validateAddLocation = values => {
    const errors = {};
    const requiredFields = [
        'title',
        'description',
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '' + field + ' field is required';
        }
    });

    return errors
};

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    createLocation: bindActionCreators(storeItem, dispatch),
});

export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'AddLocationForm',
    validate: validateAddLocation
})(AddLocation));
