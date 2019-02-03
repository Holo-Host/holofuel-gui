import React from 'react';
import classnames from 'classnames';
// custom mui styles :
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// local imports :
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

function OutlinedButton(props) {
  const { classes } = props;
  return (
      <Button variant="outlined" color={props.color} className={classnames(classes.button, classes.overlayTop)}>
        {props.text}
      </Button>
  );
}

export default withStyles(styles)(OutlinedButton);
