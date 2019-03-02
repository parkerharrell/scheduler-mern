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

import { updateItem, fetchById, destroyItem } from '../../actions/userAction';
import renderText from '../../components/common/form/renderText';
import renderDate from '../../components/common/form/renderDate';


class UserDetails extends Component {

    constructor(props) {
        super(props);
        const { match, getUserInfo } = props;
        const userId = match.params.id;
        this.state = {
            userId,
        }
        getUserInfo(userId);
    }

    render() {
        const { handleSubmit, currentUser } = this.props;
        if (isEmpty(currentUser)) {
            return (
                <div>
                    Loading ...      
                </div>
            );
        }
        return (
            <form key={currentUser} method="post" >
                <Link to='/admin/customers'><span>customers</span></Link> / <span>{currentUser.id}</span>
                <br/><br/>
                <Grid
                    container
                    alignItems="center"
                    spacing={24}
                >
                    <Grid item xs={6}>
                        <h1>User Details</h1>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                    </Grid>
                    <br/>
                    <Grid item xs={4}>
                        <Field
                            type="text"
                            name="first_name"
                            component={renderText}
                            label="First Name *"
                        />
                    </Grid>
                    <Grid item xs={4}>
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
                            name="username"
                            component={renderText}
                            label="Username *"
                        />
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            type="text"
                            name="email"
                            component={renderText}
                            label="Email *"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="createdAt"
                            label="Created *"
                            type="date"
                            component={renderDate}
                        />
                    </Grid>
                </Grid>
            </form>
        )
    }
}


/**
 * Map the actions to props.
 */
const mapStateToProps = state => ({
    currentUser: state.data.selectedUser,
    initialValues: state.data.selectedUser,
});


const mapDispatchToProps = dispatch => ({
    getUserInfo: bindActionCreators(fetchById, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'EditUserForm',
    enableReinitialize : true,
})(UserDetails));
