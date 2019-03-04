import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class HomeHeader extends Component {

    render() {
        return (
            <div>
                <AppBar style={{ background: 'white' }}>
                    <Toolbar style={{ justifyContent: 'flex-end' }}>
                        <Link to='/admin'><Button>Admin</Button></Link>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default HomeHeader;
