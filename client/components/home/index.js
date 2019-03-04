import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Locations from '../locations';
import Services from '../services';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class Home extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  goToNextStep = (value) => {
    this.setState({ value: value + 1});
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Locations" disabled={value !== 0} />
          <Tab label="Services" disabled={value !== 1} />
          <Tab label="Date & Time" disabled={value !== 2}  />
          <Tab label="Review" disabled={value !== 3}   />
        </Tabs>
        {value === 0 &&
          <TabContainer>
            <Locations goToNextStep={() => this.goToNextStep(value)} />
          </TabContainer>
        }
        {value === 1 && 
          <TabContainer>
            <Services goToNextStep={() => this.goToNextStep(value)} />
          </TabContainer>
        }
        {value === 2 && <TabContainer>Gsuite Date Calendar</TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>}
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
