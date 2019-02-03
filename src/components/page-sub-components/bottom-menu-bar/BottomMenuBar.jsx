import React, { Fragment } from 'react';
import classnames from 'classnames';
// mui custom style imports
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// local imports
import OutlinedButton from '../outlined-button/OutlinedButton';

const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#0e3658'
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function BottomMenuBar(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classnames(classes.buttonMenu)}>
            <OutlinedButton text="Send" color="primary" />
            <OutlinedButton text="Receive" color="primary" />
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(BottomMenuBar);
