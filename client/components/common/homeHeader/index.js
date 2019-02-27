import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import * as authService from '../../../services/authService';
import Grid from '@material-ui/core/Grid';

const drawerWidth = 250;

const styles = theme => ({
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.navDrawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 45
    },
    menuButtonShift: {
        marginLeft: -15
    },
    flex: {
        flex: 1
    },
    colorBgItem: {
        height: 20,
        display: 'inline-block',
    }
});

const styleColors = [
    "#e05333", 
    "#ffc928",
    "#fbe52f",
    "#cde15e",
    "#80cc33",
    "#40bdcd"
]

class Header extends Component {

    // logOut(e) {
    //     e.preventDefault();
    //     this.props.actions.logout();
    // }

    render() {
        const { classes } = this.props;

        return (
            <header>
                <Grid container spacing={24}>
                    {styleColors.map(color =>
                        <Grid item md={2} key={color} className={classes.colorBgItem} style={{backgroundColor: color }} />
                    )}
                </Grid>
            </header>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, authService), dispatch)
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Header))
