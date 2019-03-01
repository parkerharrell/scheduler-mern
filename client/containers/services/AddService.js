import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { cloneDeep } from 'lodash';
import Button from '@material-ui/core/Button';
import {Field, reduxForm} from 'redux-form'
import * as moment from 'moment';

import { storeItem } from '../../actions/serviceAction';
import renderText from '../../components/common/form/renderText';
import renderTextarea from '../../components/common/form/renderTextarea';
import renderDate from '../../components/common/form/renderDate';

class AddService extends Component {

    onSubmit = (formProps) => {
        const { createService } = this.props;
        const result = cloneDeep(formProps);
        result.min_from_now = (moment(result.startdate).utc().valueOf() + 1000) / 1000;
        result.max_from_now = (moment(result.enddate).utc().valueOf() + 1000) / 1000;
        delete result.enddate;
        delete result.startdate;
        createService(result);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form method="post" onSubmit={handleSubmit(this.onSubmit)} >
                <Link to='/admin/services'><span>services</span></Link> / <span>new service</span>
                <br/><br/>
                <Grid
                    container
                    alignItems="center"
                    spacing={24}
                >
                    <Grid item xs={6}>
                        <h1>Add Service</h1>
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
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Field
                            name="startdate"
                            label="Start Date *"
                            type="date"
                            component={renderDate}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Field
                            name="enddate"
                            label="End Date *"
                            component={renderDate}
                            type="date"
                        />
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={3}>
                        <Field
                            type="text"
                            name="price"
                            component={renderText}
                            label="Price *"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Field
                            type="text"
                            name="recur_total"
                            component={renderText}
                            label="Recurring Total"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Field
                            type="text"
                            name="recur_options"
                            component={renderText}
                            label="Recurring Options"
                        />
                    </Grid>
                    <Grid item xs={3}>
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


const validateAddService = values => {
    const errors = {};
    const requiredFields = [
        'title',
        'description',
        'startdate',
        'enddate',
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
    createService: bindActionCreators(storeItem, dispatch),
});

export default connect(null, mapDispatchToProps)(reduxForm({
    form: 'AddServiceForm',
    validate: validateAddService
})(AddService));
