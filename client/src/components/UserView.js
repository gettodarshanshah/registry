import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ApplicationList from "./ApplicationRegistered";
import Paper from '@material-ui/core/Paper';
import Subscription from "./ApplicationSubscribed";
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



class UserView extends React.Component {
  
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  pathArray = window.location.pathname.split("/");
  organsiationName =  this.pathArray[2];
    

  render() {
   
    
    const { value } = this.state;

    return (
      <div >
        
        <AppBar position="static">
        <div className="tabs">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Application Registered" />
            <Tab label="Subscritption" />
           </Tabs>
           </div>
        </AppBar>
        {value === 0 && <TabContainer><Paper><ApplicationList organsiationName = {this.organsiationName}/></Paper></TabContainer>}
        {value === 1 && <TabContainer><Paper><Subscription organsiationName = {this.organsiationName}/></Paper></TabContainer>}
      </div>
    );
  }
}



export default UserView;