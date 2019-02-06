import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
// custom mui styles :
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// local imports :
import styles from '../../styles/page-styles/DefaultPageMuiStyles';


function OutlinedButton(props) {
  const { classes } = props;
  console.log("PROPS INSIDE OF OUTLINED BUTTON >> IS LINK displaying??", props);
  
  return (
      <Button variant="outlined" color={props.color} className={classnames(classes.button, classes.overlayTop)}>
        {props.link ?
          <Link to={props.link} className={classes.link}>
            {props.text}
          </Link>
        :
          <span className={classes.innerBtnText}>
            {props.text}
          </span>
        }
      </Button>
  );
}

export default withStyles(styles)(OutlinedButton);
