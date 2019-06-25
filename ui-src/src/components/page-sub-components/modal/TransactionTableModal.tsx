
import * as React from 'react';
import classnames from 'classnames';
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
import { getDisplayName } from '../../../utils/global-helper-functions'
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  classes: any,
  message: any,
  handleTx: () => void,
}
export type Props = OwnProps;
export interface State {
  open: boolean,
  prevProps: any
  apiCall: string,
  messageObj: {
    counterparty: string,
    amount:number | null
  } | null,
 }

class TransactionTableModal extends React.Component<Props, State>  {
  state = {
      open: false,
      prevProps: {},
      apiCall: '',
      messageObj: {
        counterparty: '',
        amount: null
      }
    };

  componentDidMount() {
      if(this.props.message){
        console.log("message sent: ", this.props.message);
        const {apiCall} = JSON.parse(this.props.message);

        let counterparty: string = "";
        let amount: number | null = null;

        if(apiCall === 'promise_payment') {
          const {to:recipient, amount:hf } = JSON.parse(this.props.message);
          counterparty = recipient;
          amount = hf;
        }
        if(apiCall === 'receive_payment'){
          const {promise} = JSON.parse(this.props.message);
          console.log("promise ", promise);

          counterparty = promise.tx!.from;
          amount = promise.tx!.amount;
        }

        const messageObj = {
          counterparty,
          amount
        }

        this.setState({ apiCall, messageObj })
        this.handleClickOpen();
      }
    }

   componentDidUpdate(prevProps:any, prevState:any) {
      if (prevProps.message !== this.props.message) {
        this.handleClickOpen();
      }
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({
        open: false,
        messageObj:{
          counterparty: '',
          amount: null
        }
      });
    };

    handleMakeTransaction = () => {
      this.props.handleTx();
      this.handleClose();
    };

    public render() {
      const { classes } = this.props;
      const fullScreen: boolean = false;
      const { messageObj, apiCall } = this.state;
      console.log("messageObj body: ", messageObj);

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
              <DialogTitle id="responsive-dialog-title" style={{color:'#072dc3'}}>{"Verify Transaction"}</DialogTitle>
                  <DialogContent style={{marginBottom:'-5px'}}>
                    <hr/>
                    <DialogContentText id="alert-dialog-description">
                      Would you like to {apiCall === "promise_payment"? "send" : "accept"} {messageObj!.amount} {apiCall === "promise_payment"? "to" : "from"} {getDisplayName(messageObj!.counterparty)} ?
                    </DialogContentText>
                </DialogContent>
              <DialogActions>
                <Button onClick={this.handleMakeTransaction} color="primary">
                  Yes! Send transaction.
                </Button>
                <Button onClick={this.handleClose} color="primary">
                  No. Correct details.
                </Button>
          </DialogActions>
          </Dialog>
        </div>
      </Grid>
    )
  }
}

export default withStyles(styles)(TransactionTableModal);
