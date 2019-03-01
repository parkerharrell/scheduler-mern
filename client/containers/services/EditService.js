import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { cloneDeep } from 'lodash';
import Button from '@material-ui/core/Button';
import {Field, reduxForm} from 'redux-form';
import { isEmpty } from 'lodash';
import * as moment from 'moment';

import { updateItem, fetchById, destroyItem } from '../../actions/serviceAction';
import renderText from '../../components/common/form/renderText';
import renderTextarea from '../../components/common/form/renderTextarea';
import renderDate from '../../components/common/form/renderDate';


class EditService extends Component {

    constructor(props) {
        super(props);
        const { match, getServiceInfo } = props;
        const serviceId = match.params.id;
        this.state = {
            serviceId,
        }
        getServiceInfo(serviceId);
    }

    onSubmit = (formProps) => {
        const { updateService } = this.props;
        const { serviceId } = this.state;
        const result = cloneDeep(formProps);
        result.min_from_now = (moment(result.startdate).utc().valueOf() + 1000) / 1000;
        result.max_from_now = (moment(result.enddate).utc().valueOf() + 1000) / 1000;
        delete result.enddate;
        delete result.startdate;
        updateService(serviceId, result);
    }

    onDelete = () => {
        const { deleteService } = this.props;
        const { serviceId } = this.state;
        deleteService(serviceId);
        this.props.history.push('/admin/services');
    }

    render() {
        const { handleSubmit, currentService } = this.props;
        if (isEmpty(currentService)) {
            return (
                <div>
                    Loading ...      
                </div>
            );
        }
        return (
            <form key={currentService} method="post" onSubmit={handleSubmit(this.onSubmit)} >
                <Link to='/admin/services'><span>services</span></Link> / <span>{currentService.id}</span>
                <br/><br/>
                <Grid
                    container
                    alignItems="center"
                    spacing={24}
                >
                    <Grid item xs={6}>
                        <h1>Edit</h1>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                        <Button variant="raised" color="secondary" onClick={this.onDelete}>Delete</Button>
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
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3} style={{ textAlign: 'center' }}>
                        <Button type="submit" variant="raised" color="primary">Update</Button>
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: 'center' }}>
                        <Link to="/admin/services"><Button variant="raised" color="primary">Cancel</Button></Link>
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
            </form>
        )
    }
}


const validateEditService = values => {
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
const mapStateToProps = state => ({
    currentService: state.data.selectedService,
    initialValues: state.data.selectedService,
});


const mapDispatchToProps = dispatch => ({
    getServiceInfo: bindActionCreators(fetchById, dispatch),
    updateService: bindActionCreators(updateItem, dispatch),
    deleteService: bindActionCreators(destroyItem, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'EditServiceForm',
    validate: validateEditService,
    enableReinitialize : true,
})(EditService));
