import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
  },
};
class SwipeableTemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };
  style_search = {
    marginRight: 200

  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    localStorage.clear("token");
    window.location = "http://localhost:3000/";
    this.setState({ anchorEl: null });
  };
  state = {
    anchorEl: null,
  };



  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List><Link to={`/registery`} >Register New Application</Link></List>
        <List>Aayush Garg</List>
        <List>Username : aayushgarg21</List>
        <Divider />
      </div>
    );
    return (
      <div >
        <AppBar
          position="sticky"
        >
          <Toolbar className="toolbar">
            <IconButton align="left" onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton >
            <SearchBar
              className="searchbar" />

            <Button
              aria-owns={open ? 'fade-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <Avatar />
            </Button>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={this.handleClose}>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}
SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SwipeableTemporaryDrawer);
