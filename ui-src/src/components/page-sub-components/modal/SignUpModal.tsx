
import * as React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
// MUI Imports:
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// local imports :
// import { getDisplayName } from '../../../utils/global-helper-functions'
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  classes: any
}
export type Props = OwnProps;
export interface State {
  open: boolean
 }

class VerficationModal extends React.Component<Props, State>  {
  state = {
      open: false,
  };

  componentDidMount() {
    this.handleClickOpen();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

    public render() {
      const { classes } = this.props;
      const fullScreen: boolean = false;

      return (
          <Grid xs={12} >
            <div className={classnames(classes.modal, classes.modalRoot)}>
              <Fab style={{ display:'none'}} aria-label="next" className={classes.nextBtn} onClick={this.handleClickOpen}>
                <AddIcon/>
              </Fab>
             <Dialog
                fullScreen={fullScreen}
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="responsive-dialog-title"
                className={classes.modalContainer}
            >
              <DialogTitle id="responsive-dialog-title" style={{color:'#072dc3'}}>{"Welcome to HoloFuel"}</DialogTitle>
                  <DialogContent style={{marginBottom:'-5px'}}>
                    <hr/>
                    <DialogContentText id="alert-dialog-description" style={{justifyContent:'center', color:"#0e094b", textDecoration:'none'}}>
                      To get started, set up a profile.
                    </DialogContentText>
                    <br/>
                    <Link to='/profile' style={{textDecoration:'none'}}>
                      <Button variant="contained" size="large" color="primary">
                          Go to Profile
                      </Button>
                    </Link>
                </DialogContent>
              <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                X
              </Button>
          </DialogActions>
          </Dialog>
        </div>
      </Grid>
    )
  }
}

export default withStyles(styles)(VerficationModal);
