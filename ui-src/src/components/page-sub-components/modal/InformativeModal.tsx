import * as React from 'react';
// mui custom style imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';

export interface OwnProps {
  // These are props the component has received from its parent component
  message: any,
  resetMessage: () => void,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
// The components optional internal state
  open: boolean,
  prevProps: any
}

function Transition(props:any) {
  return <Slide direction="up" {...props} />;
}

class informativeModal extends React.Component<Props, State>  {
  state = {
    open: false,
    prevProps: {}
  };

  componentDidMount() {
    if(this.props.message){
      // this.handleClickOpen();
    }
  }

  componentDidUpdate(prevProps:any, prevState:any) {
    if (prevProps.message !== this.props.message) {
      // this.handleClickOpen();
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.resetMessage();
    this.setState({ open: false });
  };

  public render() {
    console.log("PROPS inside the informative-dialog-modal", this.props);
    // const { classes } = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Slide in alert dialog
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Transaction Sent!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Transaction Message:
            </DialogContentText>
            <DialogContentText id="alert-dialog-slide-description">
              {this.props.message}
            </DialogContentText>

            <DialogContentText id="alert-dialog-slide-description">
              Please check your transaction history for updates.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default informativeModal;
