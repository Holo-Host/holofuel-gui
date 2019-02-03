import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  root: {
    flexGrow: 1,
    background: '#fbfbfb',
    color:  '#057266f2',
    display: 'inline'
  },
  grow: {
    flexGrow: 1,
    color: '#00838d',
    fontFamily: 'Raleway',
    fontWeight: 400,
    fontSize: 28
  },
  iconButton: {
    marginLeft: -12,
    marginRight: 20,
    color:"#bec4dd"
  },
  icon : {
  color:"#bec4dd"
  }
};

class AppNavBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="fixed" style={{margin: '0 auto',  background: "#0e094b"}}>
          <Toolbar>
            <div>
              <IconButton
                className={classes.iconButton}
                color="inherit"
                aria-label="Icon"
              >
                <img src="/assets/icons/holo-logo.png" alt="holo-logo" width="50"/>
              </IconButton>
            </div>

            <Typography variant="h6" color="inherit" className={classes.grow}>
              HoloFuel
            </Typography>

            <div>
              <IconButton
                  className={classes.icon}
                  aria-owns={open ? 'profile-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                  id="profile-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>My Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>Sign Out</MenuItem>
                </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  )};
}

export default withStyles(styles)(AppNavBar);

            //
            // <div>
            //   // request icon goes here >> consult paypal icons!!
            // </div>
