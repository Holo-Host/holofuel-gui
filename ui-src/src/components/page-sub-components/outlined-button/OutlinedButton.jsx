import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
// custom mui styles :
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// local imports :
import styles from '../../styles/page-styles/DefaultPageMuiStyles';


function OutlinedButton(props) {
  const { classes, link } = props;
  const btnLink = link ? link : "#";
  return (
    <Link to={props.link} className={classes.link}>
      {link ?
          <Button variant="outlined" color={props.color}
          onClick={() => props.showTransferBar(props.fnName)}
          className={classnames(classes.button, classes.overlayTop)}>
              {props.text}
          </Button>
      :
        <Button variant="outlined" color={props.color}
        onClick={() => props.showTransferBar(props.fnName)}
        className={classnames(classes.button, classes.overlayTop)}>
          <span className={classes.innerBtnText}>
            {props.text}
          </span>
        </Button>
      }
    </Link>
  );
}

export default withStyles(styles)(OutlinedButton);
